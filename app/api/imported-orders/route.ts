import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, gte, lte, sql } from "drizzle-orm";

import { requireAdminApi, requireSessionApi } from "@/lib/require-admin";
import { utcCalendarMonthRange } from "@/lib/imported-orders-dates";
import {
  groupImportedRows,
  parseImportedOrdersFile,
} from "@/lib/imported-orders-parse";
import { dbAdmin } from "@/lib/db";
import {
  importedOrderItems,
  importedOrders,
} from "@/lib/db/admin-schema";

/** Vercel Hobby max is 300s; keep within platform limit. */
export const maxDuration = 300;

const MAX_FILE_BYTES = 8 * 1024 * 1024;

export async function GET(request: NextRequest) {
  const gate = await requireSessionApi();
  if ("error" in gate) {
    return NextResponse.json(
      { success: false, error: gate.error },
      { status: gate.status }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1
  );
  const pageSize = Math.min(
    100,
    Math.max(1, Number.parseInt(searchParams.get("pageSize") || "20", 10) || 20)
  );
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const monthNum = month ? Number.parseInt(month, 10) : 0;
  const hasMonthFilter =
    year != null &&
    year !== "" &&
    Number.isFinite(Number.parseInt(year, 10)) &&
    monthNum >= 1 &&
    monthNum <= 12;

  let monthRange: { start: Date; end: Date } | null = null;
  if (year && month && hasMonthFilter) {
    const y = Number.parseInt(year, 10);
    monthRange = utcCalendarMonthRange(y, monthNum);
  }

  const countBase = dbAdmin.select({ c: count() }).from(importedOrders);
  const [totalRow] =
    monthRange
      ? await countBase.where(
          and(
            gte(importedOrders.orderDate, monthRange.start),
            lte(importedOrders.orderDate, monthRange.end)
          )
        )
      : await countBase;
  const total = Number(totalRow?.c ?? 0);

  const orderRows = await dbAdmin.query.importedOrders.findMany({
    where: monthRange
      ? (io, { and: andOp, gte: gteOp, lte: lteOp }) =>
          andOp(
            gteOp(io.orderDate, monthRange!.start),
            lteOp(io.orderDate, monthRange!.end)
          )
      : undefined,
    with: {
      items: {
        orderBy: (it, { asc: a }) => [a(it.lineIndex)],
      },
    },
    orderBy: (io, { desc: d, asc: a }) => [d(io.orderDate), a(io.orderName)],
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  let periodSummary: {
    year: number;
    month: number;
    orderCount: number;
    totalAmount: number;
  } | null = null;

  if (hasMonthFilter && year && monthRange) {
    const y = Number.parseInt(year, 10);
    const [agg] = await dbAdmin
      .select({
        n: count(),
        total: sql<string>`coalesce(sum(${importedOrders.orderTotal}), 0)`,
      })
      .from(importedOrders)
      .where(
        and(
          gte(importedOrders.orderDate, monthRange.start),
          lte(importedOrders.orderDate, monthRange.end)
        )
      );
    periodSummary = {
      year: y,
      month: monthNum,
      orderCount: Number(agg?.n ?? 0),
      totalAmount: Number(agg?.total ?? 0),
    };
  }

  return NextResponse.json({
    success: true,
    data: {
      orders: orderRows.map((o) => ({
        id: o.id,
        orderDate: o.orderDate.toISOString(),
        orderName: o.orderName,
        deliveryCharges: Number(o.deliveryCharges),
        orderTotal: Number(o.orderTotal),
        createdAt: o.createdAt.toISOString(),
        items: o.items.map((it) => ({
          id: it.id,
          lineIndex: it.lineIndex,
          itemName: it.itemName,
          amount: Number(it.amount),
        })),
      })),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize) || 1,
      },
      periodSummary,
    },
  });
}

export async function POST(request: NextRequest) {
  const gate = await requireAdminApi();
  if ("error" in gate) {
    return NextResponse.json(
      { success: false, error: gate.error },
      { status: gate.status }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid form data." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: "No file uploaded." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { success: false, error: "File is too large (max 8 MB)." },
      { status: 400 }
    );
  }

  const name = file.name || "upload";
  const lower = name.toLowerCase();
  if (!lower.endsWith(".csv") && !lower.endsWith(".xlsx")) {
    return NextResponse.json(
      { success: false, error: "Only .csv and .xlsx files are allowed." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const parsed = parseImportedOrdersFile(buffer);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, error: parsed.error },
      { status: 400 }
    );
  }

  const grouped = groupImportedRows(parsed.rows);
  if (!grouped.ok) {
    return NextResponse.json(
      { success: false, error: grouped.error },
      { status: 400 }
    );
  }

  let created = 0;
  await dbAdmin.transaction(async (tx) => {
    const now = new Date();
    for (const g of grouped.orders) {
      const [row] = await tx
        .insert(importedOrders)
        .values({
          orderDate: g.orderDate,
          orderName: g.orderName,
          deliveryCharges: String(g.deliveryCharges),
          orderTotal: String(g.orderTotal),
          createdAt: now,
          updatedAt: now,
        })
        .returning({ id: importedOrders.id });

      if (!row) continue;

      await tx.insert(importedOrderItems).values(
        g.items.map((it, idx) => ({
          orderId: row.id,
          lineIndex: idx,
          itemName: it.itemName,
          amount: String(it.amount),
        }))
      );
      created += 1;
    }
  });

  return NextResponse.json({
    success: true,
    data: { importedOrders: created },
  });
}

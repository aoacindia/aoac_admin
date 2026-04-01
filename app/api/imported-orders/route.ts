import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/prisma/generated/admin";
import { adminPrisma } from "@/lib/admin-prisma";
import { requireAdminApi } from "@/lib/require-admin";
import {
  groupImportedRows,
  parseImportedOrdersFile,
} from "@/lib/imported-orders-parse";

/** Allow long imports on hosts that honor this (e.g. Vercel); local Node ignores it. */
export const maxDuration = 600;

const MAX_FILE_BYTES = 8 * 1024 * 1024;

/** Default interactive transaction timeout is 5s; large CSV imports exceed that on remote DBs (P2028). */
const IMPORT_TX_MAX_WAIT_MS = 60_000;
const IMPORT_TX_TIMEOUT_MS = 10 * 60_000;

export async function GET(request: NextRequest) {
  const gate = await requireAdminApi();
  if ("error" in gate) {
    return NextResponse.json(
      { success: false, error: gate.error },
      { status: gate.status }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number.parseInt(searchParams.get("pageSize") || "20", 10) || 20)
  );
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const where: Prisma.ImportedOrderWhereInput = {};
  if (year && month) {
    const y = Number.parseInt(year, 10);
    const m = Number.parseInt(month, 10);
    if (Number.isFinite(y) && m >= 1 && m <= 12) {
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0, 23, 59, 59, 999);
      where.orderDate = { gte: start, lte: end };
    }
  }

  const monthNum = month ? Number.parseInt(month, 10) : 0;
  const hasMonthFilter =
    year != null &&
    year !== "" &&
    Number.isFinite(Number.parseInt(year, 10)) &&
    monthNum >= 1 &&
    monthNum <= 12;

  const [total, orders, periodAgg] = await Promise.all([
    adminPrisma.importedOrder.count({ where }),
    adminPrisma.importedOrder.findMany({
      where,
      orderBy: [{ orderDate: "desc" }, { orderName: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        items: { orderBy: { lineIndex: "asc" } },
      },
    }),
    hasMonthFilter
      ? adminPrisma.importedOrder.aggregate({
          where,
          _count: { _all: true },
          _sum: { orderTotal: true },
        })
      : Promise.resolve(null),
  ]);

  const periodSummary =
    hasMonthFilter && periodAgg && year
      ? {
          year: Number.parseInt(year, 10),
          month: monthNum,
          orderCount: periodAgg._count._all,
          totalAmount: periodAgg._sum.orderTotal
            ? Number(periodAgg._sum.orderTotal)
            : 0,
        }
      : null;

  return NextResponse.json({
    success: true,
    data: {
      orders: orders.map((o) => ({
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
  await adminPrisma.$transaction(
    async (tx) => {
      for (const g of grouped.orders) {
        await tx.importedOrder.create({
          data: {
            orderDate: g.orderDate,
            orderName: g.orderName,
            deliveryCharges: new Prisma.Decimal(g.deliveryCharges),
            orderTotal: new Prisma.Decimal(g.orderTotal),
            items: {
              create: g.items.map((it, idx) => ({
                lineIndex: idx,
                itemName: it.itemName,
                amount: new Prisma.Decimal(it.amount),
              })),
            },
          },
        });
        created += 1;
      }
    },
    {
      maxWait: IMPORT_TX_MAX_WAIT_MS,
      timeout: IMPORT_TX_TIMEOUT_MS,
    }
  );

  return NextResponse.json({
    success: true,
    data: { importedOrders: created },
  });
}

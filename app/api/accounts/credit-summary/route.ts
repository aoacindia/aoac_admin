import { NextRequest, NextResponse } from "next/server";
import { and, desc, gte, inArray, lte, sql } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { orders, orderStatusEnum } from "@/lib/db/user-schema";

type SummaryRow = {
  paymentMethod: string;
  orderCount: number;
  creditAmount: number;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const start = searchParams.get("start"); // YYYY-MM-DD
    const end = searchParams.get("end"); // YYYY-MM-DD
    const statusesParam = searchParams.get("statuses"); // comma-separated

    const rawStatuses =
      statusesParam
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? ["PAID"];

    const allowed = new Set(orderStatusEnum.enumValues);
    const statuses = rawStatuses.filter((s): s is (typeof orderStatusEnum.enumValues)[number] =>
      allowed.has(s as (typeof orderStatusEnum.enumValues)[number])
    );

    const startDate = start ? new Date(`${start}T00:00:00.000Z`) : null;
    const endDate = end ? new Date(`${end}T23:59:59.999Z`) : null;

    if (startDate && Number.isNaN(startDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid start date" },
        { status: 400 }
      );
    }
    if (endDate && Number.isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid end date" },
        { status: 400 }
      );
    }

    const filters = [];
    if (statuses.length > 0) {
      filters.push(inArray(orders.status, statuses));
    }
    if (startDate) {
      filters.push(gte(orders.orderDate, startDate));
    }
    if (endDate) {
      filters.push(lte(orders.orderDate, endDate));
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const sumExpr = sql<number>`coalesce(sum(coalesce(${orders.paidAmount}, ${orders.invoiceAmount}, ${orders.totalAmount})), 0)`;

    const base = dbUser
      .select({
        paymentMethod: orders.paymentMethod,
        orderCount: sql<number>`count(*)::int`,
        creditAmount: sumExpr,
      })
      .from(orders)
      .groupBy(orders.paymentMethod)
      .orderBy(desc(sumExpr));

    const rows = whereClause ? await base.where(whereClause) : await base;

    const data: SummaryRow[] = rows.map((r) => ({
      paymentMethod: r.paymentMethod ?? "UNKNOWN",
      orderCount: Number(r.orderCount),
      creditAmount: Number(r.creditAmount ?? 0),
    }));

    const totalCredit = data.reduce((sum, row) => sum + row.creditAmount, 0);
    const totalOrders = data.reduce((sum, row) => sum + row.orderCount, 0);

    return NextResponse.json({
      success: true,
      data,
      meta: {
        statuses,
        start: start || null,
        end: end || null,
        totalCredit,
        totalOrders,
      },
    });
  } catch (error: unknown) {
    console.error("Error building credit summary:", error);
    const message = error instanceof Error ? error.message : "Failed to build summary";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

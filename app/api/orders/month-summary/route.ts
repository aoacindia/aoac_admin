import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { requireAdminApi } from "@/lib/require-admin";
import {
  buildOrdersListWhere,
  parseMonthYearParams,
  parseStatusesParam,
} from "@/lib/build-orders-list-where";

/**
 * Aggregates order counts and amounts for the same filter as GET /api/orders
 * (tab, month/year, optional search & status). Used by the orders dashboard summary strip.
 */
export async function GET(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const statusesParam = searchParams.get("statuses");
    const orderType = searchParams.get("orderType");
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    const { month, year } = parseMonthYearParams(monthParam, yearParam);
    const statuses = parseStatusesParam(statusesParam);
    const where = buildOrdersListWhere({
      orderType,
      status,
      statuses,
      search,
      month,
      year,
    });

    const rows = await userPrisma.order.findMany({
      where,
      select: {
        status: true,
        invoiceAmount: true,
        totalAmount: true,
        discountAmount: true,
        shippingAmount: true,
      },
    });

    let totalRounded = 0;
    let totalDiscount = 0;
    let totalShipping = 0;
    const byStatus: Record<string, number> = {};

    for (const r of rows) {
      totalRounded += r.invoiceAmount ?? r.totalAmount ?? 0;
      totalDiscount += r.discountAmount ?? 0;
      totalShipping += r.shippingAmount ?? 0;
      const s = r.status || "UNKNOWN";
      byStatus[s] = (byStatus[s] || 0) + 1;
    }

    const byStatusList = Object.entries(byStatus)
      .map(([statusKey, count]) => ({ status: statusKey, count }))
      .sort((a, b) => a.status.localeCompare(b.status));

    return NextResponse.json({
      success: true,
      data: {
        orderCount: rows.length,
        totalRounded,
        totalDiscount,
        totalShipping,
        byStatus: byStatusList,
      },
    });
  } catch (error: any) {
    console.error("Error building month summary:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load summary" },
      { status: 500 }
    );
  }
}

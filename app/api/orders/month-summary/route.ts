import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/require-admin";
import {
  parseMonthYearParams,
  parseStatusesParam,
} from "@/lib/build-orders-list-where";
import { selectOrdersSummariesForMonthDrizzle } from "@/lib/orders-list-drizzle";

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
    const rows = await selectOrdersSummariesForMonthDrizzle({
      orderType,
      status,
      statuses,
      search,
      month,
      year,
    });

    let totalRounded = 0;
    let totalDiscount = 0;
    let totalShipping = 0;
    const byStatus: Record<string, number> = {};

    for (const r of rows) {
      if (orderType !== "pending" && r.status === "PENDING") continue;
      totalRounded += r.invoiceAmount ?? r.totalAmount ?? 0;
      totalDiscount += r.discountAmount ?? 0;
      totalShipping += r.shippingAmount ?? 0;
      const s = r.status || "UNKNOWN";
      byStatus[s] = (byStatus[s] || 0) + 1;
    }

    const byStatusList = Object.entries(byStatus)
      .map(([statusKey, countVal]) => ({ status: statusKey, count: countVal }))
      .sort((a, b) => a.status.localeCompare(b.status));

    return NextResponse.json({
      success: true,
      data: {
        orderCount: Object.values(byStatus).reduce((s, n) => s + n, 0),
        totalRounded,
        totalDiscount,
        totalShipping,
        byStatus: byStatusList,
      },
    });
  } catch (error: unknown) {
    console.error("Error building month summary:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load summary";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

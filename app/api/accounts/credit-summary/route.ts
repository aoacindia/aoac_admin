import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

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

    const statuses =
      statusesParam
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? ["PAID"];

    // Build date range (inclusive)
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

    // Note: Using raw SQL here so we can group by paymentMethod while summing
    // COALESCE(paidAmount, invoiceAmount, totalAmount) as "credit amount".
    const whereParts: string[] = [];
    const values: any[] = [];

    if (statuses.length > 0) {
      whereParts.push(`status IN (${statuses.map(() => "?").join(",")})`);
      values.push(...statuses);
    }

    if (startDate) {
      whereParts.push(`orderDate >= ?`);
      values.push(startDate);
    }

    if (endDate) {
      whereParts.push(`orderDate <= ?`);
      values.push(endDate);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

    const rows = await userPrisma.$queryRawUnsafe<
      Array<{
        paymentMethod: string | null;
        orderCount: bigint | number;
        creditAmount: any;
      }>
    >(
      `
      SELECT
        paymentMethod,
        COUNT(*) AS orderCount,
        SUM(COALESCE(paidAmount, invoiceAmount, totalAmount)) AS creditAmount
      FROM \`Order\`
      ${whereClause}
      GROUP BY paymentMethod
      ORDER BY creditAmount DESC
      `,
      ...values
    );

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
  } catch (error: any) {
    console.error("Error building credit summary:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to build summary" },
      { status: 500 }
    );
  }
}


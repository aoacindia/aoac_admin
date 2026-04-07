import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";
import { requireSessionApi } from "@/lib/require-admin";
import { utcCalendarMonthRange } from "@/lib/imported-orders-dates";
import { buildAllOrdersMonthPdf } from "@/lib/all-orders-month-pdf";
import {
  pdfExportHasSelection,
  type PdfExportOptions,
} from "@/lib/pdf-export-options";

export const maxDuration = 300;

function parsePdfOptions(raw: unknown): PdfExportOptions | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  return {
    includeDocumentTitle: p.includeDocumentTitle === true,
    includeSummaryOrderCount: p.includeSummaryOrderCount === true,
    includeSummaryTotalAmount: p.includeSummaryTotalAmount === true,
    orderRowDate: p.orderRowDate === true,
    orderRowName: p.orderRowName === true,
    orderRowDelivery: p.orderRowDelivery === true,
    orderRowTotal: p.orderRowTotal === true,
    orderRowItems: p.orderRowItems === true,
  };
}

export async function POST(request: NextRequest) {
  const gate = await requireSessionApi();
  if ("error" in gate) {
    return NextResponse.json(
      { success: false, error: gate.error },
      { status: gate.status }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON." },
      { status: 400 }
    );
  }

  const year = Number(body.year);
  const month = Number(body.month);
  const options = parsePdfOptions(body.options);

  if (!Number.isFinite(year) || month < 1 || month > 12) {
    return NextResponse.json(
      { success: false, error: "Valid year and month (1–12) are required." },
      { status: 400 }
    );
  }

  if (!options) {
    return NextResponse.json(
      { success: false, error: "PDF options are required." },
      { status: 400 }
    );
  }

  if (!pdfExportHasSelection(options)) {
    return NextResponse.json(
      {
        success: false,
        error: "Select at least one item to include in the PDF.",
      },
      { status: 400 }
    );
  }

  const { start, end } = utcCalendarMonthRange(year, month);

  const [orders, agg] = await Promise.all([
    adminPrisma.importedOrder.findMany({
      where: { orderDate: { gte: start, lte: end } },
      orderBy: [{ orderDate: "asc" }, { orderName: "asc" }],
      include: {
        items: { orderBy: { lineIndex: "asc" } },
      },
    }),
    adminPrisma.importedOrder.aggregate({
      where: { orderDate: { gte: start, lte: end } },
      _count: { _all: true },
      _sum: { orderTotal: true },
    }),
  ]);

  const pdfBytes = await buildAllOrdersMonthPdf({
    year,
    month,
    orderCount: agg._count._all,
    totalAmount: agg._sum.orderTotal ? Number(agg._sum.orderTotal) : 0,
    orders: orders.map((o) => ({
      orderDate: o.orderDate,
      orderName: o.orderName,
      deliveryCharges: Number(o.deliveryCharges),
      orderTotal: Number(o.orderTotal),
      items: o.items.map((it) => ({
        lineIndex: it.lineIndex,
        itemName: it.itemName,
        amount: Number(it.amount),
      })),
    })),
    options,
  });

  const filename = `all-orders-${year}-${String(month).padStart(2, "0")}.pdf`;
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

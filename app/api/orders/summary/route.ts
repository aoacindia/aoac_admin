import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";
import { requireAdminApi } from "@/lib/require-admin";
import {
  aggregateOrderTaxBuckets,
  bucketsToSortedArray,
} from "@/lib/order-tax";

/** Calendar month in local server TZ: first instant to last instant of that month. */
function getOrderDateFilterForMonthYear(month: number, year: number) {
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  return {
    orderDate: {
      gte: start,
      lte: end,
    },
  };
}

function parseMonthYearQuery(searchParams: URLSearchParams):
  | { ok: true; month: number; year: number }
  | { ok: false; error: string } {
  const monthRaw = searchParams.get("month");
  const yearRaw = searchParams.get("year");
  if (monthRaw === null || yearRaw === null || monthRaw === "" || yearRaw === "") {
    return { ok: false, error: "month and year are required" };
  }
  const month = Number(monthRaw);
  const year = Number(yearRaw);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return { ok: false, error: "month must be an integer from 1 to 12" };
  }
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return { ok: false, error: "year must be a valid integer" };
  }
  return { ok: true, month, year };
}

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
    const parsed = parseMonthYearQuery(searchParams);
    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 }
      );
    }
    const { month, year } = parsed;
    const dateWhere = getOrderDateFilterForMonthYear(month, year);

    const [businessOrders, personalOrders] = await Promise.all([
      userPrisma.order.findMany({
        where: {
          ...dateWhere,
          user: { isBusinessAccount: true },
        },
        include: {
          orderItems: true,
          user: {
            select: {
              gstNumber: true,
              businessName: true,
              name: true,
            },
          },
          shippingAddress: true,
        },
        orderBy: { orderDate: "desc" },
      }),
      userPrisma.order.findMany({
        where: {
          ...dateWhere,
          user: {
            OR: [{ isBusinessAccount: false }, { isBusinessAccount: null }],
          },
        },
        include: {
          orderItems: true,
          shippingAddress: true,
        },
        orderBy: { orderDate: "desc" },
      }),
    ]);

    const officeIds = [
      ...new Set(
        businessOrders
          .map((o) => o.invoiceOfficeId)
          .filter((id): id is string => Boolean(id))
      ),
    ];
    const offices =
      officeIds.length > 0
        ? await adminPrisma.office.findMany({
            where: { id: { in: officeIds } },
            select: { id: true, gstin: true },
          })
        : [];
    const officeGstinById = new Map(offices.map((o) => [o.id, o.gstin]));

    const business = businessOrders.map((order) => {
      const buckets = aggregateOrderTaxBuckets(
        order.orderItems,
        order.shippingAmount
      );
      const taxBreakdown = bucketsToSortedArray(buckets);
      const invoiceTotal =
        order.invoiceAmount ??
        order.totalAmount ??
        taxBreakdown.reduce((s, r) => s + r.grossAmount, 0);

      return {
        orderId: order.id,
        buyerGstin: order.user.gstNumber?.trim() || null,
        sellerGstin: order.invoiceOfficeId
          ? officeGstinById.get(order.invoiceOfficeId) ?? null
          : null,
        invoiceNumber: order.InvoiceNumber,
        orderDate: order.orderDate.toISOString(),
        invoiceTotalRounded: Math.round(Number(invoiceTotal)),
        taxBreakdown: taxBreakdown.map((r) => ({
          taxPercent: r.taxPercent,
          grossAmount: r.grossAmount,
          taxableAmount: r.taxableAmount,
        })),
        customerLabel:
          order.user.businessName?.trim() || order.user.name || "—",
      };
    });

    const personalByStateTax = new Map<
      string,
      { state: string; taxPercent: number; grossAmount: number; taxableAmount: number }
    >();

    for (const order of personalOrders) {
      const state =
        order.shippingAddress?.state?.trim() || "Unknown";
      const buckets = aggregateOrderTaxBuckets(
        order.orderItems,
        order.shippingAmount
      );
      for (const [taxPercent, v] of buckets) {
        const key = `${state}\0${taxPercent}`;
        const cur = personalByStateTax.get(key) ?? {
          state,
          taxPercent,
          grossAmount: 0,
          taxableAmount: 0,
        };
        cur.grossAmount += v.grossAmount;
        cur.taxableAmount += v.taxableAmount;
        personalByStateTax.set(key, cur);
      }
    }

    const personal = [...personalByStateTax.values()].sort((a, b) => {
      const sc = a.state.localeCompare(b.state);
      if (sc !== 0) return sc;
      return a.taxPercent - b.taxPercent;
    });

    return NextResponse.json({
      success: true,
      data: {
        business,
        personal,
        meta: {
          month,
          year,
          businessOrderCount: business.length,
          personalOrderCount: personalOrders.length,
        },
      },
    });
  } catch (error: unknown) {
    console.error("Error building order summary:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

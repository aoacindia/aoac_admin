import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@/prisma/generated/user";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";
import { productPrisma } from "@/lib/product-prisma";
import { requireAdminApi } from "@/lib/require-admin";
import {
  aggregateOrderTaxBuckets,
  bucketsToSortedArray,
} from "@/lib/order-tax";
import { aggregateHsnSummary, type OrderForHsn } from "@/lib/hsn-summary";

type OrderBusinessStandard = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    user: { select: { gstNumber: true; businessName: true; name: true } };
    shippingAddress: true;
  };
}>;

type OrderPersonalStandard = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    shippingAddress: true;
  };
}>;

type OrderBusinessHsn = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    user: {
      select: {
        gstNumber: true;
        businessName: true;
        name: true;
        billingAddress: { select: { stateCode: true } };
      };
    };
    shippingAddress: true;
  };
}>;

type OrderPersonalHsn = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    shippingAddress: true;
    user: { select: { billingAddress: { select: { stateCode: true } } } };
  };
}>;

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

/** b2b / b2c = order summaries; hsn-b2b / hsn-b2c = HSN-wise GST for that segment. */
function parseSegment(
  searchParams: URLSearchParams
): "b2b" | "b2c" | "hsn-b2b" | "hsn-b2c" | null {
  const raw = searchParams.get("segment");
  if (
    raw === "b2b" ||
    raw === "b2c" ||
    raw === "hsn-b2b" ||
    raw === "hsn-b2c"
  ) {
    return raw;
  }
  return null;
}

const businessWhereBase = { isBusinessAccount: true as const };
const personalWhereUser = {
  OR: [{ isBusinessAccount: false }, { isBusinessAccount: null }],
};

const businessIncludeStandard = {
  orderItems: true,
  user: {
    select: {
      gstNumber: true,
      businessName: true,
      name: true,
    },
  },
  shippingAddress: true,
} as const;

const businessIncludeHsn = {
  orderItems: true,
  user: {
    select: {
      gstNumber: true,
      businessName: true,
      name: true,
      billingAddress: { select: { stateCode: true } },
    },
  },
  shippingAddress: true,
} as const;

const personalIncludeStandard = {
  orderItems: true,
  shippingAddress: true,
} as const;

const personalIncludeHsn = {
  orderItems: true,
  shippingAddress: true,
  user: {
    select: {
      billingAddress: { select: { stateCode: true } },
    },
  },
} as const;

async function fetchProductHsns(
  productIds: string[]
): Promise<Map<string, string | null>> {
  if (productIds.length === 0) return new Map();
  const products = await productPrisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, hsnsac: true },
  });
  return new Map(products.map((p) => [p.id, p.hsnsac]));
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
    const segment = parseSegment(searchParams);

    const businessWhere = {
      ...dateWhere,
      user: businessWhereBase,
    };
    const personalWhere = {
      ...dateWhere,
      user: personalWhereUser,
    };

    let businessOrders: OrderBusinessStandard[] | OrderBusinessHsn[] = [];
    let personalOrders: OrderPersonalStandard[] | OrderPersonalHsn[] = [];

    if (segment === "b2b") {
      businessOrders = await userPrisma.order.findMany({
        where: businessWhere,
        include: businessIncludeStandard,
        orderBy: { orderDate: "desc" },
      });
      personalOrders = [];
    } else if (segment === "b2c") {
      businessOrders = [];
      personalOrders = await userPrisma.order.findMany({
        where: personalWhere,
        include: personalIncludeStandard,
        orderBy: { orderDate: "desc" },
      });
    } else if (segment === "hsn-b2b") {
      businessOrders = await userPrisma.order.findMany({
        where: businessWhere,
        include: businessIncludeHsn,
        orderBy: { orderDate: "desc" },
      });
      personalOrders = [];
    } else if (segment === "hsn-b2c") {
      businessOrders = [];
      personalOrders = await userPrisma.order.findMany({
        where: personalWhere,
        include: personalIncludeHsn,
        orderBy: { orderDate: "desc" },
      });
    } else {
      [businessOrders, personalOrders] = await Promise.all([
        userPrisma.order.findMany({
          where: businessWhere,
          include: businessIncludeStandard,
          orderBy: { orderDate: "desc" },
        }),
        userPrisma.order.findMany({
          where: personalWhere,
          include: personalIncludeStandard,
          orderBy: { orderDate: "desc" },
        }),
      ]);
    }

    const officeIds = [
      ...new Set(
        [...businessOrders, ...personalOrders]
          .map((o) => o.invoiceOfficeId)
          .filter((id): id is string => Boolean(id))
      ),
    ];
    const offices =
      officeIds.length > 0
        ? await adminPrisma.office.findMany({
            where: { id: { in: officeIds } },
            select: { id: true, gstin: true, stateCode: true },
          })
        : [];
    const officeGstinById = new Map(offices.map((o) => [o.id, o.gstin]));
    const officeStateCodeById = new Map(
      offices.map((o) => [o.id, o.stateCode])
    );

    const isHsnSegment = segment === "hsn-b2b" || segment === "hsn-b2c";

    let hsnSummary = [] as ReturnType<typeof aggregateHsnSummary>;

    if (isHsnSegment) {
      const ordersRaw =
        segment === "hsn-b2b" ? businessOrders : personalOrders;
      const productIds = [
        ...new Set(
          ordersRaw.flatMap((o) => o.orderItems.map((i) => i.productId))
        ),
      ];
      const productHsnById = await fetchProductHsns(productIds);
      hsnSummary = aggregateHsnSummary(
        ordersRaw as OrderForHsn[],
        productHsnById,
        officeStateCodeById
      );
    }

    const business = isHsnSegment
      ? []
      : (businessOrders as OrderBusinessStandard[]).map((order) => {
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
      {
        state: string;
        taxPercent: number;
        grossAmount: number;
        taxableAmount: number;
      }
    >();

    if (!isHsnSegment) {
      for (const order of personalOrders as OrderPersonalStandard[]) {
        const state = order.shippingAddress?.state?.trim() || "Unknown";
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
    }

    const personal = isHsnSegment
      ? []
      : [...personalByStateTax.values()].sort((a, b) => {
          const sc = a.state.localeCompare(b.state);
          if (sc !== 0) return sc;
          return a.taxPercent - b.taxPercent;
        });

    return NextResponse.json({
      success: true,
      data: {
        business,
        personal,
        hsnSummary,
        meta: {
          month,
          year,
          businessOrderCount: businessOrders.length,
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

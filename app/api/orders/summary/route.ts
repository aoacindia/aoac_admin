import { NextRequest, NextResponse } from "next/server";
import {
  and,
  desc,
  eq,
  gte,
  inArray,
  isNotNull,
  isNull,
  lte,
  ne,
  sql,
} from "drizzle-orm";

import {
  aggregateOrderTaxBuckets,
  bucketsToSortedArray,
} from "@/lib/order-tax";
import { aggregateHsnSummary, type OrderForHsn } from "@/lib/hsn-summary";
import { requireAdminApi } from "@/lib/require-admin";
import { dbAdmin, dbProduct, dbUser } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";
import { products } from "@/lib/db/product-schema";
import { orders } from "@/lib/db/user-schema";
import type { OrderItemRow } from "@/lib/db/user-schema";

type OrderForCombinedTotals = {
  invoiceOfficeId: string | null;
  shippingAmount: number | null;
  orderItems: OrderItemRow[];
  business: {
    billingAddress: { stateCode: string | null } | null;
  } | null;
};

type OrderBusinessStandard = {
  id: string;
  invoiceOfficeId: string | null;
  orderItems: OrderItemRow[];
  shippingAmount: number | null;
  invoiceAmount: number | null;
  totalAmount: number;
  InvoiceNumber: string | null;
  orderDate: Date;
  user: {
    name: string;
  };
  business: {
    gstNumber: string | null;
    businessName: string | null;
  } | null;
};

type OrderPersonalStandard = {
  id: string;
  invoiceOfficeId: string | null;
  orderItems: OrderItemRow[];
  shippingAmount: number | null;
  shippingAddress: { state: string | null } | null;
};

type OrderBusinessHsn = OrderBusinessStandard & {
  business: (OrderBusinessStandard["business"] & {
    billingAddress: { stateCode: string | null } | null;
  }) | null;
  shippingAddress: { stateCode: string | null } | null;
};

type OrderPersonalHsn = OrderPersonalStandard & {
  business: {
    billingAddress: { stateCode: string | null } | null;
  } | null;
};

/** Calendar month in local server TZ: first instant to last instant of that month. */
function getOrderDateFilterForMonthYear(month: number, year: number) {
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  return { start, end };
}

function parseMonthYearQuery(searchParams: URLSearchParams):
  | { ok: true; month: number; year: number }
  | { ok: false; error: string } {
  const monthRaw = searchParams.get("month");
  const yearRaw = searchParams.get("year");
  if (
    monthRaw === null ||
    yearRaw === null ||
    monthRaw === "" ||
    yearRaw === ""
  ) {
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

function resolveB2bSellerOfficeId(
  orderedOfficeIds: string[],
  requested: string | null
): string | null {
  const autoDefault =
    orderedOfficeIds.length >= 2
      ? orderedOfficeIds[1]!
      : orderedOfficeIds[0] ?? null;
  if (requested && orderedOfficeIds.includes(requested)) return requested;
  return autoDefault;
}

async function fetchProductHsns(
  productIds: string[]
): Promise<Map<string, string | null>> {
  if (productIds.length === 0) return new Map();
  const rows = await dbProduct
    .select({ id: products.id, hsnsac: products.hsnsac })
    .from(products)
    .where(inArray(products.id, productIds));
  return new Map(rows.map((p) => [p.id, p.hsnsac]));
}

function normalizeStateCode(code: unknown): string | null {
  if (code === null || code === undefined) return null;
  const s = String(code).trim();
  return s ? s : null;
}

function computeCombinedTaxTotals(
  orderRows: OrderForCombinedTotals[],
  officeStateCodeById: Map<string, string | null>
): { taxableAmount: number; igst: number; cgst: number; sgst: number } {
  let taxableAmount = 0;
  let igst = 0;
  let cgst = 0;
  let sgst = 0;

  for (const order of orderRows) {
    const officeStateCode = order.invoiceOfficeId
      ? normalizeStateCode(officeStateCodeById.get(order.invoiceOfficeId))
      : null;
    const supplyStateCode = normalizeStateCode(
      order.business?.billingAddress?.stateCode
    );
    const isIntraState =
      officeStateCode !== null &&
      supplyStateCode !== null &&
      officeStateCode === supplyStateCode;

    const buckets = aggregateOrderTaxBuckets(
      order.orderItems,
      order.shippingAmount
    );

    for (const [, v] of buckets) {
      taxableAmount += v.taxableAmount;
      const taxAmount = v.grossAmount - v.taxableAmount;
      if (isIntraState) {
        cgst += taxAmount / 2;
        sgst += taxAmount / 2;
      } else {
        igst += taxAmount;
      }
    }
  }

  return { taxableAmount, igst, cgst, sgst };
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
    const { start, end } = getOrderDateFilterForMonthYear(month, year);
    const segment = parseSegment(searchParams);
    const includeTotals = searchParams.get("includeTotals") !== "false";

    const allOfficesForSelect = await dbAdmin
      .select({
        id: offices.id,
        gstin: offices.gstin,
      })
      .from(offices)
      .orderBy(desc(offices.createdAt));
    const invoiceOfficesPayload = allOfficesForSelect.map((o) => ({
      id: o.id,
      gstin: o.gstin,
    }));
    const orderedOfficeIds = allOfficesForSelect.map((o) => o.id);
    const requestedSeller =
      searchParams.get("sellerOfficeId")?.trim() || null;
    const selectedInvoiceOfficeId = resolveB2bSellerOfficeId(
      orderedOfficeIds,
      requestedSeller
    );

    type OrderWhereCols = {
      orderDate: typeof orders.orderDate;
      businessId: typeof orders.businessId;
      status: typeof orders.status;
      invoiceOfficeId: typeof orders.invoiceOfficeId;
    };

    const officeEq = (o: OrderWhereCols) =>
      selectedInvoiceOfficeId
        ? eq(o.invoiceOfficeId, selectedInvoiceOfficeId)
        : sql`true`;

    const businessWhereCore = (o: OrderWhereCols) =>
      and(
        gte(o.orderDate, start),
        lte(o.orderDate, end),
        ne(o.status, "PENDING"),
        isNotNull(o.businessId),
        officeEq(o)
      );

    const personalWhereCore = (o: OrderWhereCols) =>
      and(
        gte(o.orderDate, start),
        lte(o.orderDate, end),
        ne(o.status, "PENDING"),
        isNull(o.businessId),
        officeEq(o)
      );

    let businessOrdersForTotals: OrderForCombinedTotals[] = [];
    let personalOrdersForTotals: OrderForCombinedTotals[] = [];

    if (includeTotals) {
      const [bizT, persT] = await Promise.all([
        dbUser.query.orders.findMany({
          where: (o) => businessWhereCore(o),
          columns: {
            invoiceOfficeId: true,
            shippingAmount: true,
          },
          with: {
            orderItems: true,
            business: {
              columns: { id: true },
              with: {
                billingAddress: { columns: { stateCode: true } },
              },
            },
          },
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
        }),
        dbUser.query.orders.findMany({
          where: (o) => personalWhereCore(o),
          columns: {
            invoiceOfficeId: true,
            shippingAmount: true,
          },
          with: {
            orderItems: true,
            business: {
              columns: { id: true },
              with: {
                billingAddress: { columns: { stateCode: true } },
              },
            },
          },
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
        }),
      ]);

      businessOrdersForTotals = bizT as OrderForCombinedTotals[];
      personalOrdersForTotals = persT as OrderForCombinedTotals[];
    }

    let businessOrders: OrderBusinessStandard[] | OrderBusinessHsn[] = [];
    let personalOrders: OrderPersonalStandard[] | OrderPersonalHsn[] = [];

    if (segment === "b2b") {
      businessOrders = (await dbUser.query.orders.findMany({
        where: (o) => businessWhereCore(o),
        with: {
          orderItems: true,
          user: {
            columns: {
              name: true,
            },
          },
          business: {
            columns: {
              gstNumber: true,
              businessName: true,
            },
          },
          shippingAddress: true,
        },
        orderBy: (o, { desc: d }) => [d(o.orderDate)],
      })) as OrderBusinessStandard[];
    } else if (segment === "b2c") {
      personalOrders = (await dbUser.query.orders.findMany({
        where: (o) => personalWhereCore(o),
        with: {
          orderItems: true,
          shippingAddress: true,
        },
        orderBy: (o, { desc: d }) => [d(o.orderDate)],
      })) as OrderPersonalStandard[];
    } else if (segment === "hsn-b2b") {
      businessOrders = (await dbUser.query.orders.findMany({
        where: (o) => businessWhereCore(o),
        with: {
          orderItems: true,
          user: {
            columns: {
              name: true,
            },
          },
          business: {
            columns: {
              gstNumber: true,
              businessName: true,
            },
            with: {
              billingAddress: { columns: { stateCode: true } },
            },
          },
          shippingAddress: true,
        },
        orderBy: (o, { desc: d }) => [d(o.orderDate)],
      })) as OrderBusinessHsn[];
    } else if (segment === "hsn-b2c") {
      personalOrders = (await dbUser.query.orders.findMany({
        where: (o) => personalWhereCore(o),
        with: {
          orderItems: true,
          shippingAddress: true,
          business: {
            columns: { id: true },
            with: {
              billingAddress: { columns: { stateCode: true } },
            },
          },
        },
        orderBy: (o, { desc: d }) => [d(o.orderDate)],
      })) as OrderPersonalHsn[];
    } else {
      const [b, p] = await Promise.all([
        dbUser.query.orders.findMany({
          where: (o) => businessWhereCore(o),
          with: {
            orderItems: true,
            user: {
              columns: {
                name: true,
              },
            },
            business: {
              columns: {
                gstNumber: true,
                businessName: true,
              },
            },
            shippingAddress: true,
          },
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
        }),
        dbUser.query.orders.findMany({
          where: (o) => personalWhereCore(o),
          with: {
            orderItems: true,
            shippingAddress: true,
          },
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
        }),
      ]);
      businessOrders = b as OrderBusinessStandard[];
      personalOrders = p as OrderPersonalStandard[];
    }

    const officeIds = [
      ...new Set(
        [
          ...businessOrders,
          ...personalOrders,
          ...businessOrdersForTotals,
          ...personalOrdersForTotals,
        ]
          .map((o) => o.invoiceOfficeId)
          .filter((oid): oid is string => Boolean(oid))
      ),
    ];
    const officeRows =
      officeIds.length > 0
        ? await dbAdmin
            .select({
              id: offices.id,
              gstin: offices.gstin,
              stateCode: offices.stateCode,
            })
            .from(offices)
            .where(inArray(offices.id, officeIds))
        : [];
    const officeStateCodeById = new Map(
      officeRows.map((o) => [o.id, o.stateCode])
    );

    let totals:
      | {
          taxableAmount: number;
          igst: number;
          cgst: number;
          sgst: number;
        }
      | undefined;

    if (includeTotals) {
      totals = computeCombinedTaxTotals(
        [...businessOrdersForTotals, ...personalOrdersForTotals],
        officeStateCodeById
      );
    }

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
        ordersRaw as unknown as OrderForHsn[],
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
            buyerGstin: order.business?.gstNumber?.trim() || null,
            invoiceNumber: order.InvoiceNumber,
            orderDate: order.orderDate.toISOString(),
            invoiceTotalRounded: Math.round(Number(invoiceTotal)),
            taxBreakdown: taxBreakdown.map((r) => ({
              taxPercent: r.taxPercent,
              grossAmount: r.grossAmount,
              taxableAmount: r.taxableAmount,
            })),
            customerLabel:
              order.business?.businessName?.trim() || order.user.name || "—",
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
        ...(includeTotals ? { totals } : {}),
        meta: {
          month,
          year,
          businessOrderCount: businessOrders.length,
          personalOrderCount: personalOrders.length,
          invoiceOffices: invoiceOfficesPayload,
          selectedInvoiceOfficeId,
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

import { NextRequest, NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";

import {
  parseMonthYearParams,
  parseStatusesParam,
} from "@/lib/build-orders-list-where";
import { dbAdmin, dbUser } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";
import { addresses, orderItems, orders, suppliers, users } from "@/lib/db/user-schema";
import {
  generateInvoiceNumber,
  generateOrderId,
  getFinancialYear,
  getFinancialYearStart,
} from "@/lib/order-helpers";
import {
  countOrdersListDrizzle,
  selectOrderIdsPageDrizzle,
} from "@/lib/orders-list-drizzle";
import { requireAdminApi } from "@/lib/require-admin";

// GET all orders
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
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");
    const orderType = searchParams.get("orderType");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const { month, year } = parseMonthYearParams(monthParam, yearParam);
    const statuses = parseStatusesParam(statusesParam);

    const listParams = {
      orderType,
      status,
      statuses,
      search,
      month,
      year,
    };

    const total = await countOrdersListDrizzle(listParams);
    const ids = await selectOrderIdsPageDrizzle(
      listParams,
      (safePage - 1) * safeLimit,
      safeLimit
    );

    if (ids.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: {
          total,
          page: safePage,
          limit: safeLimit,
          totalPages: Math.ceil(total / safeLimit),
        },
      });
    }

    const fullOrders = await dbUser.query.orders.findMany({
      where: inArray(orders.id, ids),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
            businessName: true,
            gstNumber: true,
            isBusinessAccount: true,
          },
        },
        shippingAddress: true,
        orderItems: true,
        supplier: true,
      },
    });

    const byId = new Map(fullOrders.map((o) => [o.id, o]));
    const data = ids.map((oid) => byId.get(oid)).filter(Boolean);

    return NextResponse.json({
      success: true,
      data,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

type CreateItemBody = {
  productId: string;
  quantity: number | string;
  price: number | string;
  tax?: number | string;
  discount?: number | string;
  customWeightItem?: boolean;
  customWeight?: number | string | null;
};

// POST create new order
export async function POST(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }
  try {
    const body = await request.json();
    const {
      customerId,
      addressId,
      items,
      deliveryCharge,
      deliveryPartner,
      deliveryPartnerName,
      invoiceType,
      invoiceOfficeId,
      isDifferentSupplier,
      supplierId,
      paymentMethod,
      status,
      orderDate,
      awsCode,
    } = body;

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: "Customer ID is required" },
        { status: 400 }
      );
    }

    if (!addressId) {
      return NextResponse.json(
        { success: false, error: "Address ID is required" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required" },
        { status: 400 }
      );
    }

    if (
      !invoiceType ||
      (invoiceType !== "PI" && invoiceType !== "TAX_INVOICE")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invoice type is required. Must be 'PI' or 'TAX_INVOICE'",
        },
        { status: 400 }
      );
    }

    if (!invoiceOfficeId) {
      return NextResponse.json(
        { success: false, error: "Invoice office is required" },
        { status: 400 }
      );
    }

    const [invoiceOffice] = await dbAdmin
      .select({ stateCode: offices.stateCode })
      .from(offices)
      .where(eq(offices.id, invoiceOfficeId))
      .limit(1);

    if (!invoiceOffice) {
      return NextResponse.json(
        { success: false, error: "Invoice office not found" },
        { status: 404 }
      );
    }

    const [customer] = await dbUser
      .select({ id: users.id, isBusinessAccount: users.isBusinessAccount })
      .from(users)
      .where(eq(users.id, customerId))
      .limit(1);

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    const [address] = await dbUser
      .select()
      .from(addresses)
      .where(eq(addresses.id, addressId))
      .limit(1);

    if (!address || address.userId !== customer.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Address not found or does not belong to customer",
        },
        { status: 404 }
      );
    }

    const generatedOrderId = await generateOrderId();

    let subtotal = 0;
    let totalDiscount = 0;

    for (const item of items as CreateItemBody[]) {
      const itemTotal = Number(item.price) * Number(item.quantity);
      const itemDiscount = Number(item.discount || 0);
      subtotal += itemTotal;
      totalDiscount += itemDiscount * Number(item.quantity);
    }

    const deliveryChargeAmount = deliveryCharge
      ? parseFloat(String(deliveryCharge))
      : 0;
    const grandTotal = subtotal + deliveryChargeAmount;
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    const now = new Date();
    const effectiveOrderDate = orderDate ? new Date(orderDate) : now;
    if (Number.isNaN(effectiveOrderDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid orderDate" },
        { status: 400 }
      );
    }
    const financialYear = getFinancialYear(effectiveOrderDate);
    const financialYearStart = getFinancialYearStart(effectiveOrderDate);
    const isBusinessAccount = customer.isBusinessAccount === true;

    const { invoiceNumber, sequenceNumber } = await generateInvoiceNumber(
      invoiceType,
      isBusinessAccount,
      financialYear,
      financialYearStart,
      invoiceOffice.stateCode
    );

    const invoiceData = {
      invoiceType: invoiceType as "PI" | "TAX_INVOICE",
      invoiceSequenceNumber: sequenceNumber,
      InvoiceNumber: invoiceNumber,
      roundedOffAmount: roundingOff,
      invoiceAmount: roundedTotal,
    };

    if (isDifferentSupplier && supplierId) {
      const [supplier] = await dbUser
        .select({ id: suppliers.id })
        .from(suppliers)
        .where(eq(suppliers.id, supplierId))
        .limit(1);

      if (!supplier) {
        return NextResponse.json(
          { success: false, error: "Supplier not found" },
          { status: 404 }
        );
      }
    }

    await dbUser.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: generatedOrderId,
        orderBy: customer.id,
        orderDate: effectiveOrderDate,
        status: (status || "PENDING") as typeof orders.$inferInsert.status,
        totalAmount: roundedTotal,
        discountAmount: totalDiscount,
        shippingAddressId: addressId,
        shippingAmount:
          deliveryChargeAmount > 0 ? deliveryChargeAmount : null,
        shippingCourierName:
          deliveryPartner === "OTHER"
            ? deliveryPartnerName
            : deliveryPartner || null,
        awsCode: awsCode ? String(awsCode).trim() || null : null,
        invoiceOfficeId,
        isDifferentSupplier: Boolean(isDifferentSupplier),
        supplierId:
          isDifferentSupplier && supplierId ? supplierId : null,
        paymentMethod: paymentMethod || null,
        packed: false,
        refund: false,
        customOrder: false,
        ...invoiceData,
      });

      await tx.insert(orderItems).values(
        (items as CreateItemBody[]).map((item) => ({
          orderId: generatedOrderId,
          productId: item.productId,
          quantity: parseInt(String(item.quantity), 10),
          price: parseFloat(String(item.price)),
          tax: parseInt(String(item.tax || 0), 10),
          discount: parseFloat(String(item.discount || 0)),
          customWeightItem: item.customWeightItem === true,
          customWeight:
            item.customWeightItem === true &&
            item.customWeight !== undefined &&
            item.customWeight !== null
              ? parseFloat(String(item.customWeight))
              : null,
        }))
      );
    });

    const order = await dbUser.query.orders.findFirst({
      where: eq(orders.id, generatedOrderId),
      with: {
        orderItems: true,
        shippingAddress: true,
        supplier: true,
        user: {
          columns: {
            name: true,
            email: true,
            phone: true,
            businessName: true,
            gstNumber: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Failed to load order" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          order,
          summary: {
            subtotal,
            totalDiscount,
            deliveryCharge: deliveryChargeAmount,
            grandTotal,
            roundedTotal,
            roundingOff,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

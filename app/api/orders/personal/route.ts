import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbAdmin, dbUser } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";
import { addresses, orderItems, orders, users } from "@/lib/db/user-schema";
import { generateInvoiceNumber, generateOrderId, getFinancialYear, getFinancialYearStart } from "@/lib/order-helpers";
import { requireAdminApi } from "@/lib/require-admin";

const PERSONAL_ORDER_BY_USER_ID = "US2026149";
const PERSONAL_SHIPPING_ADDRESS_ID = "cmoeietyc0001l704xuehp8rn";

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
    const { items, invoiceOfficeId, paymentMethod, orderDate } = body as {
      items: Array<{
        productId: string;
        quantity: number;
        price: number;
        tax: number;
        discount?: number;
        customWeightItem?: boolean;
        customWeight?: number | null;
      }>;
      invoiceOfficeId: string;
      paymentMethod: string | null;
      orderDate?: string | null;
    };

    if (!invoiceOfficeId) {
      return NextResponse.json(
        { success: false, error: "Invoice office is required" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required" },
        { status: 400 }
      );
    }

    const normalizedPayment = (paymentMethod || "").trim();
    const allowed = new Set(["cash", "PG_RZP"]);
    if (normalizedPayment && !allowed.has(normalizedPayment)) {
      return NextResponse.json(
        { success: false, error: "Invalid payment method" },
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

    const [orderByUser] = await dbUser
      .select({ id: users.id, isBusinessAccount: users.isBusinessAccount })
      .from(users)
      .where(eq(users.id, PERSONAL_ORDER_BY_USER_ID))
      .limit(1);
    if (!orderByUser) {
      return NextResponse.json(
        {
          success: false,
          error: `User '${PERSONAL_ORDER_BY_USER_ID}' not found`,
        },
        { status: 404 }
      );
    }

    const [personalAddress] = await dbUser
      .select({ id: addresses.id })
      .from(addresses)
      .where(eq(addresses.id, PERSONAL_SHIPPING_ADDRESS_ID))
      .limit(1);
    if (!personalAddress) {
      return NextResponse.json(
        {
          success: false,
          error: `Address '${PERSONAL_SHIPPING_ADDRESS_ID}' not found`,
        },
        { status: 404 }
      );
    }

    const generatedOrderId = await generateOrderId();

    let subtotal = 0;
    let totalDiscount = 0;
    for (const item of items) {
      const itemTotal = Number(item.price) * Number(item.quantity);
      const itemDiscount = Number(item.discount || 0);
      subtotal += itemTotal;
      totalDiscount += itemDiscount * Number(item.quantity);
    }

    const grandTotal = subtotal;
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    const effectiveOrderDate = orderDate ? new Date(orderDate) : new Date();
    if (!Number.isFinite(effectiveOrderDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid orderDate" },
        { status: 400 }
      );
    }

    const financialYear = getFinancialYear(effectiveOrderDate);
    const financialYearStart = getFinancialYearStart(effectiveOrderDate);

    const invoiceType: "TAX_INVOICE" = "TAX_INVOICE";
    const isBusinessAccount = orderByUser.isBusinessAccount === true;

    const { invoiceNumber, sequenceNumber } = await generateInvoiceNumber(
      invoiceType,
      isBusinessAccount,
      financialYear,
      financialYearStart,
      invoiceOffice.stateCode
    );

    const now = new Date();

    await dbUser.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: generatedOrderId,
        customOrder: true,
        orderBy: PERSONAL_ORDER_BY_USER_ID,
        orderDate: effectiveOrderDate,
        status: "DELIVERED",
        deliveredAt: effectiveOrderDate,
        totalAmount: roundedTotal,
        discountAmount: totalDiscount,
        shippingAddressId: PERSONAL_SHIPPING_ADDRESS_ID,
        shippingAmount: null,
        shippingCourierName: null,
        invoiceOfficeId,
        isDifferentSupplier: false,
        supplierId: null,
        paymentMethod: normalizedPayment || null,
        invoiceType,
        invoiceSequenceNumber: sequenceNumber,
        InvoiceNumber: invoiceNumber,
        roundedOffAmount: roundingOff,
        invoiceAmount: roundedTotal,
        packed: false,
        refund: false,
      });

      await tx.insert(orderItems).values(
        items.map((item) => ({
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
            isBusinessAccount: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          order,
          summary: {
            subtotal,
            totalDiscount,
            deliveryCharge: 0,
            grandTotal,
            roundedTotal,
            roundingOff,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating personal order:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

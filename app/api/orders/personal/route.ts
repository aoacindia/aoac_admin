import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";
import { requireAdminApi } from "@/lib/require-admin";

const PERSONAL_ORDER_BY_USER_ID = "US2026149";

// Helper function to get financial year in format YYYY(YY+1)
// Financial year in India: April 1 to March 31
// Example: April 1, 2025 to March 31, 2026 = FY 2025-26 = "202526"
function getFinancialYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1

  if (month >= 4) {
    const fyStart = year;
    const fyEnd = year + 1;
    return `${fyStart}${String(fyEnd).slice(-2)}`;
  }

  const fyStart = year - 1;
  const fyEnd = year;
  return `${fyStart}${String(fyEnd).slice(-2)}`;
}

function getFinancialYearStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 4) {
    return new Date(year, 3, 1); // Month 3 = April (0-indexed)
  }

  return new Date(year - 1, 3, 1); // Month 3 = April (0-indexed)
}

async function generateInvoiceNumber(
  invoiceType: "PI" | "TAX_INVOICE",
  isBusinessAccount: boolean,
  financialYear: string,
  financialYearStart: Date,
  invoiceOfficeStateCode?: string | number | null
): Promise<{ invoiceNumber: string; sequenceNumber: number }> {
  const prefix = invoiceType === "PI" ? "P" : isBusinessAccount ? "B" : "R";
  const normalizedStateCode =
    invoiceOfficeStateCode === null || invoiceOfficeStateCode === undefined
      ? ""
      : String(invoiceOfficeStateCode).trim();
  const stateCodeSegment =
    normalizedStateCode && normalizedStateCode !== "10" ? normalizedStateCode : "";
  const prefixAndFY = `${prefix}${stateCodeSegment}${financialYear}`;

  const lastInvoice = await userPrisma.order.findFirst({
    where: {
      invoiceType,
      InvoiceNumber: {
        startsWith: prefixAndFY,
      },
      orderDate: {
        gte: financialYearStart,
      },
    },
    orderBy: {
      orderDate: "desc",
    },
  });

  let nextSequenceNumber = 1;
  if (lastInvoice?.InvoiceNumber) {
    const invoiceNumber = lastInvoice.InvoiceNumber;
    if (invoiceNumber.startsWith(prefixAndFY)) {
      const sequenceStr = invoiceNumber.substring(prefixAndFY.length);
      const lastSequence = parseInt(sequenceStr, 10);
      if (!Number.isNaN(lastSequence)) {
        nextSequenceNumber = lastSequence + 1;
      }
    }
  }

  return {
    invoiceNumber: `${prefixAndFY}${nextSequenceNumber}`,
    sequenceNumber: nextSequenceNumber,
  };
}

async function generateOrderId(): Promise<string> {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  const dateStr = `${day}${month}${year}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeStr = `${hours}${minutes}${seconds}`;

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  const lastOrder = await userPrisma.order.findFirst({
    where: {
      orderDate: { gte: todayStart, lte: todayEnd },
      id: { startsWith: `ODR-${dateStr}-` },
    },
    orderBy: { orderDate: "desc" },
  });

  let serialNumber = 1;
  if (lastOrder?.id) {
    const parts = lastOrder.id.split("-");
    if (parts.length === 4 && parts[0] === "ODR") {
      const lastSerial = parseInt(parts[3], 10);
      if (!Number.isNaN(lastSerial)) {
        serialNumber = lastSerial + 1;
      }
    }
  }

  let padding = 4;
  if (serialNumber > 99999) padding = 6;
  else if (serialNumber > 9999) padding = 5;

  const serialStr = String(serialNumber).padStart(padding, "0");
  return `ODR-${dateStr}-${timeStr}-${serialStr}`;
}

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
    const { items, invoiceOfficeId, paymentMethod } = body as {
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

    const invoiceOffice = await adminPrisma.office.findUnique({
      where: { id: invoiceOfficeId },
      select: { stateCode: true },
    });
    if (!invoiceOffice) {
      return NextResponse.json(
        { success: false, error: "Invoice office not found" },
        { status: 404 }
      );
    }

    const orderByUser = await userPrisma.user.findUnique({
      where: { id: PERSONAL_ORDER_BY_USER_ID },
      select: { id: true, isBusinessAccount: true },
    });
    if (!orderByUser) {
      return NextResponse.json(
        { success: false, error: `User '${PERSONAL_ORDER_BY_USER_ID}' not found` },
        { status: 404 }
      );
    }

    const generatedOrderId = await generateOrderId();

    // Calculate totals (same rules as /api/orders: do not round intermediate values)
    let subtotal = 0;
    let totalDiscount = 0;
    for (const item of items) {
      const itemTotal = Number(item.price) * Number(item.quantity);
      const itemDiscount = Number(item.discount || 0);
      subtotal += itemTotal;
      totalDiscount += itemDiscount * Number(item.quantity);
    }

    const grandTotal = subtotal - totalDiscount;
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    const now = new Date();
    const financialYear = getFinancialYear(now);
    const financialYearStart = getFinancialYearStart(now);

    const invoiceType: "TAX_INVOICE" = "TAX_INVOICE";
    const isBusinessAccount = orderByUser.isBusinessAccount === true;

    const { invoiceNumber, sequenceNumber } = await generateInvoiceNumber(
      invoiceType,
      isBusinessAccount,
      financialYear,
      financialYearStart,
      invoiceOffice.stateCode
    );

    const order = await userPrisma.order.create({
      data: {
        id: generatedOrderId,
        customOrder: true,
        orderBy: PERSONAL_ORDER_BY_USER_ID,
        orderDate: now,
        status: "DELIVERED",
        deliveredAt: now,
        totalAmount: roundedTotal,
        discountAmount: totalDiscount,
        shippingAddressId: null,
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
        orderItems: {
          create: items.map((item) => ({
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
          })),
        },
      },
      include: {
        orderItems: true,
        shippingAddress: true,
        supplier: true,
        user: {
          select: {
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
  } catch (error: any) {
    console.error("Error creating personal order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


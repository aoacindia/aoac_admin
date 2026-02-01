import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";

// Helper function to get financial year in format YYYY(YY+1)
// Financial year in India: April 1 to March 31
// Example: April 1, 2025 to March 31, 2026 = FY 2025-26 = "202526"
function getFinancialYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  
  // If month is April (4) or later, financial year starts from current year
  // If month is January-March (1-3), financial year started from previous year
  if (month >= 4) {
    // FY 2025-26: April 2025 to March 2026
    const fyStart = year;
    const fyEnd = year + 1;
    return `${fyStart}${String(fyEnd).slice(-2)}`;
  } else {
    // FY 2024-25: April 2024 to March 2025
    const fyStart = year - 1;
    const fyEnd = year;
    return `${fyStart}${String(fyEnd).slice(-2)}`;
  }
}

// Helper function to get financial year start date
function getFinancialYearStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  
  if (month >= 4) {
    // Current FY started in April of current year
    return new Date(year, 3, 1); // Month 3 = April (0-indexed)
  } else {
    // Current FY started in April of previous year
    return new Date(year - 1, 3, 1); // Month 3 = April (0-indexed)
  }
}

// Helper function to generate invoice number
// Format:
// - PI: P2025261, P2025262, etc. (state code 10)
// - TAX_INVOICE Business: B2025261, B2025262, etc. (state code 10)
// - TAX_INVOICE Non-business: R2025261, R2025262, etc. (state code 10)
// - Other states: add state code after prefix, ex: P122025261, B092025261
async function generateInvoiceNumber(
  invoiceType: "PI" | "TAX_INVOICE",
  isBusinessAccount: boolean,
  financialYear: string,
  financialYearStart: Date,
  invoiceOfficeStateCode?: string | number | null
): Promise<{ invoiceNumber: string; sequenceNumber: number }> {
  // For PI, use "P" prefix regardless of customer type
  // For TAX_INVOICE, use "B" for business or "R" for non-business
  const prefix = invoiceType === "PI" ? "P" : (isBusinessAccount ? "B" : "R");
  const normalizedStateCode =
    invoiceOfficeStateCode === null || invoiceOfficeStateCode === undefined
      ? ""
      : String(invoiceOfficeStateCode).trim();
  const stateCodeSegment =
    normalizedStateCode && normalizedStateCode !== "10"
      ? normalizedStateCode
      : "";
  const prefixAndFY = `${prefix}${stateCodeSegment}${financialYear}`;

  // Find the last invoice for this invoice type and prefix/state in the current financial year
  const lastInvoice = await userPrisma.order.findFirst({
    where: {
      invoiceType: invoiceType,
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
    // Extract sequence from invoice number
    // Format:
    // - State 10: P2025261, B2025261, or R2025261
    // - Other states: P122025261, B092025261, etc.
    // Extract the last part (sequence)
    const invoiceNumber = lastInvoice.InvoiceNumber;
    if (invoiceNumber.startsWith(prefixAndFY)) {
      const sequenceStr = invoiceNumber.substring(prefixAndFY.length);
      const lastSequence = parseInt(sequenceStr, 10);
      if (!isNaN(lastSequence)) {
        nextSequenceNumber = lastSequence + 1;
      }
    }
  }

  // Format sequence without padding (just the number)
  const invoiceNumber = `${prefixAndFY}${nextSequenceNumber}`;

  return { invoiceNumber, sequenceNumber: nextSequenceNumber };
}

// Helper function to generate order ID: ODR-DDMMYYYY-HHMMSS-XXXX
async function generateOrderId(): Promise<string> {
  const now = new Date();
  
  // Format: DDMMYYYY
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  const dateStr = `${day}${month}${year}`;
  
  // Format: HHMMSS (current timestamp)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeStr = `${hours}${minutes}${seconds}`;
  
  // Get start and end of today
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  
  // Find the last order of today
  // Check if order ID follows the ODR format
  const lastOrder = await userPrisma.order.findFirst({
    where: {
      orderDate: {
        gte: todayStart,
        lte: todayEnd,
      },
      id: {
        startsWith: `ODR-${dateStr}-`,
      },
    },
    orderBy: {
      orderDate: "desc",
    },
  });
  
  // Extract serial number from last order or start from 1
  let serialNumber = 1;
  if (lastOrder?.id) {
    const parts = lastOrder.id.split("-");
    if (parts.length === 4 && parts[0] === "ODR") {
      const lastSerial = parseInt(parts[3]);
      if (!isNaN(lastSerial)) {
        serialNumber = lastSerial + 1;
      }
    }
  }
  
  // Determine padding based on serial number
  // If serial number exceeds 9999, use 5 digits, otherwise 4
  // Can extend to 6 digits if needed (99999)
  let padding = 4;
  if (serialNumber > 99999) {
    padding = 6;
  } else if (serialNumber > 9999) {
    padding = 5;
  }
  
  const serialStr = String(serialNumber).padStart(padding, "0");
  
  return `ODR-${dateStr}-${timeStr}-${serialStr}`;
}

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const where: any = {};

    if (search) {
      where.OR = [
        { id: { contains: search } },
        { InvoiceNumber: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
        { user: { businessName: { contains: search } } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const orders = await userPrisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            businessName: true,
            gstNumber: true,
          },
        },
        shippingAddress: true,
        orderItems: true,
      },
      orderBy: {
        orderDate: "desc",
      },
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      addressId,
      items,
      deliveryCharge,
      deliveryPartner,
      deliveryPartnerName,
      invoiceType, // Required - for creating invoice along with order
      invoiceOfficeId,
      isDifferentSupplier,
      supplierId,
      paymentMethod,
      status,
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

    if (!invoiceType || (invoiceType !== "PI" && invoiceType !== "TAX_INVOICE")) {
      return NextResponse.json(
        { success: false, error: "Invoice type is required. Must be 'PI' or 'TAX_INVOICE'" },
        { status: 400 }
      );
    }

    if (!invoiceOfficeId) {
      return NextResponse.json(
        { success: false, error: "Invoice office is required" },
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

    // Verify customer exists and get business account status
    const customer = await userPrisma.user.findUnique({
      where: { id: customerId },
      select: { id: true, isBusinessAccount: true },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    // Verify address exists and belongs to customer
    const address = await userPrisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== customer.id) {
      return NextResponse.json(
        { success: false, error: "Address not found or does not belong to customer" },
        { status: 404 }
      );
    }

    // Generate order ID (will be used as the id field)
    const generatedOrderId = await generateOrderId();

    // Calculate totals
    // IMPORTANT: Do NOT round intermediate values - maintain full precision for all item-level calculations
    let subtotal = 0;
    let totalDiscount = 0;

    for (const item of items) {
      // Maintain full precision - no rounding for item calculations
      const itemTotal = item.price * item.quantity;
      const itemDiscount = item.discount || 0;
      subtotal += itemTotal;
      totalDiscount += itemDiscount * item.quantity;
    }

    const deliveryChargeAmount = deliveryCharge ? parseFloat(deliveryCharge) : 0;
    // Maintain full precision until final calculation
    const grandTotal = subtotal - totalDiscount + deliveryChargeAmount;
    // ONLY round the final total - this is the only place rounding should occur
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    // Handle invoice generation (required)
    const now = new Date();
    const financialYear = getFinancialYear(now);
    const financialYearStart = getFinancialYearStart(now);
    
    // Determine if customer is business or non-business
    const isBusinessAccount = customer.isBusinessAccount === true;

    // Generate invoice number:
    // - PI: P prefix (separate sequence)
    // - TAX_INVOICE: B prefix (business) or R prefix (non-business)
    const { invoiceNumber, sequenceNumber } = await generateInvoiceNumber(
      invoiceType,
      isBusinessAccount,
      financialYear,
      financialYearStart,
      invoiceOffice.stateCode
    );

    const invoiceData = {
      invoiceType: invoiceType,
      invoiceSequenceNumber: sequenceNumber,
      InvoiceNumber: invoiceNumber,
      roundedOffAmount: roundingOff,
      invoiceAmount: roundedTotal,
    };

    // Verify supplier if different supplier is selected
    if (isDifferentSupplier && supplierId) {
      const supplier = await userPrisma.supplier.findUnique({
        where: { id: supplierId },
      });

      if (!supplier) {
        return NextResponse.json(
          { success: false, error: "Supplier not found" },
          { status: 404 }
        );
      }
    }

    // Create order
    const order = await userPrisma.order.create({
      data: {
        id: generatedOrderId,
        orderBy: customer.id,
        orderDate: new Date(),
        status: status || "PENDING",
        totalAmount: roundedTotal,
        discountAmount: totalDiscount,
        shippingAddressId: addressId,
        shippingAmount: deliveryChargeAmount > 0 ? deliveryChargeAmount : null,
        shippingCourierName:
          deliveryPartner === "OTHER"
            ? deliveryPartnerName
            : deliveryPartner || null,
        invoiceOfficeId,
        isDifferentSupplier: isDifferentSupplier || false,
        supplierId: isDifferentSupplier && supplierId ? supplierId : null,
        paymentMethod: paymentMethod || null,
        ...invoiceData,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price), // Total price with tax included
            tax: parseInt(item.tax || 0),
            discount: parseFloat(item.discount || 0),
          })),
        },
      },
      include: {
        orderItems: true,
        shippingAddress: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            businessName: true,
            gstNumber: true,
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
            deliveryCharge: deliveryChargeAmount,
            grandTotal,
            roundedTotal,
            roundingOff,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


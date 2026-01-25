import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

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
// - PI: P2025261, P2025262, etc. (separate sequence for all PI invoices)
// - TAX_INVOICE Business: B2025261, B2025262, etc.
// - TAX_INVOICE Non-business: R2025261, R2025262, etc.
async function generateInvoiceNumber(
  invoiceType: "PI" | "TAX_INVOICE",
  isBusinessAccount: boolean,
  financialYear: string,
  financialYearStart: Date
): Promise<{ invoiceNumber: string; sequenceNumber: number }> {
  // For PI, use "P" prefix regardless of customer type
  // For TAX_INVOICE, use "B" for business or "R" for non-business
  const prefix = invoiceType === "PI" ? "P" : (isBusinessAccount ? "B" : "R");
  
  // Find the last invoice for this invoice type and prefix in the current financial year
  const lastInvoice = await userPrisma.order.findFirst({
    where: {
      invoiceType: invoiceType,
      InvoiceNumber: {
        startsWith: prefix,
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
    // Format: P2025261, B2025261, or R2025261
    // Extract the last part (sequence)
    const invoiceNumber = lastInvoice.InvoiceNumber;
    // Remove prefix and financial year (e.g., "P202526", "B202526", or "R202526")
    const prefixAndFY = `${prefix}${financialYear}`;
    if (invoiceNumber.startsWith(prefixAndFY)) {
      const sequenceStr = invoiceNumber.substring(prefixAndFY.length);
      const lastSequence = parseInt(sequenceStr, 10);
      if (!isNaN(lastSequence)) {
        nextSequenceNumber = lastSequence + 1;
      }
    }
  }

  // Format sequence without padding (just the number)
  const invoiceNumber = `${prefix}${financialYear}${nextSequenceNumber}`;

  return { invoiceNumber, sequenceNumber: nextSequenceNumber };
}

// GET order by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const order = await userPrisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
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

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update order
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      items,
      deliveryCharge,
      deliveryPartner,
      deliveryPartnerName,
      addressId,
      invoiceType, // Optional - for updating invoice
      paymentMethod,
      status,
      orderDate,
      isDifferentSupplier,
      supplierId,
    } = body;

    // Get existing order with customer info
    const existingOrder = await userPrisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        user: {
          select: {
            id: true,
            isBusinessAccount: true,
          },
        },
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Calculate totals if items are provided
    // IMPORTANT: Do NOT round intermediate values - maintain full precision for all item-level calculations
    let updateData: any = {};
    
    if (items && Array.isArray(items) && items.length > 0) {
      let subtotal = 0;
      let totalDiscount = 0;

      // IMPORTANT: Maintain full precision - no rounding for item calculations
      for (const item of items) {
        const itemTotal = item.price * item.quantity;
        const itemDiscount = item.discount || 0;
        subtotal += itemTotal;
        totalDiscount += itemDiscount * item.quantity;
      }

      const deliveryChargeAmount = deliveryCharge ? parseFloat(deliveryCharge) : existingOrder.shippingAmount || 0;
      // Maintain full precision until final calculation
      const grandTotal = subtotal - totalDiscount + deliveryChargeAmount;
      // ONLY round the final total - this is the only place rounding should occur
      const roundedTotal = Math.round(grandTotal);
      const roundingOff = roundedTotal - grandTotal;

      updateData.totalAmount = roundedTotal;
      updateData.discountAmount = totalDiscount;
      updateData.shippingAmount = deliveryChargeAmount > 0 ? deliveryChargeAmount : null;
      
      // Update invoice amounts if invoice exists
      if (existingOrder.invoiceType) {
        updateData.roundedOffAmount = roundingOff;
        updateData.invoiceAmount = roundedTotal;
      }
    }

    if (deliveryPartner !== undefined) {
      updateData.shippingCourierName =
        deliveryPartner === "OTHER"
          ? deliveryPartnerName
          : deliveryPartner || null;
    }

    if (addressId) {
      updateData.shippingAddressId = addressId;
    }

    if (paymentMethod !== undefined) {
      updateData.paymentMethod = paymentMethod || null;
    }

    if (status !== undefined) {
      updateData.status = status || "PENDING";
    }

    if (orderDate) {
      const parsedOrderDate = new Date(orderDate);
      if (!Number.isNaN(parsedOrderDate.getTime())) {
        updateData.orderDate = parsedOrderDate;
      }
    }

    if (isDifferentSupplier !== undefined) {
      updateData.isDifferentSupplier = isDifferentSupplier || false;
      updateData.supplierId = isDifferentSupplier && supplierId ? supplierId : null;
    } else if (supplierId !== undefined) {
      // If only supplierId is provided, update it
      updateData.supplierId = supplierId || null;
    }

    // Handle invoice type update if provided
    if (invoiceType && (invoiceType === "PI" || invoiceType === "TAX_INVOICE")) {
      // Generate new invoice if order doesn't have one OR if invoice type is being changed
      const isInvoiceTypeChanging = existingOrder.invoiceType && existingOrder.invoiceType !== invoiceType;
      
      if (!existingOrder.invoiceType || isInvoiceTypeChanging) {
        const now = new Date();
        const financialYear = getFinancialYear(now);
        const financialYearStart = getFinancialYearStart(now);
        
        // Determine if customer is business or non-business
        const isBusinessAccount = existingOrder.user.isBusinessAccount === true;

        // Generate invoice number:
        // - PI: P prefix (separate sequence)
        // - TAX_INVOICE: B prefix (business) or R prefix (non-business)
        const { invoiceNumber, sequenceNumber } = await generateInvoiceNumber(
          invoiceType,
          isBusinessAccount,
          financialYear,
          financialYearStart
        );

        updateData.invoiceType = invoiceType;
        updateData.invoiceSequenceNumber = sequenceNumber;
        updateData.InvoiceNumber = invoiceNumber;
      }
    }

    // Update order
    const order = await userPrisma.order.update({
      where: { id },
      data: updateData,
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
    });

    // Update order items if provided
    if (items && Array.isArray(items) && items.length > 0) {
      // Delete existing items
      await userPrisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      // Create new items
      await userPrisma.orderItem.createMany({
        data: items.map((item: any) => ({
          orderId: id,
          productId: item.productId,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          tax: parseInt(item.tax || 0), // Include tax field
          discount: parseFloat(item.discount || 0),
        })),
      });

      // Fetch updated order with new items
      const updatedOrder = await userPrisma.order.findUnique({
        where: { id },
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
      });

      return NextResponse.json({ success: true, data: updatedOrder });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



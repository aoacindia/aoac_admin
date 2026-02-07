import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";
import { productPrisma } from "@/lib/product-prisma";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let copies: string[] = [];
    try {
      const body = await request.json();
      if (Array.isArray(body?.copies)) {
        copies = body.copies;
      }
    } catch {
      copies = [];
    }
    
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
            hasAdditionalTradeName: true,
            additionalTradeName: true,
            billingAddress: true,
          },
        },
        shippingAddress: true,
        supplier: true,
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const invoiceOffice = order.invoiceOfficeId
      ? await adminPrisma.office.findUnique({
          where: { id: order.invoiceOfficeId },
          select: {
            id: true,
            gstin: true,
            address: true,
          city: true,
            state: true,
            stateCode: true,
            pincode: true,
            country: true,
          },
        })
      : null;
    const normalizedInvoiceOffice = invoiceOffice
      ? {
          ...invoiceOffice,
          pincode: invoiceOffice.pincode ?? "",
          country: invoiceOffice.country ?? "",
        }
      : null;

    // Fetch product details for each order item
    const orderItemsWithProducts = await Promise.all(
      order.orderItems.map(async (item) => {
        try {
          const product = await productPrisma.product.findUnique({
            where: { id: item.productId },
            select: {
              name: true,
              hsnsac: true,
              weight: true,
            },
          });
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight: typeof item.customWeight === "number" ? item.customWeight : null,
            productName: product?.name || `Product ${item.productId}`,
            hsnsac: product?.hsnsac || "-",
            weight: product?.weight ?? null,
          };
        } catch (error) {
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight: typeof item.customWeight === "number" ? item.customWeight : null,
            productName: `Product ${item.productId}`,
            hsnsac: "-",
            weight: null,
          };
        }
      })
    );

    // Create order object with product details
    const orderWithProducts = {
      ...order,
      orderItems: orderItemsWithProducts,
      invoiceOffice: normalizedInvoiceOffice,
    };

    // Generate PDF
    const allowedCopies = new Set(["original", "duplicate", "triplicate"]);
    const normalizedCopies = copies.filter((copy) => allowedCopies.has(copy));
    const pdfBuffer = await generateInvoicePDF(
      orderWithProducts,
      normalizedCopies.length ? (normalizedCopies as any) : undefined
    );

    // Convert Uint8Array to Buffer for NextResponse
    const buffer = Buffer.from(pdfBuffer);

    // Return PDF as response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${order.InvoiceNumber || order.id}-${Date.now()}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("Error generating invoice PDF:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


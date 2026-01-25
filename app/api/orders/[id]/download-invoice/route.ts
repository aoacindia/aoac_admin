import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { productPrisma } from "@/lib/product-prisma";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export async function POST(
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
            productName: product?.name || `Product ${item.productId}`,
            hsnsac: product?.hsnsac || "-",
            weight: product?.weight || null,
          };
        } catch (error) {
          return {
            ...item,
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
    };

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(orderWithProducts);

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


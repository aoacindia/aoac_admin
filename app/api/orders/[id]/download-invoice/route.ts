import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { generateInvoicePDF, generateOrderItemsPDF } from "@/lib/pdf-generator";
import { dbAdmin, dbProduct, dbUser } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";
import { products } from "@/lib/db/product-schema";
import { orders } from "@/lib/db/user-schema";
import { requireAdminApi } from "@/lib/require-admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }
  try {
    const { id } = await params;
    let copies: string[] = [];
    let downloadItemsOnly = false;
    try {
      const body = await request.json();
      if (Array.isArray(body?.copies)) {
        copies = body.copies;
      }
      if (body?.downloadItemsOnly === true) {
        downloadItemsOnly = true;
      }
    } catch {
      copies = [];
    }
    
    const order = await dbUser.query.orders.findFirst({
      where: eq(orders.id, id),
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
            hasAdditionalTradeName: true,
            additionalTradeName: true,
          },
          with: {
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
      ? await dbAdmin
          .select({
            id: offices.id,
            gstin: offices.gstin,
            address: offices.address,
            city: offices.city,
            state: offices.state,
            stateCode: offices.stateCode,
            pincode: offices.pincode,
            country: offices.country,
          })
          .from(offices)
          .where(eq(offices.id, order.invoiceOfficeId))
          .limit(1)
          .then((r) => r[0] ?? null)
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
          const [product] = await dbProduct
            .select({
              name: products.name,
              hsnsac: products.hsnsac,
              weight: products.weight,
            })
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1);
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight:
              typeof item.customWeight === "number" ? item.customWeight : null,
            productName: product?.name || `Product ${item.productId}`,
            hsnsac: product?.hsnsac || "-",
            weight: product?.weight ?? null,
          };
        } catch {
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight:
              typeof item.customWeight === "number" ? item.customWeight : null,
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
    const pdfBuffer = downloadItemsOnly
      ? await generateOrderItemsPDF(orderWithProducts as any)
      : await (async () => {
          const allowedCopies = new Set(["original", "duplicate", "triplicate"]);
          const normalizedCopies = copies.filter((copy) => allowedCopies.has(copy));
          return generateInvoicePDF(
            orderWithProducts as any,
            normalizedCopies.length ? (normalizedCopies as any) : undefined
          );
        })();

    // Convert Uint8Array to Buffer for NextResponse
    const buffer = Buffer.from(pdfBuffer);

    // Return PDF as response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          downloadItemsOnly ? "order-items" : "invoice"
        }-${order.InvoiceNumber || order.id}-${Date.now()}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error("Error generating invoice PDF:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}


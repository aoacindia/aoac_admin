import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { dbAdmin, dbProduct, dbUser } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";
import { products } from "@/lib/db/product-schema";
import {
  businesses,
  orderItems,
  orders,
} from "@/lib/db/user-schema";
import {
  generateInvoiceNumber,
  getFinancialYear,
  getFinancialYearStart,
} from "@/lib/order-helpers";
import { requireAdminApi } from "@/lib/require-admin";

const orderUserColumns = {
  id: true,
  name: true,
  email: true,
  phone: true,
} as const;

const orderBusinessWith = {
  columns: {
    id: true,
    businessName: true,
    gstNumber: true,
    hasAdditionalTradeName: true,
    additionalTradeName: true,
  },
  with: { billingAddress: true },
} as const;

// GET order by id
export async function GET(
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

    const order = await dbUser.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        user: { columns: orderUserColumns },
        business: orderBusinessWith,
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

    const orderItemsEnriched = await Promise.all(
      order.orderItems.map(async (item) => {
        let productName = "Unknown Product";
        let weightInGrams: number | null = null;
        try {
          const [product] = await dbProduct
            .select({ name: products.name, weight: products.weight })
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1);
          if (product) {
            productName = product.name;
            if (item.customWeightItem === true && item.customWeight != null) {
              weightInGrams = item.customWeight;
            } else if (product.weight != null) {
              weightInGrams = product.weight;
            }
          }
        } catch {
          // keep defaults
        }
        return {
          ...item,
          productName,
          weightInGrams,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        orderItems: orderItemsEnriched,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching order:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

type UpdateItemBody = {
  productId: string;
  quantity: number | string;
  price: number | string;
  tax?: number | string;
  discount?: number | string;
  customWeightItem?: boolean;
  customWeight?: number | string | null;
};

// PUT update order
export async function PUT(
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
    const body = await request.json();
    const {
      items,
      deliveryCharge,
      deliveryPartner,
      deliveryPartnerName,
      addressId,
      invoiceType,
      invoiceOfficeId,
      paymentMethod,
      status,
      orderDate,
      isDifferentSupplier,
      supplierId,
      packed,
      refund,
      customOrder,
      paidAmount,
      r_orderId,
      r_paymentId,
      paymentLinkUrl,
      paymentVpa,
      courierId,
      shippingId,
      awsCode,
      shippingInvoiceNumber,
      InvoiceNumber,
      estimatedDeliveryDate,
      pickupScheduled,
      deliveredAt,
      manifestGenerated,
      refundId,
      refundReceipt,
      refundArn,
      refundCreatedAt,
      businessId,
      isBillToSameAsShipping,
    } = body;

    const [existingOrder] = await dbUser
      .select({
        invoiceType: orders.invoiceType,
        invoiceOfficeId: orders.invoiceOfficeId,
        shippingAmount: orders.shippingAmount,
        userId: orders.orderBy,
        businessId: orders.businessId,
      })
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    type OrderPatch = Partial<typeof orders.$inferInsert>;
    const updateValues: OrderPatch = {};

    if (businessId !== undefined) {
      if (businessId === null || businessId === "") {
        updateValues.businessId = null;
      } else {
        const [business] = await dbUser
          .select({ id: businesses.id })
          .from(businesses)
          .where(
            and(
              eq(businesses.id, businessId),
              eq(businesses.userId, existingOrder.userId)
            )
          )
          .limit(1);
        if (!business) {
          return NextResponse.json(
            {
              success: false,
              error: "Business not found or does not belong to customer",
            },
            { status: 404 }
          );
        }
        updateValues.businessId = business.id;
      }
    }

    if (isBillToSameAsShipping !== undefined) {
      updateValues.isBillToSameAsShipping = Boolean(isBillToSameAsShipping);
    }

    if (items && Array.isArray(items) && items.length > 0) {
      let subtotal = 0;
      let totalDiscount = 0;

      for (const item of items as UpdateItemBody[]) {
        const itemTotal = Number(item.price) * Number(item.quantity);
        const itemDiscount = Number(item.discount || 0);
        subtotal += itemTotal;
        totalDiscount += itemDiscount * Number(item.quantity);
      }

      const deliveryChargeAmount = deliveryCharge
        ? parseFloat(String(deliveryCharge))
        : existingOrder.shippingAmount || 0;
      const grandTotal = subtotal + deliveryChargeAmount;
      const roundedTotal = Math.round(grandTotal);
      const roundingOff = roundedTotal - grandTotal;

      updateValues.totalAmount = roundedTotal;
      updateValues.discountAmount = totalDiscount;
      updateValues.shippingAmount =
        deliveryChargeAmount > 0 ? deliveryChargeAmount : null;

      if (existingOrder.invoiceType) {
        updateValues.roundedOffAmount = roundingOff;
        updateValues.invoiceAmount = roundedTotal;
      }
    }

    if (deliveryPartner !== undefined) {
      updateValues.shippingCourierName =
        deliveryPartner === "OTHER"
          ? deliveryPartnerName
          : deliveryPartner || null;
    }

    if (addressId) {
      updateValues.shippingAddressId = addressId;
    }

    if (paymentMethod !== undefined) {
      updateValues.paymentMethod = paymentMethod || null;
    }

    if (invoiceOfficeId !== undefined) {
      updateValues.invoiceOfficeId = invoiceOfficeId || null;
    }

    if (status !== undefined) {
      updateValues.status = status || "PENDING";
    }

    if (orderDate) {
      const parsedOrderDate = new Date(orderDate);
      if (!Number.isNaN(parsedOrderDate.getTime())) {
        updateValues.orderDate = parsedOrderDate;
      }
    }

    if (isDifferentSupplier !== undefined) {
      updateValues.isDifferentSupplier = Boolean(isDifferentSupplier);
      updateValues.supplierId =
        isDifferentSupplier && supplierId ? supplierId : null;
    } else if (supplierId !== undefined) {
      updateValues.supplierId = supplierId || null;
    }

    if (packed !== undefined) {
      updateValues.packed = packed === true;
    }
    if (refund !== undefined) {
      updateValues.refund = refund === true;
    }
    if (customOrder !== undefined) {
      updateValues.customOrder = customOrder === true;
    }
    if (manifestGenerated !== undefined) {
      updateValues.manifestGenerated = manifestGenerated === true;
    }

    if (paidAmount !== undefined) {
      if (paidAmount === null || paidAmount === "") {
        updateValues.paidAmount = null;
      } else {
        const parsed = parseFloat(String(paidAmount));
        if (!Number.isFinite(parsed)) {
          return NextResponse.json(
            { success: false, error: "Invalid paid amount" },
            { status: 400 }
          );
        }
        updateValues.paidAmount = parsed;
      }
    }
    if (r_orderId !== undefined) {
      updateValues.r_orderId = r_orderId || null;
    }
    if (r_paymentId !== undefined) {
      updateValues.r_paymentId = r_paymentId || null;
    }
    if (paymentLinkUrl !== undefined) {
      updateValues.paymentLinkUrl = paymentLinkUrl || null;
    }
    if (paymentVpa !== undefined) {
      updateValues.paymentVpa = paymentVpa || null;
    }

    if (courierId !== undefined) {
      updateValues.courierId =
        courierId !== null && courierId !== ""
          ? parseInt(String(courierId), 10)
          : null;
    }
    if (shippingId !== undefined) {
      updateValues.shippingId = shippingId || null;
    }
    if (awsCode !== undefined) {
      updateValues.awsCode = awsCode || null;
    }
    if (shippingInvoiceNumber !== undefined) {
      updateValues.shippingInvoiceNumber = shippingInvoiceNumber || null;
    }
    if (InvoiceNumber !== undefined) {
      if (authResult.session.user.role !== "ADMIN") {
        return NextResponse.json(
          {
            success: false,
            error: "Only ADMIN users can change the invoice number",
          },
          { status: 403 }
        );
      }
      const trimmedInvoiceNumber =
        typeof InvoiceNumber === "string" ? InvoiceNumber.trim() : "";
      if (!trimmedInvoiceNumber) {
        return NextResponse.json(
          { success: false, error: "Invoice number is required" },
          { status: 400 }
        );
      }
      updateValues.InvoiceNumber = trimmedInvoiceNumber;
    }
    if (estimatedDeliveryDate !== undefined) {
      updateValues.estimatedDeliveryDate = estimatedDeliveryDate || null;
    }
    if (
      pickupScheduled !== undefined &&
      pickupScheduled !== null &&
      pickupScheduled !== ""
    ) {
      const parsedPickupScheduled = new Date(pickupScheduled);
      if (!Number.isNaN(parsedPickupScheduled.getTime())) {
        updateValues.pickupScheduled = parsedPickupScheduled;
      }
    }
    if (
      deliveredAt !== undefined &&
      deliveredAt !== null &&
      deliveredAt !== ""
    ) {
      const parsedDeliveredAt = new Date(deliveredAt);
      if (!Number.isNaN(parsedDeliveredAt.getTime())) {
        updateValues.deliveredAt = parsedDeliveredAt;
      }
    }

    if (refundId !== undefined) {
      updateValues.refundId = refundId || null;
    }
    if (refundReceipt !== undefined) {
      updateValues.refundReceipt = refundReceipt || null;
    }
    if (refundArn !== undefined) {
      updateValues.refundArn = refundArn || null;
    }
    if (
      refundCreatedAt !== undefined &&
      refundCreatedAt !== null &&
      refundCreatedAt !== ""
    ) {
      const parsedRefundCreatedAt = new Date(refundCreatedAt);
      if (!Number.isNaN(parsedRefundCreatedAt.getTime())) {
        updateValues.refundCreatedAt = parsedRefundCreatedAt;
      }
    }

    if (
      invoiceType &&
      (invoiceType === "PI" || invoiceType === "TAX_INVOICE")
    ) {
      const isInvoiceTypeChanging =
        Boolean(existingOrder.invoiceType) &&
        existingOrder.invoiceType !== invoiceType;

      if (!existingOrder.invoiceType || isInvoiceTypeChanging) {
        const nowInv = new Date();
        const financialYear = getFinancialYear(nowInv);
        const financialYearStart = getFinancialYearStart(nowInv);

        const effectiveBusinessId =
          updateValues.businessId !== undefined
            ? updateValues.businessId
            : existingOrder.businessId;
        const isBusiness = Boolean(effectiveBusinessId);
        const effectiveInvoiceOfficeId =
          invoiceOfficeId !== undefined
            ? invoiceOfficeId
            : existingOrder.invoiceOfficeId;
        let officeStateCode: string | null = null;
        if (effectiveInvoiceOfficeId) {
          const [invOff] = await dbAdmin
            .select({ stateCode: offices.stateCode })
            .from(offices)
            .where(eq(offices.id, effectiveInvoiceOfficeId))
            .limit(1);
          officeStateCode = invOff?.stateCode ?? null;
        }

        const inv = await generateInvoiceNumber(
          invoiceType,
          isBusiness,
          financialYear,
          financialYearStart,
          officeStateCode
        );

        updateValues.invoiceType = invoiceType;
        updateValues.invoiceSequenceNumber = inv.sequenceNumber;
        updateValues.InvoiceNumber = inv.invoiceNumber;
      }
    }

    if (items && Array.isArray(items) && items.length > 0) {
      await dbUser.transaction(async (tx) => {
        await tx
          .update(orders)
          .set(updateValues)
          .where(eq(orders.id, id));
        await tx.delete(orderItems).where(eq(orderItems.orderId, id));
        await tx.insert(orderItems).values(
          (items as UpdateItemBody[]).map((item) => ({
            orderId: id,
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

      const updatedOrder = await dbUser.query.orders.findFirst({
        where: eq(orders.id, id),
        with: {
          user: { columns: orderUserColumns },
          business: orderBusinessWith,
          shippingAddress: true,
          orderItems: true,
          supplier: true,
        },
      });

      return NextResponse.json({ success: true, data: updatedOrder });
    }

    await dbUser.update(orders).set(updateValues).where(eq(orders.id, id));

    const order = await dbUser.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        user: { columns: orderUserColumns },
        business: orderBusinessWith,
        shippingAddress: true,
        orderItems: true,
        supplier: true,
      },
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error: unknown) {
    console.error("Error updating order:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE order (order items first, then order)
export async function DELETE(
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

    const [existingOrder] = await dbUser
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    await dbUser.transaction(async (tx) => {
      await tx.delete(orderItems).where(eq(orderItems.orderId, id));
      await tx.delete(orders).where(eq(orders.id, id));
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting order:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

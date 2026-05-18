import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { orders } from "@/lib/db/user-schema";
import { createPaymentToken } from "@/lib/payment-token";
import { requireAdminApi } from "@/lib/require-admin";

const ALLOWED_STATUSES = new Set([
  "PENDING",
  "ORDER_SHIPPED_WITHOUT_PAYMENT",
] as const);

const PAID_STATUSES = new Set(["PAID"] as const);

function getAmountDue(order: {
  invoiceAmount: number | null;
  totalAmount: number;
}): number {
  return order.invoiceAmount ?? order.totalAmount;
}

function isOrderFullyPaid(order: {
  status: string;
  paidAmount: number | null;
  invoiceAmount: number | null;
  totalAmount: number;
}): boolean {
  if (PAID_STATUSES.has(order.status as "PAID")) {
    return true;
  }
  const due = getAmountDue(order);
  if (
    order.paidAmount != null &&
    Number.isFinite(order.paidAmount) &&
    order.paidAmount >= due
  ) {
    return true;
  }
  return false;
}

export async function POST(
  _request: NextRequest,
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
      columns: {
        id: true,
        status: true,
        paidAmount: true,
        invoiceAmount: true,
        totalAmount: true,
        paymentLinkUrl: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    if (isOrderFullyPaid(order)) {
      return NextResponse.json(
        { success: false, error: "Order is already paid" },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.has(order.status as "PENDING" | "ORDER_SHIPPED_WITHOUT_PAYMENT")) {
      return NextResponse.json(
        {
          success: false,
          error: `Payment link cannot be generated for order status: ${order.status}. Allowed statuses: PENDING, ORDER_SHIPPED_WITHOUT_PAYMENT`,
        },
        { status: 400 }
      );
    }

    const paymentAppBaseUrl = process.env.NEXT_PUBLIC_PAYMENT_APP_URL;
    if (!paymentAppBaseUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment app URL is not configured",
        },
        { status: 500 }
      );
    }

    const token = createPaymentToken(order.id);
    const baseUrl = paymentAppBaseUrl.replace(/\/$/, "");
    const paymentLink = `${baseUrl}/pay?token=${encodeURIComponent(token)}`;

    await dbUser
      .update(orders)
      .set({ paymentLinkUrl: paymentLink })
      .where(eq(orders.id, id));

    return NextResponse.json({
      success: true,
      paymentLink,
    });
  } catch (error: unknown) {
    console.error("Error generating payment link:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate payment link";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

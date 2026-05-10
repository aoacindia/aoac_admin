import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/require-admin";
import { dbUser } from "@/lib/db";

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
    const customerId = searchParams.get("customerId");
    const addressId = searchParams.get("addressId");

    if (!customerId || !addressId) {
      return NextResponse.json(
        { success: false, error: "customerId and addressId are required" },
        { status: 400 }
      );
    }

    const order = await dbUser.query.orders.findFirst({
      where: (o, { and: andOp, eq: eqOp }) =>
        andOp(
          eqOp(o.orderBy, customerId),
          eqOp(o.shippingAddressId, addressId)
        ),
      orderBy: (o, { desc: d }) => [d(o.orderDate)],
      columns: {
        id: true,
        orderDate: true,
        status: true,
        paymentMethod: true,
        shippingAmount: true,
        shippingCourierName: true,
      },
      with: {
        orderItems: {
          columns: {
            productId: true,
            quantity: true,
            price: true,
            tax: true,
            discount: true,
            customWeightItem: true,
            customWeight: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: order ?? null });
  } catch (error: unknown) {
    console.error("Error fetching last order by customer/address:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch last order";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

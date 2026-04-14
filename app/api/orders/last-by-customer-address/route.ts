import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/require-admin";
import { userPrisma } from "@/lib/user-prisma";

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

    const order = await userPrisma.order.findFirst({
      where: {
        orderBy: customerId,
        shippingAddressId: addressId,
      },
      orderBy: { orderDate: "desc" },
      select: {
        id: true,
        orderDate: true,
        status: true,
        paymentMethod: true,
        shippingAmount: true,
        shippingCourierName: true,
        orderItems: {
          select: {
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

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    console.error("Error fetching last order by customer/address:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch last order" },
      { status: 500 }
    );
  }
}


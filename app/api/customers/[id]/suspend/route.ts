import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// POST suspend customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reason } = body;

    if (!reason || reason.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Suspension reason is required" },
        { status: 400 }
      );
    }

    // Get current customer state
    const customer = await userPrisma.user.findUnique({
      where: { id: id },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (customer.terminated) {
      return NextResponse.json(
        { success: false, error: "Cannot suspend a terminated customer" },
        { status: 400 }
      );
    }

    // Update customer suspension status and increment suspension number
    const updatedCustomer = await userPrisma.user.update({
      where: { id: id },
      data: {
        suspended: true,
        suspended_number: customer.suspended_number + 1,
      },
    });

    // Record suspension reason
    await userPrisma.suspensionReason.create({
      data: {
        userId: customer.id,
        reason: reason.trim(),
      },
    });

    const customerWithReasons = await userPrisma.user.findUnique({
      where: { id: id },
      include: {
        suspensionReasons: {
          orderBy: {
            suspendedAt: "desc",
          },
        },
        billingAddress: true,
      },
    });

    return NextResponse.json({ success: true, data: customerWithReasons });
  } catch (error: any) {
    console.error("Error suspending customer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


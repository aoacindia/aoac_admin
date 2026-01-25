import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// POST unsuspend customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await userPrisma.user.findUnique({
      where: { id: id },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    // Update customer suspension status
    const updatedCustomer = await userPrisma.user.update({
      where: { id: id },
      data: {
        suspended: false,
      },
      include: {
        suspensionReasons: {
          orderBy: {
            suspendedAt: "desc",
          },
        },
        billingAddress: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedCustomer });
  } catch (error: any) {
    console.error("Error unsuspending customer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET all addresses for a customer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Optimize: Get customer and addresses in a single query using include
    const customer = await userPrisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        addresses: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer.addresses });
  } catch (error: any) {
    console.error("Error fetching customer addresses:", error);
    
    // Handle connection pool timeout specifically
    if (error.code === "P2024") {
      return NextResponse.json(
        { 
          success: false, 
          error: "Database connection timeout. Please try again in a moment." 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET all categories
export async function GET() {
  try {
    const categories = await productPrisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("Error fetching all categories:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


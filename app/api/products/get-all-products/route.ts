import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET all products (simplified for discount management)
export async function GET(request: NextRequest) {
  try {
    const products = await productPrisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error fetching all products:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


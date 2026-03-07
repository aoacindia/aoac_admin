import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET products by categoryId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    const products = await productPrisma.product.findMany({
      where: {
        categoryId,
      },
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
    console.error("Error fetching products by category:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


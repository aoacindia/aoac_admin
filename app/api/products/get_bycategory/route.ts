import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { products } from "@/lib/db/product-schema";

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

    const rows = await dbProduct
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
      })
      .from(products)
      .where(eq(products.categoryId, categoryId))
      .orderBy(asc(products.name));

    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error("Error fetching products by category:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

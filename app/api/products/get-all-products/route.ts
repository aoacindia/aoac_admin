import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { products } from "@/lib/db/product-schema";

// GET all products (simplified for discount management)
export async function GET(request: NextRequest) {
  try {
    const rows = await dbProduct
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
      })
      .from(products)
      .orderBy(asc(products.name));

    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error("Error fetching all products:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

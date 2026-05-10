import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { categories } from "@/lib/db/product-schema";

// GET all categories
export async function GET() {
  try {
    const rows = await dbProduct
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .orderBy(asc(categories.name));

    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error("Error fetching all categories:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

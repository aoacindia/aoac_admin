import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { categories } from "@/lib/db/product-schema";
import { requirePermissionApi } from "@/lib/require-admin";

// GET all categories
export async function GET() {
  const authResult = await requirePermissionApi("products.view");
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

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

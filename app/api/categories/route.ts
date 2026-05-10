import { NextRequest, NextResponse } from "next/server";
import { asc, count, eq } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { categories, products } from "@/lib/db/product-schema";

// GET all categories
export async function GET() {
  try {
    const cats = await dbProduct
      .select()
      .from(categories)
      .orderBy(asc(categories.name));

    const counts = await dbProduct
      .select({
        categoryId: products.categoryId,
        n: count(),
      })
      .from(products)
      .groupBy(products.categoryId);

    const countByCat = new Map(counts.map((c) => [c.categoryId, Number(c.n)]));

    const data = cats.map((c) => ({
      ...c,
      _count: { products: countByCat.get(c.id) ?? 0 },
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || String(name).trim() === "") {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const trimmed = String(name).trim();

    const [existing] = await dbProduct
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, trimmed))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category with this name already exists" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [category] = await dbProduct
      .insert(categories)
      .values({
        name: trimmed,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Failed to create category" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating category:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

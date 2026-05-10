import { NextRequest, NextResponse } from "next/server";
import { asc, count, eq } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import { categories, products } from "@/lib/db/product-schema";

// GET category by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [category] = await dbProduct
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const prods = await dbProduct
      .select({ id: products.id, name: products.name })
      .from(products)
      .where(eq(products.categoryId, id))
      .orderBy(asc(products.name));

    const [cntRow] = await dbProduct
      .select({ n: count() })
      .from(products)
      .where(eq(products.categoryId, id));

    return NextResponse.json({
      success: true,
      data: {
        ...category,
        products: prods,
        _count: { products: Number(cntRow?.n ?? 0) },
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching category:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name || String(name).trim() === "") {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [category] = await dbProduct
      .update(categories)
      .set({ name: String(name).trim(), updatedAt: now })
      .where(eq(categories.id, id))
      .returning();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error: unknown) {
    console.error("Error updating category:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [category] = await dbProduct
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const [cntRow] = await dbProduct
      .select({ n: count() })
      .from(products)
      .where(eq(products.categoryId, id));
    const n = Number(cntRow?.n ?? 0);

    if (n > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete category. It has ${n} product(s) associated with it.`,
        },
        { status: 400 }
      );
    }

    await dbProduct.delete(categories).where(eq(categories.id, id));

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting category:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

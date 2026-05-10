import { NextRequest, NextResponse } from "next/server";
import { asc, eq, inArray } from "drizzle-orm";

import { auth } from "@/auth";
import { dbProduct } from "@/lib/db";
import {
  categories,
  categoryWeightDiscounts,
  productDiscountPrices,
  products,
} from "@/lib/db/product-schema";

// GET category discounts by categoryId
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    const discounts = await dbProduct.query.categoryWeightDiscounts.findMany({
      where: eq(categoryWeightDiscounts.categoryId, categoryId),
      with: {
        productDiscounts: {
          with: {
            product: { columns: { id: true, name: true } },
          },
        },
      },
      orderBy: (d, { asc: a }) => [a(d.minWeight)],
    });

    const formattedDiscounts = discounts.map((discount) => ({
      id: discount.id,
      minWeight: discount.minWeight,
      productDiscounts: discount.productDiscounts.map((pd) => ({
        productId: pd.productId,
        discountPrice: pd.discountPrice,
      })),
    }));

    return NextResponse.json(formattedDiscounts);
  } catch (error: unknown) {
    console.error("Error fetching category discounts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST create/update category discounts
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { categoryId, discounts } = body as {
      categoryId?: string;
      discounts?: Array<{
        minWeight?: number | string;
        productPrices?: Record<string, number | string | null>;
      }>;
    };

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    if (!discounts || !Array.isArray(discounts)) {
      return NextResponse.json(
        { success: false, error: "Discounts array is required" },
        { status: 400 }
      );
    }

    const [category] = await dbProduct
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const categoryProducts = await dbProduct
      .select({ id: products.id })
      .from(products)
      .where(eq(products.categoryId, categoryId));

    const productIds = categoryProducts.map((p) => p.id);

    await dbProduct.transaction(async (tx) => {
      const existingDiscounts = await tx
        .select({ id: categoryWeightDiscounts.id })
        .from(categoryWeightDiscounts)
        .where(eq(categoryWeightDiscounts.categoryId, categoryId));

      const existingDiscountIds = existingDiscounts.map((d) => d.id);

      if (existingDiscountIds.length > 0) {
        await tx
          .delete(productDiscountPrices)
          .where(inArray(productDiscountPrices.discountId, existingDiscountIds));
      }

      await tx
        .delete(categoryWeightDiscounts)
        .where(eq(categoryWeightDiscounts.categoryId, categoryId));

      const now = new Date();

      for (const discount of discounts) {
        const { minWeight, productPrices } = discount;
        if (minWeight === undefined || minWeight === null) {
          continue;
        }

        const [categoryDiscount] = await tx
          .insert(categoryWeightDiscounts)
          .values({
            categoryId,
            minWeight: parseFloat(String(minWeight)),
            createdAt: now,
            updatedAt: now,
          })
          .returning({ id: categoryWeightDiscounts.id });

        if (!categoryDiscount) continue;

        if (productPrices && typeof productPrices === "object") {
          const productDiscountData = Object.entries(productPrices)
            .filter(([productId, price]) => {
              return (
                productIds.includes(productId) &&
                price !== null &&
                price !== undefined &&
                !Number.isNaN(parseFloat(String(price)))
              );
            })
            .map(([productId, price]) => ({
              productId,
              discountId: categoryDiscount.id,
              discountPrice: parseFloat(String(price)),
              createdAt: now,
              updatedAt: now,
            }));

          if (productDiscountData.length > 0) {
            await tx.insert(productDiscountPrices).values(productDiscountData);
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Category discounts saved successfully",
    });
  } catch (error: unknown) {
    console.error("Error saving category discounts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

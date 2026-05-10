import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import {
  productDiscountPrices,
  productNutrition,
  products,
  productWeightDiscounts,
} from "@/lib/db/product-schema";

type NutritionBody = { name?: string; grams?: number | string };

// GET product by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await dbProduct.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        category: true,
        weightDiscounts: true,
        discountPrices: { with: { discount: true } },
        nutrition: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      description,
      price,
      regularPrice,
      length,
      breadth,
      height,
      weight,
      packingWeight,
      tax,
      hsnsac,
      mainImage,
      images,
      inStock,
      approved,
      webVisible,
      stockCount,
      categoryId,
      updatedBy,
      vegetable,
      veg,
      frozen,
      nutrition,
    } = body;

    const now = new Date();
    type ProductPatch = Partial<typeof products.$inferInsert>;

    const updateValues: ProductPatch = { updatedAt: now };

    if (name !== undefined) updateValues.name = name;
    if (description !== undefined) updateValues.description = description;
    if (price !== undefined) updateValues.price = parseFloat(String(price));
    if (regularPrice !== undefined) {
      updateValues.regularPrice = regularPrice
        ? parseFloat(String(regularPrice))
        : null;
    }
    if (length !== undefined) {
      updateValues.length = length ? parseFloat(String(length)) : null;
    }
    if (breadth !== undefined) {
      updateValues.breadth = breadth ? parseFloat(String(breadth)) : null;
    }
    if (height !== undefined) {
      updateValues.height = height ? parseFloat(String(height)) : null;
    }
    if (weight !== undefined) {
      updateValues.weight = weight ? parseFloat(String(weight)) : null;
    }
    if (packingWeight !== undefined) {
      updateValues.packingWeight = packingWeight
        ? parseFloat(String(packingWeight))
        : null;
    }
    if (tax !== undefined) updateValues.tax = parseInt(String(tax), 10);
    if (hsnsac !== undefined) updateValues.hsnsac = hsnsac || null;
    if (mainImage !== undefined) updateValues.mainImage = mainImage;
    if (images !== undefined) {
      if (images && typeof images === "string") {
        try {
          updateValues.images = JSON.parse(images) as unknown;
        } catch {
          updateValues.images = null;
        }
      } else {
        updateValues.images = images || null;
      }
    }
    if (inStock !== undefined) updateValues.inStock = Boolean(inStock);
    if (approved !== undefined) updateValues.approved = Boolean(approved);
    if (webVisible !== undefined) updateValues.webVisible = Boolean(webVisible);
    if (stockCount !== undefined) {
      updateValues.stockCount = stockCount
        ? parseInt(String(stockCount), 10)
        : null;
    }
    if (vegetable !== undefined) updateValues.vegetable = Boolean(vegetable);
    if (veg !== undefined) updateValues.veg = Boolean(veg);
    if (frozen !== undefined) updateValues.frozen = Boolean(frozen);
    if (categoryId !== undefined) updateValues.categoryId = categoryId;
    if (updatedBy !== undefined) {
      updateValues.updatedBy = updatedBy || "4568";
    }

    const nutritionData: NutritionBody[] =
      nutrition !== undefined && Array.isArray(nutrition)
        ? nutrition.filter((n) => n?.name && n?.grams !== undefined)
        : [];

    await dbProduct.transaction(async (tx) => {
      if (nutrition !== undefined) {
        await tx
          .delete(productNutrition)
          .where(eq(productNutrition.productId, id));
        if (nutritionData.length > 0) {
          await tx.insert(productNutrition).values(
            nutritionData.map((n) => ({
              productId: id,
              name: String(n.name),
              grams: parseFloat(String(n.grams)) || 0,
              createdAt: now,
              updatedAt: now,
            }))
          );
        }
      }

      const [updated] = await tx
        .update(products)
        .set(updateValues)
        .where(eq(products.id, id))
        .returning({ id: products.id });

      if (!updated) {
        throw new Error("Product not found");
      }
    });

    const product = await dbProduct.query.products.findFirst({
      where: eq(products.id, id),
      with: { category: true, nutrition: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await dbProduct.transaction(async (tx) => {
      await tx
        .delete(productDiscountPrices)
        .where(eq(productDiscountPrices.productId, id));
      await tx
        .delete(productWeightDiscounts)
        .where(eq(productWeightDiscounts.productId, id));
      await tx
        .delete(productNutrition)
        .where(eq(productNutrition.productId, id));
      await tx.delete(products).where(eq(products.id, id));
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

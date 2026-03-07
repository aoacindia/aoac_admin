import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET category discounts by categoryId
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

    const discounts = await productPrisma.categoryWeightDiscount.findMany({
      where: {
        categoryId,
      },
      include: {
        productDiscounts: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        minWeight: "asc",
      },
    });

    // Transform the data to match frontend expectations
    const formattedDiscounts = discounts.map((discount) => ({
      id: discount.id,
      minWeight: discount.minWeight, // in kg (frontend will convert to grams)
      productDiscounts: discount.productDiscounts.map((pd) => ({
        productId: pd.productId,
        discountPrice: pd.discountPrice,
      })),
    }));

    return NextResponse.json(formattedDiscounts);
  } catch (error: any) {
    console.error("Error fetching category discounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create/update category discounts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId, discounts } = body;

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

    // Verify category exists
    const category = await productPrisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Get all products in this category
    const categoryProducts = await productPrisma.product.findMany({
      where: { categoryId },
      select: { id: true },
    });

    const productIds = categoryProducts.map((p) => p.id);

    // Get existing discount IDs for this category
    const existingDiscounts = await productPrisma.categoryWeightDiscount.findMany({
      where: { categoryId },
      select: { id: true },
    });

    const existingDiscountIds = existingDiscounts.map((d) => d.id);

    // Delete ProductDiscountPrice records first (they reference CategoryWeightDiscount)
    if (existingDiscountIds.length > 0) {
      await productPrisma.productDiscountPrice.deleteMany({
        where: {
          discountId: {
            in: existingDiscountIds,
          },
        },
      });
    }

    // Now delete the CategoryWeightDiscount records
    await productPrisma.categoryWeightDiscount.deleteMany({
      where: { categoryId },
    });

    // Create new discounts
    for (const discount of discounts) {
      const { minWeight, productPrices } = discount;

      if (minWeight === undefined || minWeight === null) {
        continue; // Skip invalid entries
      }

      // Create the category weight discount
      const categoryDiscount = await productPrisma.categoryWeightDiscount.create({
        data: {
          categoryId,
          minWeight: parseFloat(minWeight), // Store in kg
        },
      });

      // Create product discount prices for products that have prices specified
      if (productPrices && typeof productPrices === "object") {
        const productDiscountData = Object.entries(productPrices)
          .filter(([productId, price]) => {
            // Only include products that are in this category and have a valid price
            return (
              productIds.includes(productId) &&
              price !== null &&
              price !== undefined &&
              !isNaN(parseFloat(price as string))
            );
          })
          .map(([productId, price]) => ({
            productId,
            discountId: categoryDiscount.id,
            discountPrice: parseFloat(price as string),
          }));

        if (productDiscountData.length > 0) {
          await productPrisma.productDiscountPrice.createMany({
            data: productDiscountData,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Category discounts saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving category discounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


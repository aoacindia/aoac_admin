import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET product by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productPrisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        weightDiscounts: true,
        discountPrices: {
          include: {
            discount: true,
          },
        },
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
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
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

    const updateData: any = {};

    // Code cannot be updated - it's auto-generated
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (regularPrice !== undefined)
      updateData.regularPrice = regularPrice ? parseFloat(regularPrice) : null;
    if (length !== undefined) updateData.length = length ? parseFloat(length) : null;
    if (breadth !== undefined) updateData.breadth = breadth ? parseFloat(breadth) : null;
    if (height !== undefined) updateData.height = height ? parseFloat(height) : null;
    if (weight !== undefined) updateData.weight = weight ? parseFloat(weight) : null;
    if (packingWeight !== undefined) updateData.packingWeight = packingWeight ? parseFloat(packingWeight) : null;
    if (tax !== undefined) updateData.tax = parseInt(tax);
    if (hsnsac !== undefined) updateData.hsnsac = hsnsac || null;
    if (mainImage !== undefined) updateData.mainImage = mainImage;
    if (images !== undefined) updateData.images = images && typeof images === "string" ? JSON.parse(images) : images || null;
    if (inStock !== undefined) updateData.inStock = inStock;
    if (approved !== undefined) updateData.approved = approved;
    if (webVisible !== undefined) updateData.webVisible = webVisible;
    if (stockCount !== undefined)
      updateData.stockCount = stockCount ? parseInt(stockCount) : null;
    if (vegetable !== undefined) updateData.vegetable = vegetable;
    if (veg !== undefined) updateData.veg = veg;
    if (frozen !== undefined) updateData.frozen = frozen;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (updatedBy !== undefined) updateData.updatedBy = updatedBy || "4568";
    if (nutrition !== undefined) {
      const nutritionData = Array.isArray(nutrition)
        ? nutrition.filter((n: any) => n?.name && n?.grams !== undefined)
        : [];

      updateData.nutrition = {
        deleteMany: {},
        ...(nutritionData.length > 0
          ? {
              create: nutritionData.map((n: any) => ({
                name: n.name,
                grams: parseFloat(n.grams) || 0,
              })),
            }
          : {}),
      };
    }

    const product = await productPrisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
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
    
    // Delete all related records first to avoid foreign key constraint violations
    await productPrisma.$transaction(async (tx) => {
      // Delete ProductDiscountPrice records
      await tx.productDiscountPrice.deleteMany({
        where: { productId: id },
      });
      
      // Delete ProductWeightDiscount records
      await tx.productWeightDiscount.deleteMany({
        where: { productId: id },
      });
      
      // Delete ProductNutrition records
      await tx.productNutrition.deleteMany({
        where: { productId: id },
      });
      
      // Finally, delete the product itself
      await tx.product.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// GET product weight discounts by productId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await productPrisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const weightDiscounts = await productPrisma.productWeightDiscount.findMany({
      where: {
        productId,
      },
      orderBy: {
        minWeight: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      weightDiscounts: weightDiscounts.map((wd) => ({
        id: wd.id,
        minWeight: wd.minWeight, // in kg (frontend will convert to grams)
        price: wd.price,
      })),
    });
  } catch (error: any) {
    console.error("Error fetching weight discounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create/update product weight discounts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, weightDiscounts } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!weightDiscounts || !Array.isArray(weightDiscounts)) {
      return NextResponse.json(
        { success: false, error: "Weight discounts array is required" },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await productPrisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete existing weight discounts for this product
    await productPrisma.productWeightDiscount.deleteMany({
      where: { productId },
    });

    // Create new weight discounts
    const validDiscounts = weightDiscounts.filter(
      (wd) =>
        wd.minWeight !== null &&
        wd.minWeight !== undefined &&
        wd.price !== null &&
        wd.price !== undefined &&
        !isNaN(parseFloat(wd.minWeight)) &&
        !isNaN(parseFloat(wd.price))
    );

    if (validDiscounts.length > 0) {
      await productPrisma.productWeightDiscount.createMany({
        data: validDiscounts.map((wd) => ({
          productId,
          minWeight: parseFloat(wd.minWeight), // Store in kg
          price: parseFloat(wd.price),
        })),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Weight discounts saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving weight discounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


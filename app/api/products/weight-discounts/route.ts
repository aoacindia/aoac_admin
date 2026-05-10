import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { dbProduct } from "@/lib/db";
import { productWeightDiscounts, products } from "@/lib/db/product-schema";

// GET product weight discounts by productId
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
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const [product] = await dbProduct
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const weightDiscounts = await dbProduct
      .select()
      .from(productWeightDiscounts)
      .where(eq(productWeightDiscounts.productId, productId))
      .orderBy(asc(productWeightDiscounts.minWeight));

    return NextResponse.json({
      success: true,
      weightDiscounts: weightDiscounts.map((wd) => ({
        id: wd.id,
        minWeight: wd.minWeight,
        price: wd.price,
      })),
    });
  } catch (error: unknown) {
    console.error("Error fetching weight discounts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

type WeightRow = {
  minWeight?: number | string;
  price?: number | string;
};

// POST create/update product weight discounts
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
    const { productId, weightDiscounts } = body as {
      productId?: string;
      weightDiscounts?: WeightRow[];
    };

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

    const [product] = await dbProduct
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const validDiscounts = weightDiscounts.filter(
      (wd) =>
        wd.minWeight !== null &&
        wd.minWeight !== undefined &&
        wd.price !== null &&
        wd.price !== undefined &&
        !Number.isNaN(parseFloat(String(wd.minWeight))) &&
        !Number.isNaN(parseFloat(String(wd.price)))
    );

    const now = new Date();

    await dbProduct.transaction(async (tx) => {
      await tx
        .delete(productWeightDiscounts)
        .where(eq(productWeightDiscounts.productId, productId));

      if (validDiscounts.length > 0) {
        await tx.insert(productWeightDiscounts).values(
          validDiscounts.map((wd) => ({
            productId,
            minWeight: parseFloat(String(wd.minWeight)),
            price: parseFloat(String(wd.price)),
            createdAt: now,
            updatedAt: now,
          }))
        );
      }
    });

    return NextResponse.json({
      success: true,
      message: "Weight discounts saved successfully",
    });
  } catch (error: unknown) {
    console.error("Error saving weight discounts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

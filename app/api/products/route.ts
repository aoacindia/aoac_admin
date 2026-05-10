import { NextRequest, NextResponse } from "next/server";
import { desc, eq, like } from "drizzle-orm";

import { dbProduct } from "@/lib/db";
import {
  productDiscountPrices,
  productNutrition,
  products,
  productWeightDiscounts,
} from "@/lib/db/product-schema";

async function generateProductCode(
  vegetable: boolean,
  veg: boolean,
  frozen: boolean
): Promise<string> {
  let prefix: string;
  if (vegetable) {
    prefix = "VEG-";
  } else if (frozen) {
    prefix = "FRZ-";
  } else {
    prefix = "PDR-";
  }

  const vegIndicator = veg ? "VEG" : "NVG";
  const baseCode = `${prefix}${vegIndicator}-`;

  const [last] = await dbProduct
    .select({ code: products.code })
    .from(products)
    .where(like(products.code, `${baseCode}%`))
    .orderBy(desc(products.code))
    .limit(1);

  let nextNumber = 1;
  if (last?.code) {
    const numberPart = last.code.replace(baseCode, "");
    const parsedNumber = parseInt(numberPart, 10);
    if (!Number.isNaN(parsedNumber)) {
      nextNumber = parsedNumber + 1;
    }
  }

  const sequentialPart = nextNumber.toString().padStart(3, "0");
  return `${baseCode}${sequentialPart}`;
}

// GET all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");

    const rows = await dbProduct.query.products.findMany({
      where:
        approved !== null
          ? (p, { eq: eqOp }) => eqOp(p.approved, approved === "true")
          : undefined,
      with: { category: true },
      orderBy: (p, { desc: d }) => [d(p.createdAt)],
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

type NutritionBody = { name?: string; grams?: number | string };

// POST create new product
export async function POST(request: NextRequest) {
  try {
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

    if (!name || !price || !tax || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vegetableValue = vegetable !== undefined ? Boolean(vegetable) : false;
    const vegValue = veg !== undefined ? Boolean(veg) : false;
    const frozenValue = frozen !== undefined ? Boolean(frozen) : false;

    const generatedCode = await generateProductCode(
      vegetableValue,
      vegValue,
      frozenValue
    );

    let parsedImages: unknown = null;
    if (images && typeof images === "string") {
      try {
        parsedImages = JSON.parse(images) as unknown;
      } catch {
        parsedImages = null;
      }
    } else if (images != null) {
      parsedImages = images;
    }

    const nutritionList: NutritionBody[] = Array.isArray(nutrition)
      ? nutrition
      : [];

    const now = new Date();
    const productId = await dbProduct.transaction(async (tx) => {
      const [p] = await tx
        .insert(products)
        .values({
          code: generatedCode,
          name,
          description,
          price: parseFloat(String(price)),
          regularPrice: regularPrice ? parseFloat(String(regularPrice)) : null,
          length: length ? parseFloat(String(length)) : null,
          breadth: breadth ? parseFloat(String(breadth)) : null,
          height: height ? parseFloat(String(height)) : null,
          weight: weight ? parseFloat(String(weight)) : null,
          packingWeight: packingWeight
            ? parseFloat(String(packingWeight))
            : null,
          tax: parseInt(String(tax), 10),
          hsnsac: hsnsac || null,
          mainImage,
          images: parsedImages,
          inStock: inStock !== undefined ? Boolean(inStock) : true,
          approved: approved !== undefined ? Boolean(approved) : false,
          webVisible: webVisible !== undefined ? Boolean(webVisible) : true,
          stockCount: stockCount ? parseInt(String(stockCount), 10) : null,
          vegetable: vegetableValue,
          veg: vegValue,
          frozen: frozenValue,
          categoryId,
          createdBy: "4568",
          updatedBy: updatedBy || "4568",
          createdAt: now,
          updatedAt: now,
        })
        .returning({ id: products.id });

      if (!p) {
        throw new Error("Failed to create product");
      }

      const validNutrition = nutritionList.filter(
        (n) => n?.name && n?.grams !== undefined
      );
      if (validNutrition.length > 0) {
        await tx.insert(productNutrition).values(
          validNutrition.map((n) => ({
            productId: p.id,
            name: String(n.name),
            grams: parseFloat(String(n.grams)) || 0,
            createdAt: now,
            updatedAt: now,
          }))
        );
      }

      return p.id;
    });

    const product = await dbProduct.query.products.findFirst({
      where: eq(products.id, productId),
      with: { category: true, nutrition: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Failed to load product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

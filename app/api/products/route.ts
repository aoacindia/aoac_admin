import { NextRequest, NextResponse } from "next/server";
import { productPrisma } from "@/lib/product-prisma";

// Function to generate product code
async function generateProductCode(
  vegetable: boolean,
  veg: boolean,
  frozen: boolean
): Promise<string> {
  // Determine prefix based on product type
  let prefix: string;
  if (vegetable) {
    prefix = "VEG-";
  } else if (frozen) {
    prefix = "FRZ-";
  } else {
    prefix = "PDR-";
  }

  // Add veg/non-veg indicator
  const vegIndicator = veg ? "VEG" : "NVG";
  const baseCode = `${prefix}${vegIndicator}-`;

  // Find the highest sequential number for this code pattern
  const existingProducts = await productPrisma.product.findMany({
    where: {
      code: {
        startsWith: baseCode,
      },
    },
    select: {
      code: true,
    },
    orderBy: {
      code: "desc",
    },
  });

  // Extract the highest number
  let nextNumber = 1;
  if (existingProducts.length > 0) {
    const lastCode = existingProducts[0].code;
    const numberPart = lastCode.replace(baseCode, "");
    const parsedNumber = parseInt(numberPart, 10);
    if (!isNaN(parsedNumber)) {
      nextNumber = parsedNumber + 1;
    }
  }

  // Format as 3-digit number
  const sequentialPart = nextNumber.toString().padStart(3, "0");
  return `${baseCode}${sequentialPart}`;
}

// GET all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");

    const where: any = {};
    if (approved !== null) {
      where.approved = approved === "true";
    }

    const products = await productPrisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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

    // Validate required fields
    if (!name || !price || !tax || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate product code automatically
    const vegetableValue = vegetable !== undefined ? vegetable : false;
    const vegValue = veg !== undefined ? veg : false;
    const frozenValue = frozen !== undefined ? frozen : false;

    const generatedCode = await generateProductCode(
      vegetableValue,
      vegValue,
      frozenValue
    );

    const product = await productPrisma.product.create({
      data: {
        code: generatedCode,
        name,
        description,
        price: parseFloat(price),
        regularPrice: regularPrice ? parseFloat(regularPrice) : null,
        length: length ? parseFloat(length) : null,
        breadth: breadth ? parseFloat(breadth) : null,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        packingWeight: packingWeight ? parseFloat(packingWeight) : null,
        tax: parseInt(tax),
        hsnsac: hsnsac || null,
        mainImage,
        images: images && typeof images === "string" ? JSON.parse(images) : images || null,
        inStock: inStock !== undefined ? inStock : true,
        approved: approved !== undefined ? approved : false,
        webVisible: webVisible !== undefined ? webVisible : true,
        stockCount: stockCount ? parseInt(stockCount) : null,
        vegetable: vegetableValue,
        veg: vegValue,
        frozen: frozenValue,
        categoryId,
        createdBy: "4568",
        updatedBy: updatedBy || "4568",
        nutrition: nutrition && Array.isArray(nutrition) && nutrition.length > 0
          ? {
              create: nutrition.map((n: any) => ({
                name: n.name,
                grams: parseFloat(n.grams) || 0,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        nutrition: true,
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


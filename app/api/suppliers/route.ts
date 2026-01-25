import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET all suppliers
export async function GET(request: NextRequest) {
  try {
    const suppliers = await userPrisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: suppliers });
  } catch (error: any) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new supplier
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      name,
      phone,
      email,
      gstNumber,
      fssaiLicense,
      houseNo,
      line1,
      line2,
      city,
      district,
      state,
      stateCode,
      country,
      pincode,
    } = body;

    // Validate required fields
    if (!type || !name || !phone || !email || !houseNo || !line1 || !city || !district || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate type
    if (type !== "Individual" && type !== "Business") {
      return NextResponse.json(
        { success: false, error: "Type must be 'Individual' or 'Business'" },
        { status: 400 }
      );
    }

    // If Business type, GST number is required
    if (type === "Business" && !gstNumber) {
      return NextResponse.json(
        { success: false, error: "GST Number is required for Business type" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existingSupplier = await userPrisma.supplier.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    if (existingSupplier) {
      return NextResponse.json(
        { success: false, error: "Supplier with this email or phone already exists" },
        { status: 400 }
      );
    }

    const supplier = await userPrisma.supplier.create({
      data: {
        type,
        name,
        phone,
        email,
        gstNumber: type === "Business" ? gstNumber : null,
        fssaiLicense: fssaiLicense || null,
        houseNo,
        line1,
        line2: line2 || null,
        city,
        district,
        state,
        stateCode: stateCode || null,
        country: country || "India",
        pincode,
      },
    });

    return NextResponse.json({ success: true, data: supplier }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


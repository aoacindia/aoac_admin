import { NextRequest, NextResponse } from "next/server";
import { desc, eq, or } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { suppliers } from "@/lib/db/user-schema";

// GET all suppliers
export async function GET(request: NextRequest) {
  try {
    const rows = await dbUser
      .select()
      .from(suppliers)
      .orderBy(desc(suppliers.createdAt));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error("Error fetching suppliers:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
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

    if (
      !type ||
      !name ||
      !phone ||
      !email ||
      !houseNo ||
      !line1 ||
      !city ||
      !district ||
      !state ||
      !pincode
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type !== "Individual" && type !== "Business") {
      return NextResponse.json(
        { success: false, error: "Type must be 'Individual' or 'Business'" },
        { status: 400 }
      );
    }

    if (type === "Business" && !gstNumber) {
      return NextResponse.json(
        { success: false, error: "GST Number is required for Business type" },
        { status: 400 }
      );
    }

    const [existing] = await dbUser
      .select({ id: suppliers.id })
      .from(suppliers)
      .where(or(eq(suppliers.email, email), eq(suppliers.phone, phone)))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Supplier with this email or phone already exists",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const [supplier] = await dbUser
      .insert(suppliers)
      .values({
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
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Failed to create supplier" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: supplier },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating supplier:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

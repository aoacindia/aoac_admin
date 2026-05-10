import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";

export async function GET(request: NextRequest) {
  try {
    const rows = await dbAdmin
      .select()
      .from(offices)
      .orderBy(desc(offices.createdAt));
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error("Error fetching offices:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gstin, address, city, state, stateCode, pincode, country } = body;

    if (!gstin || !address || !city || !state || !stateCode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [existing] = await dbAdmin
      .select({ id: offices.id })
      .from(offices)
      .where(eq(offices.gstin, gstin))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Office with this GSTIN already exists" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [office] = await dbAdmin
      .insert(offices)
      .values({
        gstin,
        address,
        city,
        state,
        stateCode,
        pincode: pincode || null,
        country: country || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!office) {
      return NextResponse.json(
        { success: false, error: "Failed to create office" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: office }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating office:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

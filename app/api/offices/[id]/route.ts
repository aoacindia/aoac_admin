import { NextRequest, NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { offices } from "@/lib/db/admin-schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [office] = await dbAdmin
      .select()
      .from(offices)
      .where(eq(offices.id, id))
      .limit(1);

    if (!office) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: office });
  } catch (error: unknown) {
    console.error("Error fetching office:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { gstin, address, city, state, stateCode, pincode, country } = body;

    if (!gstin || !address || !city || !state || !stateCode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [existingOffice] = await dbAdmin
      .select()
      .from(offices)
      .where(eq(offices.id, id))
      .limit(1);

    if (!existingOffice) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    const [conflict] = await dbAdmin
      .select({ id: offices.id })
      .from(offices)
      .where(and(eq(offices.gstin, gstin), ne(offices.id, id)))
      .limit(1);

    if (conflict) {
      return NextResponse.json(
        { success: false, error: "Office with this GSTIN already exists" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [office] = await dbAdmin
      .update(offices)
      .set({
        gstin,
        address,
        city,
        state,
        stateCode,
        pincode: pincode || null,
        country: country || null,
        updatedAt: now,
      })
      .where(eq(offices.id, id))
      .returning();

    if (!office) {
      return NextResponse.json(
        { success: false, error: "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: office });
  } catch (error: unknown) {
    console.error("Error updating office:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [existingOffice] = await dbAdmin
      .select({ id: offices.id })
      .from(offices)
      .where(eq(offices.id, id))
      .limit(1);

    if (!existingOffice) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    await dbAdmin.delete(offices).where(eq(offices.id, id));

    return NextResponse.json({
      success: true,
      message: "Office deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting office:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

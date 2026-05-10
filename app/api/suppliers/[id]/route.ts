import { NextRequest, NextResponse } from "next/server";
import { and, count, eq, ne, or } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { orders, suppliers } from "@/lib/db/user-schema";
import type { NewSupplierRow } from "@/lib/db/user-schema";

// GET supplier by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [supplier] = await dbUser
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .limit(1);

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: supplier });
  } catch (error: unknown) {
    console.error("Error fetching supplier:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PUT update supplier
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const [existingSupplier] = await dbUser
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .limit(1);

    if (!existingSupplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    if (email || phone) {
      const conflictOr = [
        ...(email ? [eq(suppliers.email, email)] : []),
        ...(phone ? [eq(suppliers.phone, phone)] : []),
      ];
      if (conflictOr.length > 0) {
        const [conflict] = await dbUser
          .select({ id: suppliers.id })
          .from(suppliers)
          .where(and(ne(suppliers.id, id), or(...conflictOr)))
          .limit(1);

        if (conflict) {
          return NextResponse.json(
            { success: false, error: "Email or phone number already exists" },
            { status: 400 }
          );
        }
      }
    }

    if (type && type !== "Individual" && type !== "Business") {
      return NextResponse.json(
        { success: false, error: "Type must be 'Individual' or 'Business'" },
        { status: 400 }
      );
    }

    const finalType = type || existingSupplier.type;
    if (
      finalType === "Business" &&
      !gstNumber &&
      !existingSupplier.gstNumber
    ) {
      return NextResponse.json(
        { success: false, error: "GST Number is required for Business type" },
        { status: 400 }
      );
    }

    const now = new Date();
    const updatePayload: Partial<NewSupplierRow> & { updatedAt: Date } = {
      updatedAt: now,
    };
    if (type !== undefined) updatePayload.type = type;
    if (name !== undefined) updatePayload.name = name;
    if (phone !== undefined) updatePayload.phone = phone;
    if (email !== undefined) updatePayload.email = email;
    if (gstNumber !== undefined) {
      updatePayload.gstNumber = finalType === "Business" ? gstNumber : null;
    }
    if (fssaiLicense !== undefined)
      updatePayload.fssaiLicense = fssaiLicense || null;
    if (houseNo !== undefined) updatePayload.houseNo = houseNo;
    if (line1 !== undefined) updatePayload.line1 = line1;
    if (line2 !== undefined) updatePayload.line2 = line2 || null;
    if (city !== undefined) updatePayload.city = city;
    if (district !== undefined) updatePayload.district = district;
    if (state !== undefined) updatePayload.state = state;
    if (stateCode !== undefined) updatePayload.stateCode = stateCode || null;
    if (country !== undefined) updatePayload.country = country || "India";
    if (pincode !== undefined) updatePayload.pincode = pincode;

    const [supplier] = await dbUser
      .update(suppliers)
      .set(updatePayload)
      .where(eq(suppliers.id, id))
      .returning();

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: supplier });
  } catch (error: unknown) {
    console.error("Error updating supplier:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE supplier
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [supplier] = await dbUser
      .select({ id: suppliers.id })
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .limit(1);

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    const [cntRow] = await dbUser
      .select({ c: count() })
      .from(orders)
      .where(eq(orders.supplierId, id));
    const orderCount = Number(cntRow?.c ?? 0);

    if (orderCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot delete supplier with existing orders",
        },
        { status: 400 }
      );
    }

    await dbUser.delete(suppliers).where(eq(suppliers.id, id));

    return NextResponse.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting supplier:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

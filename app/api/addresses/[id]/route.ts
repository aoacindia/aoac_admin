import { NextRequest, NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { addresses, users } from "@/lib/db/user-schema";

const userListCols = {
  id: users.id,
  name: users.name,
  email: users.email,
  phone: users.phone,
  isBusinessAccount: users.isBusinessAccount,
  businessName: users.businessName,
} as const;

// GET address by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [row] = await dbUser
      .select({
        address: addresses,
        user: userListCols,
      })
      .from(addresses)
      .innerJoin(users, eq(addresses.userId, users.id))
      .where(eq(addresses.id, id))
      .limit(1);

    if (!row) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...row.address, user: row.user },
    });
  } catch (error: unknown) {
    console.error("Error fetching address:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PUT update address
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
      houseNo,
      line1,
      line2,
      city,
      district,
      state,
      stateCode,
      country,
      pincode,
      isDefault,
    } = body;

    const [existingAddress] = await dbUser
      .select()
      .from(addresses)
      .where(eq(addresses.id, id))
      .limit(1);

    if (!existingAddress) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    const now = new Date();

    const payload: Partial<typeof addresses.$inferInsert> = { updatedAt: now };
    if (type !== undefined) payload.type = type;
    if (name !== undefined) payload.name = name;
    if (phone !== undefined) payload.phone = phone;
    if (houseNo !== undefined) payload.houseNo = houseNo;
    if (line1 !== undefined) payload.line1 = line1;
    if (line2 !== undefined) payload.line2 = line2 || null;
    if (city !== undefined) payload.city = city;
    if (district !== undefined) payload.district = district;
    if (state !== undefined) payload.state = state;
    if (stateCode !== undefined) payload.stateCode = stateCode || null;
    if (country !== undefined) payload.country = country || "India";
    if (pincode !== undefined) payload.pincode = pincode;
    if (isDefault !== undefined) payload.isDefault = isDefault;

    const updated = await dbUser.transaction(async (tx) => {
      if (isDefault && !existingAddress.isDefault) {
        await tx
          .update(addresses)
          .set({ isDefault: false, updatedAt: now })
          .where(
            and(
              eq(addresses.userId, existingAddress.userId),
              eq(addresses.isDefault, true),
              ne(addresses.id, id)
            )
          );
      }

      const [addr] = await tx
        .update(addresses)
        .set(payload)
        .where(eq(addresses.id, id))
        .returning();

      if (!addr) return null;

      const [u] = await tx
        .select(userListCols)
        .from(users)
        .where(eq(users.id, addr.userId))
        .limit(1);

      return u ? { ...addr, user: u } : null;
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("Error updating address:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE address
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [address] = await dbUser
      .select({ id: addresses.id })
      .from(addresses)
      .where(eq(addresses.id, id))
      .limit(1);

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    await dbUser.delete(addresses).where(eq(addresses.id, id));

    return NextResponse.json({ success: true, message: "Address deleted" });
  } catch (error: unknown) {
    console.error("Error deleting address:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { and, eq, ne, or } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { users } from "@/lib/db/user-schema";

// GET customer by id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        businesses: {
          with: { billingAddress: true },
          orderBy: (b, { asc: a }) => [a(b.createdAt)],
        },
        addresses: {
          orderBy: (a, { desc: d }) => [d(a.createdAt)],
        },
        order: {
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
          with: {
            orderItems: true,
            shippingAddress: true,
            business: {
              with: { billingAddress: true },
            },
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error: unknown) {
    console.error("Error fetching customer:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PUT update customer account fields only (businesses managed via /businesses)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone } = body;

    const [existingCustomer] = await dbUser
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (email || phone) {
      const orParts = [
        ...(email ? [eq(users.email, email)] : []),
        ...(phone ? [eq(users.phone, phone)] : []),
      ];
      if (orParts.length > 0) {
        const [conflictUser] = await dbUser
          .select({ id: users.id })
          .from(users)
          .where(and(ne(users.id, id), or(...orParts)))
          .limit(1);

        if (conflictUser) {
          return NextResponse.json(
            { success: false, error: "Email or phone number already exists" },
            { status: 400 }
          );
        }
      }
    }

    const now = new Date();
    type UserPatch = Partial<typeof users.$inferInsert>;
    const updateValues: UserPatch = { updatedAt: now };

    if (name !== undefined) updateValues.name = name;
    if (email !== undefined) updateValues.email = email;
    if (phone !== undefined) updateValues.phone = phone;

    await dbUser.update(users).set(updateValues).where(eq(users.id, id));

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        businesses: {
          with: { billingAddress: true },
          orderBy: (b, { asc: a }) => [a(b.createdAt)],
        },
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error: unknown) {
    console.error("Error updating customer:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

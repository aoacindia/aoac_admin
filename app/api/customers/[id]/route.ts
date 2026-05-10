import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, ne, or } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { billingAddresses, users } from "@/lib/db/user-schema";

// GET customer by id
export async function GET(
  request: NextRequest,
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
        billingAddress: true,
        addresses: {
          orderBy: (a, { desc: d }) => [d(a.createdAt)],
        },
        order: {
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
          with: {
            orderItems: true,
            shippingAddress: true,
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

// PUT update customer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      email,
      phone,
      isBusinessAccount,
      businessName,
      gstNumber,
      hasAdditionalTradeName,
      additionalTradeName,
      billingAddress,
    } = body;

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
    if (isBusinessAccount !== undefined) {
      updateValues.isBusinessAccount = isBusinessAccount;
    }

    const isBiz =
      isBusinessAccount !== undefined
        ? Boolean(isBusinessAccount)
        : Boolean(existingCustomer.isBusinessAccount);

    if (businessName !== undefined) {
      updateValues.businessName = isBiz ? businessName : null;
    }
    if (gstNumber !== undefined) {
      updateValues.gstNumber = isBiz ? gstNumber : null;
    }
    if (hasAdditionalTradeName !== undefined) {
      updateValues.hasAdditionalTradeName = isBiz
        ? Boolean(hasAdditionalTradeName)
        : false;
    }
    if (additionalTradeName !== undefined) {
      updateValues.additionalTradeName =
        isBiz && hasAdditionalTradeName ? additionalTradeName : null;
    }

    await dbUser.transaction(async (tx) => {
      if (!isBiz) {
        await tx.delete(billingAddresses).where(eq(billingAddresses.userId, id));
      } else if (billingAddress) {
        const [existingBilling] = await tx
          .select({ id: billingAddresses.id })
          .from(billingAddresses)
          .where(eq(billingAddresses.userId, id))
          .limit(1);

        if (existingBilling) {
          await tx
            .update(billingAddresses)
            .set({
              houseNo: billingAddress.houseNo,
              line1: billingAddress.line1,
              line2: billingAddress.line2 || null,
              city: billingAddress.city,
              district: billingAddress.district,
              state: billingAddress.state,
              stateCode: billingAddress.stateCode || null,
              country: billingAddress.country || "India",
              pincode: billingAddress.pincode,
              updatedAt: now,
            })
            .where(eq(billingAddresses.userId, id));
        } else {
          await tx.insert(billingAddresses).values({
            userId: id,
            houseNo: billingAddress.houseNo,
            line1: billingAddress.line1,
            line2: billingAddress.line2 || null,
            city: billingAddress.city,
            district: billingAddress.district,
            state: billingAddress.state,
            stateCode: billingAddress.stateCode || null,
            country: billingAddress.country || "India",
            pincode: billingAddress.pincode,
            createdAt: now,
            updatedAt: now,
          });
        }
      }

      await tx.update(users).set(updateValues).where(eq(users.id, id));
    });

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        billingAddress: true,
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

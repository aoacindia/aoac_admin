import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { suspensionReasons, users } from "@/lib/db/user-schema";

// POST suspend customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reason } = body;

    if (!reason || String(reason).trim() === "") {
      return NextResponse.json(
        { success: false, error: "Suspension reason is required" },
        { status: 400 }
      );
    }

    const [customer] = await dbUser
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (customer.terminated) {
      return NextResponse.json(
        { success: false, error: "Cannot suspend a terminated customer" },
        { status: 400 }
      );
    }

    const now = new Date();

    await dbUser.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          suspended: true,
          suspended_number: customer.suspended_number + 1,
          updatedAt: now,
        })
        .where(eq(users.id, id));

      await tx.insert(suspensionReasons).values({
        userId: customer.id,
        reason: String(reason).trim(),
        suspendedAt: now,
      });
    });

    const customerWithReasons = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        billingAddress: true,
      },
    });

    return NextResponse.json({ success: true, data: customerWithReasons });
  } catch (error: unknown) {
    console.error("Error suspending customer:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

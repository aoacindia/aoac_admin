import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { users } from "@/lib/db/user-schema";

// POST unsuspend customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const now = new Date();
    await dbUser
      .update(users)
      .set({ suspended: false, updatedAt: now })
      .where(eq(users.id, id));

    const updatedCustomer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        billingAddress: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedCustomer });
  } catch (error: unknown) {
    console.error("Error unsuspending customer:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

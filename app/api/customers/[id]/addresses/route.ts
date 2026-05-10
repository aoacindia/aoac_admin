import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { users } from "@/lib/db/user-schema";

// GET all addresses for a customer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      columns: { id: true },
      with: {
        addresses: {
          orderBy: (a, { desc: d }) => [d(a.createdAt)],
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer.addresses });
  } catch (error: unknown) {
    console.error("Error fetching customer addresses:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message || "Internal server error" },
      { status: 500 }
    );
  }
}

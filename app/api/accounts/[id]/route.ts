import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { accounts } from "@/lib/db/admin-schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [account] = await dbAdmin
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))
      .limit(1);

    if (!account) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: account });
  } catch (error: unknown) {
    console.error("Error fetching account:", error);
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
    const {
      accountHolderName,
      accountNumber,
      ifsc,
      branch,
      swiftCode,
      bankName,
      isDefault,
    } = body;

    if (!accountHolderName || !accountNumber || !ifsc || !branch || !bankName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [existingAccount] = await dbAdmin
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))
      .limit(1);

    if (!existingAccount) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    const payload = {
      accountHolderName,
      accountNumber,
      ifsc,
      branch,
      swiftCode: swiftCode || null,
      bankName,
      isDefault: Boolean(isDefault),
    };

    const now = new Date();

    if (payload.isDefault) {
      const updated = await dbAdmin.transaction(async (tx) => {
        await tx.update(accounts).set({ isDefault: false, updatedAt: now });
        const [row] = await tx
          .update(accounts)
          .set({ ...payload, updatedAt: now })
          .where(eq(accounts.id, id))
          .returning();
        return row;
      });

      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Update failed" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data: updated });
    }

    const [account] = await dbAdmin
      .update(accounts)
      .set({ ...payload, updatedAt: now })
      .where(eq(accounts.id, id))
      .returning();

    if (!account) {
      return NextResponse.json(
        { success: false, error: "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: account });
  } catch (error: unknown) {
    console.error("Error updating account:", error);
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

    const [existingAccount] = await dbAdmin
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.id, id))
      .limit(1);

    if (!existingAccount) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    await dbAdmin.delete(accounts).where(eq(accounts.id, id));

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting account:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

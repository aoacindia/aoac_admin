import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { accounts } from "@/lib/db/admin-schema";

export async function GET(request: NextRequest) {
  try {
    const rows = await dbAdmin
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt));
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error("Error fetching accounts:", error);
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
      const inserted = await dbAdmin.transaction(async (tx) => {
        await tx
          .update(accounts)
          .set({ isDefault: false, updatedAt: now });
        const created = await tx
          .insert(accounts)
          .values({
            ...payload,
            createdAt: now,
            updatedAt: now,
          })
          .returning();
        return created[0];
      });

      if (!inserted) {
        return NextResponse.json(
          { success: false, error: "Failed to create account" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data: inserted }, { status: 201 });
    }

    const insertedRows = await dbAdmin
      .insert(accounts)
      .values({
        ...payload,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    const account = insertedRows[0];
    if (!account) {
      return NextResponse.json(
        { success: false, error: "Failed to create account" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: account }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating account:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

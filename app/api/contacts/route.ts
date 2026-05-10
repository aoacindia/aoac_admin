import { NextRequest, NextResponse } from "next/server";
import { count, desc } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { contacts } from "@/lib/db/user-schema";

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const [countRow] = await dbUser.select({ c: count() }).from(contacts);
    const total = Number(countRow?.c ?? 0);

    const rows = await dbUser
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(safeLimit)
      .offset((safePage - 1) * safeLimit);

    return NextResponse.json({
      success: true,
      data: rows,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching contacts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

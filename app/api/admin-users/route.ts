import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";

import { auth } from "@/auth";
import { dbAdmin } from "@/lib/db";
import type { AdminRole } from "@/lib/db/admin-schema";
import { adminUsers } from "@/lib/db/admin-schema";

const ALLOWED_ROLES = ["ADMIN", "MANAGER", "STAFF"] as const;

function isAllowedRole(role: string) {
  return ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number]);
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized", status: 401 };
  }
  if (session.user.role !== "ADMIN") {
    return { error: "Forbidden", status: 403 };
  }
  return { session };
}

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const searchRaw = searchParams.get("search");
    const role = searchParams.get("role");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const search =
      typeof searchRaw === "string" && searchRaw.trim() ? searchRaw.trim() : "";

    const whereParts = [];

    if (search) {
      const needle = `%${search}%`;
      whereParts.push(
        or(
          ilike(adminUsers.name, needle),
          ilike(adminUsers.email, needle),
          ilike(adminUsers.phone, needle)
        )
      );
    }
    if (role && isAllowedRole(role)) {
      whereParts.push(eq(adminUsers.role, role as AdminRole));
    }

    const wc = whereParts.length > 0 ? and(...whereParts) : undefined;

    const countBase = dbAdmin.select({ c: count() }).from(adminUsers);
    const [countRow] =
      wc !== undefined
        ? await countBase.where(wc)
        : await countBase;
    const total = Number(countRow?.c ?? 0);

    const selector = dbAdmin
      .select({
        id: adminUsers.id,
        name: adminUsers.name,
        email: adminUsers.email,
        phone: adminUsers.phone,
        role: adminUsers.role,
        suspended: adminUsers.suspended,
        terminated: adminUsers.terminated,
        createdAt: adminUsers.createdAt,
      })
      .from(adminUsers);

    const users = await (wc !== undefined ? selector.where(wc) : selector)
      .orderBy(desc(adminUsers.createdAt))
      .offset((safePage - 1) * safeLimit)
      .limit(safeLimit);

    return NextResponse.json({
      success: true,
      data: users,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching admin users:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = String(body?.phone || "").trim();
    const role = String(body?.role || "STAFF").toUpperCase();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (!isAllowedRole(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    const [existingUser] = await dbAdmin
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .where(or(eq(adminUsers.email, email), eq(adminUsers.phone, phone)))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email or phone number already exists" },
        { status: 400 }
      );
    }

    const now = new Date();
    const inserted = await dbAdmin
      .insert(adminUsers)
      .values({
        name,
        email,
        phone,
        role: role as AdminRole,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    const user = inserted[0];
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating admin user:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

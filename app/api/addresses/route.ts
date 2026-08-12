import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, exists, ilike, inArray, or, sql } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { addresses, businesses, users } from "@/lib/db/user-schema";

const userListCols = {
  id: users.id,
  name: users.name,
  email: users.email,
  phone: users.phone,
} as const;

function businessNameExists(needle: string) {
  return exists(
    dbUser
      .select({ o: sql`1` })
      .from(businesses)
      .where(
        and(eq(businesses.userId, users.id), ilike(businesses.businessName, needle))
      )
  );
}

async function usersWithBusinessFlag(
  userRows: Array<{ id: string; name: string; email: string; phone: string }>
) {
  if (userRows.length === 0) return [];
  const userIds = [...new Set(userRows.map((u) => u.id))];
  const bizRows = await dbUser
    .select({ userId: businesses.userId })
    .from(businesses)
    .where(inArray(businesses.userId, userIds));
  const hasBiz = new Set(bizRows.map((b) => b.userId));
  return userRows.map((u) => ({
    ...u,
    hasBusiness: hasBiz.has(u.id),
  }));
}

// GET all addresses with search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const pincode = searchParams.get("pincode");
    const district = searchParams.get("district");
    const state = searchParams.get("state");
    const userName = searchParams.get("userName");
    const businessName = searchParams.get("businessName");

    const filters = [];

    if (search) {
      const needle = `%${search}%`;
      filters.push(
        or(
          ilike(addresses.pincode, needle),
          ilike(addresses.district, needle),
          ilike(addresses.state, needle),
          ilike(addresses.city, needle),
          or(ilike(users.name, needle), businessNameExists(needle))
        )
      );
    } else {
      if (pincode) {
        filters.push(ilike(addresses.pincode, `%${pincode}%`));
      }
      if (district) {
        filters.push(ilike(addresses.district, `%${district}%`));
      }
      if (state) {
        filters.push(ilike(addresses.state, `%${state}%`));
      }
      if (userName) {
        filters.push(ilike(users.name, `%${userName}%`));
      }
      if (businessName) {
        filters.push(businessNameExists(`%${businessName}%`));
      }
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const q = dbUser
      .select({
        address: addresses,
        user: userListCols,
      })
      .from(addresses)
      .innerJoin(users, eq(addresses.userId, users.id))
      .orderBy(desc(addresses.createdAt));

    const rows = whereClause ? await q.where(whereClause) : await q;
    const usersFlagged = await usersWithBusinessFlag(rows.map((r) => r.user));
    const byId = new Map(usersFlagged.map((u) => [u.id, u]));
    const data = rows.map((r) => ({
      ...r.address,
      user: byId.get(r.user.id)!,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error fetching addresses:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST create new address
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
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

    // Validate required fields
    if (
      !userId ||
      !type ||
      !name ||
      !phone ||
      !houseNo ||
      !line1 ||
      !city ||
      !district ||
      !state ||
      !pincode
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [userRow] = await dbUser
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userRow) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const now = new Date();

    const inserted = await dbUser.transaction(async (tx) => {
      if (isDefault) {
        await tx
          .update(addresses)
          .set({ isDefault: false, updatedAt: now })
          .where(
            and(eq(addresses.userId, userId), eq(addresses.isDefault, true))
          );
      }

      const [row] = await tx
        .insert(addresses)
        .values({
          userId,
          type,
          name,
          phone,
          houseNo,
          line1,
          line2: line2 || null,
          city,
          district,
          state,
          stateCode: stateCode || null,
          country: country || "India",
          pincode,
          isDefault: Boolean(isDefault),
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      if (!row) return null;

      const [u] = await tx
        .select(userListCols)
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!u) return null;

      const [biz] = await tx
        .select({ id: businesses.id })
        .from(businesses)
        .where(eq(businesses.userId, userId))
        .limit(1);

      return {
        ...row,
        user: { ...u, hasBusiness: Boolean(biz) },
      };
    });

    if (!inserted || !inserted.user) {
      return NextResponse.json(
        { success: false, error: "Failed to create address" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: inserted },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating address:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

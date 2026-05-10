import { NextRequest, NextResponse } from "next/server";
import {
  and,
  count,
  desc,
  eq,
  ilike,
  isNull,
  or,
} from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { billingAddresses, users } from "@/lib/db/user-schema";
import { generateNextUserId } from "@/lib/user-id";

// GET all customers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const searchMode = searchParams.get("searchMode");
    const suspended = searchParams.get("suspended");
    const terminated = searchParams.get("terminated");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const userWhereCallback = (
      // Drizzle relational `where` passes the selected table's column map, not `PgTable`.
      u: {
        name: typeof users.name;
        email: typeof users.email;
        phone: typeof users.phone;
        businessName: typeof users.businessName;
        gstNumber: typeof users.gstNumber;
        suspended: typeof users.suspended;
        terminated: typeof users.terminated;
      },
      ops: {
        and: typeof and;
        eq: typeof eq;
        ilike: typeof ilike;
        or: typeof or;
        isNull: typeof isNull;
      }
    ) => {
      const { and: andOp, eq: eqOp, ilike: il, or: orOp, isNull: isN } = ops;
      const parts = [];
      const searchTerm = search?.trim();

      if (searchTerm) {
        if (searchMode === "prefix") {
          const needle = `${searchTerm}%`;
          parts.push(
            orOp(il(u.name, needle), il(u.businessName, needle))
          );
        } else {
          const needle = `%${searchTerm}%`;
          parts.push(
            orOp(
              il(u.name, needle),
              il(u.email, needle),
              il(u.phone, needle),
              il(u.businessName, needle),
              il(u.gstNumber, needle)
            )
          );
        }
      }

      if (suspended !== null && suspended !== undefined) {
        parts.push(eqOp(u.suspended, suspended === "true"));
      }
      if (terminated !== null && terminated !== undefined) {
        parts.push(eqOp(u.terminated, terminated === "true"));
      }

      return parts.length > 0 ? andOp(...parts) : undefined;
    };

    const baseWhere = userWhereCallback(users, {
      and,
      eq,
      ilike,
      or,
      isNull,
    });

    const countBase = dbUser.select({ c: count() }).from(users);
    const [totalRow] = baseWhere
      ? await countBase.where(baseWhere)
      : await countBase;
    const total = Number(totalRow?.c ?? 0);

    const bizFilter = baseWhere
      ? and(baseWhere, eq(users.isBusinessAccount, true))
      : eq(users.isBusinessAccount, true);
    const [bizRow] = await dbUser.select({ c: count() }).from(users).where(bizFilter);
    const businessCount = Number(bizRow?.c ?? 0);

    const personalFilter = baseWhere
      ? and(
          baseWhere,
          or(eq(users.isBusinessAccount, false), isNull(users.isBusinessAccount))
        )
      : or(eq(users.isBusinessAccount, false), isNull(users.isBusinessAccount));
    const [persRow] = await dbUser
      .select({ c: count() })
      .from(users)
      .where(personalFilter);
    const personalCount = Number(persRow?.c ?? 0);

    const customers = await dbUser.query.users.findMany({
      where: userWhereCallback,
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        billingAddress: true,
      },
      orderBy: (u, { desc: d }) => [d(u.createdAt)],
      limit: safeLimit,
      offset: (safePage - 1) * safeLimit,
    });

    return NextResponse.json({
      success: true,
      data: customers,
      meta: {
        total,
        businessCount,
        personalCount,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching customers:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST create new customer
export async function POST(request: NextRequest) {
  try {
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

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, phone" },
        { status: 400 }
      );
    }

    const [existingUser] = await dbUser
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.phone, phone)))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email or phone number already exists" },
        { status: 400 }
      );
    }

    const isBusiness = Boolean(isBusinessAccount);
    const userId = await generateNextUserId(dbUser, isBusiness);

    const now = new Date();

    await dbUser.transaction(async (tx) => {
      await tx.insert(users).values({
        id: userId,
        name,
        email,
        phone,
        password: null,
        isBusinessAccount: isBusiness,
        businessName: isBusiness ? businessName : null,
        gstNumber: isBusiness ? gstNumber : null,
        hasAdditionalTradeName: isBusiness
          ? Boolean(hasAdditionalTradeName)
          : false,
        additionalTradeName:
          isBusiness && hasAdditionalTradeName ? additionalTradeName : null,
        createdAt: now,
        updatedAt: now,
      });

      if (isBusiness && billingAddress) {
        await tx.insert(billingAddresses).values({
          userId,
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
    });

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, userId),
      with: { billingAddress: true },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Failed to load customer" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating customer:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

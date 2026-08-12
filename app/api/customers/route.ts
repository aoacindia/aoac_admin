import { NextRequest, NextResponse } from "next/server";
import {
  and,
  count,
  eq,
  exists,
  ilike,
  isNull,
  or,
  sql,
} from "drizzle-orm";

import { generateNextBusinessId } from "@/lib/business-id";
import { dbUser } from "@/lib/db";
import { billingAddresses, businesses, users } from "@/lib/db/user-schema";
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
      u: {
        id: typeof users.id;
        name: typeof users.name;
        email: typeof users.email;
        phone: typeof users.phone;
        suspended: typeof users.suspended;
        terminated: typeof users.terminated;
      },
      ops: {
        and: typeof and;
        eq: typeof eq;
        ilike: typeof ilike;
        or: typeof or;
        isNull: typeof isNull;
        exists: typeof exists;
        sql: typeof sql;
      }
    ) => {
      const { and: andOp, eq: eqOp, ilike: il, or: orOp, exists: existsOp, sql: sqlOp } = ops;
      const parts = [];
      const searchTerm = search?.trim();

      if (searchTerm) {
        if (searchMode === "prefix") {
          const needle = `${searchTerm}%`;
          parts.push(
            orOp(
              il(u.name, needle),
              existsOp(
                dbUser
                  .select({ x: sqlOp`1` })
                  .from(businesses)
                  .where(
                    and(
                      eq(businesses.userId, u.id),
                      ilike(businesses.businessName, needle)
                    )
                  )
              )
            )
          );
        } else {
          const needle = `%${searchTerm}%`;
          parts.push(
            orOp(
              il(u.name, needle),
              il(u.email, needle),
              il(u.phone, needle),
              existsOp(
                dbUser
                  .select({ x: sqlOp`1` })
                  .from(businesses)
                  .where(
                    and(
                      eq(businesses.userId, u.id),
                      or(
                        ilike(businesses.businessName, needle),
                        ilike(businesses.gstNumber, needle)
                      )
                    )
                  )
              )
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
      exists,
      sql,
    });

    const countBase = dbUser.select({ c: count() }).from(users);
    const [totalRow] = baseWhere
      ? await countBase.where(baseWhere)
      : await countBase;
    const total = Number(totalRow?.c ?? 0);

    const hasBusiness = exists(
      dbUser
        .select({ x: sql`1` })
        .from(businesses)
        .where(eq(businesses.userId, users.id))
    );
    const noBusiness = sql`NOT (${hasBusiness})`;

    const bizFilter = baseWhere ? and(baseWhere, hasBusiness) : hasBusiness;
    const [bizRow] = await dbUser.select({ c: count() }).from(users).where(bizFilter);
    const businessCount = Number(bizRow?.c ?? 0);

    const personalFilter = baseWhere ? and(baseWhere, noBusiness) : noBusiness;
    const [persRow] = await dbUser
      .select({ c: count() })
      .from(users)
      .where(personalFilter);
    const personalCount = Number(persRow?.c ?? 0);

    const customers = await dbUser.query.users.findMany({
      // Use pre-built SQL (includes business EXISTS search); relational ops lack exists/sql.
      where: baseWhere ? () => baseWhere : undefined,
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        businesses: {
          with: { billingAddress: true },
          orderBy: (b, { asc: a }) => [a(b.createdAt)],
        },
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

// POST create new customer (optional first business)
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
      business,
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

    const businessPayload = business ?? (
      isBusinessAccount || businessName
        ? {
            businessName,
            gstNumber,
            hasAdditionalTradeName,
            additionalTradeName,
            billingAddress,
          }
        : null
    );

    const wantsBusiness = Boolean(
      businessPayload &&
        (businessPayload.businessName || isBusinessAccount)
    );

    if (wantsBusiness && !businessPayload?.businessName) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 }
      );
    }

    const userId = await generateNextUserId(dbUser);
    const now = new Date();

    await dbUser.transaction(async (tx) => {
      await tx.insert(users).values({
        id: userId,
        name,
        email,
        phone,
        password: null,
        createdAt: now,
        updatedAt: now,
      });

      if (wantsBusiness && businessPayload) {
        const businessId = await generateNextBusinessId(tx as unknown as typeof dbUser);
        await tx.insert(businesses).values({
          id: businessId,
          userId,
          businessName: businessPayload.businessName,
          gstNumber: businessPayload.gstNumber || null,
          hasAdditionalTradeName: Boolean(businessPayload.hasAdditionalTradeName),
          additionalTradeName: businessPayload.hasAdditionalTradeName
            ? businessPayload.additionalTradeName || null
            : null,
          createdAt: now,
          updatedAt: now,
        });

        if (businessPayload.billingAddress) {
          const ba = businessPayload.billingAddress;
          await tx.insert(billingAddresses).values({
            businessId,
            houseNo: ba.houseNo,
            line1: ba.line1,
            line2: ba.line2 || null,
            city: ba.city,
            district: ba.district,
            state: ba.state,
            stateCode: ba.stateCode || null,
            country: ba.country || "India",
            pincode: ba.pincode,
            createdAt: now,
            updatedAt: now,
          });
        }
      }
    });

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        businesses: { with: { billingAddress: true } },
      },
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

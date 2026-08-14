import { NextRequest, NextResponse } from "next/server";
import {
  and,
  count,
  desc,
  eq,
  exists,
  ilike,
  inArray,
  or,
  sql,
  type SQL,
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

    const searchTerm = search?.trim();
    let matchingBusinessUserIds: string[] = [];

    // Resolve business-name / GST matches to userIds first (avoids EXISTS alias bug
    // in drizzle relational queries where "User" is aliased as "users").
    if (searchTerm) {
      const needle =
        searchMode === "prefix" ? `${searchTerm}%` : `%${searchTerm}%`;
      const bizMatch =
        searchMode === "prefix"
          ? ilike(businesses.businessName, needle)
          : or(
              ilike(businesses.businessName, needle),
              ilike(businesses.gstNumber, needle)
            );
      const bizRows = await dbUser
        .selectDistinct({ userId: businesses.userId })
        .from(businesses)
        .where(bizMatch!);
      matchingBusinessUserIds = bizRows.map((r) => r.userId);
    }

    const buildUserFilters = (
      u: typeof users = users
    ): SQL | undefined => {
      const parts: SQL[] = [];

      if (searchTerm) {
        const needle =
          searchMode === "prefix" ? `${searchTerm}%` : `%${searchTerm}%`;
        if (searchMode === "prefix") {
          parts.push(
            or(
              ilike(u.name, needle),
              matchingBusinessUserIds.length > 0
                ? inArray(u.id, matchingBusinessUserIds)
                : sql`false`
            )!
          );
        } else {
          parts.push(
            or(
              ilike(u.name, needle),
              ilike(u.email, needle),
              ilike(u.phone, needle),
              matchingBusinessUserIds.length > 0
                ? inArray(u.id, matchingBusinessUserIds)
                : sql`false`
            )!
          );
        }
      }

      if (suspended !== null && suspended !== undefined) {
        parts.push(eq(u.suspended, suspended === "true"));
      }
      if (terminated !== null && terminated !== undefined) {
        parts.push(eq(u.terminated, terminated === "true"));
      }

      return parts.length > 0 ? and(...parts) : undefined;
    };

    const baseWhere = buildUserFilters(users);

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

    // Page IDs with plain select (correct table refs), then hydrate relations.
    const idQuery = dbUser
      .select({ id: users.id })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(safeLimit)
      .offset((safePage - 1) * safeLimit);
    const idRows = baseWhere ? await idQuery.where(baseWhere) : await idQuery;
    const pageIds = idRows.map((r) => r.id);

    const customers =
      pageIds.length === 0
        ? []
        : await dbUser.query.users.findMany({
            where: (u, { inArray: inArr }) => inArr(u.id, pageIds),
            with: {
              suspensionReasons: {
                orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
              },
              businesses: {
                with: { billingAddress: true },
                orderBy: (b, { asc: a }) => [a(b.createdAt)],
              },
            },
          });

    // Preserve createdAt desc order from the id page query
    const byId = new Map(customers.map((c) => [c.id, c]));
    const ordered = pageIds.map((id) => byId.get(id)).filter(Boolean);

    return NextResponse.json({
      success: true,
      data: ordered,
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

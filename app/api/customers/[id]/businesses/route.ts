import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { generateNextBusinessId } from "@/lib/business-id";
import { dbUser } from "@/lib/db";
import { billingAddresses, businesses, users } from "@/lib/db/user-schema";

type BillingBody = {
  houseNo: string;
  line1: string;
  line2?: string | null;
  city: string;
  district: string;
  state: string;
  stateCode?: string | null;
  country?: string;
  pincode: string;
};

async function loadCustomerBusinesses(userId: string) {
  return dbUser.query.businesses.findMany({
    where: eq(businesses.userId, userId),
    with: { billingAddress: true },
    orderBy: (b, { asc: a }) => [a(b.createdAt)],
  });
}

// GET businesses for a customer
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [user] = await dbUser
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    const data = await loadCustomerBusinesses(id);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error fetching businesses:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST add a business under a customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      businessName,
      gstNumber,
      hasAdditionalTradeName,
      additionalTradeName,
      billingAddress,
    } = body as {
      businessName?: string;
      gstNumber?: string | null;
      hasAdditionalTradeName?: boolean;
      additionalTradeName?: string | null;
      billingAddress?: BillingBody;
    };

    const [user] = await dbUser
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (!businessName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const businessId = await generateNextBusinessId(dbUser);

    await dbUser.transaction(async (tx) => {
      await tx.insert(businesses).values({
        id: businessId,
        userId: id,
        businessName: businessName.trim(),
        gstNumber: gstNumber || null,
        hasAdditionalTradeName: Boolean(hasAdditionalTradeName),
        additionalTradeName: hasAdditionalTradeName
          ? additionalTradeName || null
          : null,
        createdAt: now,
        updatedAt: now,
      });

      if (billingAddress) {
        await tx.insert(billingAddresses).values({
          businessId,
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

    const business = await dbUser.query.businesses.findFirst({
      where: and(eq(businesses.id, businessId), eq(businesses.userId, id)),
      with: { billingAddress: true },
    });

    return NextResponse.json({ success: true, data: business }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating business:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

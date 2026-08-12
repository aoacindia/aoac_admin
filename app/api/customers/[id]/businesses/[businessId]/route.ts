import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { billingAddresses, businesses } from "@/lib/db/user-schema";

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

// PUT update one business
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; businessId: string }> }
) {
  try {
    const { id, businessId } = await params;
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
      billingAddress?: BillingBody | null;
    };

    const [existing] = await dbUser
      .select()
      .from(businesses)
      .where(and(eq(businesses.id, businessId), eq(businesses.userId, id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Business not found" },
        { status: 404 }
      );
    }

    const now = new Date();
    type BusinessPatch = Partial<typeof businesses.$inferInsert>;
    const updateValues: BusinessPatch = { updatedAt: now };

    if (businessName !== undefined) {
      if (!String(businessName).trim()) {
        return NextResponse.json(
          { success: false, error: "Business name is required" },
          { status: 400 }
        );
      }
      updateValues.businessName = String(businessName).trim();
    }
    if (gstNumber !== undefined) updateValues.gstNumber = gstNumber || null;
    if (hasAdditionalTradeName !== undefined) {
      updateValues.hasAdditionalTradeName = Boolean(hasAdditionalTradeName);
    }
    if (additionalTradeName !== undefined) {
      const hasTrade =
        hasAdditionalTradeName !== undefined
          ? Boolean(hasAdditionalTradeName)
          : existing.hasAdditionalTradeName;
      updateValues.additionalTradeName = hasTrade
        ? additionalTradeName || null
        : null;
    }

    await dbUser.transaction(async (tx) => {
      await tx
        .update(businesses)
        .set(updateValues)
        .where(eq(businesses.id, businessId));

      if (billingAddress === null) {
        await tx
          .delete(billingAddresses)
          .where(eq(billingAddresses.businessId, businessId));
      } else if (billingAddress) {
        const [existingBilling] = await tx
          .select({ id: billingAddresses.id })
          .from(billingAddresses)
          .where(eq(billingAddresses.businessId, businessId))
          .limit(1);

        if (existingBilling) {
          await tx
            .update(billingAddresses)
            .set({
              houseNo: billingAddress.houseNo,
              line1: billingAddress.line1,
              line2: billingAddress.line2 || null,
              city: billingAddress.city,
              district: billingAddress.district,
              state: billingAddress.state,
              stateCode: billingAddress.stateCode || null,
              country: billingAddress.country || "India",
              pincode: billingAddress.pincode,
              updatedAt: now,
            })
            .where(eq(billingAddresses.businessId, businessId));
        } else {
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
      }
    });

    const business = await dbUser.query.businesses.findFirst({
      where: and(eq(businesses.id, businessId), eq(businesses.userId, id)),
      with: { billingAddress: true },
    });

    return NextResponse.json({ success: true, data: business });
  } catch (error: unknown) {
    console.error("Error updating business:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE a business (orders keep historical businessId via FK no-action — block if referenced)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; businessId: string }> }
) {
  try {
    const { id, businessId } = await params;

    const [existing] = await dbUser
      .select({ id: businesses.id })
      .from(businesses)
      .where(and(eq(businesses.id, businessId), eq(businesses.userId, id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Business not found" },
        { status: 404 }
      );
    }

    try {
      await dbUser.delete(businesses).where(eq(businesses.id, businessId));
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot delete this business because it is linked to existing orders",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting business:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

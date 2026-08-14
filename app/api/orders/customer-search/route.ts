import { NextRequest, NextResponse } from "next/server";
import { asc, eq, ilike, or } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { businesses, users } from "@/lib/db/user-schema";
import { requireAdminApi } from "@/lib/require-admin";

export type OrderCustomerSearchOption = {
  key: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  businessId: string | null;
  businessName: string | null;
  gstNumber: string | null;
  label: string;
};

function personalLabel(user: { name: string; email: string; phone: string }) {
  return `${user.name} — Personal (${user.email})`;
}

function businessLabel(
  business: { businessName: string; gstNumber: string | null },
  user: { name: string }
) {
  const gst = business.gstNumber ? ` — GST: ${business.gstNumber}` : "";
  return `${business.businessName}${gst} (${user.name})`;
}

// GET — search customers/businesses for order creation picker
export async function GET(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "50"), 1),
      100
    );

    const options: OrderCustomerSearchOption[] = [];
    const seenKeys = new Set<string>();

    const pushOption = (opt: OrderCustomerSearchOption) => {
      if (seenKeys.has(opt.key)) return;
      seenKeys.add(opt.key);
      options.push(opt);
    };

    if (search) {
      const needle = `%${search}%`;

      const matchingBusinesses = await dbUser
        .select({
          businessId: businesses.id,
          businessName: businesses.businessName,
          gstNumber: businesses.gstNumber,
          userId: users.id,
          userName: users.name,
          userEmail: users.email,
          userPhone: users.phone,
        })
        .from(businesses)
        .innerJoin(users, eq(businesses.userId, users.id))
        .where(
          or(
            ilike(businesses.businessName, needle),
            ilike(businesses.gstNumber, needle)
          )
        )
        .orderBy(asc(businesses.businessName))
        .limit(limit);

      for (const row of matchingBusinesses) {
        pushOption({
          key: `business:${row.businessId}`,
          userId: row.userId,
          userName: row.userName,
          userEmail: row.userEmail,
          userPhone: row.userPhone,
          businessId: row.businessId,
          businessName: row.businessName,
          gstNumber: row.gstNumber,
          label: businessLabel(row, { name: row.userName }),
        });
      }

      const matchingUsers = await dbUser.query.users.findMany({
        where: (u, { or: orOp, ilike: il }) =>
          orOp(
            il(u.name, needle),
            il(u.email, needle),
            il(u.phone, needle)
          ),
        with: {
          businesses: {
            orderBy: (b, { asc: a }) => [a(b.businessName)],
          },
        },
        orderBy: (u, { asc: a }) => [a(u.name)],
        limit,
      });

      for (const user of matchingUsers) {
        pushOption({
          key: `personal:${user.id}`,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
          businessId: null,
          businessName: null,
          gstNumber: null,
          label: personalLabel(user),
        });

        for (const biz of user.businesses) {
          pushOption({
            key: `business:${biz.id}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            businessId: biz.id,
            businessName: biz.businessName,
            gstNumber: biz.gstNumber,
            label: businessLabel(biz, user),
          });
        }
      }
    } else {
      const recentUsers = await dbUser.query.users.findMany({
        with: {
          businesses: {
            orderBy: (b, { asc: a }) => [a(b.businessName)],
          },
        },
        orderBy: (u, { desc: d }) => [d(u.createdAt)],
        limit,
      });

      for (const user of recentUsers) {
        pushOption({
          key: `personal:${user.id}`,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
          businessId: null,
          businessName: null,
          gstNumber: null,
          label: personalLabel(user),
        });

        for (const biz of user.businesses) {
          pushOption({
            key: `business:${biz.id}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            businessId: biz.id,
            businessName: biz.businessName,
            gstNumber: biz.gstNumber,
            label: businessLabel(biz, user),
          });
        }
      }
    }

    options.sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({
      success: true,
      data: options.slice(0, limit),
    });
  } catch (error: unknown) {
    console.error("Error searching order customers:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

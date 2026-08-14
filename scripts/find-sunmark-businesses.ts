/**
 * One-off investigation: businesses whose name starts with "Sunmark".
 *
 * Table: "Business" (user/storefront DB)
 * Name column: "businessName"
 * Owner column: "userId" → "User"."id" (many businesses per user)
 *
 * Run:
 *   npx tsx --env-file=.env.local scripts/find-sunmark-businesses.ts
 * or with DATABASE_URL already in the environment:
 *   npx tsx scripts/find-sunmark-businesses.ts
 */

import { asc, ilike } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { businesses } from "../lib/db/user-schema";

const NAME_PREFIX = "Sunmark";

function escapeIlikePrefix(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

export async function findBusinessesByNamePrefix(prefix: string) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const db = drizzle(neon(url));
  const pattern = `${escapeIlikePrefix(prefix)}%`;

  const rows = await db
    .select({
      businessId: businesses.id,
      businessName: businesses.businessName,
      userId: businesses.userId,
    })
    .from(businesses)
    .where(ilike(businesses.businessName, pattern))
    .orderBy(asc(businesses.userId), asc(businesses.businessName), asc(businesses.id));

  return { total: rows.length, businesses: rows };
}

async function main() {
  const { total, businesses: rows } = await findBusinessesByNamePrefix(NAME_PREFIX);

  console.log(`Total businesses whose name starts with "${NAME_PREFIX}": ${total}`);
  console.log("");
  console.log("Business ID\tBusiness Name\tUser ID");

  const byUser = new Map<string, typeof rows>();
  for (const row of rows) {
    console.log(`${row.businessId}\t${row.businessName}\t${row.userId}`);
    const list = byUser.get(row.userId) ?? [];
    list.push(row);
    byUser.set(row.userId, list);
  }

  const sharedOwners = [...byUser.entries()].filter(([, list]) => list.length > 1);
  if (sharedOwners.length > 0) {
    console.log("");
    console.log("Users with more than one matching business:");
    for (const [userId, list] of sharedOwners) {
      console.log(`  userId ${userId} (${list.length} businesses):`);
      for (const b of list) {
        console.log(`    - ${b.businessId} | ${b.businessName}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

/**
 * Read-only inspection for Sunmark consolidation. Does not write.
 */

import { neon } from "@neondatabase/serverless";

const TARGET_USER_ID = "BS20265";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = neon(url);

  const addressColumns = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Address'
    ORDER BY ordinal_position
  `;

  const userRows = await sql`
    SELECT id, name, email, phone
    FROM "User"
    WHERE id IN ('BS20265', 'BS20266', 'BS20268', 'BS20269')
    ORDER BY id
  `;

  const biz = await sql`
    SELECT id, "businessName", "userId"
    FROM "Business"
    WHERE id IN ('BZ20268', 'BZ20269', 'BZ202611', 'BZ202612')
    ORDER BY id
  `;

  const orderRows = await sql`
    SELECT id, "orderBy", "businessId", "shippingAddressId", status, "InvoiceNumber"
    FROM "Order"
    WHERE "businessId" IN ('BZ20268', 'BZ20269', 'BZ202611', 'BZ202612')
    ORDER BY "orderBy", id
  `;

  const ordersByUsers = await sql`
    SELECT id, "orderBy", "businessId", "shippingAddressId", status
    FROM "Order"
    WHERE "orderBy" IN ('BS20265', 'BS20266', 'BS20268', 'BS20269')
    ORDER BY "orderBy", id
  `;

  const addressRows = await sql`
    SELECT id, "userId", type, name, city, pincode, "isDefault", "houseNo", line1
    FROM "Address"
    WHERE "userId" IN ('BS20265', 'BS20266', 'BS20268', 'BS20269')
    ORDER BY "userId", id
  `;

  const billing = await sql`
    SELECT ba.id, ba."businessId", b."userId", b."businessName"
    FROM "BillingAddress" ba
    JOIN "Business" b ON b.id = ba."businessId"
    WHERE b.id IN ('BZ20268', 'BZ20269', 'BZ202611', 'BZ202612')
    ORDER BY b."userId"
  `;

  const otherUserTables = await sql`
    SELECT
      (SELECT count(*) FROM "Cart" WHERE "userId" IN ('BS20265','BS20266','BS20268','BS20269')) AS cart,
      (SELECT count(*) FROM "BulkCart" WHERE "userId" IN ('BS20265','BS20266','BS20268','BS20269')) AS bulk_cart,
      (SELECT count(*) FROM "PasswordReset" WHERE "userId" IN ('BS20265','BS20266','BS20268','BS20269')) AS password_reset,
      (SELECT count(*) FROM "SuspensionReason" WHERE "userId" IN ('BS20265','BS20266','BS20268','BS20269')) AS suspension
  `;

  console.log("=== Address table columns ===");
  console.log(JSON.stringify(addressColumns, null, 2));

  console.log("\n=== Users ===");
  console.log(JSON.stringify(userRows, null, 2));

  console.log("\n=== Businesses ===");
  console.log(JSON.stringify(biz, null, 2));

  console.log("\n=== Orders linked by businessId (these 4 businesses) ===");
  console.log(`count=${orderRows.length}`);
  console.log(JSON.stringify(orderRows, null, 2));

  console.log("\n=== Orders linked by orderBy (these 4 user IDs) ===");
  console.log(`count=${ordersByUsers.length}`);
  const businessIds = new Set(["BZ20268", "BZ20269", "BZ202611", "BZ202612"]);
  const mismatch = ordersByUsers.filter(
    (o) => o.businessId && !businessIds.has(String(o.businessId))
  );
  const noBusiness = ordersByUsers.filter((o) => !o.businessId);
  console.log(`orders with other businessId=${mismatch.length}`);
  console.log(`orders with null businessId=${noBusiness.length}`);
  if (mismatch.length) console.log(JSON.stringify(mismatch, null, 2));
  if (noBusiness.length) console.log("null-business orders:", JSON.stringify(noBusiness, null, 2));

  const orderByCounts: Record<string, number> = {};
  for (const o of orderRows) {
    const key = String(o.orderBy);
    orderByCounts[key] = (orderByCounts[key] ?? 0) + 1;
  }
  console.log("\norderBy counts for the 4-business orders:", orderByCounts);
  const alreadyTarget = orderRows.filter((o) => o.orderBy === TARGET_USER_ID).length;
  const wouldChange = orderRows.filter((o) => o.orderBy !== TARGET_USER_ID).length;
  console.log(`already orderBy=${TARGET_USER_ID}: ${alreadyTarget}`);
  console.log(`would change orderBy -> ${TARGET_USER_ID}: ${wouldChange}`);

  console.log("\n=== Addresses for these 4 user IDs ===");
  console.log(`count=${addressRows.length}`);
  console.log(JSON.stringify(addressRows, null, 2));

  console.log("\n=== BillingAddress for these 4 businesses ===");
  console.log(JSON.stringify(billing, null, 2));

  console.log("\n=== Other tables for these 4 user IDs ===");
  console.log(JSON.stringify(otherUserTables, null, 2));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

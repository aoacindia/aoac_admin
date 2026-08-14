/**
 * Consolidate Sunmark duplicate accounts onto BS20265, then delete the others.
 * Run: npx tsx --env-file=.env scripts/consolidate-sunmark-users.ts
 */

import { neon } from "@neondatabase/serverless";

const TARGET_USER_ID = "BS20265";
const OLD_USER_IDS = ["BS20266", "BS20268", "BS20269"] as const;
const MOVE_BUSINESS_IDS = ["BZ20269", "BZ202611", "BZ202612"] as const;
const KEEP_BUSINESS_ID = "BZ20268";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = neon(url);

  const fks = await sql`
    SELECT
      tc.table_name,
      kcu.column_name,
      rc.delete_rule
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.referential_constraints rc
      ON tc.constraint_name = rc.constraint_name
      AND tc.table_schema = rc.constraint_schema
    JOIN information_schema.constraint_column_usage ccu
      ON rc.unique_constraint_name = ccu.constraint_name
      AND rc.unique_constraint_schema = ccu.constraint_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_name = 'User'
      AND ccu.column_name = 'id'
    ORDER BY tc.table_name, kcu.column_name
  `;

  const before = await sql`
    SELECT
      (SELECT count(*)::int FROM "Business" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS businesses_to_move,
      (SELECT count(*)::int FROM "Order" WHERE "orderBy" = ANY(${[...OLD_USER_IDS]})) AS orders_to_move,
      (SELECT count(*)::int FROM "Address" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS addresses_to_move,
      (SELECT count(*)::int FROM "Cart" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS carts,
      (SELECT count(*)::int FROM "BulkCart" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS bulk_carts,
      (SELECT count(*)::int FROM "PasswordReset" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS password_resets,
      (SELECT count(*)::int FROM "SuspensionReason" WHERE "userId" = ANY(${[...OLD_USER_IDS]})) AS suspensions,
      (SELECT count(*)::int FROM "User" WHERE id = ANY(${[...OLD_USER_IDS]})) AS users_to_delete,
      (SELECT count(*)::int FROM "User" WHERE id = ${TARGET_USER_ID}) AS target_user_exists,
      (SELECT count(*)::int FROM "Business" WHERE id = ANY(${[...MOVE_BUSINESS_IDS]}) AND "userId" = ANY(${[...OLD_USER_IDS]})) AS expected_businesses,
      (SELECT count(*)::int FROM "Business" WHERE "userId" = ANY(${[...OLD_USER_IDS]}) AND id <> ALL(${[...MOVE_BUSINESS_IDS]})) AS unexpected_businesses
  `;

  console.log("FKs referencing User.id:", JSON.stringify(fks, null, 2));
  console.log("Before:", JSON.stringify(before[0], null, 2));

  const counts = before[0];
  if (counts.target_user_exists !== 1) {
    throw new Error(`Target user ${TARGET_USER_ID} not found`);
  }
  if (counts.users_to_delete !== 3) {
    throw new Error(`Expected 3 users to delete, found ${counts.users_to_delete}`);
  }
  if (counts.expected_businesses !== 3 || counts.unexpected_businesses !== 0) {
    throw new Error("Business ownership is not the expected 3 hotel businesses");
  }
  if (counts.orders_to_move !== 21) {
    throw new Error(`Expected 21 orders to move, found ${counts.orders_to_move}`);
  }
  if (counts.addresses_to_move !== 5) {
    throw new Error(`Expected 5 addresses to move, found ${counts.addresses_to_move}`);
  }
  if (counts.carts !== 0 || counts.bulk_carts !== 0) {
    throw new Error("Unexpected cart data on users being deleted");
  }

  const [movedBusinesses, movedOrders, movedAddresses, deletedUsers] =
    await sql.transaction([
      sql`
        UPDATE "Business"
        SET "userId" = ${TARGET_USER_ID}, "updatedAt" = now()
        WHERE id = ANY(${[...MOVE_BUSINESS_IDS]})
          AND "userId" = ANY(${[...OLD_USER_IDS]})
        RETURNING id, "businessName", "userId"
      `,
      sql`
        UPDATE "Order"
        SET "orderBy" = ${TARGET_USER_ID}
        WHERE "orderBy" = ANY(${[...OLD_USER_IDS]})
        RETURNING id, "orderBy", "businessId"
      `,
      sql`
        UPDATE "Address"
        SET "userId" = ${TARGET_USER_ID}, "isDefault" = false, "updatedAt" = now()
        WHERE "userId" = ANY(${[...OLD_USER_IDS]})
        RETURNING id, "userId", "isDefault"
      `,
      sql`
        DELETE FROM "User"
        WHERE id = ANY(${[...OLD_USER_IDS]})
        RETURNING id, email
      `,
    ]);

  console.log(`Moved businesses: ${movedBusinesses.length}`);
  console.log(`Moved orders: ${movedOrders.length}`);
  console.log(`Moved addresses: ${movedAddresses.length}`);
  console.log(`Deleted users: ${deletedUsers.length}`, deletedUsers);

  const after = await sql`
    SELECT
      (SELECT count(*)::int FROM "User" WHERE id = ANY(${[...OLD_USER_IDS]})) AS leftover_users,
      (SELECT count(*)::int FROM "Business" WHERE "userId" = ${TARGET_USER_ID}) AS businesses_on_target,
      (SELECT count(*)::int FROM "Order" WHERE "orderBy" = ${TARGET_USER_ID}) AS orders_on_target,
      (SELECT count(*)::int FROM "Address" WHERE "userId" = ${TARGET_USER_ID}) AS addresses_on_target,
      (SELECT count(*)::int FROM "Address" WHERE "userId" = ${TARGET_USER_ID} AND "isDefault" = true) AS default_addresses,
      (SELECT count(*)::int FROM "Business" WHERE id = ${KEEP_BUSINESS_ID} AND "userId" = ${TARGET_USER_ID}) AS hospitality_kept
  `;

  const businesses = await sql`
    SELECT id, "businessName", "userId"
    FROM "Business"
    WHERE "userId" = ${TARGET_USER_ID}
    ORDER BY id
  `;

  const addresses = await sql`
    SELECT id, "userId", name, city, pincode, "isDefault"
    FROM "Address"
    WHERE "userId" = ${TARGET_USER_ID}
    ORDER BY "isDefault" DESC, id
  `;

  const orderByBusiness = await sql`
    SELECT "businessId", count(*)::int AS n
    FROM "Order"
    WHERE "orderBy" = ${TARGET_USER_ID}
    GROUP BY "businessId"
    ORDER BY "businessId"
  `;

  console.log("After:", JSON.stringify(after[0], null, 2));
  console.log("Businesses on target:", JSON.stringify(businesses, null, 2));
  console.log("Addresses on target:", JSON.stringify(addresses, null, 2));
  console.log("Orders by business:", JSON.stringify(orderByBusiness, null, 2));

  if (after[0].leftover_users !== 0) {
    throw new Error("Delete did not remove all three users");
  }
  if (after[0].businesses_on_target !== 4) {
    throw new Error(`Expected 4 businesses on target, found ${after[0].businesses_on_target}`);
  }
  if (after[0].orders_on_target !== 27) {
    throw new Error(`Expected 27 orders on target, found ${after[0].orders_on_target}`);
  }
  if (after[0].addresses_on_target !== 6) {
    throw new Error(`Expected 6 addresses on target, found ${after[0].addresses_on_target}`);
  }
  if (after[0].default_addresses !== 1) {
    throw new Error(`Expected 1 default address, found ${after[0].default_addresses}`);
  }

  console.log("Consolidation complete.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

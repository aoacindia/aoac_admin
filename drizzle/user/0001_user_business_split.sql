-- Split User business fields into Business; link orders + billing; add isBillToSameAsShipping.
-- Safe migration: copy → verify → drop. Runs as one transactional unit via drizzle.

BEGIN;

-- 1) Business table
CREATE TABLE IF NOT EXISTS "Business" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"businessName" text NOT NULL,
	"gstNumber" text,
	"hasAdditionalTradeName" boolean DEFAULT false NOT NULL,
	"additionalTradeName" text,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "Business"
    ADD CONSTRAINT "Business_userId_User_id_fk"
    FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "Business_userId_idx" ON "Business" USING btree ("userId");
CREATE INDEX IF NOT EXISTS "Business_businessName_idx" ON "Business" USING btree ("businessName");
CREATE INDEX IF NOT EXISTS "Business_gstNumber_idx" ON "Business" USING btree ("gstNumber");

-- 2) Backfill one Business per existing business-flagged / business-data user
-- IDs: BZ + year-from-user-createdAt + per-year sequence
WITH candidates AS (
  SELECT
    u."id" AS "userId",
    COALESCE(NULLIF(TRIM(u."businessName"), ''), u."name") AS "businessName",
    u."gstNumber",
    COALESCE(u."hasAdditionalTradeName", false) AS "hasAdditionalTradeName",
    u."additionalTradeName",
    u."createdAt",
    u."updatedAt",
    EXTRACT(YEAR FROM u."createdAt")::int AS yr
  FROM "User" u
  WHERE COALESCE(u."isBusinessAccount", false) = true
     OR NULLIF(TRIM(u."businessName"), '') IS NOT NULL
     OR NULLIF(TRIM(u."gstNumber"), '') IS NOT NULL
     OR NULLIF(TRIM(u."additionalTradeName"), '') IS NOT NULL
),
numbered AS (
  SELECT
    c.*,
    ROW_NUMBER() OVER (PARTITION BY c.yr ORDER BY c."createdAt", c."userId") AS seq
  FROM candidates c
  WHERE NOT EXISTS (
    SELECT 1 FROM "Business" b WHERE b."userId" = c."userId"
  )
)
INSERT INTO "Business" (
  "id", "userId", "businessName", "gstNumber",
  "hasAdditionalTradeName", "additionalTradeName",
  "createdAt", "updatedAt"
)
SELECT
  'BZ' || yr::text || seq::text,
  "userId",
  "businessName",
  "gstNumber",
  "hasAdditionalTradeName",
  "additionalTradeName",
  "createdAt",
  "updatedAt"
FROM numbered;

-- 3) Order.businessId + isBillToSameAsShipping
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "businessId" text;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "isBillToSameAsShipping" boolean DEFAULT true NOT NULL;

DO $$ BEGIN
  ALTER TABLE "Order"
    ADD CONSTRAINT "Order_businessId_Business_id_fk"
    FOREIGN KEY ("businessId") REFERENCES "public"."Business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "Order_businessId_idx" ON "Order" USING btree ("businessId");

UPDATE "Order" o
SET "businessId" = b."id"
FROM "Business" b
WHERE o."orderBy" = b."userId"
  AND o."businessId" IS NULL;

UPDATE "Order"
SET "isBillToSameAsShipping" = true
WHERE "isBillToSameAsShipping" IS NULL;

-- 4) BillingAddress: add businessId, backfill, switch FK off userId
ALTER TABLE "BillingAddress" ADD COLUMN IF NOT EXISTS "businessId" text;

UPDATE "BillingAddress" ba
SET "businessId" = b."id"
FROM "Business" b
WHERE ba."userId" = b."userId"
  AND ba."businessId" IS NULL;

-- Orphan billing rows without a business: create a business from the user so no data is lost
WITH orphans AS (
  SELECT ba."id" AS billing_id, ba."userId", u."name", u."createdAt", u."updatedAt",
         EXTRACT(YEAR FROM COALESCE(u."createdAt", now()))::int AS yr
  FROM "BillingAddress" ba
  JOIN "User" u ON u."id" = ba."userId"
  WHERE ba."businessId" IS NULL
),
next_seq AS (
  SELECT
    o.*,
    COALESCE((
      SELECT MAX(NULLIF(regexp_replace(b."id", '^BZ' || o.yr::text, ''), '')::int)
      FROM "Business" b
      WHERE b."id" LIKE 'BZ' || o.yr::text || '%'
    ), 0) + ROW_NUMBER() OVER (PARTITION BY o.yr ORDER BY o.billing_id) AS seq
  FROM orphans o
),
inserted AS (
  INSERT INTO "Business" (
    "id", "userId", "businessName", "gstNumber",
    "hasAdditionalTradeName", "additionalTradeName",
    "createdAt", "updatedAt"
  )
  SELECT
    'BZ' || yr::text || seq::text,
    "userId",
    "name",
    NULL,
    false,
    NULL,
    "createdAt",
    "updatedAt"
  FROM next_seq
  RETURNING "id", "userId"
)
UPDATE "BillingAddress" ba
SET "businessId" = i."id"
FROM inserted i
WHERE ba."userId" = i."userId"
  AND ba."businessId" IS NULL;

-- Drop old user unique/index/fk, enforce business link
ALTER TABLE "BillingAddress" DROP CONSTRAINT IF EXISTS "BillingAddress_userId_User_id_fk";
DROP INDEX IF EXISTS "BillingAddress_userId_key";
DROP INDEX IF EXISTS "BillingAddress_userId_idx";

-- Only drop userId after businessId is populated
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "BillingAddress" WHERE "businessId" IS NULL
  ) THEN
    RAISE EXCEPTION 'BillingAddress backfill incomplete: null businessId remains';
  END IF;
END $$;

ALTER TABLE "BillingAddress" ALTER COLUMN "businessId" SET NOT NULL;

DO $$ BEGIN
  ALTER TABLE "BillingAddress"
    ADD CONSTRAINT "BillingAddress_businessId_Business_id_fk"
    FOREIGN KEY ("businessId") REFERENCES "public"."Business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "BillingAddress_businessId_key" ON "BillingAddress" USING btree ("businessId");
CREATE INDEX IF NOT EXISTS "BillingAddress_businessId_idx" ON "BillingAddress" USING btree ("businessId");

ALTER TABLE "BillingAddress" DROP COLUMN IF EXISTS "userId";

-- 5) Verify business field copy before dropping User columns
DO $$
DECLARE
  src_count int;
  dst_count int;
BEGIN
  SELECT COUNT(*) INTO src_count
  FROM "User" u
  WHERE COALESCE(u."isBusinessAccount", false) = true
     OR NULLIF(TRIM(u."businessName"), '') IS NOT NULL
     OR NULLIF(TRIM(u."gstNumber"), '') IS NOT NULL
     OR NULLIF(TRIM(u."additionalTradeName"), '') IS NOT NULL;

  SELECT COUNT(DISTINCT b."userId") INTO dst_count FROM "Business" b;

  IF dst_count < src_count THEN
    RAISE EXCEPTION 'Business backfill incomplete: expected at least % users with businesses, found %', src_count, dst_count;
  END IF;
END $$;

-- 6) Drop business columns from User (account columns name/email/phone/etc. untouched)
ALTER TABLE "User" DROP COLUMN IF EXISTS "isBusinessAccount";
ALTER TABLE "User" DROP COLUMN IF EXISTS "businessName";
ALTER TABLE "User" DROP COLUMN IF EXISTS "gstNumber";
ALTER TABLE "User" DROP COLUMN IF EXISTS "hasAdditionalTradeName";
ALTER TABLE "User" DROP COLUMN IF EXISTS "additionalTradeName";

COMMIT;

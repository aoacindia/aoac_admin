CREATE TABLE IF NOT EXISTS "OfficeDocument" (
	"id" text PRIMARY KEY NOT NULL,
	"officeId" text NOT NULL,
	"docType" text NOT NULL,
	"name" text NOT NULL,
	"filePath" text NOT NULL,
	"originalFilename" text,
	"mimeType" text,
	"fileSize" integer,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "OfficeDocument"
    ADD CONSTRAINT "OfficeDocument_officeId_Office_id_fk"
    FOREIGN KEY ("officeId") REFERENCES "public"."Office"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "OfficeDocument_officeId_idx" ON "OfficeDocument" USING btree ("officeId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "OfficeDocument_docType_idx" ON "OfficeDocument" USING btree ("docType");

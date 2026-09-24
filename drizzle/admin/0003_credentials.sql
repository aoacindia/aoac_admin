CREATE TABLE IF NOT EXISTS "Credential" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"ciphertext" text NOT NULL,
	"iv" text NOT NULL,
	"authTag" text NOT NULL,
	"createdByUserId" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CredentialUnlock" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"email" text NOT NULL,
	"challengeToken" text NOT NULL,
	"otp" text NOT NULL,
	"unlockTokenHash" text,
	"expiresAt" timestamp (3) NOT NULL,
	"unlockExpiresAt" timestamp (3),
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Credential_createdByUserId_idx" ON "Credential" USING btree ("createdByUserId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Credential_title_idx" ON "Credential" USING btree ("title");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CredentialUnlock_challengeToken_key" ON "CredentialUnlock" USING btree ("challengeToken");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CredentialUnlock_userId_idx" ON "CredentialUnlock" USING btree ("userId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CredentialUnlock_email_idx" ON "CredentialUnlock" USING btree ("email");

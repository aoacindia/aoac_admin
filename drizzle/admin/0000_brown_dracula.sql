CREATE TYPE "public"."AdminRole" AS ENUM('ADMIN', 'MANAGER', 'STAFF');--> statement-breakpoint
CREATE TABLE "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountHolderName" text NOT NULL,
	"accountNumber" text NOT NULL,
	"ifsc" text NOT NULL,
	"branch" text NOT NULL,
	"swiftCode" text,
	"bankName" text NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OtpVerification" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"token" text NOT NULL,
	"otp" text NOT NULL,
	"expiresAt" timestamp (3) NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "AdminRole" DEFAULT 'STAFF' NOT NULL,
	"suspended" boolean DEFAULT false NOT NULL,
	"suspended_number" integer DEFAULT 0 NOT NULL,
	"terminated" boolean DEFAULT false NOT NULL,
	"phone" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "EmailAccount" (
	"id" text PRIMARY KEY NOT NULL,
	"fromEmail" text NOT NULL,
	"smtpHost" text DEFAULT 'smtp.hostinger.com' NOT NULL,
	"smtpPort" integer DEFAULT 587 NOT NULL,
	"smtpUser" text NOT NULL,
	"smtpPassword" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ImportedOrderItem" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"line_index" integer NOT NULL,
	"item_name" text NOT NULL,
	"amount" numeric(14, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ImportedOrder" (
	"id" text PRIMARY KEY NOT NULL,
	"order_date" timestamp (3) NOT NULL,
	"order_name" text NOT NULL,
	"delivery_charges" numeric(14, 2) NOT NULL,
	"order_total" numeric(14, 2) NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Office" (
	"id" text PRIMARY KEY NOT NULL,
	"gstin" text NOT NULL,
	"address" text NOT NULL,
	"city" text,
	"state" text NOT NULL,
	"stateCode" text NOT NULL,
	"pincode" text,
	"country" text,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ImportedOrderItem" ADD CONSTRAINT "ImportedOrderItem_order_id_ImportedOrder_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."ImportedOrder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "OtpVerification_token_key" ON "OtpVerification" USING btree ("token");--> statement-breakpoint
CREATE INDEX "OtpVerification_email_idx" ON "OtpVerification" USING btree ("email");--> statement-breakpoint
CREATE INDEX "OtpVerification_token_idx" ON "OtpVerification" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "User_phone_key" ON "User" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "EmailAccount_isActive_idx" ON "EmailAccount" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "ImportedOrderItem_orderId_idx" ON "ImportedOrderItem" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "ImportedOrder_orderDate_idx" ON "ImportedOrder" USING btree ("order_date");--> statement-breakpoint
CREATE INDEX "ImportedOrder_orderName_idx" ON "ImportedOrder" USING btree ("order_name");--> statement-breakpoint
CREATE UNIQUE INDEX "Office_gstin_key" ON "Office" USING btree ("gstin");
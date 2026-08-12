import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const adminRoleEnum = pgEnum("AdminRole", ["ADMIN", "MANAGER", "STAFF"]);

export type AdminRole = "ADMIN" | "MANAGER" | "STAFF";

/** Dashboard admin users (`User` table — admin DB) */
export const adminUsers = pgTable(
  "User",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: adminRoleEnum("role").notNull().default("STAFF"),
    suspended: boolean("suspended").notNull().default(false),
    suspended_number: integer("suspended_number").notNull().default(0),
    terminated: boolean("terminated").notNull().default(false),
    phone: text("phone").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    uniqueIndex("User_email_key").on(t.email),
    uniqueIndex("User_phone_key").on(t.phone),
  ]
);

export const adminOtpVerifications = pgTable(
  "OtpVerification",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    email: text("email"),
    token: text("token").notNull(),
    otp: text("otp").notNull(),
    expiresAt: timestamp("expiresAt", { precision: 3, mode: "date" }).notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    uniqueIndex("OtpVerification_token_key").on(t.token),
    index("OtpVerification_email_idx").on(t.email),
    index("OtpVerification_token_idx").on(t.token),
  ]
);

export const offices = pgTable(
  "Office",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    gstin: text("gstin").notNull(),
    address: text("address").notNull(),
    city: text("city"),
    state: text("state").notNull(),
    stateCode: text("stateCode").notNull(),
    pincode: text("pincode"),
    country: text("country"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [uniqueIndex("Office_gstin_key").on(t.gstin)]
);

/** Company legal / administration profile (singleton row in practice) */
export const companyAdministration = pgTable("CompanyAdministration", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  companyName: text("companyName").notNull().default(""),
  addressLine: text("addressLine").notNull().default(""),
  city: text("city").notNull().default(""),
  district: text("district").notNull().default(""),
  state: text("state").notNull().default(""),
  stateCode: text("stateCode").notNull().default(""),
  pincode: text("pincode").notNull().default(""),
  country: text("country").notNull().default("India"),
  uin: text("uin").notNull().default(""),
  pan: text("pan").notNull().default(""),
  tin: text("tin").notNull().default(""),
  /** Relative paths on internalfiles.aoac.in (not public URLs) */
  panDocumentPath: text("panDocumentPath"),
  tinDocumentPath: text("tinDocumentPath"),
  certificateOfIncorporationPath: text("certificateOfIncorporationPath"),
  memorandumOfAssociationPath: text("memorandumOfAssociationPath"),
  articlesOfAssociationPath: text("articlesOfAssociationPath"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
});

export const accounts = pgTable("Account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  accountHolderName: text("accountHolderName").notNull(),
  accountNumber: text("accountNumber").notNull(),
  ifsc: text("ifsc").notNull(),
  branch: text("branch").notNull(),
  swiftCode: text("swiftCode"),
  bankName: text("bankName").notNull(),
  isDefault: boolean("default").notNull().default(false),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
});

export const emailAccounts = pgTable(
  "EmailAccount",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    fromEmail: text("fromEmail").notNull(),
    smtpHost: text("smtpHost").notNull().default("smtp.hostinger.com"),
    smtpPort: integer("smtpPort").notNull().default(587),
    smtpUser: text("smtpUser").notNull(),
    smtpPassword: text("smtpPassword").notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("EmailAccount_isActive_idx").on(t.isActive)]
);

export const importedOrders = pgTable(
  "ImportedOrder",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    orderDate: timestamp("order_date", { precision: 3, mode: "date" }).notNull(),
    orderName: text("order_name").notNull(),
    deliveryCharges: decimal("delivery_charges", {
      precision: 14,
      scale: 2,
    }).notNull(),
    orderTotal: decimal("order_total", { precision: 14, scale: 2 }).notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    index("ImportedOrder_orderDate_idx").on(t.orderDate),
    index("ImportedOrder_orderName_idx").on(t.orderName),
  ]
);

export const importedOrderItems = pgTable(
  "ImportedOrderItem",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    orderId: text("order_id")
      .notNull()
      .references(() => importedOrders.id, { onDelete: "cascade" }),
    lineIndex: integer("line_index").notNull(),
    itemName: text("item_name").notNull(),
    amount: decimal("amount", { precision: 14, scale: 2 }).notNull(),
  },
  (t) => [index("ImportedOrderItem_orderId_idx").on(t.orderId)]
);

export const importedOrdersRelations = relations(importedOrders, ({ many }) => ({
  items: many(importedOrderItems),
}));

export const importedOrderItemsRelations = relations(importedOrderItems, ({ one }) => ({
  order: one(importedOrders, {
    fields: [importedOrderItems.orderId],
    references: [importedOrders.id],
  }),
}));

export type AdminUserRow = typeof adminUsers.$inferSelect;
export type NewAdminUserRow = typeof adminUsers.$inferInsert;
export type OfficeRow = typeof offices.$inferSelect;
export type NewOfficeRow = typeof offices.$inferInsert;
export type CompanyAdministrationRow = typeof companyAdministration.$inferSelect;
export type NewCompanyAdministrationRow = typeof companyAdministration.$inferInsert;
export type AccountRow = typeof accounts.$inferSelect;
export type NewAccountRow = typeof accounts.$inferInsert;
export type EmailAccountRow = typeof emailAccounts.$inferSelect;
export type NewEmailAccountRow = typeof emailAccounts.$inferInsert;
export type ImportedOrderRow = typeof importedOrders.$inferSelect;
export type NewImportedOrderRow = typeof importedOrders.$inferInsert;
export type ImportedOrderItemRow = typeof importedOrderItems.$inferSelect;
export type NewImportedOrderItemRow = typeof importedOrderItems.$inferInsert;

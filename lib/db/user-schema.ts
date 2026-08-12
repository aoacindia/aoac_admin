import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const orderStatusEnum = pgEnum("OrderStatus", [
  "PENDING",
  "ORDER_READY",
  "PAYMENT_PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "ORDER_SHIPPED_WITHOUT_PAYMENT",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]);

/** Application users / customers (`User` table) — account only */
export const users = pgTable(
  "User",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    suspended: boolean("suspended").notNull().default(false),
    suspended_number: integer("suspended_number").notNull().default(0),
    terminated: boolean("terminated").notNull().default(false),
    phone: text("phone").notNull(),
    password: text("password"),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "date",
    }).notNull(),
  },
  (table) => [uniqueIndex("User_email_key").on(table.email), uniqueIndex("User_phone_key").on(table.phone)]
);

/** Businesses belonging to a user (many per account) */
export const businesses = pgTable(
  "Business",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    businessName: text("businessName").notNull(),
    gstNumber: text("gstNumber"),
    hasAdditionalTradeName: boolean("hasAdditionalTradeName").notNull().default(false),
    additionalTradeName: text("additionalTradeName"),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "date",
    }).notNull(),
  },
  (t) => [
    index("Business_userId_idx").on(t.userId),
    index("Business_businessName_idx").on(t.businessName),
    index("Business_gstNumber_idx").on(t.gstNumber),
  ]
);

/** Storefront OTP verification (distinct from admin DB) */
export const userOtpVerifications = pgTable(
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

export const carts = pgTable(
  "Cart",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    productId: text("productId").notNull(),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    index("cart_user_product_idx").on(t.userId, t.productId),
    index("Cart_userId_idx").on(t.userId),
  ]
);

export const bulkCarts = pgTable(
  "BulkCart",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    productId: text("productId").notNull(),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    index("bulk_cart_user_product_idx").on(t.userId, t.productId),
    index("BulkCart_userId_idx").on(t.userId),
  ]
);

export const addresses = pgTable(
  "Address",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    type: text("type").notNull(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    houseNo: text("houseNo").notNull(),
    line1: text("line1").notNull(),
    line2: text("line2"),
    city: text("city").notNull(),
    district: text("district").notNull(),
    state: text("state").notNull(),
    stateCode: text("stateCode"),
    country: text("country").notNull().default("India"),
    pincode: text("pincode").notNull(),
    isDefault: boolean("isDefault").notNull().default(false),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("Address_userId_idx").on(t.userId)]
);

export const suppliers = pgTable(
  "Supplier",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    type: text("type").notNull(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    gstNumber: text("gstNumber"),
    fssaiLicense: text("fssaiLicense"),
    houseNo: text("houseNo").notNull(),
    line1: text("line1").notNull(),
    line2: text("line2"),
    city: text("city").notNull(),
    district: text("district").notNull(),
    state: text("state").notNull(),
    stateCode: text("stateCode"),
    country: text("country").notNull().default("India"),
    pincode: text("pincode").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    index("Supplier_email_idx").on(t.email),
    index("Supplier_phone_idx").on(t.phone),
  ]
);

export const orders = pgTable(
  "Order",
  {
    id: text("id").primaryKey(),
    orderBy: text("orderBy")
      .notNull()
      .references(() => users.id),
    businessId: text("businessId").references(() => businesses.id),
    isBillToSameAsShipping: boolean("isBillToSameAsShipping").notNull().default(true),
    orderDate: timestamp("orderDate", { precision: 3, mode: "date" }).notNull().defaultNow(),
    status: orderStatusEnum("status").notNull().default("PENDING"),
    totalAmount: doublePrecision("totalAmount").notNull(),
    discountAmount: doublePrecision("discountAmount"),
    paidAmount: doublePrecision("paidAmount"),
    packed: boolean("packed").notNull().default(false),
    refund: boolean("refund").notNull().default(false),
    customOrder: boolean("customOrder").notNull().default(false),
    r_orderId: text("r_orderId"),
    r_paymentId: text("r_paymentId"),
    paymentLinkUrl: text("paymentLinkUrl"),
    paymentMethod: text("paymentMethod"),
    paymentVpa: text("paymentVpa"),
    courierId: integer("courierId"),
    shippingId: text("shippingId"),
    shippingAmount: doublePrecision("shippingAmount"),
    awsCode: text("awsCode"),
    shippingInvoiceNumber: text("shippingInvoiceNumber"),
    shippingCourierName: text("shippingCourierName"),
    estimatedDeliveryDate: text("estimatedDeliveryDate"),
    pickupScheduled: timestamp("pickupScheduled", {
      precision: 3,
      mode: "date",
    }),
    deliveredAt: timestamp("deliveredAt", { precision: 3, mode: "date" }),
    manifestGenerated: boolean("manifestGenerated").default(false),
    InvoiceNumber: text("InvoiceNumber"),
    invoiceType: text("invoiceType"),
    invoiceSequenceNumber: integer("invoiceSequenceNumber"),
    invoiceOfficeId: text("invoiceOfficeId"),
    roundedOffAmount: doublePrecision("roundedOffAmount"),
    invoiceAmount: doublePrecision("invoiceAmount"),
    refundId: text("refundId"),
    refundReceipt: text("refundReceipt"),
    refundArn: text("refundArn"),
    refundCreatedAt: timestamp("refundCreatedAt", {
      precision: 3,
      mode: "date",
    }),
    isDifferentSupplier: boolean("isDifferentSupplier").default(false),
    supplierId: text("supplierId").references(() => suppliers.id),
    shippingAddressId: text("shippingAddressId").references(() => addresses.id),
  },
  (t) => [
    index("Order_orderBy_idx").on(t.orderBy),
    index("Order_businessId_idx").on(t.businessId),
    index("Order_status_idx").on(t.status),
    index("Order_supplierId_idx").on(t.supplierId),
  ]
);

export const orderItems = pgTable(
  "OrderItem",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    orderId: text("orderId")
      .notNull()
      .references(() => orders.id),
    productId: text("productId").notNull(),
    quantity: integer("quantity").notNull(),
    price: doublePrecision("price").notNull(),
    discount: doublePrecision("discount").notNull().default(0),
    tax: integer("tax").notNull(),
    customWeightItem: boolean("customWeightItem").notNull().default(false),
    customWeight: doublePrecision("customWeight"),
  },
  (t) => [
    index("OrderItem_orderId_idx").on(t.orderId),
    index("OrderItem_productId_idx").on(t.productId),
  ]
);

export const passwordResets = pgTable(
  "PasswordReset",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    token: text("token").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expiresAt", { precision: 3, mode: "date" }).notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("PasswordReset_token_key").on(t.token),
    index("PasswordReset_userId_idx").on(t.userId),
  ]
);

export const contacts = pgTable("Contact", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
});

export const feedbacks = pgTable("Feedback", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
});

export const announcements = pgTable(
  "Announcement",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdBy: text("createdBy").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("Announcement_createdAt_idx").on(t.createdAt)]
);

export const popupAnnouncements = pgTable(
  "PopupAnnouncement",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    isActive: boolean("isActive").notNull().default(false),
    title: text("title").notNull(),
    message: text("message").notNull(),
    startDate: timestamp("startDate", { precision: 3, mode: "date" }).notNull().defaultNow(),
    endDate: timestamp("endDate", { precision: 3, mode: "date" }),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("PopupAnnouncement_isActive_idx").on(t.isActive)]
);

export const suspensionReasons = pgTable(
  "SuspensionReason",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reason: text("reason").notNull(),
    suspendedAt: timestamp("suspendedAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("SuspensionReason_userId_idx").on(t.userId),
    index("SuspensionReason_suspendedAt_idx").on(t.suspendedAt),
  ]
);

/** Billing address is 1:1 with a business */
export const billingAddresses = pgTable(
  "BillingAddress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    businessId: text("businessId")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    houseNo: text("houseNo").notNull(),
    line1: text("line1").notNull(),
    line2: text("line2"),
    city: text("city").notNull(),
    district: text("district").notNull(),
    state: text("state").notNull(),
    stateCode: text("stateCode"),
    country: text("country").notNull().default("India"),
    pincode: text("pincode").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    uniqueIndex("BillingAddress_businessId_key").on(t.businessId),
    index("BillingAddress_businessId_idx").on(t.businessId),
  ]
);

/* ---- Relations (for db.query.* helpers) ---- */

export const usersRelations = relations(users, ({ many }) => ({
  cart: many(carts),
  bulkCart: many(bulkCarts),
  addresses: many(addresses),
  businesses: many(businesses),
  order: many(orders),
  passwordReset: many(passwordResets),
  suspensionReasons: many(suspensionReasons),
}));

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  user: one(users, { fields: [businesses.userId], references: [users.id] }),
  billingAddress: one(billingAddresses, {
    fields: [businesses.id],
    references: [billingAddresses.businessId],
  }),
  orders: many(orders),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
}));

export const bulkCartsRelations = relations(bulkCarts, ({ one }) => ({
  user: one(users, { fields: [bulkCarts.userId], references: [users.id] }),
}));

export const addressesRelations = relations(addresses, ({ one, many }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
  orders: many(orders),
}));

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.orderBy], references: [users.id] }),
  business: one(businesses, {
    fields: [orders.businessId],
    references: [businesses.id],
  }),
  shippingAddress: one(addresses, {
    fields: [orders.shippingAddressId],
    references: [addresses.id],
  }),
  supplier: one(suppliers, { fields: [orders.supplierId], references: [suppliers.id] }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));

export const passwordResetsRelations = relations(passwordResets, ({ one }) => ({
  user: one(users, { fields: [passwordResets.userId], references: [users.id] }),
}));

export const suspensionReasonsRelations = relations(suspensionReasons, ({ one }) => ({
  user: one(users, { fields: [suspensionReasons.userId], references: [users.id] }),
}));

export const billingAddressesRelations = relations(billingAddresses, ({ one }) => ({
  business: one(businesses, {
    fields: [billingAddresses.businessId],
    references: [businesses.id],
  }),
}));

/* ---- Inferred types ---- */

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type BusinessRow = typeof businesses.$inferSelect;
export type NewBusinessRow = typeof businesses.$inferInsert;
export type OrderRow = typeof orders.$inferSelect;
export type NewOrderRow = typeof orders.$inferInsert;
export type OrderItemRow = typeof orderItems.$inferSelect;
export type NewOrderItemRow = typeof orderItems.$inferInsert;
export type AddressRow = typeof addresses.$inferSelect;
export type NewAddressRow = typeof addresses.$inferInsert;
export type SupplierRow = typeof suppliers.$inferSelect;
export type NewSupplierRow = typeof suppliers.$inferInsert;
export type ContactRow = typeof contacts.$inferSelect;
export type NewContactRow = typeof contacts.$inferInsert;
export type SuspensionReasonRow = typeof suspensionReasons.$inferSelect;
export type NewSuspensionReasonRow = typeof suspensionReasons.$inferInsert;
export type BillingAddressRow = typeof billingAddresses.$inferSelect;
export type NewBillingAddressRow = typeof billingAddresses.$inferInsert;

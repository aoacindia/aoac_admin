import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const categories = pgTable("Category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
});

export const products = pgTable(
  "Product",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    code: text("code").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    price: doublePrecision("price").notNull(),
    regularPrice: doublePrecision("regularPrice"),
    length: doublePrecision("length"),
    breadth: doublePrecision("breadth"),
    height: doublePrecision("height"),
    weight: doublePrecision("weight"),
    packingWeight: doublePrecision("packingWeight"),
    tax: integer("tax").notNull(),
    hsnsac: text("hsnsac"),
    mainImage: text("mainImage"),
    images: jsonb("images"),
    inStock: boolean("inStock").notNull().default(true),
    approved: boolean("approved").notNull(),
    webVisible: boolean("webVisible").notNull().default(true),
    stockCount: integer("stockCount"),
    vegetable: boolean("vegetable").notNull().default(false),
    veg: boolean("veg").notNull().default(false),
    frozen: boolean("frozen").notNull().default(false),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).notNull().defaultNow(),
    createdBy: text("createdBy").notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
    updatedBy: text("updatedBy").notNull(),
    approvedAt: timestamp("approvedAt", { precision: 3, mode: "date" }),
    approvedBy: text("approvedBy"),
    categoryId: text("categoryId")
      .notNull()
      .references(() => categories.id),
  },
  (t) => [uniqueIndex("Product_code_key").on(t.code), index("Product_categoryId_idx").on(t.categoryId)]
);

export const categoryWeightDiscounts = pgTable(
  "CategoryWeightDiscount",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    minWeight: doublePrecision("minWeight").notNull(),
    categoryId: text("categoryId")
      .notNull()
      .references(() => categories.id),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("CategoryWeightDiscount_categoryId_idx").on(t.categoryId)]
);

export const productDiscountPrices = pgTable(
  "ProductDiscountPrice",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    discountId: text("discountId")
      .notNull()
      .references(() => categoryWeightDiscounts.id),
    discountPrice: doublePrecision("discountPrice").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [
    index("ProductDiscountPrice_productId_idx").on(t.productId),
    index("ProductDiscountPrice_discountId_idx").on(t.discountId),
    uniqueIndex("ProductDiscountPrice_productId_discountId_key").on(
      t.productId,
      t.discountId
    ),
  ]
);

export const productWeightDiscounts = pgTable(
  "ProductWeightDiscount",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    minWeight: doublePrecision("minWeight").notNull(),
    price: doublePrecision("price").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("ProductWeightDiscount_productId_idx").on(t.productId)]
);

export const productNutrition = pgTable(
  "ProductNutrition",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    name: text("name").notNull(),
    grams: doublePrecision("grams").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  },
  (t) => [index("ProductNutrition_productId_idx").on(t.productId)]
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  weightDiscounts: many(categoryWeightDiscounts),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  discountPrices: many(productDiscountPrices),
  weightDiscounts: many(productWeightDiscounts),
  nutrition: many(productNutrition),
}));

export const categoryWeightDiscountsRelations = relations(
  categoryWeightDiscounts,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [categoryWeightDiscounts.categoryId],
      references: [categories.id],
    }),
    productDiscounts: many(productDiscountPrices),
  })
);

export const productDiscountPricesRelations = relations(
  productDiscountPrices,
  ({ one }) => ({
    product: one(products, {
      fields: [productDiscountPrices.productId],
      references: [products.id],
    }),
    discount: one(categoryWeightDiscounts, {
      fields: [productDiscountPrices.discountId],
      references: [categoryWeightDiscounts.id],
    }),
  })
);

export const productWeightDiscountsRelations = relations(
  productWeightDiscounts,
  ({ one }) => ({
    product: one(products, {
      fields: [productWeightDiscounts.productId],
      references: [products.id],
    }),
  })
);

export const productNutritionRelations = relations(productNutrition, ({ one }) => ({
  product: one(products, {
    fields: [productNutrition.productId],
    references: [products.id],
  }),
}));

export type CategoryRow = typeof categories.$inferSelect;
export type NewCategoryRow = typeof categories.$inferInsert;
export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
export type CategoryWeightDiscountRow = typeof categoryWeightDiscounts.$inferSelect;
export type NewCategoryWeightDiscountRow = typeof categoryWeightDiscounts.$inferInsert;
export type ProductDiscountPriceRow = typeof productDiscountPrices.$inferSelect;
export type NewProductDiscountPriceRow = typeof productDiscountPrices.$inferInsert;
export type ProductWeightDiscountRow = typeof productWeightDiscounts.$inferSelect;
export type NewProductWeightDiscountRow = typeof productWeightDiscounts.$inferInsert;
export type ProductNutritionRow = typeof productNutrition.$inferSelect;
export type NewProductNutritionRow = typeof productNutrition.$inferInsert;

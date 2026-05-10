<!--
================================================================================
PHASE 1 — PRISMA → DRIZZLE MIGRATION AUDIT (READ-ONLY PASS)
Generated: 2026-05-09
================================================================================

0) PROJECT SHAPE — IMPORTANT
------------------------------------------------------------------------------
• There is NO single `prisma/schema.prisma`. The project uses THREE Prisma schemas
  under `prisma/`:
    - `prisma/user.schema.prisma`     → client output `prisma/generated/user`
                                      → env key `DATABASE_URL`
    - `prisma/admin.schema.prisma`    → output `prisma/generated/admin`
                                      → env key `ADMIN_DATABASE_URL`
    - `prisma/product.schema.prisma`  → output `prisma/generated/product`
                                      → env key `PRODUCT_DATABASE_URL`
• Historically schemas declare `provider = "mysql"`, but `.env` in this workspace
  already uses Neon PostgreSQL connection strings for all three URLs.
• Application code wires THREE singleton clients:
    - `adminPrisma` → `lib/admin-prisma.ts` (PrismaClient from generated admin)
    - `userPrisma`  → `lib/user-prisma.ts` (… user)
    - `productPrisma` → `lib/product-prisma.ts` (… product)
• Routes often touch 2–3 databases in one request (e.g. order + office + product).
• CONFLICT vs Phase 3 spec: instructed `lib/db/index.ts` uses ONE `DATABASE_URL`
  Neon client. Migrating faithfully requires EITHER:
    (a) three Drizzle/neon-http instances (`dbUser`, `dbAdmin`, `dbProduct`) with
        three schemas or prefixed tables, OR
    (b) consolidating all tables into ONE Neon database (single URL).
• `package.json` `build` runs `prisma generate` three times (one per schema file).

• No `middleware.ts` in repo. `proxy.ts` exports `proxy()` — not imported anywhere
  found via search; regardless, it contains no Prisma.

• `.env` DATABASE FORMAT (credentials redacted):
    `DATABASE_URL`,
    `PRODUCT_DATABASE_URL`,
    `ADMIN_DATABASE_URL`
  each follow standard PostgreSQL URI form, e.g.:
    postgresql://<user>:<password>@<neon-host>/<database>?sslmode=require&...
  Neon pooler hostname pattern observed: `*.neon.tech`


1) FILES THAT IMPORT OR USE PRISMA (application + lib only; excluding `prisma/generated/**`)
------------------------------------------------------------------------------
Client factories / teardown:
• `lib/admin-prisma.ts` — L1 `PrismaClient` import; L8–11 constructor; L14–18 export (`adminPrisma`)
• `lib/user-prisma.ts` — L1 `PrismaClient`; L10–13 constructor; L17–18 `userPrisma`; L29 `userPrisma.$disconnect()`
• `lib/product-prisma.ts` — L1 `PrismaClient`; L10–13 constructor; L17–18 `productPrisma`; L29 `$disconnect()`
• `lib/user-id.ts` — L1 `PrismaClient`; L21,46 typed param; L26–32 `findMany`; L58–61 `findUnique`

Types / namespace from generated clients:
• `lib/user-id.ts` — `@/prisma/generated/user`
• `app/api/orders/summary/route.ts` — `@/prisma/generated/user` — `Prisma.OrderGetPayload` (L13–56)
• `app/api/imported-orders/route.ts` — `@/prisma/generated/admin` — `Prisma.ImportedOrderWhereInput`, `Prisma.Decimal`
• `app/api/imported-orders/[id]/route.ts` — `@/prisma/generated/admin` — `Prisma.Decimal`
• `app/api/admin-users/route.ts` — `@/prisma/generated/admin` — type `AdminRole`

Auth:
• `auth.ts` — L29 dynamic `import("@/lib/admin-prisma")`; L31–72 `adminPrisma.user` / `otpVerification`

Libraries:
• `lib/pdf-generator.ts` — L5 `admin-prisma`; L875 `adminPrisma.account.findFirst`

API routes (Alphabetical — line numbers reference significant Prisma call sites):

• `app/api/accounts/route.ts`
  — L6 `findMany`; L50–52 `$transaction([ updateMany, create ])`; L58 `create`

• `app/api/accounts/[id]/route.ts`
  — L10 `findUnique`; L55 `findUnique`; L77–79 `$transaction([ updateMany, update ])`; L85 `update`; L107 `findUnique`; L118 `delete`

• `app/api/accounts/credit-summary/route.ts`
  — L63–80 `userPrisma.$queryRawUnsafe` — MySQL-style backticks `\`Order\`` and `?` placeholders (**must become PostgreSQL** when ported)

• `app/api/admin-users/route.ts`
  — L53 `count`; L54 `findMany`; L120 `findFirst`; L133 `create`

• `app/api/addresses/route.ts`
  — L56 `findMany`; L115 `findUnique`; L128 `updateMany`; L139 `create`

• `app/api/addresses/[id]/route.ts`
  — L11,69,144 `findUnique`; L82 `updateMany`; L109 `update`; L155 `delete`

• `app/api/auth/otp/route.ts`
  — L28 `findFirst`; L62 `otpVerification.deleteMany`; L66 `otpVerification.create`

• `app/api/categories/route.ts`
  — L7 `findMany`; L44 `findFirst`; L57 `create`

• `app/api/categories/all/route.ts` — L7 `findMany`

• `app/api/categories/[id]/route.ts`
  — L11,85 `findUnique`; L62 `update`; L113 `delete`

• `app/api/contacts/route.ts` — L13 `count`; L15 `findMany`

• `app/api/contacts/[id]/route.ts`
  — L12,44 `findUnique`; L55 `delete`

• `app/api/customers/route.ts`
  — L47–51 three `count` calls; L62 `findMany`; L125 `findFirst`; L140–143 `generateNextUserId` + `user.create`

• `app/api/customers/bulk/route.ts`
  — L135–136 `getMaxSequence(userPrisma,…)`; L162 `findMany`; L255–289 `$transaction(Array< user.create(...) >)` with nested `billingAddress: { create: … }`

• `app/api/customers/[id]/route.ts`
  — L11,75 `findUnique`; L92 `findFirst`; L127 `billingAddress.findUnique`; L133 update billing; L166 `deleteMany`; L171 `user.update`

• `app/api/customers/[id]/addresses/route.ts` — L13 `user.findUnique` with includes

• `app/api/customers/[id]/download-pdf/route.ts` — L22 `findUnique`

• `app/api/customers/[id]/suspend/route.ts`
  — L22,57 `findUnique`; L41 `update`; L50 `suspensionReason.create`

• `app/api/customers/[id]/unsuspend/route.ts` — L12 `findUnique`; L24 `update`

• `app/api/customers/[id]/terminate/route.ts` — L12 `findUnique`; L24 `update`

• `app/api/emails/route.ts`
  — L16 `findMany`; L34 `count`; L88 `create`

• `app/api/imported-orders/route.ts`
  — L58 `count`; L59 `findMany` + include items; L69 `aggregate`; L178–203 `$transaction` callback with nested `importedOrder.create({ data: { items: { create: [...] }}})` **+ `maxWait` / `timeout` options**

• `app/api/imported-orders/[id]/route.ts`
  — L113 `findUnique`; L123–141 `$transaction` (update imported order + `deleteMany` items + `createMany` items); L144 `findUnique` include items

• `app/api/imported-orders/pdf/route.ts`
  — L78 `findMany`; L85 `aggregate`

• `app/api/offices/route.ts` — L6 `findMany`; L31 `findUnique`; L42 `create`

• `app/api/offices/[id]/route.ts`
  — L10,47,102 `findUnique`; L58 `findFirst`; L72 `update`; L113 `delete`

• `app/api/orders/route.ts`
  — L74,135 `findFirst`; L211 `count`; L213 `findMany`; L318 `office.findUnique`; L331 `user.findUnique`; L344 `address.findUnique`; L408 optional `supplier.findUnique`; L421 `order.create` **nested `orderItems: { create: [...] }`** + heavy `include`

• `app/api/orders/personal/route.ts`
  — L54,110 `findFirst`; L186 `office.findUnique`; L197 `user.findUnique`; L208 `address.findUnique`; L261 `order.create` nested `orderItems.create`

• `app/api/orders/[id]/route.ts`
  — L70 `findFirst` (invoice seq); L124 `findUnique` full include; L157 loop `productPrisma.product.findUnique`; L249 `findUnique`; L436 optional `office.findUnique`; L460 `order.update`; L483–488 `deleteMany` + `createMany` items; L505 second `findUnique`; L552,564–568 DELETE path (`deleteMany` items + `order.delete`)

• `app/api/orders/[id]/download-invoice/route.ts`
  — L35 `order.findUnique`; L66 optional office; L92 product lookup per item

• `app/api/orders/[id]/send-pi/route.ts`
  — L471 `order.findUnique`; L503 office; L519 `account.findFirst`; L527 product lookups; L570 `emailAccount.findUnique`

• `app/api/orders/last-by-customer-address/route.ts` — L26 `findFirst`

• `app/api/orders/month-summary/route.ts` — L43 `order.findMany`

• `app/api/orders/summary/route.ts`
  — L173 product `findMany`; L251 office `findMany`; L291–358 many `order.findMany` with complex `where`/`include`/`select`; L380 optional office batch

• `app/api/products/route.ts`
  — L25 `product.findMany` (code generation); L66 `findMany`; L135 `product.create` **nested `nutrition: { create: [...] }`**

• `app/api/products/[id]/route.ts`
  — L11 `findUnique` deep include (category, discounts, nutrition); L121 `product.update` **nested `nutrition: { deleteMany, create }`**
  ; L149–168 `$transaction` delete ProductDiscountPrice, ProductWeightDiscount, ProductNutrition, then Product

• `app/api/products/get-all-products/route.ts` — L7 `findMany`

• `app/api/products/get_bycategory/route.ts` — L17 `findMany`

• `app/api/products/category-discounts/route.ts`
  — Batch of findMany/findUnique/deleteMany/create/createMany (`categoryWeightDiscount`, `productDiscountPrice`, `product`)

• `app/api/products/weight-discounts/route.ts`
  — `findUnique`; `productWeightDiscount.findMany` / `deleteMany` / `createMany`

• `app/api/suppliers/route.ts` — L7 `findMany`; L70 `findFirst`; L86 `create`

• `app/api/suppliers/[id]/route.ts`
  — L11,59,154 `findUnique`; L72 `findFirst`; L130 `update`; L176 `delete`

Helper (no Prisma import; outputs Prisma-style filter objects consumed by callers):
• `lib/build-orders-list-where.ts` — documents “Prisma `where`”; returns plain objects used with `userPrisma.order.findMany`


2) SCHEMA LOCATIONS NOTE
------------------------------------------------------------------------------
Requirement asked for reading `prisma/schema.prisma` — **does not exist**. Canonical
sources are the three files above plus generated copies under `prisma/generated/*/schema.prisma`
(mirror of inline schema).


3) PRISMA ENUMS & SPECIAL TYPES
------------------------------------------------------------------------------
User DB:
• `OrderStatus` — PENDING, ORDER_READY, PAYMENT_PENDING, PAID, PROCESSING, SHIPPED,
    ORDER_SHIPPED_WITHOUT_PAYMENT, DELIVERED, CANCELLED, REFUNDED

Admin DB:
• `AdminRole` — ADMIN, MANAGER, STAFF



4) TRANSACTIONS (`$transaction`)
------------------------------------------------------------------------------
• `app/api/accounts/route.ts` — L50 array form
• `app/api/accounts/[id]/route.ts` — L77 array form
• `app/api/imported-orders/route.ts` — L178 interactive + custom timeout (**POST import**)
• `app/api/imported-orders/[id]/route.ts` — L123 interactive
• `app/api/products/[id]/route.ts` — L149 interactive cascade delete
• `app/api/customers/bulk/route.ts` — L255 array-of-promises with many creates
• (No `$transaction` in `orders/[id]/route.ts` item replace — sequential `deleteMany` + `createMany` —
  Drizzle Phase 5 may want wrapping in explicit transaction per user rules.)

$disconnect:
• `lib/user-prisma.ts` L29 — process hooks
• `lib/product-prisma.ts` L29 — process hooks


5) RAW SQL
------------------------------------------------------------------------------
• **`app/api/accounts/credit-summary/route.ts`** L63+: `userPrisma.$queryRawUnsafe`
    - Table referenced as `\`Order\`` (case-sensitive quoting for MySQL)
    - Uses `?` bind placeholders
    - **Migrating to Neon Postgres:** rewrite identifiers (likely `"Order"` or lower-case mapping),
      use `$n`/`sql tagged` params, GROUP BY semantics unchanged


6) AGGREGATE / GROUP STYLE QUERIES
------------------------------------------------------------------------------
• `importedOrder.aggregate({ _count, _sum })` — `app/api/imported-orders/route.ts` GET,
    `app/api/imported-orders/pdf/route.ts`


7) NEXTAUTH / PRISMA ADAPTER
------------------------------------------------------------------------------
• **`auth.ts`** uses NextAuth v5 Credentials provider + **`session.strategy: "jwt"`**.
• No `PrismaAdapter` / `@auth/drizzle-adapter` usage.
• OTP storage uses admin DB `OtpVerification` via `adminPrisma` manually.


8) NESTED WRITES (`create` / `update` with relational sub-keys)
------------------------------------------------------------------------------
• **`app/api/orders/route.ts`** — `order.create` + `orderItems: { create: [...] }`
• **`app/api/orders/personal/route.ts`** — same pattern
• **`app/api/products/route.ts`** — `product.create` + optional `nutrition: { create }`
• **`app/api/products/[id]/route.ts`** — `update` + `nutrition: { deleteMany, create }`
• **`app/api/customers/bulk/route.ts`** — `user.create` + optional nested `billingAddress.create`
• **`app/api/imported-orders/route.ts`** — nested `items.create[]` inside `importedOrder.create`


9) RELATED NON-QUERY CODE TO UPDATE LATER (TYPE IMPORTS)
------------------------------------------------------------------------------
• **`app/api/orders/summary/route.ts`** relies on large `Prisma.OrderGetPayload<…>` inferred types —
  Replace with Drizzle-derived types + manual narrowing or query result types.



10) PRISMA MODEL INVENTORY — USER SCHEMA (`user.schema.prisma`)
------------------------------------------------------------------------------
Relations summary (text):
• User ↔ Cart[], BulkCart[], Address[], Order[], PasswordReset[],
    SuspensionReason[], BillingAddress? (1:1), …
• Order ↔ User (orderBy), Address? (shippingAddress), Supplier?, OrderItem[]
• OrderItem ↔ Order
• Cart / BulkCart → User (userId FK)
• Address → User; Order may reference Address
• PasswordReset → User (cascade delete)
• SuspensionReason → User (cascade)
• BillingAddress → User 1:1 unique userId

Models & fields:

User (@id cuid): id(S), name(S), email(S @unique), suspended(B Def false),
  suspended_number(I Def 0), terminated(B Def false), isBusinessAccount(B?), businessName(S?),
  gstNumber(S?), hasAdditionalTradeName(B?), additionalTradeName(S?), phone(S @unique),
  password(S?), createdAt(D Def now), updatedAt(@updatedAt)

OtpVerification: id(S cuid), email(S?), token(S @unique), otp(S),
  expiresAt(D), createdAt, updatedAt; @@index email, token

Cart: id, userId(S), productId(S), quantity(I Def 1), createdAt, updatedAt,
  @@index([userId, productId])

BulkCart: same pattern as Cart, separate @@index name

Address: id, userId(S), type(S), name(S), phone(S), houseNo(S), line1(S), line2(S?),
  city(S), district(S), state(S), stateCode(S?), country(S Def India),
  pincode(S), isDefault(B Def false), createdAt, updatedAt; @@index userId

Order: id(String @id APP-GENERATED, no Prisma default), orderBy→User FK, orderDate,
  status(OrderStatus Def PENDING), totalAmount(Float), discountAmount?, paidAmount?,
  packed/refund/customOrder Booleans defaults, payment razorpay fields (r_orderId, etc. optional),
  shipping fields, refunds, supplier fields… (see prisma file lines 119–157 for full column list incl.
  InvoiceNumber, invoiceOfficeId floats for invoice amounts enum status indexed)

OrderItem: id cuid; orderId; productId; quantity; price Float; discount Def 0; tax Int;
  customWeightItem Bool; customWeight Float?

PasswordReset: id uuid(); token unique; userId; expiresAt; timestamps; FK user Cascade

Contact: id cuid; name; email; subject; message Text; timestamps

Feedback: id; message; createdAt

Announcement / PopupAnnouncement: per schema lines 219–239

SuspensionReason: id; userId; reason Text; suspendedAt Def now

Supplier: id type name phone email gst? fssai? address columns stateCode?, … orders Relation


11) PRISMA MODEL INVENTORY — ADMIN SCHEMA (`admin.schema.prisma`)
------------------------------------------------------------------------------
User (+ AdminRole enum): id cuid name email role Def STAFF suspended suspended_number terminated
phone unique timestamps

OtpVerification: same structural fields as user DB otp model (different database)

Office: gstin unique, address city? state stateCode pincode country? timestamps

Account: id holder names numbers ifsc branch swift? bankName
  **isDefault @map("default")** timestamps

EmailAccount: fromEmail smtp defaults isActive timestamps @@index(isActive)

ImportedOrder: orderDate @map(order_date), orderName, deliveryCharges/orderTotal Decimal(14,2) mapped snake case
ImportedOrderItem: order_id FK cascade, line_index, item_name, amount Decimal



12) PRISMA MODEL INVENTORY — PRODUCT SCHEMA (`product.schema.prisma`)
------------------------------------------------------------------------------
Category → products[], weightDiscounts[]

Product: code unique name description Text? price Float regularPrice? dims weight fields tax Int
 hsnsac? mainImage images Json? inStock approved webVisible stockCount? vegetable veg frozen
 timestamps createdBy updatedBy audit approvedAt/approvedBy categoryId FK
 discountPrices[], weightDiscounts[], nutrition[]

CategoryWeightDiscount: minWeight kg categoryId FK productDiscountPrices[] timestamps

ProductDiscountPrice: productId discountId FK discountPrice Float timestamps **@@unique([productId,discountId])**

ProductWeightDiscount: productId minWeight price @@index(productId)

ProductNutrition: productId name grams @@index(productId)



13) ESTIMATED PRISMA CALL COUNT (APPLICATION LAYER ONLY)
------------------------------------------------------------------------------
• Roughly ~180+ discrete Prisma model operations across API routes (+ helper user-id + pdf-generator + auth.ts),
  before counting repeated loops (e.g. per-line-item `product.findUnique`).
• `$transaction`: 8 top-level usages (accounts x2 + imported bulk + PATCH + product delete tx + bulk customers + imported POST).
• Nested creates: orders (2 routes), products POST, imported POST, bulk customers.



14) EDGE CASES & SPECIAL ATTENTION
------------------------------------------------------------------------------
A) **THREE DATABASES**: Neon URLs already split; Drizzle singleton per user spec incompatible without design choice.

B) **MySQL-era raw SQL credit-summary** MUST be ported to Postgres-safe SQL.

C) **`Prisma.Decimal` for admin ImportedOrder** monetary fields — Drizzle uses `decimal`/`string`; precision 14 scale 2 in schema.

D) **`Account.isDefault` maps to DB column `default`** (reserved word escape in Postgres differs from MySQL backticks).

E) **Enums** (`OrderStatus`, `AdminRole`) — Postgres enums or text + check constraint.

F) **Product update nutrition** combines delete-all + recreate in one Prisma `update`; Drizzle equals transaction + deletes + inserts.

G) **`build-orders-list-where.ts`** constructs filters with `{ contains }` semantics (MySQL case-insensitivity differs from Postgres `ILIKE`; behaviour parity needs review).

H) **Long-running import transaction** — Prisma timeouts tuned (270s max); Drizzle/neon-http must replicate timeout behavior or refactor batching.

I) **`app/api/products/[id]/route.ts` DELETE** transactional cascade deletes 4 entities.

J) **`parseSequence`/`getMaxSequence`** in lib/user-id + customers route depend on **`id LIKE 'BS-YYYY-%'` prefix pattern** (`getMaxSequence`) vs `customers/route` **`generateNextUserId`** loops `findUnique` — verify SQL `startsWith`/pattern match under Postgres.

================================================================================
-->

# Migration audit (quick index)

Detailed Phase 1 report is embedded in an HTML comment at the top of this file (readable in-source). Open the raw file to review the full audit.

**Schemas read:** `prisma/user.schema.prisma`, `prisma/admin.schema.prisma`, `prisma/product.schema.prisma` (there is no root `schema.prisma`).

---

## Appendix — User database + Product database (tables, relations, other design)

Canonical Drizzle definitions: `lib/db/user-schema.ts` and `lib/db/product-schema.ts`.  
Connections: **`DATABASE_URL`** (user/storefront DB), **`PRODUCT_DATABASE_URL`** (catalog DB).

**Cross-database linkage:** Orders and carts store **`productId` as plain text**. That value matches **`Product.id` in the product database**, but there is **no foreign key across the two Postgres instances** — only app-level consistency.

---

### 1. User / storefront database (`DATABASE_URL`)

#### Enum

| Name | Meaning |
|------|--------|
| **`OrderStatus`** (Postgres enum) | `PENDING`, `ORDER_READY`, `PAYMENT_PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `ORDER_SHIPPED_WITHOUT_PAYMENT`, `DELIVERED`, `CANCELLED`, `REFUNDED` |

#### Tables (PostgreSQL identifiers as defined in schema)

| Table | Role |
|-------|------|
| **`User`** | Customer account: login identity, profile, GST/business flags, suspend/terminate, unique `email` + `phone` |
| **`OtpVerification`** | Store-facing OTP/session token rows (distinct from admin DB OTP) |
| **`Cart`** | Line per user × product × quantity |
| **`BulkCart`** | Same idea as Cart, parallel table |
| **`Address`** | Shipping addresses belonging to a user |
| **`Supplier`** | Supplier master data (referenced by orders) |
| **`Order`** | Order header (totals, payment/shipping refs, invoice fields, optional supplier + shipping address FKs) |
| **`OrderItem`** | Line items (`productId` points at product DB only logically) |
| **`PasswordReset`** | Reset tokens; `User` FK with **onDelete cascade** |
| **`Contact`**, **`Feedback`** | Lightweight CMS / enquiries |
| **`Announcement`**, **`PopupAnnouncement`** | Site messaging |
| **`SuspensionReason`** | Audit text when users are suspended; **cascade** on user delete |
| **`BillingAddress`** | One-to-one-ish billing snapshot per user (`userId` **unique**) |

#### Foreign keys inside this DB (high level)

- **`Cart.userId`** → **`User.id`**
- **`BulkCart.userId`** → **`User.id`**
- **`Address.userId`** → **`User.id`**
- **`Order.orderBy`** → **`User.id`** (who placed the order)
- **`Order.shippingAddressId`** → **`Address.id`** (nullable)
- **`Order.supplierId`** → **`Supplier.id`** (nullable)
- **`OrderItem.orderId`** → **`Order.id`**
- **`PasswordReset.userId`** → **`User.id`** (`onDelete: cascade`)
- **`SuspensionReason.userId`** → **`User.id`** (`onDelete: cascade`)
- **`BillingAddress.userId`** → **`User.id`** (`onDelete: cascade`)

Standalone tables (no FK to other entities in schema): **`Contact`**, **`Feedback`**, **`Announcement`**, **`PopupAnnouncement`**, **`OtpVerification`** (no user FK in Drizzle schema).

#### Notable relational graph (mental model)

- **User** ← one-to-many → **Cart**, **BulkCart**, **Address**, **Order**, **SuspensionReason**, **PasswordReset**  
- **User** ← one-to-one (via unique `BillingAddress.userId`) → **BillingAddress**  
- **Order** → many **OrderItem**; optional **Address** (ship-to), optional **Supplier**  
- **`OrderItem.productId`**, **`Cart.productId`**, and **`BulkCart.productId`** have **no FK** in the user database (they only match **`Product.id`** in the product database at the application level)

---

### 2. Product catalog database (`PRODUCT_DATABASE_URL`)

#### Tables

| Table | Role |
|-------|------|
| **`Category`** | Product grouping |
| **`Product`** | Main SKU row; **`code` unique**; FK **`categoryId` → Category**; JSON **`images`**; pricing/tax/HSN, flags (`approved`, `inStock`, `webVisible`, `vegetable`, `veg`, `frozen`), audit (`createdBy` / `updatedBy` / `approved*` ) |
| **`CategoryWeightDiscount`** | Per-category weight tiers (minimum weight in kg) |
| **`ProductDiscountPrice`** | Join: product × category-tier → discounted price (**unique `(productId, discountId)`**) |
| **`ProductWeightDiscount`** | Per-product weight-tier pricing |
| **`ProductNutrition`** | Nutritional facts rows per product |

#### Foreign keys inside this DB

- **`Product.categoryId`** → **`Category.id`**
- **`CategoryWeightDiscount.categoryId`** → **`Category.id`**
- **`ProductDiscountPrice.productId`** → **`Product.id`**
- **`ProductDiscountPrice.discountId`** → **`CategoryWeightDiscount.id`**
- **`ProductWeightDiscount.productId`** → **`Product.id`**
- **`ProductNutrition.productId`** → **`Product.id`**

#### Relational graph

- **Category** → many **Product**; many **CategoryWeightDiscount**
- **Product** → many **ProductDiscountPrice**, **ProductWeightDiscount**, **ProductNutrition**
- **CategoryWeightDiscount** → many **ProductDiscountPrice**

---

### 3. How the **user** and **product** databases are configured differently (runtime + tooling)

They are **two separate PostgreSQL databases** (typically two Neon branches/projects), not one database with two schemas.

| Concern | User / storefront DB | Product catalog DB |
|--------|----------------------|----------------------|
| **Env var** | `DATABASE_URL` | `PRODUCT_DATABASE_URL` |
| **Drizzle schema file** | `lib/db/user-schema.ts` | `lib/db/product-schema.ts` |
| **Drizzle client export** | `dbUser` | `dbProduct` |
| **`drizzle-kit` config** | `drizzle.config.user.ts` — `schema` → user file, `out` → e.g. `./drizzle/user` | `drizzle.config.product.ts` — `schema` → product file, `out` → e.g. `./drizzle/product` |
| **Migrations / snapshots** | Generated under **user** output folder only | Under **product** output folder only |
| **Connection pool** | Its own `Pool({ connectionString: process.env.DATABASE_URL })` | Its own `Pool({ connectionString: process.env.PRODUCT_DATABASE_URL })` |
| **`drizzle(...)` call** | `drizzle(userPool, { schema: userSchema })` | `drizzle(productPool, { schema: productSchema })` |

Other important details:

- **`lib/db/index.ts`** must create **two pools** and **two `drizzle` instances** — never pass both table sets through a single connection if they live on different hosts/DBs.
- Use **`drizzle-orm/neon-serverless`** with **`Pool` from `@neondatabase/serverless`** so **`dbUser.transaction()` / `dbProduct.transaction()`** work. The HTTP-only `neon-http` driver does **not** support transactions.
- In development, cache each `Pool` on `globalThis` (separate keys per DB) to avoid connection explosion under Next.js hot reload.
- **`productId` on `Cart` / `BulkCart` / `OrderItem`:** same string as `Product.id`, but **validated in app code** — not an enforced FK across databases.

Optional: this **admin** repo also has a third database (`ADMIN_DATABASE_URL`, `admin-schema.ts`, `dbAdmin`). A **storefront-only** app copies only **user + product** as above.

---

## Appendix — Cursor prompt (other workspace): implement the same two-database setup

Copy the block below into **Cursor Composer or Agent** in the **other** web app workspace.

````text
TASK: Implement the same dual-database setup as the AOAC admin app: a separate PostgreSQL database for **users/orders/storefront** and a separate PostgreSQL database for **products**, using Drizzle ORM and Neon-style connection strings.

========================================================
A) CONFIGURATION — TWO DATABASES, TWO URLS, TWO CLIENTS
========================================================
1. Environment variables (must be distinct):
   - DATABASE_URL          → user / storefront database (tables: User, Order, Address, Cart, …)
   - PRODUCT_DATABASE_URL  → catalog database only (tables: Category, Product, discounts, nutrition, …)

2. Dependencies:
   npm install drizzle-orm @neondatabase/serverless @paralleldrive/cuid2
   npm install -D drizzle-kit

3. lib/db/user-schema.ts
   Copy the canonical file from the admin repo unchanged (tables, pgEnum OrderStatus, indexes, FKs, relations, $inferInsert/$inferSelect types).

4. lib/db/product-schema.ts
   Same — copy unchanged from admin repo.

5. lib/db/index.ts
   - import { Pool } from "@neondatabase/serverless"
   - import { drizzle } from "drizzle-orm/neon-serverless"
   - import * as userSchema from "./user-schema"
   - import * as productSchema from "./product-schema"
   - Create poolUser = new Pool({ connectionString: process.env.DATABASE_URL })
   - Create poolProduct = new Pool({ connectionString: process.env.PRODUCT_DATABASE_URL })
   - Optional: singleton each Pool on globalThis in development (different global keys per pool).
   - export const dbUser = drizzle(poolUser, { schema: userSchema })
   - export const dbProduct = drizzle(poolProduct, { schema: productSchema })
   Do NOT merge both schemas onto one drizzle instance with one URL unless both live in the same Postgres database.

6. Drizzle Kit — TWO configs (mirror admin repo):
   - drizzle.config.user.ts: schema ./lib/db/user-schema.ts, out ./drizzle/user, dialect postgresql, dbCredentials.url process.env.DATABASE_URL
   - drizzle.config.product.ts: schema ./lib/db/product-schema.ts, out ./drizzle/product, dialect postgresql, dbCredentials.url process.env.PRODUCT_DATABASE_URL

7. package.json scripts (example):
   "db:generate": "drizzle-kit generate --config=drizzle.config.user.ts && drizzle-kit generate --config=drizzle.config.product.ts"
   "db:push": "drizzle-kit push --config=drizzle.config.user.ts && drizzle-kit push --config=drizzle.config.product.ts"

8. Cross-database rule for product IDs:
   OrderItem.productId, Cart.productId, BulkCart.productId are strings matching Product.id in the PRODUCT db; enforce in application code — no FK across databases.

========================================================
B) APPLY SCHEMA TO BOTH DATABASES
========================================================
Ensure both Neon URLs point to Postgres, then run npm run db:push (or migrate) separately so user tables exist only on DATABASE_URL DB and product tables only on PRODUCT_DATABASE_URL DB.

========================================================
C) VERIFICATION
========================================================
- npx tsc --noEmit passes
- No single DATABASE_URL mistakenly used for product schema push
- Any code touching orders+catalog uses dbUser AND dbProduct in the same request where needed

REFERENCE (canonical definitions): sibling admin project paths lib/db/user-schema.ts and lib/db/product-schema.ts.
````


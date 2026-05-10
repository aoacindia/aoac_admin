import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as adminSchema from "./admin-schema";
import * as productSchema from "./product-schema";
import * as userSchema from "./user-schema";

declare global {
  // eslint-disable-next-line no-var
  var __userDbPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __adminDbPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __productDbPool: Pool | undefined;
}

function poolFromEnv(url: string | undefined, key: "__userDbPool" | "__adminDbPool" | "__productDbPool"): Pool {
  if (!url) {
    throw new Error("Database URL env var is not set");
  }
  const g = globalThis as typeof globalThis & Record<typeof key, Pool | undefined>;
  if (!g[key]) {
    g[key] = new Pool({ connectionString: url });
  }
  return g[key];
}

/** Pool + `neon-serverless` supports `db.transaction()` (unlike `neon-http`). */
const userPool = poolFromEnv(process.env.DATABASE_URL, "__userDbPool");
const adminPool = poolFromEnv(process.env.ADMIN_DATABASE_URL, "__adminDbPool");
const productPool = poolFromEnv(process.env.PRODUCT_DATABASE_URL, "__productDbPool");

/** Application / storefront database (users, orders, addresses, …) */
export const dbUser = drizzle(userPool, { schema: userSchema });

/** Admin-only database (dashboard users, offices, imported orders, …) */
export const dbAdmin = drizzle(adminPool, { schema: adminSchema });

/** Product catalog database */
export const dbProduct = drizzle(productPool, { schema: productSchema });

export * as userSchema from "./user-schema";
export * as adminSchema from "./admin-schema";
export * as productSchema from "./product-schema";

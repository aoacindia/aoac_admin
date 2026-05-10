import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/admin-schema.ts",
  out: "./drizzle/admin",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.ADMIN_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/user-schema.ts",
  out: "./drizzle/user",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

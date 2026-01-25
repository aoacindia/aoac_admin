import { PrismaClient } from "../prisma/generated/admin";

declare global {
  // eslint-disable-next-line no-var
  var __adminPrisma: PrismaClient | undefined;
}

const createAdminPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

export const adminPrisma =
  globalThis.__adminPrisma ?? createAdminPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__adminPrisma = adminPrisma;
}

// Avoid Node-only process hooks to keep this module Edge-safe if imported.


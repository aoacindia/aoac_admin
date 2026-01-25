import { PrismaClient } from "../prisma/generated/user";

// Use a more robust global type that works in all environments
declare global {
  // eslint-disable-next-line no-var
  var __userPrisma: PrismaClient | undefined;
}

// Create Prisma client with optimized configuration
const createUserPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

// Singleton pattern that works in both development and production
export const userPrisma =
  globalThis.__userPrisma ?? createUserPrismaClient();

// In development, store the client in global to prevent multiple instances during hot reload
if (process.env.NODE_ENV !== "production") {
  globalThis.__userPrisma = userPrisma;
}

// Handle graceful shutdown to prevent connection leaks
if (typeof process !== "undefined") {
  const disconnect = async () => {
    try {
      await userPrisma.$disconnect();
    } catch (error) {
      console.error("Error disconnecting Prisma client:", error);
    }
  };

  process.on("beforeExit", disconnect);
  process.on("SIGINT", async () => {
    await disconnect();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await disconnect();
    process.exit(0);
  });
}


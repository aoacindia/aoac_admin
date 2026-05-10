import { eq, like } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { users } from "@/lib/db/user-schema";

export type UserDb = typeof dbUser;

export function getIdPrefix(isBusinessAccount: boolean) {
  return isBusinessAccount ? "BS" : "US";
}

export function formatUserId(prefix: string, year: number, sequence: number) {
  return `${prefix}${year}${sequence}`;
}

function parseSequence(id: string, prefix: string, year: number) {
  const expectedPrefix = `${prefix}${year}`;
  if (!id.startsWith(expectedPrefix)) return null;
  const sequencePart = id.slice(expectedPrefix.length);
  if (!sequencePart) return null;
  const sequenceValue = Number(sequencePart);
  return Number.isFinite(sequenceValue) ? sequenceValue : null;
}

export async function getMaxSequence(db: UserDb, prefix: string, year: number) {
  const expectedPrefix = `${prefix}-${year}-`;
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(like(users.id, `${expectedPrefix}%`));

  let maxSequence = 0;
  for (const row of existing) {
    const seq = parseSequence(row.id, prefix, year);
    if (seq !== null && seq > maxSequence) {
      maxSequence = seq;
    }
  }
  return maxSequence;
}

export async function generateNextUserId(
  db: UserDb,
  isBusinessAccount: boolean
): Promise<string> {
  const prefix = getIdPrefix(isBusinessAccount);
  const year = new Date().getFullYear();
  let sequence = await getMaxSequence(db, prefix, year);
  let userId = "";
  let exists = true;

  while (exists) {
    sequence += 1;
    userId = formatUserId(prefix, year, sequence);
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    exists = Boolean(existing);
  }
  return userId;
}

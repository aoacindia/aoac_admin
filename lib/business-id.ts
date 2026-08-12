import { eq, like } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { businesses } from "@/lib/db/user-schema";

export type UserDb = typeof dbUser;

/** Dedicated business ID prefix (distinct from user US/legacy BS ids). */
export const BUSINESS_ID_PREFIX = "BZ";

export function formatBusinessId(year: number, sequence: number) {
  return `${BUSINESS_ID_PREFIX}${year}${sequence}`;
}

function parseSequence(id: string, year: number) {
  const expectedPrefix = `${BUSINESS_ID_PREFIX}${year}`;
  if (!id.startsWith(expectedPrefix)) return null;
  const sequencePart = id.slice(expectedPrefix.length);
  if (!sequencePart) return null;
  const sequenceValue = Number(sequencePart);
  return Number.isFinite(sequenceValue) ? sequenceValue : null;
}

export async function getMaxBusinessSequence(db: UserDb, year: number) {
  const existing = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(like(businesses.id, `${BUSINESS_ID_PREFIX}${year}%`));

  let maxSequence = 0;
  for (const row of existing) {
    const seq = parseSequence(row.id, year);
    if (seq !== null && seq > maxSequence) {
      maxSequence = seq;
    }
  }
  return maxSequence;
}

export async function generateNextBusinessId(db: UserDb): Promise<string> {
  const year = new Date().getFullYear();
  let sequence = await getMaxBusinessSequence(db, year);
  let businessId = "";
  let exists = true;

  while (exists) {
    sequence += 1;
    businessId = formatBusinessId(year, sequence);
    const [existing] = await db
      .select({ id: businesses.id })
      .from(businesses)
      .where(eq(businesses.id, businessId))
      .limit(1);
    exists = Boolean(existing);
  }
  return businessId;
}

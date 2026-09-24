import bcrypt from "bcryptjs";
import { and, desc, eq, gt, isNotNull } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { credentialUnlocks } from "@/lib/db/admin-schema";

export const CREDENTIAL_OTP_EXPIRY_MINUTES = 10;
export const CREDENTIAL_UNLOCK_EXPIRY_MINUTES = 3;

export async function requireValidCredentialUnlock(
  userId: string,
  unlockToken: string | null | undefined
) {
  const token = typeof unlockToken === "string" ? unlockToken.trim() : "";
  if (!token) {
    return { ok: false as const, error: "Unlock required", status: 403 as const };
  }

  const candidates = await dbAdmin
    .select()
    .from(credentialUnlocks)
    .where(
      and(
        eq(credentialUnlocks.userId, userId),
        isNotNull(credentialUnlocks.unlockTokenHash),
        gt(credentialUnlocks.unlockExpiresAt, new Date())
      )
    )
    .orderBy(desc(credentialUnlocks.createdAt))
    .limit(20);

  for (const row of candidates) {
    if (!row.unlockTokenHash) continue;
    const match = await bcrypt.compare(token, row.unlockTokenHash);
    if (match) {
      return { ok: true as const, unlock: row };
    }
  }

  return {
    ok: false as const,
    error: "Invalid or expired unlock. Request a new OTP.",
    status: 403 as const,
  };
}

export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(name.length - 2, 0))}@${domain}`;
}

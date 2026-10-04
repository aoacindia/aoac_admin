import { and, count, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { adminUsers } from "@/lib/db/admin-schema";

export async function isLastActiveAdmin(userId: string) {
  const [user] = await dbAdmin
    .select({
      id: adminUsers.id,
      role: adminUsers.role,
      suspended: adminUsers.suspended,
      terminated: adminUsers.terminated,
    })
    .from(adminUsers)
    .where(eq(adminUsers.id, userId))
    .limit(1);

  if (!user || user.role !== "ADMIN" || user.suspended || user.terminated) {
    return false;
  }

  const [row] = await dbAdmin
    .select({ c: count() })
    .from(adminUsers)
    .where(
      and(
        eq(adminUsers.role, "ADMIN"),
        eq(adminUsers.suspended, false),
        eq(adminUsers.terminated, false)
      )
    );

  return Number(row?.c ?? 0) <= 1;
}

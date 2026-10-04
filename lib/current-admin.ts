import { eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import type { AdminRole } from "@/lib/db/admin-schema";
import { adminUsers } from "@/lib/db/admin-schema";

export type LiveAdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  suspended: boolean;
  terminated: boolean;
};

export async function getLiveAdminUser(
  userId?: string | null
): Promise<LiveAdminUser | null> {
  if (!userId) return null;

  const [user] = await dbAdmin
    .select({
      id: adminUsers.id,
      name: adminUsers.name,
      email: adminUsers.email,
      phone: adminUsers.phone,
      role: adminUsers.role,
      suspended: adminUsers.suspended,
      terminated: adminUsers.terminated,
    })
    .from(adminUsers)
    .where(eq(adminUsers.id, userId))
    .limit(1);

  if (!user || user.suspended || user.terminated) {
    return null;
  }

  return user;
}

import { auth } from "@/auth";

export async function requireAdminApi() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized", status: 401 as const };
  }
  if (session.user.role !== "ADMIN") {
    return { error: "Forbidden", status: 403 as const };
  }
  return { session };
}

/** Any signed-in dashboard user (ADMIN / MANAGER / STAFF). */
export async function requireSessionApi() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized", status: 401 as const };
  }
  return { session };
}

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

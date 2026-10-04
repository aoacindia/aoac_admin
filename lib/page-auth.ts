import { redirect } from "next/navigation";

import type { Permission } from "@/lib/permissions";
import { requirePermissionApi } from "@/lib/require-admin";

export async function requirePagePermission(permission: Permission) {
  const result = await requirePermissionApi(permission);
  if ("error" in result) {
    if (result.status === 401) {
      redirect("/login");
    }
    redirect("/dashboard/unauthorized");
  }
  return result;
}

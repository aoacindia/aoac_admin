import { auth } from "@/auth";
import { audit } from "@/lib/audit";
import { getLiveAdminUser, type LiveAdminUser } from "@/lib/current-admin";
import {
  hasAnyPermission,
  hasPermission,
  type Permission,
} from "@/lib/permissions";

type SessionWithUser = {
  user: {
    id: string;
    role: string;
    email?: string | null;
    name?: string | null;
  };
};

export type AuthOk = {
  session: SessionWithUser;
  actor: LiveAdminUser;
};

export type AuthFail = {
  error: string;
  status: 401 | 403;
};

export async function requireLiveSession(): Promise<AuthOk | AuthFail> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  const actor = await getLiveAdminUser(session.user.id);
  if (!actor) {
    return { error: "Unauthorized", status: 401 };
  }

  return {
    session: {
      user: {
        id: actor.id,
        role: actor.role,
        email: actor.email,
        name: actor.name,
      },
    },
    actor,
  };
}

export async function requirePermissionApi(
  permission: Permission | Permission[]
): Promise<AuthOk | AuthFail> {
  const result = await requireLiveSession();
  if ("error" in result) {
    return result;
  }

  const needed = Array.isArray(permission) ? permission : [permission];
  const allowed = Array.isArray(permission)
    ? hasAnyPermission(result.actor.role, needed)
    : hasPermission(result.actor.role, permission);

  if (!allowed) {
    audit({
      action: "authorization.denied",
      actorId: result.actor.id,
      actorRole: result.actor.role,
      outcome: "denied",
      meta: { permission: needed },
    });
    return { error: "Forbidden", status: 403 };
  }

  return result;
}

/** ADMIN-only helper kept for existing call sites. Uses live DB role. */
export async function requireAdminApi() {
  return requirePermissionApi("roles.manage");
}

/** Any signed-in, active dashboard user. */
export async function requireSessionApi() {
  return requireLiveSession();
}

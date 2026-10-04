import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { audit } from "@/lib/audit";
import { authErrorResponse, jsonError, serverErrorResponse } from "@/lib/api-response";
import { isLastActiveAdmin } from "@/lib/admin-user-guards";
import { dbAdmin } from "@/lib/db";
import type { AdminRole } from "@/lib/db/admin-schema";
import { adminUsers } from "@/lib/db/admin-schema";
import { canAssignRole, isAdminRole } from "@/lib/permissions";
import { requirePermissionApi } from "@/lib/require-admin";

const PUBLIC_COLUMNS = {
  id: adminUsers.id,
  name: adminUsers.name,
  email: adminUsers.email,
  phone: adminUsers.phone,
  role: adminUsers.role,
  suspended: adminUsers.suspended,
  terminated: adminUsers.terminated,
  createdAt: adminUsers.createdAt,
  updatedAt: adminUsers.updatedAt,
} as const;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requirePermissionApi("users.view");
  if ("error" in authResult) {
    return authErrorResponse(authResult);
  }

  try {
    const { id } = await params;
    const [user] = await dbAdmin
      .select(PUBLIC_COLUMNS)
      .from(adminUsers)
      .where(eq(adminUsers.id, id))
      .limit(1);

    if (!user) {
      return jsonError("User not found", 404);
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: unknown) {
    return serverErrorResponse(error, "Error fetching admin user:");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requirePermissionApi([
    "users.update",
    "users.change_role",
  ]);
  if ("error" in authResult) {
    return authErrorResponse(authResult);
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const [existing] = await dbAdmin
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, id))
      .limit(1);

    if (!existing) {
      return jsonError("User not found", 404);
    }

    const patch: Partial<typeof adminUsers.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) {
      const name = String(body.name || "").trim();
      if (!name) return jsonError("Name is required", 400);
      patch.name = name;
    }

    if (body.email !== undefined) {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) return jsonError("Email is required", 400);
      patch.email = email;
    }

    if (body.phone !== undefined) {
      const phone = String(body.phone || "").trim();
      if (!phone) return jsonError("Phone is required", 400);
      patch.phone = phone;
    }

    if (body.role !== undefined) {
      const role = String(body.role || "").toUpperCase();
      if (!canAssignRole(authResult.actor.role, role) || !isAdminRole(role)) {
        audit({
          action: "users.change_role",
          actorId: authResult.actor.id,
          actorRole: authResult.actor.role,
          targetType: "admin_user",
          targetId: id,
          outcome: "denied",
          meta: { requestedRole: role },
        });
        return jsonError("Forbidden", 403);
      }
      if (
        existing.role === "ADMIN" &&
        role !== "ADMIN" &&
        (await isLastActiveAdmin(id))
      ) {
        return jsonError("Cannot demote the last active admin", 400);
      }
      patch.role = role as AdminRole;
    }

    if (body.suspended !== undefined) {
      const suspended = Boolean(body.suspended);
      if (
        suspended &&
        existing.role === "ADMIN" &&
        (await isLastActiveAdmin(id))
      ) {
        return jsonError("Cannot suspend the last active admin", 400);
      }
      if (suspended && id === authResult.actor.id) {
        return jsonError("Cannot suspend your own account", 400);
      }
      patch.suspended = suspended;
      if (suspended) {
        patch.suspended_number = (existing.suspended_number || 0) + 1;
      }
    }

    if (body.terminated !== undefined) {
      const terminated = Boolean(body.terminated);
      if (
        terminated &&
        existing.role === "ADMIN" &&
        (await isLastActiveAdmin(id))
      ) {
        return jsonError("Cannot terminate the last active admin", 400);
      }
      if (terminated && id === authResult.actor.id) {
        return jsonError("Cannot terminate your own account", 400);
      }
      patch.terminated = terminated;
    }

    const [updated] = await dbAdmin
      .update(adminUsers)
      .set(patch)
      .where(eq(adminUsers.id, id))
      .returning(PUBLIC_COLUMNS);

    audit({
      action: "users.update",
      actorId: authResult.actor.id,
      actorRole: authResult.actor.role,
      targetType: "admin_user",
      targetId: id,
      outcome: "success",
      meta: {
        role: patch.role,
        suspended: patch.suspended,
        terminated: patch.terminated,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return serverErrorResponse(error, "Error updating admin user:");
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requirePermissionApi("users.delete");
  if ("error" in authResult) {
    return authErrorResponse(authResult);
  }

  try {
    const { id } = await params;
    if (id === authResult.actor.id) {
      return jsonError("Cannot deactivate your own account", 400);
    }

    const [existing] = await dbAdmin
      .select({
        id: adminUsers.id,
        role: adminUsers.role,
      })
      .from(adminUsers)
      .where(eq(adminUsers.id, id))
      .limit(1);

    if (!existing) {
      return jsonError("User not found", 404);
    }

    if (existing.role === "ADMIN" && (await isLastActiveAdmin(id))) {
      return jsonError("Cannot deactivate the last active admin", 400);
    }

    const [updated] = await dbAdmin
      .update(adminUsers)
      .set({
        terminated: true,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, id))
      .returning(PUBLIC_COLUMNS);

    audit({
      action: "users.deactivate",
      actorId: authResult.actor.id,
      actorRole: authResult.actor.role,
      targetType: "admin_user",
      targetId: id,
      outcome: "success",
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return serverErrorResponse(error, "Error deactivating admin user:");
  }
}

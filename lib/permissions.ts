import type { AdminRole } from "@/lib/db/admin-schema";

export const PERMISSIONS = [
  "dashboard.view",
  "customers.view",
  "customers.create",
  "customers.update",
  "customers.delete",
  "orders.view",
  "orders.create",
  "orders.update",
  "orders.delete",
  "products.view",
  "products.create",
  "products.update",
  "products.delete",
  "products.manage_discounts",
  "suppliers.view",
  "suppliers.create",
  "suppliers.update",
  "suppliers.delete",
  "contacts.view",
  "contacts.delete",
  "users.view",
  "users.create",
  "users.update",
  "users.delete",
  "users.change_role",
  "credentials.view",
  "credentials.manage",
  "settings.view",
  "settings.manage",
  "roles.manage",
  "files.upload",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ADMIN_PERMISSIONS = new Set<Permission>(PERMISSIONS);

const MANAGER_PERMISSIONS = new Set<Permission>([
  "dashboard.view",
  "customers.view",
  "customers.create",
  "customers.update",
  "orders.view",
  "orders.create",
  "orders.update",
  "products.view",
  "products.create",
  "products.update",
  "suppliers.view",
  "suppliers.create",
  "suppliers.update",
  "contacts.view",
  "files.upload",
  "settings.view",
]);

const STAFF_PERMISSIONS = new Set<Permission>([
  "dashboard.view",
  "customers.view",
  "customers.update",
  "products.view",
  "products.create",
  "products.update",
  "suppliers.view",
  "suppliers.update",
  "contacts.view",
  "files.upload",
]);

export const ROLE_PERMISSIONS: Record<AdminRole, ReadonlySet<Permission>> = {
  ADMIN: ADMIN_PERMISSIONS,
  MANAGER: MANAGER_PERMISSIONS,
  STAFF: STAFF_PERMISSIONS,
};

export const ASSIGNABLE_ROLES: readonly AdminRole[] = [
  "ADMIN",
  "MANAGER",
  "STAFF",
];

export function isAdminRole(value: string | null | undefined): value is AdminRole {
  return value === "ADMIN" || value === "MANAGER" || value === "STAFF";
}

export function permissionsForRole(
  role: string | null | undefined
): ReadonlySet<Permission> {
  if (!isAdminRole(role)) return new Set();
  return ROLE_PERMISSIONS[role];
}

export function hasPermission(
  role: string | null | undefined,
  permission: Permission
): boolean {
  return permissionsForRole(role).has(permission);
}

export function hasAnyPermission(
  role: string | null | undefined,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function canAssignRole(
  actorRole: string | null | undefined,
  targetRole: string | null | undefined
): boolean {
  if (!hasPermission(actorRole, "users.change_role")) return false;
  return isAdminRole(targetRole);
}

export const PAGE_PERMISSIONS: { prefix: string; permission: Permission }[] = [
  { prefix: "/dashboard/users", permission: "users.view" },
  { prefix: "/dashboard/credentials", permission: "credentials.view" },
  { prefix: "/dashboard/accounts", permission: "settings.view" },
  { prefix: "/dashboard/our-own-data", permission: "settings.view" },
  { prefix: "/dashboard/emails", permission: "settings.manage" },
  { prefix: "/dashboard/orders", permission: "orders.view" },
  { prefix: "/print-invoice", permission: "orders.view" },
  { prefix: "/dashboard/products/category-discount", permission: "products.manage_discounts" },
  { prefix: "/dashboard/products/product-discount", permission: "products.manage_discounts" },
  { prefix: "/dashboard/products", permission: "products.view" },
  { prefix: "/dashboard/customers", permission: "customers.view" },
  { prefix: "/dashboard/suppliers", permission: "suppliers.view" },
  { prefix: "/dashboard/contacts", permission: "contacts.view" },
  { prefix: "/dashboard", permission: "dashboard.view" },
];

export function permissionForPath(pathname: string): Permission | null {
  for (const entry of PAGE_PERMISSIONS) {
    if (pathname === entry.prefix || pathname.startsWith(`${entry.prefix}/`)) {
      return entry.permission;
    }
  }
  return null;
}

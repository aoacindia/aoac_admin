import assert from "node:assert/strict";

import {
  canAssignRole,
  hasPermission,
  permissionForPath,
  type Permission,
} from "../lib/permissions";

const cases: Array<[string, Permission, boolean]> = [
  ["ADMIN", "users.view", true],
  ["ADMIN", "users.change_role", true],
  ["ADMIN", "credentials.manage", true],
  ["ADMIN", "orders.delete", true],
  ["ADMIN", "customers.delete", true],
  ["MANAGER", "dashboard.view", true],
  ["MANAGER", "customers.view", true],
  ["MANAGER", "customers.update", true],
  ["MANAGER", "customers.delete", false],
  ["MANAGER", "orders.view", true],
  ["MANAGER", "orders.update", true],
  ["MANAGER", "orders.delete", false],
  ["MANAGER", "users.view", false],
  ["MANAGER", "users.create", false],
  ["MANAGER", "credentials.view", false],
  ["MANAGER", "settings.view", true],
  ["MANAGER", "settings.manage", false],
  ["STAFF", "dashboard.view", true],
  ["STAFF", "customers.view", true],
  ["STAFF", "orders.view", false],
  ["STAFF", "users.view", false],
  ["STAFF", "credentials.view", false],
  ["STAFF", "customers.delete", false],
  ["STAFF", "orders.delete", false],
];

for (const [role, permission, expected] of cases) {
  assert.equal(
    hasPermission(role, permission),
    expected,
    `${role} ${permission} should be ${expected}`
  );
}

assert.equal(canAssignRole("ADMIN", "MANAGER"), true);
assert.equal(canAssignRole("MANAGER", "STAFF"), false);
assert.equal(canAssignRole("STAFF", "ADMIN"), false);
assert.equal(permissionForPath("/dashboard/users/create"), "users.view");
assert.equal(permissionForPath("/dashboard/credentials"), "credentials.view");
assert.equal(permissionForPath("/dashboard/orders/processing"), "orders.view");
assert.equal(permissionForPath("/dashboard/accounts"), "settings.view");
assert.equal(permissionForPath("/dashboard/emails"), "settings.manage");
assert.equal(permissionForPath("/api/admin-users"), null);

console.log(`ok ${cases.length + 5} permission assertions`);

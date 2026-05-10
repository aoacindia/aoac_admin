import type { SQL } from "drizzle-orm";
import { and, eq, gte, ilike, inArray, isNull, lte, or, sql } from "drizzle-orm";

import { orders, orderStatusEnum, users } from "@/lib/db/user-schema";

const ORDER_STATUSES = orderStatusEnum.enumValues;

type OrderStatusValue = (typeof ORDER_STATUSES)[number];

function toOrderStatuses(vals: string[]): OrderStatusValue[] {
  const set = new Set<string>(ORDER_STATUSES);
  return vals.filter((s): s is OrderStatusValue => set.has(s));
}

/** Drizzle JOIN-friendly conditions for `/api/orders` list filters (paired with joined `users`). */
export function buildOrdersListConditionsDrizzle(params: {
  orderType: string | null;
  status: string | null;
  statuses?: string[] | null;
  search: string | null;
  month: number | null;
  year: number | null;
}): SQL | undefined {
  const clauses: SQL[] = [];

  const rawStatusesInput = (params.statuses ?? [])
    .map((s) => String(s || "").trim())
    .filter(Boolean);
  const statusList = toOrderStatuses(rawStatusesInput);

  const singleRaw = params.status?.trim();

  const userTypePersonal = or(
    eq(users.isBusinessAccount, false),
    isNull(users.isBusinessAccount)
  );

  if (statusList.length > 0) {
    clauses.push(inArray(orders.status, statusList));
  } else if (rawStatusesInput.length > 0) {
    clauses.push(sql`false`);
  } else if (singleRaw) {
    const one = ORDER_STATUSES.find((x) => x === singleRaw);
    if (one) clauses.push(eq(orders.status, one));
    else clauses.push(sql`false`);
  } else if (params.orderType === "pending") {
    clauses.push(eq(orders.status, "PENDING"));
  }

  if (
    params.month != null &&
    params.year != null &&
    Number.isFinite(params.month) &&
    Number.isFinite(params.year) &&
    params.month >= 1 &&
    params.month <= 12 &&
    params.year >= 2000 &&
    params.year <= 2100
  ) {
    const idx = params.month - 1;
    const rangeStart = new Date(params.year, idx, 1, 0, 0, 0, 0);
    const rangeEnd = new Date(params.year, idx + 1, 0, 23, 59, 59, 999);
    clauses.push(
      and(
        gte(orders.orderDate, rangeStart),
        lte(orders.orderDate, rangeEnd)
      )!
    );
  }

  const searchTrim = params.search?.trim();
  let userTypeClause: SQL | undefined;
  if (params.orderType === "business") {
    userTypeClause = eq(users.isBusinessAccount, true);
  } else if (params.orderType === "personal") {
    userTypeClause = userTypePersonal;
  }

  if (searchTrim) {
    const needle = `%${searchTrim}%`;
    const userMatch = or(
      ilike(users.name, needle),
      ilike(users.email, needle),
      ilike(users.businessName, needle)
    );
    const userScoped =
      userTypeClause !== undefined ? and(userTypeClause, userMatch)! : userMatch;
    clauses.push(
      or(
        ilike(orders.id, needle),
        ilike(orders.InvoiceNumber, needle),
        userScoped
      )!
    );
  } else if (userTypeClause !== undefined) {
    clauses.push(userTypeClause);
  }

  return clauses.length > 0 ? and(...clauses) : undefined;
}

export function parseStatusesParam(raw: string | null): string[] | null {
  if (!raw) return null;
  const values = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return values.length > 0 ? values : null;
}

export function parseMonthYearParams(
  monthParam: string | null,
  yearParam: string | null
): { month: number | null; year: number | null } {
  if (!monthParam || !yearParam) {
    return { month: null, year: null };
  }
  const m = Number(monthParam);
  const y = Number(yearParam);
  if (
    Number.isFinite(m) &&
    Number.isFinite(y) &&
    m >= 1 &&
    m <= 12 &&
    y >= 2000 &&
    y <= 2100
  ) {
    return { month: m, year: y };
  }
  return { month: null, year: null };
}

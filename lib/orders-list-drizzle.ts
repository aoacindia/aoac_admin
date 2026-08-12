import type { SQL } from "drizzle-orm";
import { and, count, desc, eq } from "drizzle-orm";

import { buildOrdersListConditionsDrizzle } from "@/lib/build-orders-list-where";
import { dbUser } from "@/lib/db";
import { businesses, orders, users } from "@/lib/db/user-schema";

type ListParams = {
  orderType: string | null;
  status: string | null;
  statuses?: string[] | null;
  search: string | null;
  month: number | null;
  year: number | null;
};

/**
 * Shared join filter for admin order list + month summary.
 */
export function ordersListJoinWhere(params: ListParams): SQL | undefined {
  return buildOrdersListConditionsDrizzle(params);
}

export async function countOrdersListDrizzle(params: ListParams): Promise<number> {
  const cond = ordersListJoinWhere(params);
  const q = dbUser
    .select({ c: count() })
    .from(orders)
    .innerJoin(users, eq(orders.orderBy, users.id))
    .leftJoin(businesses, eq(orders.businessId, businesses.id));
  const [row] = cond ? await q.where(cond) : await q;
  return Number(row?.c ?? 0);
}

/** Ordered order ids for pagination (newest first). */
export async function selectOrderIdsPageDrizzle(
  params: ListParams,
  offset: number,
  limit: number
): Promise<string[]> {
  const cond = ordersListJoinWhere(params);
  const base = dbUser
    .select({ id: orders.id })
    .from(orders)
    .innerJoin(users, eq(orders.orderBy, users.id))
    .leftJoin(businesses, eq(orders.businessId, businesses.id))
    .orderBy(desc(orders.orderDate))
    .limit(limit)
    .offset(offset);
  const rows = cond ? await base.where(cond) : await base;
  return rows.map((r) => r.id);
}

export async function selectOrdersSummariesForMonthDrizzle(
  params: ListParams
): Promise<
  Array<{
    status: string;
    invoiceAmount: number | null;
    totalAmount: number;
    discountAmount: number | null;
    shippingAmount: number | null;
  }>
> {
  const cond = ordersListJoinWhere(params);
  const base = dbUser
    .select({
      status: orders.status,
      invoiceAmount: orders.invoiceAmount,
      totalAmount: orders.totalAmount,
      discountAmount: orders.discountAmount,
      shippingAmount: orders.shippingAmount,
    })
    .from(orders)
    .innerJoin(users, eq(orders.orderBy, users.id))
    .leftJoin(businesses, eq(orders.businessId, businesses.id));
  return cond ? await base.where(cond) : await base;
}

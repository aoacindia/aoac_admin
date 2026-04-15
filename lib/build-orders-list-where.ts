/**
 * Shared Prisma `where` for admin orders list and month summary (same filter semantics).
 */
export function buildOrdersListWhere(params: {
  orderType: string | null;
  status: string | null;
  search: string | null;
  month: number | null;
  year: number | null;
}): Record<string, unknown> {
  const where: Record<string, unknown> = {};
  const userConditions: Record<string, unknown> = {};

  if (params.orderType === "business") {
    userConditions.isBusinessAccount = true;
  } else if (params.orderType === "personal") {
    userConditions.OR = [
      { isBusinessAccount: false },
      { isBusinessAccount: null },
    ];
  }

  if (params.status) {
    where.status = params.status;
  } else if (params.orderType === "pending") {
    where.status = "PENDING";
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
    where.orderDate = { gte: rangeStart, lte: rangeEnd };
  }

  const search = params.search?.trim() || null;
  if (search) {
    const searchConditions: unknown[] = [
      { id: { contains: search } },
      { InvoiceNumber: { contains: search } },
    ];

    const userSearchConditions: Record<string, unknown> = {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
        { businessName: { contains: search } },
      ],
    };

    if (Object.keys(userConditions).length > 0) {
      userSearchConditions.AND = [userConditions];
    }

    searchConditions.push({ user: userSearchConditions });
    where.OR = searchConditions;
  } else if (Object.keys(userConditions).length > 0) {
    where.user = userConditions;
  }

  return where;
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

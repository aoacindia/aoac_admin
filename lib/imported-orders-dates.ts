/**
 * Calendar month boundaries in UTC so filtering matches across dev (any TZ) and production (often UTC).
 */
export function utcCalendarMonthRange(
  year: number,
  month1to12: number
): { start: Date; end: Date } {
  const start = new Date(Date.UTC(year, month1to12 - 1, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, month1to12, 0, 23, 59, 59, 999));
  return { start, end };
}

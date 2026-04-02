import * as XLSX from "xlsx";

export type ParsedImportedRow = {
  orderDate: Date;
  orderName: string;
  itemName: string;
  itemAmount: number;
  deliveryCharges: number;
  orderTotal: number;
};

export type GroupedOrder = {
  orderDate: Date;
  orderName: string;
  deliveryCharges: number;
  orderTotal: number;
  items: Array<{ itemName: string; amount: number }>;
};

export type ParseFileResult =
  | { ok: true; rows: ParsedImportedRow[] }
  | { ok: false; error: string };

const REQUIRED = [
  "order_date",
  "order_name",
  "item_name",
  "item_amount",
  "delivery_charges",
  "order_total",
] as const;

function normalizeHeader(h: string): string {
  return h
    .replace(/^\ufeff/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function parseNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const s = String(value).trim().replace(/,/g, "");
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

/** Excel serial → calendar day as UTC midnight (same day in all environments). */
function excelSerialToUtcDateOnly(serial: number): Date {
  const utcMs = (serial - 25569) * 86400 * 1000;
  const d = new Date(utcMs);
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0)
  );
}

/** Parse order_date to UTC midnight for that calendar day (dev/prod consistent). */
function parseDate(value: unknown): Date | null {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "number" && Number.isFinite(value)) {
    if (value > 30000 && value < 120000) {
      return excelSerialToUtcDateOnly(value);
    }
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const y = value.getFullYear();
    const m = value.getMonth();
    const d = value.getDate();
    return new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
  }

  const s = String(value).trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (iso) {
    const y = Number(iso[1]);
    const mo = Number(iso[2]);
    const d = Number(iso[3]);
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    return new Date(Date.UTC(y, mo - 1, d, 0, 0, 0, 0));
  }

  const dmY = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(s);
  if (dmY) {
    const day = Number(dmY[1]);
    const month = Number(dmY[2]);
    const year = Number(dmY[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  }

  const parsed = new Date(s);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(
    Date.UTC(
      parsed.getFullYear(),
      parsed.getMonth(),
      parsed.getDate(),
      0,
      0,
      0,
      0
    )
  );
}

function sheetToMatrix(sheet: XLSX.WorkSheet): unknown[][] {
  const ref = sheet["!ref"];
  if (!ref) return [];
  const range = XLSX.utils.decode_range(ref);
  const rows: unknown[][] = [];
  for (let R = range.s.r; R <= range.e.r; R += 1) {
    const row: unknown[] = [];
    for (let C = range.s.c; C <= range.e.c; C += 1) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = sheet[addr];
      row.push(cell?.v ?? "");
    }
    rows.push(row);
  }
  return rows;
}

function matrixToObjects(matrix: unknown[][]): Record<string, unknown>[] {
  if (matrix.length < 2) return [];
  const headerRow = matrix[0].map((c) => normalizeHeader(String(c ?? "")));
  const objects: Record<string, unknown>[] = [];
  for (let i = 1; i < matrix.length; i += 1) {
    const row = matrix[i];
    const obj: Record<string, unknown> = {};
    let empty = true;
    for (let j = 0; j < headerRow.length; j += 1) {
      const key = headerRow[j];
      if (!key) continue;
      const v = row[j];
      if (v !== "" && v !== null && v !== undefined) empty = false;
      obj[key] = v;
    }
    if (!empty) objects.push(obj);
  }
  return objects;
}

export function parseImportedOrdersFile(buffer: Buffer): ParseFileResult {
  try {
    const wb = XLSX.read(buffer, {
      type: "buffer",
      raw: false,
      cellDates: true,
    });
    const sheetName = wb.SheetNames[0];
    if (!sheetName) {
      return { ok: false, error: "The file has no sheets." };
    }
    const matrix = sheetToMatrix(wb.Sheets[sheetName]);
    const objects = matrixToObjects(matrix);
    if (objects.length === 0) {
      return { ok: false, error: "No data rows found after the header row." };
    }

    const first = objects[0];
    const keys = new Set(Object.keys(first));
    for (const req of REQUIRED) {
      if (!keys.has(req)) {
        return {
          ok: false,
          error: `Missing column "${req.replace(/_/g, " ")}". Required: ${REQUIRED.join(", ")}.`,
        };
      }
    }

    const rows: ParsedImportedRow[] = [];
    for (let i = 0; i < objects.length; i += 1) {
      const o = objects[i];
      const orderDate = parseDate(o.order_date);
      const orderName = String(o.order_name ?? "").trim();
      const itemName = String(o.item_name ?? "").trim();
      const itemAmount = parseNumber(o.item_amount);
      const deliveryCharges = parseNumber(o.delivery_charges);
      const orderTotal = parseNumber(o.order_total);

      const line = i + 2;
      if (!orderDate) {
        return { ok: false, error: `Row ${line}: invalid order_date.` };
      }
      if (!orderName) {
        return { ok: false, error: `Row ${line}: order_name is required.` };
      }
      if (!itemName) {
        return { ok: false, error: `Row ${line}: item_name is required.` };
      }
      if (itemAmount === null) {
        return { ok: false, error: `Row ${line}: invalid item_amount.` };
      }
      if (deliveryCharges === null) {
        return { ok: false, error: `Row ${line}: invalid delivery_charges.` };
      }
      if (orderTotal === null) {
        return { ok: false, error: `Row ${line}: invalid order_total.` };
      }

      rows.push({
        orderDate,
        orderName,
        itemName,
        itemAmount,
        deliveryCharges,
        orderTotal,
      });
    }

    return { ok: true, rows };
  } catch {
    return {
      ok: false,
      error: "Could not read the file. Use CSV (.csv) or Excel (.xlsx).",
    };
  }
}

export function groupImportedRows(
  rows: ParsedImportedRow[]
): { ok: true; orders: GroupedOrder[] } | { ok: false; error: string } {
  const map = new Map<string, GroupedOrder>();

  for (const r of rows) {
    const day = new Date(r.orderDate);
    const key = `${day.toISOString().slice(0, 10)}|${r.orderName}`;

    const existing = map.get(key);
    if (existing) {
      if (
        Math.abs(existing.deliveryCharges - r.deliveryCharges) > 0.009 ||
        Math.abs(existing.orderTotal - r.orderTotal) > 0.009
      ) {
        return {
          ok: false,
          error: `Inconsistent delivery_charges or order_total for order "${r.orderName}" on the same date. All rows for one order must match.`,
        };
      }
      existing.items.push({ itemName: r.itemName, amount: r.itemAmount });
    } else {
      map.set(key, {
        orderDate: day,
        orderName: r.orderName,
        deliveryCharges: r.deliveryCharges,
        orderTotal: r.orderTotal,
        items: [{ itemName: r.itemName, amount: r.itemAmount }],
      });
    }
  }

  for (const g of map.values()) {
    const sumItems = g.items.reduce((s, it) => s + it.amount, 0);
    const expected = sumItems + g.deliveryCharges;
    if (Math.abs(expected - g.orderTotal) > 0.02) {
      return {
        ok: false,
        error: `Order "${g.orderName}" (${g.orderDate.toISOString().slice(0, 10)}): sum of item amounts (${sumItems.toFixed(2)}) + delivery (${g.deliveryCharges.toFixed(2)}) must equal order_total (${g.orderTotal.toFixed(2)}).`,
      };
    }
  }

  return { ok: true, orders: Array.from(map.values()) };
}

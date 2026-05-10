import { and, desc, eq, gte, like, lte } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { orders } from "@/lib/db/user-schema";

/** India FY as YYYY(YY+1), e.g. 202526 */
export function getFinancialYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 4) {
    const fyStart = year;
    const fyEnd = year + 1;
    return `${fyStart}${String(fyEnd).slice(-2)}`;
  }
  const fyStart = year - 1;
  const fyEnd = year;
  return `${fyStart}${String(fyEnd).slice(-2)}`;
}

export function getFinancialYearStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 4) {
    return new Date(year, 3, 1);
  }
  return new Date(year - 1, 3, 1);
}

export async function generateInvoiceNumber(
  invoiceType: "PI" | "TAX_INVOICE",
  isBusinessAccount: boolean,
  financialYear: string,
  financialYearStart: Date,
  invoiceOfficeStateCode?: string | number | null
): Promise<{ invoiceNumber: string; sequenceNumber: number }> {
  const prefix = invoiceType === "PI" ? "P" : isBusinessAccount ? "B" : "R";
  const normalizedStateCode =
    invoiceOfficeStateCode === null || invoiceOfficeStateCode === undefined
      ? ""
      : String(invoiceOfficeStateCode).trim();
  const stateCodeSegment =
    normalizedStateCode && normalizedStateCode !== "10"
      ? normalizedStateCode
      : "";
  const prefixAndFY = `${prefix}${stateCodeSegment}${financialYear}`;

  const [lastInvoice] = await dbUser
    .select({ InvoiceNumber: orders.InvoiceNumber, orderDate: orders.orderDate })
    .from(orders)
    .where(
      and(
        eq(orders.invoiceType, invoiceType),
        gte(orders.orderDate, financialYearStart),
        like(orders.InvoiceNumber, `${prefixAndFY}%`)
      )
    )
    .orderBy(desc(orders.orderDate))
    .limit(1);

  let nextSequenceNumber = 1;

  if (lastInvoice?.InvoiceNumber) {
    const invoiceNumber = lastInvoice.InvoiceNumber;
    if (invoiceNumber.startsWith(prefixAndFY)) {
      const sequenceStr = invoiceNumber.substring(prefixAndFY.length);
      const lastSequence = parseInt(sequenceStr, 10);
      if (!Number.isNaN(lastSequence)) {
        nextSequenceNumber = lastSequence + 1;
      }
    }
  }

  const invoiceNumber = `${prefixAndFY}${nextSequenceNumber}`;
  return { invoiceNumber, sequenceNumber: nextSequenceNumber };
}

export async function generateOrderId(): Promise<string> {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  const dateStr = `${day}${month}${year}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeStr = `${hours}${minutes}${seconds}`;

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  const [lastOrder] = await dbUser
    .select({ id: orders.id })
    .from(orders)
    .where(
      and(
        gte(orders.orderDate, todayStart),
        lte(orders.orderDate, todayEnd),
        like(orders.id, `ODR-${dateStr}-%`)
      )
    )
    .orderBy(desc(orders.orderDate))
    .limit(1);

  let serialNumber = 1;
  if (lastOrder?.id) {
    const parts = lastOrder.id.split("-");
    if (parts.length === 4 && parts[0] === "ODR") {
      const lastSerial = parseInt(parts[3], 10);
      if (!Number.isNaN(lastSerial)) {
        serialNumber = lastSerial + 1;
      }
    }
  }

  let padding = 4;
  if (serialNumber > 99999) {
    padding = 6;
  } else if (serialNumber > 9999) {
    padding = 5;
  }

  const serialStr = String(serialNumber).padStart(padding, "0");
  return `ODR-${dateStr}-${timeStr}-${serialStr}`;
}

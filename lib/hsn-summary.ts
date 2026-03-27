/**
 * Monthly HSN-wise GST summary. Rules align with lib/pdf-generator.ts (invoice):
 * - Per line: taxable = gross ÷ (1 + tax%/100), tax = gross − taxable.
 * - Delivery is booked under the HSN (and tax %) of the line with the largest line total (gross).
 * - Intra-state: CGST = SGST = half of tax; inter-state: IGST = full tax.
 */

import { lineGross, lineTaxableFromGross, type OrderItemTaxInput } from "./order-tax";

export type HsnSummaryRow = {
  hsnCode: string;
  /** Sum of order line quantities for this HSN + GST % (shipping has no quantity). */
  quantity: number;
  taxPercent: number;
  taxableAmount: number;
  igst: number;
  cgst: number;
  sgst: number;
};

type OrderItemWithProduct = OrderItemTaxInput & {
  productId: string;
  quantity: number;
};

export type OrderForHsn = {
  invoiceOfficeId: string | null;
  shippingAmount: number | null;
  shippingAddress: { stateCode?: string | null } | null;
  user?: { billingAddress?: { stateCode?: string | null } | null } | null;
  orderItems: OrderItemWithProduct[];
};

function placeOfSupplyStateCode(order: OrderForHsn): string {
  return (
    order.shippingAddress?.stateCode?.trim() ||
    order.user?.billingAddress?.stateCode?.trim() ||
    ""
  );
}

function normalizeHsn(raw: string | null | undefined): string {
  const t = (raw ?? "").trim();
  return t.length > 0 ? t : "—";
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * @param officeStateCodeById - invoice office id → stateCode (GST state code), for supply type
 */
export function aggregateHsnSummary(
  orders: OrderForHsn[],
  productHsnById: Map<string, string | null>,
  officeStateCodeById: Map<string, string | null>
): HsnSummaryRow[] {
  type Acc = {
    hsnCode: string;
    taxPercent: number;
    quantity: number;
    taxableAmount: number;
    igst: number;
    cgst: number;
    sgst: number;
  };

  const map = new Map<string, Acc>();

  const keyOf = (hsn: string, tax: number) => `${hsn}\0${tax}`;

  function add(
    hsn: string,
    taxPercent: number,
    taxable: number,
    taxAmount: number,
    isIntraState: boolean,
    lineQuantity?: number
  ) {
    const k = keyOf(hsn, taxPercent);
    const cur: Acc = map.get(k) ?? {
      hsnCode: hsn,
      taxPercent,
      quantity: 0,
      taxableAmount: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
    };
    cur.taxableAmount += taxable;
    if (lineQuantity !== undefined && lineQuantity > 0) {
      cur.quantity += Math.floor(lineQuantity);
    }
    if (isIntraState) {
      cur.cgst += taxAmount / 2;
      cur.sgst += taxAmount / 2;
    } else {
      cur.igst += taxAmount;
    }
    map.set(k, cur);
  }

  for (const order of orders) {
    const pos = placeOfSupplyStateCode(order);
    const officeState =
      order.invoiceOfficeId != null
        ? officeStateCodeById.get(order.invoiceOfficeId)?.trim() || ""
        : "";
    const isIntraState =
      Boolean(officeState) &&
      Boolean(pos) &&
      officeState.toUpperCase() === pos.toUpperCase();

    const items = order.orderItems;
    if (items.length === 0) {
      const ship = Number(order.shippingAmount ?? 0);
      if (ship > 0) {
        const t = 18;
        const taxable = lineTaxableFromGross(ship, t);
        const taxAmount = ship - taxable;
        add("—", t, taxable, taxAmount, isIntraState);
      }
      continue;
    }

    let highestGross = 0;
    let hsnForShip = "—";
    let taxForShip = 18;

    for (const item of items) {
      const gross = lineGross(item);
      const taxPct = Number(item.tax ?? 0);
      const taxable = lineTaxableFromGross(gross, taxPct);
      const taxAmount = gross - taxable;
      const hsn = normalizeHsn(productHsnById.get(item.productId) ?? null);

      if (gross > highestGross) {
        highestGross = gross;
        hsnForShip = hsn;
        taxForShip = taxPct;
      }

      add(
        hsn,
        taxPct,
        taxable,
        taxAmount,
        isIntraState,
        Number(item.quantity ?? 0)
      );
    }

    const shipping = Number(order.shippingAmount ?? 0);
    if (shipping > 0) {
      const taxable = lineTaxableFromGross(shipping, taxForShip);
      const taxAmount = shipping - taxable;
      add(hsnForShip, taxForShip, taxable, taxAmount, isIntraState);
    }
  }

  return [...map.values()]
    .sort((a, b) => {
      const hc = a.hsnCode.localeCompare(b.hsnCode);
      if (hc !== 0) return hc;
      return a.taxPercent - b.taxPercent;
    })
    .map((r) => ({
      hsnCode: r.hsnCode,
      quantity: r.quantity,
      taxPercent: r.taxPercent,
      taxableAmount: roundMoney(r.taxableAmount),
      igst: roundMoney(r.igst),
      cgst: roundMoney(r.cgst),
      sgst: roundMoney(r.sgst),
    }));
}

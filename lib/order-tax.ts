/**
 * Tax-inclusive line totals and GST splits — same rules as lib/pdf-generator.ts (invoice PDF).
 */

export type OrderItemTaxInput = {
  price: number;
  quantity: number;
  discount: number;
  tax: number;
};

export function lineGross(item: OrderItemTaxInput): number {
  const rate = Number(item.price ?? 0);
  const qty = Number(item.quantity ?? 0);
  const discount = Number(item.discount ?? 0);
  return Math.max(0, rate * qty - discount);
}

export function lineTaxableFromGross(gross: number, taxPercent: number): number {
  const t = Number(taxPercent ?? 0);
  const divisor = t > 0 ? 1 + t / 100 : 1;
  return gross / divisor;
}

/**
 * Per GST rate: gross (tax-inclusive) and taxable (gross ÷ (1 + rate/100)).
 * Shipping is allocated to the same rate as the highest-value line, default 18% if no lines (PDF behaviour).
 */
export function aggregateOrderTaxBuckets(
  items: OrderItemTaxInput[],
  shippingAmount: number | null | undefined
): Map<number, { grossAmount: number; taxableAmount: number }> {
  const map = new Map<number, { grossAmount: number; taxableAmount: number }>();
  let highestTotal = 0;
  let highestTax = 18;

  for (const item of items) {
    const taxPercent = Number(item.tax ?? 0);
    const gross = lineGross(item);
    const taxable = lineTaxableFromGross(gross, taxPercent);

    if (gross > highestTotal) {
      highestTotal = gross;
      highestTax = taxPercent;
    }

    const cur = map.get(taxPercent) ?? { grossAmount: 0, taxableAmount: 0 };
    cur.grossAmount += gross;
    cur.taxableAmount += taxable;
    map.set(taxPercent, cur);
  }

  const shipping = Number(shippingAmount ?? 0);
  if (shipping > 0) {
    const t = highestTax;
    const taxable = lineTaxableFromGross(shipping, t);
    const cur = map.get(t) ?? { grossAmount: 0, taxableAmount: 0 };
    cur.grossAmount += shipping;
    cur.taxableAmount += taxable;
    map.set(t, cur);
  }

  return map;
}

export function bucketsToSortedArray(
  map: Map<number, { grossAmount: number; taxableAmount: number }>
): Array<{ taxPercent: number; grossAmount: number; taxableAmount: number }> {
  return [...map.entries()]
    .map(([taxPercent, v]) => ({
      taxPercent,
      grossAmount: v.grossAmount,
      taxableAmount: v.taxableAmount,
    }))
    .sort((a, b) => a.taxPercent - b.taxPercent);
}

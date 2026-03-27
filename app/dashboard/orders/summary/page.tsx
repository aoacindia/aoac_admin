"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BusinessRow {
  orderId: string;
  buyerGstin: string | null;
  sellerGstin: string | null;
  invoiceNumber: string | null;
  orderDate: string;
  invoiceTotalRounded: number;
  taxBreakdown: Array<{
    taxPercent: number;
    grossAmount: number;
    taxableAmount: number;
  }>;
  customerLabel: string;
}

interface PersonalRow {
  state: string;
  taxPercent: number;
  grossAmount: number;
  taxableAmount: number;
}

interface HsnRow {
  hsnCode: string;
  quantity: number;
  taxPercent: number;
  taxableAmount: number;
  igst: number;
  cgst: number;
  sgst: number;
}

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Display convention: 5% → ÷1.05, 12% → ÷1.12 (matches “1.{two-digit rate}”). */
function formatTaxDivisor(taxPercent: number) {
  const t = Math.round(Number(taxPercent));
  if (t <= 0) return "1";
  return `1.${String(t).padStart(2, "0")}`;
}

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function buildYearOptions() {
  const y = new Date().getFullYear();
  const out: number[] = [];
  for (let i = y - 10; i <= y + 1; i += 1) {
    out.push(i);
  }
  return out;
}

type SummaryTab = "b2b" | "b2c" | "hsn-b2b" | "hsn-b2c";

export default function OrderSummaryPage() {
  const now = new Date();
  const [activeTab, setActiveTab] = useState<SummaryTab>("b2b");
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [business, setBusiness] = useState<BusinessRow[]>([]);
  const [personal, setPersonal] = useState<PersonalRow[]>([]);
  const [hsnSummary, setHsnSummary] = useState<HsnRow[]>([]);
  const [meta, setMeta] = useState<{
    month: number;
    year: number;
    businessOrderCount: number;
    personalOrderCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(
    monthOverride?: number,
    yearOverride?: number,
    tabOverride?: SummaryTab
  ) {
    const m = monthOverride !== undefined ? monthOverride : month;
    const y = yearOverride !== undefined ? yearOverride : year;
    const tab = tabOverride !== undefined ? tabOverride : activeTab;
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set("month", String(m));
      params.set("year", String(y));
      params.set("segment", tab);
      const res = await fetch(`/api/orders/summary?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load summary");
      }
      setBusiness(data.data.business ?? []);
      setPersonal(data.data.personal ?? []);
      setHsnSummary(data.data.hsnSummary ?? []);
      setMeta(data.data.meta);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load summary");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(undefined, undefined, activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- month/year applied via Load summary / This month
  }, [activeTab]);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Order summary
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Choose a month and year — only orders from that calendar month are included.
            Taxable amount uses gross ÷ (1 + GST% ÷ 100), same as invoices.
          </p>
        </div>
        <Link
          href="/dashboard/orders"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to orders
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <Label className="text-zinc-700 dark:text-zinc-300">Month</Label>
            <Select
              className="mt-1"
              value={String(month)}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label className="text-zinc-700 dark:text-zinc-300">Year</Label>
            <Select
              className="mt-1"
              value={String(year)}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {buildYearOptions().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <Button type="button" onClick={() => load()} disabled={loading}>
              {loading ? "Loading…" : "Load summary"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const d = new Date();
                const cm = d.getMonth() + 1;
                const cy = d.getFullYear();
                setMonth(cm);
                setYear(cy);
                void load(cm, cy);
              }}
            >
              This month
            </Button>
          </div>
        </div>
        {meta && (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {MONTHS.find((m) => m.value === meta.month)?.label} {meta.year}:{" "}
            {activeTab === "b2b" || activeTab === "hsn-b2b" ? (
              <>
                {meta.businessOrderCount} business order
                {meta.businessOrderCount === 1 ? "" : "s"}
              </>
            ) : (
              <>
                {meta.personalOrderCount} personal order
                {meta.personalOrderCount === 1 ? "" : "s"}
              </>
            )}
          </p>
        )}
      </div>

      {/* B2B / B2C */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 mb-6 overflow-hidden">
        <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setActiveTab("b2b")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "b2b"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            B2B
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("b2c")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "b2c"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            B2C
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hsn-b2b")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "hsn-b2b"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            HSN (B2B)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hsn-b2c")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "hsn-b2c"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            HSN (B2C)
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      <div>
        {/* Business — B2B tab */}
        {activeTab === "b2b" && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Business order summary
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Per order: buyer GSTIN, invoice #, date, rounded total, then amount
              by GST rate (gross inclusive of tax vs taxable base).
            </p>
          </div>
          <div className="p-4 max-h-[70vh] overflow-auto">
            {loading ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : business.length === 0 ? (
              <p className="text-sm text-zinc-500">No business orders in this month.</p>
            ) : (
              <div className="space-y-6">
                {business.map((row) => (
                  <div
                    key={row.orderId}
                    className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Buyer GSTIN
                        </span>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {row.buyerGstin || "—"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">{row.customerLabel}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Seller GSTIN (invoice office)
                        </span>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {row.sellerGstin || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Invoice number
                        </span>
                        <p className="font-medium">{row.invoiceNumber || "—"}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Order date
                        </span>
                        <p className="font-medium">
                          {new Date(row.orderDate).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Total invoice value (rounded)
                        </span>
                        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatInr(row.invoiceTotalRounded)}
                        </p>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>GST %</TableHead>
                          <TableHead>Divisor</TableHead>
                          <TableHead className="text-right">Gross (incl. tax)</TableHead>
                          <TableHead className="text-right">Taxable</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {row.taxBreakdown.map((t) => (
                          <TableRow key={`${row.orderId}-${t.taxPercent}`}>
                            <TableCell>{t.taxPercent}%</TableCell>
                            <TableCell className="text-zinc-500 text-xs">
                              ÷ {formatTaxDivisor(t.taxPercent)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatInr(t.grossAmount)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatInr(t.taxableAmount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="mt-2 text-xs text-zinc-500">
                      Order ID:{" "}
                      <Link
                        href={`/dashboard/orders/${row.orderId}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {row.orderId}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        )}

        {/* Personal — B2C tab */}
        {activeTab === "b2c" && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Personal orders — by state &amp; GST rate
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Shipping state from the order address, aggregated across all personal
              orders in this month.
            </p>
          </div>
          <div className="p-4 max-h-[70vh] overflow-auto">
            {loading ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : personal.length === 0 ? (
              <p className="text-sm text-zinc-500">No personal orders in this month.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>GST %</TableHead>
                    <TableHead className="text-right">Gross (incl. tax)</TableHead>
                    <TableHead className="text-right">Taxable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personal.map((r) => (
                    <TableRow key={`${r.state}-${r.taxPercent}`}>
                      <TableCell className="font-medium">{r.state}</TableCell>
                      <TableCell>{r.taxPercent}%</TableCell>
                      <TableCell className="text-right">{formatInr(r.grossAmount)}</TableCell>
                      <TableCell className="text-right">{formatInr(r.taxableAmount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>
        )}

        {/* HSN — business */}
        {activeTab === "hsn-b2b" && (
          <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                HSN summary — business orders
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                HSN from each product; taxable = gross ÷ (1 + GST% ÷ 100). Delivery
                charges are included under the HSN of the highest line total in each
                order (same as invoices). IGST vs CGST/SGST follows invoice office
                state vs place of supply. Qty is the sum of line quantities sold for
                that HSN (delivery charges do not add quantity).
              </p>
            </div>
            <div className="p-4 max-h-[70vh] overflow-auto">
              {loading ? (
                <p className="text-sm text-zinc-500">Loading…</p>
              ) : hsnSummary.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No business orders with line items in this month.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>HSN</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">GST %</TableHead>
                      <TableHead className="text-right">Taxable</TableHead>
                      <TableHead className="text-right">IGST</TableHead>
                      <TableHead className="text-right">CGST</TableHead>
                      <TableHead className="text-right">SGST</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hsnSummary.map((r) => (
                      <TableRow key={`${r.hsnCode}-${r.taxPercent}`}>
                        <TableCell className="font-medium">{r.hsnCode}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {r.quantity.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">{r.taxPercent}%</TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.taxableAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.igst)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.cgst)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.sgst)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </section>
        )}

        {/* HSN — personal */}
        {activeTab === "hsn-b2c" && (
          <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                HSN summary — personal orders
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Same rules as business HSN: product HSN from catalog, delivery on the
                highest-value line per order, GST split by supply type. Qty sums line
                units per HSN for the month.
              </p>
            </div>
            <div className="p-4 max-h-[70vh] overflow-auto">
              {loading ? (
                <p className="text-sm text-zinc-500">Loading…</p>
              ) : hsnSummary.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No personal orders with line items in this month.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>HSN</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">GST %</TableHead>
                      <TableHead className="text-right">Taxable</TableHead>
                      <TableHead className="text-right">IGST</TableHead>
                      <TableHead className="text-right">CGST</TableHead>
                      <TableHead className="text-right">SGST</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hsnSummary.map((r) => (
                      <TableRow key={`${r.hsnCode}-${r.taxPercent}`}>
                        <TableCell className="font-medium">{r.hsnCode}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {r.quantity.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">{r.taxPercent}%</TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.taxableAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.igst)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.cgst)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatInr(r.sgst)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

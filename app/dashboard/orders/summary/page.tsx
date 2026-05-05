"use client";

import { useEffect, useRef, useState } from "react";
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

/** Group multiple orders under the same buyer GSTIN into one visual block */
function groupBusinessByBuyerGstin(rows: BusinessRow[]) {
  const keyOrder: string[] = [];
  const byKey = new Map<string, BusinessRow[]>();

  for (const row of rows) {
    const raw = row.buyerGstin?.trim();
    const key = raw ? raw.toUpperCase() : "__NONE__";
    if (!byKey.has(key)) {
      byKey.set(key, []);
      keyOrder.push(key);
    }
    byKey.get(key)!.push(row);
  }

  return keyOrder.map((key) => {
    const orders = [...(byKey.get(key) ?? [])].sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
    return {
      key,
      buyerGstinDisplay:
        key === "__NONE__" ? null : (orders[0]?.buyerGstin?.trim().toUpperCase() ?? key),
      customerLabel: orders[0]?.customerLabel ?? "—",
      orders,
    };
  });
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
  const [combinedTotals, setCombinedTotals] = useState<{
    taxableAmount: number;
    igst: number;
    cgst: number;
    sgst: number;
  } | null>(null);
  const [meta, setMeta] = useState<{
    month: number;
    year: number;
    businessOrderCount: number;
    personalOrderCount: number;
    invoiceOffices?: Array<{ id: string; gstin: string | null }>;
    selectedInvoiceOfficeId?: string | null;
  } | null>(null);
  const [loadingFull, setLoadingFull] = useState(true);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * When null, omit `sellerOfficeId` so the API auto-selects the 2nd invoice office (newest-first list).
   * Applies to every tab (B2B, B2C, HSN). Synced from `meta.selectedInvoiceOfficeId` after each load.
   */
  const [invoiceOfficeId, setInvoiceOfficeId] = useState<string | null>(null);
  /** Kept stable across tab-only fetches so the office picker does not flicker */
  const [invoiceOfficeList, setInvoiceOfficeList] = useState<
    Array<{ id: string; gstin: string | null }>
  >([]);
  /** After first load, switching tabs only refreshes segment data (not totals or office list) */
  const tabLoadSkipOnce = useRef(false);

  const tabBodyLoading = loadingFull || segmentLoading;
  const blockingActions = loadingFull || segmentLoading;

  async function fetchSummary(opts: {
    monthOverride?: number;
    yearOverride?: number;
    tabOverride?: SummaryTab;
    invoiceOfficeOverride?: string | null;
    includeTotals: boolean;
  }) {
    const m = opts.monthOverride !== undefined ? opts.monthOverride : month;
    const y = opts.yearOverride !== undefined ? opts.yearOverride : year;
    const tab =
      opts.tabOverride !== undefined ? opts.tabOverride : activeTab;

    try {
      if (opts.includeTotals) {
        setLoadingFull(true);
      } else {
        setSegmentLoading(true);
      }
      setError(null);
      const params = new URLSearchParams();
      params.set("month", String(m));
      params.set("year", String(y));
      params.set("segment", tab);
      if (!opts.includeTotals) {
        params.set("includeTotals", "false");
      }
      const sellerForApi =
        opts.invoiceOfficeOverride !== undefined
          ? opts.invoiceOfficeOverride
          : invoiceOfficeId;
      if (sellerForApi !== null && sellerForApi !== "") {
        params.set("sellerOfficeId", sellerForApi);
      }
      const res = await fetch(`/api/orders/summary?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load summary");
      }
      setBusiness(data.data.business ?? []);
      setPersonal(data.data.personal ?? []);
      setHsnSummary(data.data.hsnSummary ?? []);

      if (opts.includeTotals && data.data?.totals !== undefined) {
        setCombinedTotals(data.data.totals ?? null);
      }

      const metaIncoming = data.data.meta;
      setMeta(metaIncoming ?? null);

      if (opts.includeTotals && metaIncoming) {
        setInvoiceOfficeList(metaIncoming.invoiceOffices ?? []);
      }

      if (metaIncoming?.selectedInvoiceOfficeId !== undefined) {
        setInvoiceOfficeId(metaIncoming.selectedInvoiceOfficeId ?? null);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load summary");
    } finally {
      if (opts.includeTotals) {
        setLoadingFull(false);
      } else {
        setSegmentLoading(false);
      }
    }
  }

  async function loadFull(
    monthOverride?: number,
    yearOverride?: number,
    tabOverride?: SummaryTab,
    invoiceOfficeOverride?: string | null
  ) {
    await fetchSummary({
      monthOverride,
      yearOverride,
      tabOverride,
      invoiceOfficeOverride,
      includeTotals: true,
    });
  }

  useEffect(() => {
    void loadFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial totals + offices + active tab payload only
  }, []);

  useEffect(() => {
    if (!tabLoadSkipOnce.current) {
      tabLoadSkipOnce.current = true;
      return;
    }
    void fetchSummary({ tabOverride: activeTab, includeTotals: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberate: manual load handles month/year/office refresh
  }, [activeTab]);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Order summary
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Choose month, year, and invoice office — summaries (all tabs and combined totals)
            only include orders for that office. Taxable amount uses gross ÷ (1 + GST% ÷ 100), same
            as invoices.
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
              onChange={(e) => {
                setMonth(Number(e.target.value));
                setInvoiceOfficeId(null);
              }}
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
              onChange={(e) => {
                setYear(Number(e.target.value));
                setInvoiceOfficeId(null);
              }}
            >
              {buildYearOptions().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => loadFull()}
              disabled={blockingActions}
            >
              {loadingFull ? "Loading…" : "Load summary"}
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
                setInvoiceOfficeId(null);
                void loadFull(cm, cy, undefined, null);
              }}
            >
              This month
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <Label className="text-zinc-700 dark:text-zinc-300">
            Invoice office
          </Label>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-2">
            Applies to{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              every tab and combined totals.
            </span>{" "}
            All offices listed (same order as Offices admin: newest first). By default the{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">second</span> office
            in that list is selected.
          </p>
          {loadingFull && invoiceOfficeList.length === 0 ? (
            <p className="text-sm text-zinc-500">Loading offices…</p>
          ) : invoiceOfficeList.length > 0 ? (
            <Select
              className="mt-1 max-w-xl"
              value={invoiceOfficeId ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setInvoiceOfficeId(v);
                void loadFull(undefined, undefined, activeTab, v);
              }}
            >
              {invoiceOfficeList.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.gstin?.trim() || `Office ${o.id.slice(0, 8)}…`}
                </option>
              ))}
            </Select>
          ) : (
            <p className="text-sm text-zinc-500">
              No invoice offices configured — orders are shown without an office filter.
            </p>
          )}
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

      {/* Combined totals (B2B + B2C) */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Combined tax totals (B2B + B2C)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Totals for the selected month and invoice office across business and personal orders.
              Reloads only when you use <span className="font-medium text-zinc-600 dark:text-zinc-400">Load summary</span>,{" "}
              <span className="font-medium text-zinc-600 dark:text-zinc-400">This month</span>, or change the invoice office
              above — not when switching tabs.
            </p>
          </div>
        </div>

        {loadingFull && combinedTotals === null ? (
          <p className="mt-4 text-sm text-zinc-500">Loading…</p>
        ) : combinedTotals ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Taxable amount
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                {formatInr(combinedTotals.taxableAmount)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                IGST
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                {formatInr(combinedTotals.igst)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                CGST
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                {formatInr(combinedTotals.cgst)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                SGST
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                {formatInr(combinedTotals.sgst)}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">No totals available.</p>
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
              Grouped by buyer GSTIN — multiple invoices for one buyer appear together. Invoice
              office is chosen above with month/year (applies site-wide here). Shows GST % and taxable
              amount per invoice.
            </p>
          </div>
          <div className="p-4 max-h-[70vh] overflow-auto">
            {tabBodyLoading ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : business.length === 0 ? (
              <p className="text-sm text-zinc-500">No business orders in this month.</p>
            ) : (
              <div className="space-y-6">
                {groupBusinessByBuyerGstin(business).map((grp) => (
                  <div
                    key={grp.key}
                    className="rounded-md border border-zinc-200 dark:border-zinc-700 p-4 text-sm space-y-4"
                  >
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Buyer GSTIN
                      </span>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {grp.buyerGstinDisplay || "—"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">{grp.customerLabel}</p>
                    </div>

                    {grp.orders.map((row) => (
                      <div
                        key={row.orderId}
                        className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 p-3 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                              <TableHead className="text-right">Taxable</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {row.taxBreakdown.map((t) => (
                              <TableRow key={`${row.orderId}-${t.taxPercent}`}>
                                <TableCell>{t.taxPercent}%</TableCell>
                                <TableCell className="text-right font-medium">
                                  {formatInr(t.taxableAmount)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <p className="text-xs text-zinc-500">
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
              orders in this month (taxable amount per GST rate).
            </p>
          </div>
          <div className="p-4 max-h-[70vh] overflow-auto">
            {tabBodyLoading ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : personal.length === 0 ? (
              <p className="text-sm text-zinc-500">No personal orders in this month.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>GST %</TableHead>
                    <TableHead className="text-right">Taxable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personal.map((r) => (
                    <TableRow key={`${r.state}-${r.taxPercent}`}>
                      <TableCell className="font-medium">{r.state}</TableCell>
                      <TableCell>{r.taxPercent}%</TableCell>
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
              {tabBodyLoading ? (
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
              {tabBodyLoading ? (
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

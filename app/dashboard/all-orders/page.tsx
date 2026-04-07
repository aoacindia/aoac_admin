"use client";

import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FileDown, Pencil, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Modal from "@/app/components/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  emptyPdfExportOptions,
  pdfExportHasSelection,
  type PdfExportOptions,
} from "@/lib/pdf-export-options";

interface OrderItem {
  id: string;
  lineIndex: number;
  itemName: string;
  amount: number;
}

interface OrderRow {
  id: string;
  orderDate: string;
  orderName: string;
  deliveryCharges: number;
  orderTotal: number;
  createdAt: string;
  items: OrderItem[];
}

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const MONTHS = [
  { value: 0, label: "All months" },
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
  for (let i = y - 8; i <= y + 1; i += 1) {
    out.push(i);
  }
  return out;
}

type EditFormState = {
  orderDate: string;
  orderName: string;
  deliveryCharges: string;
  orderTotal: string;
  items: Array<{ itemName: string; amount: string }>;
};

export default function AllOrdersListPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [periodSummary, setPeriodSummary] = useState<{
    year: number;
    month: number;
    orderCount: number;
    totalAmount: number;
  } | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfOptions, setPdfOptions] = useState<PdfExportOptions>(() =>
    emptyPdfExportOptions()
  );
  const [pdfModalError, setPdfModalError] = useState<string | null>(null);
  const [listRefreshKey, setListRefreshKey] = useState(0);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditFormState | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("pageSize", "20");
        if (month >= 1 && month <= 12) {
          params.set("month", String(month));
          params.set("year", String(year));
        }
        const res = await fetch(`/api/imported-orders?${params.toString()}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load orders");
        }
        if (cancelled) return;
        setOrders(data.data.orders);
        setPeriodSummary(data.data.periodSummary ?? null);
        setPagination(data.data.pagination);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [page, month, year, listRefreshKey]);

  const openEdit = (o: OrderRow) => {
    setEditId(o.id);
    setEditError(null);
    setEditForm({
      orderDate: o.orderDate.slice(0, 10),
      orderName: o.orderName,
      deliveryCharges: String(o.deliveryCharges),
      orderTotal: String(o.orderTotal),
      items: o.items.map((it) => ({
        itemName: it.itemName,
        amount: String(it.amount),
      })),
    });
  };

  const closeEdit = () => {
    setEditId(null);
    setEditForm(null);
    setEditError(null);
  };

  const handleSaveEdit = async () => {
    if (!editId || !editForm) return;
    setEditSaving(true);
    setEditError(null);
    try {
      const items = editForm.items.map((it) => ({
        itemName: it.itemName.trim(),
        amount: Number(it.amount),
      }));
      const res = await fetch(`/api/imported-orders/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDate: editForm.orderDate,
          orderName: editForm.orderName.trim(),
          deliveryCharges: Number(editForm.deliveryCharges),
          orderTotal: Number(editForm.orderTotal),
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(typeof data.error === "string" ? data.error : "Save failed");
      }
      closeEdit();
      setListRefreshKey((k) => k + 1);
    } catch (e: unknown) {
      setEditError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setEditSaving(false);
    }
  };

  const openPdfModal = () => {
    if (month < 1 || month > 12) return;
    setPdfModalError(null);
    setPdfOptions(emptyPdfExportOptions());
    setPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setPdfModalOpen(false);
    setPdfModalError(null);
  };

  const setPdfOpt = <K extends keyof PdfExportOptions>(
    key: K,
    value: PdfExportOptions[K]
  ) => {
    setPdfOptions((o) => ({ ...o, [key]: value }));
  };

  const requestMonthPdfBlob = async (
    options: PdfExportOptions
  ): Promise<Blob> => {
    const res = await fetch("/api/imported-orders/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year,
        month,
        options,
      }),
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(
        typeof j.error === "string" ? j.error : "Could not create PDF."
      );
    }
    return res.blob();
  };

  const handlePdfModalDownload = async () => {
    if (!pdfExportHasSelection(pdfOptions)) {
      setPdfModalError("Select at least one option to include.");
      return;
    }
    setPdfModalError(null);
    setPdfLoading(true);
    try {
      const blob = await requestMonthPdfBlob(pdfOptions);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `all-orders-${year}-${String(month).padStart(2, "0")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      closePdfModal();
    } catch (e: unknown) {
      setPdfModalError(
        e instanceof Error ? e.message : "Could not download PDF."
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handlePdfModalPrint = async () => {
    if (!pdfExportHasSelection(pdfOptions)) {
      setPdfModalError("Select at least one option to include.");
      return;
    }
    setPdfModalError(null);
    setPdfLoading(true);
    try {
      const blob = await requestMonthPdfBlob(pdfOptions);
      const url = URL.createObjectURL(blob);
      const w = window.open(url, "_blank");
      if (w) {
        window.setTimeout(() => {
          try {
            w.focus();
            w.print();
          } catch {
            /* ignore */
          }
        }, 800);
        window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
      } else {
        URL.revokeObjectURL(url);
        setPdfModalError(
          "Pop-up blocked. Allow pop-ups for this site, or use Download."
        );
        return;
      }
      closePdfModal();
    } catch (e: unknown) {
      setPdfModalError(
        e instanceof Error ? e.message : "Could not open PDF for printing."
      );
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          All orders
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Pick year and month to see totals for that
          month; use &quot;All months&quot; to list every order.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="filter-year">Year</Label>
          <Select
            id="filter-year"
            value={String(year)}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setPage(1);
            }}
            className="w-[120px]"
          >
            {buildYearOptions().map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="filter-month">Month</Label>
          <Select
            id="filter-month"
            value={String(month)}
            onChange={(e) => {
              setMonth(Number(e.target.value));
              setPage(1);
            }}
            className="w-[160px]"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setMonth(0);
            setYear(now.getFullYear());
            setPage(1);
          }}
        >
          Clear month filter
        </Button>
      </div>

      {month >= 1 && month <= 12 && (
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <Button
            type="button"
            variant="default"
            disabled={pdfLoading}
            onClick={openPdfModal}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download summary
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={pdfLoading}
            onClick={openPdfModal}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {pdfLoading && (
            <span className="text-sm text-zinc-500">Preparing PDF…</span>
          )}
        </div>
      )}

      {pdfModalOpen && (
        <Modal
          title="PDF summary — choose content"
          onClose={closePdfModal}
          maxWidthClassName="max-w-lg"
          panelClassName="max-h-[85vh] overflow-y-auto"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Select what to include for{" "}
            <span className="font-medium text-foreground">
              {MONTHS[month]?.label} {year}
            </span>
            . Nothing is selected until you tick the boxes.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Summary</p>
              <div className="space-y-2 pl-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.includeDocumentTitle}
                    onChange={(e) =>
                      setPdfOpt("includeDocumentTitle", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Document title (month and year)</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.includeSummaryOrderCount}
                    onChange={(e) =>
                      setPdfOpt("includeSummaryOrderCount", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Number of orders in the period</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.includeSummaryTotalAmount}
                    onChange={(e) =>
                      setPdfOpt("includeSummaryTotalAmount", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Total amount for the period</span>
                </label>
              </div>
            </div>

            <div>
              <p className="font-medium text-foreground mb-2">Per order</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                Selected main fields appear on one line. Line items are listed
                under that order when chosen.
              </p>
              <div className="space-y-2 pl-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.orderRowDate}
                    onChange={(e) =>
                      setPdfOpt("orderRowDate", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Order date</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.orderRowName}
                    onChange={(e) =>
                      setPdfOpt("orderRowName", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Order name</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.orderRowDelivery}
                    onChange={(e) =>
                      setPdfOpt("orderRowDelivery", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Delivery charges</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.orderRowTotal}
                    onChange={(e) =>
                      setPdfOpt("orderRowTotal", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Order total</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={pdfOptions.orderRowItems}
                    onChange={(e) =>
                      setPdfOpt("orderRowItems", e.target.checked)
                    }
                    disabled={pdfLoading}
                  />
                  <span>Order line items (name and amount per line)</span>
                </label>
              </div>
            </div>
          </div>

          {pdfModalError && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-4">
              {pdfModalError}
            </p>
          )}

          <div className="flex flex-wrap gap-2 justify-end mt-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              type="button"
              variant="secondary"
              onClick={closePdfModal}
              disabled={pdfLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={pdfLoading}
              onClick={() => void handlePdfModalPrint()}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button
              type="button"
              disabled={pdfLoading}
              onClick={() => void handlePdfModalDownload()}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </Modal>
      )}

      {periodSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Orders in {MONTHS[periodSummary.month]?.label ?? ""} {periodSummary.year}
            </p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {periodSummary.orderCount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Total amount ({MONTHS[periodSummary.month]?.label ?? ""}{" "}
              {periodSummary.year})
            </p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {formatInr(periodSummary.totalAmount)}
            </p>
          </div>
        </div>
      )}

      {month === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          Select a month to see order count and total amount for that period.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
      )}

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
        {loading ? (
          <p className="p-6 text-zinc-500">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-zinc-500">No orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                {isAdmin && (
                  <TableHead className="w-[88px] text-center">Edit</TableHead>
                )}
                <TableHead>Date</TableHead>
                <TableHead>Order name</TableHead>
                <TableHead className="text-right">Delivery</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <Fragment key={o.id}>
                  <TableRow>
                    <TableCell>
                      <button
                        type="button"
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        aria-expanded={expandedId === o.id}
                        onClick={() =>
                          setExpandedId((id) => (id === o.id ? null : o.id))
                        }
                      >
                        {expandedId === o.id ? "−" : "+"}
                      </button>
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Edit order"
                          onClick={() => openEdit(o)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                    <TableCell>
                      {new Date(o.orderDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{o.orderName}</TableCell>
                    <TableCell className="text-right">
                      {formatInr(o.deliveryCharges)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatInr(o.orderTotal)}
                    </TableCell>
                  </TableRow>
                  {expandedId === o.id && (
                    <TableRow>
                      <TableCell
                        colSpan={isAdmin ? 6 : 5}
                        className="bg-zinc-50 dark:bg-zinc-950/50 p-0"
                      >
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>#</TableHead>
                              <TableHead>Item</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {o.items.map((it) => (
                              <TableRow key={it.id}>
                                <TableCell>{it.lineIndex + 1}</TableCell>
                                <TableCell>{it.itemName}</TableCell>
                                <TableCell className="text-right">
                                  {formatInr(it.amount)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 gap-4">
          <p className="text-sm text-zinc-500">
            Page {pagination.page} of {pagination.totalPages} (
            {pagination.total} orders)
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {editForm && editId && (
        <Modal
          title="Edit order"
          onClose={closeEdit}
          maxWidthClassName="max-w-2xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-order-date">Order date</Label>
                <Input
                  id="edit-order-date"
                  type="date"
                  value={editForm.orderDate}
                  onChange={(e) =>
                    setEditForm((f) =>
                      f ? { ...f, orderDate: e.target.value } : f
                    )
                  }
                  disabled={editSaving}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="edit-order-name">Order name</Label>
                <Input
                  id="edit-order-name"
                  value={editForm.orderName}
                  onChange={(e) =>
                    setEditForm((f) =>
                      f ? { ...f, orderName: e.target.value } : f
                    )
                  }
                  disabled={editSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-delivery">Delivery charges</Label>
                <Input
                  id="edit-delivery"
                  type="number"
                  step="any"
                  min="0"
                  value={editForm.deliveryCharges}
                  onChange={(e) =>
                    setEditForm((f) =>
                      f ? { ...f, deliveryCharges: e.target.value } : f
                    )
                  }
                  disabled={editSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-total">Order total</Label>
                <Input
                  id="edit-total"
                  type="number"
                  step="any"
                  min="0"
                  value={editForm.orderTotal}
                  onChange={(e) =>
                    setEditForm((f) =>
                      f ? { ...f, orderTotal: e.target.value } : f
                    )
                  }
                  disabled={editSaving}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Line items</Label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={editSaving}
                  onClick={() =>
                    setEditForm((f) =>
                      f
                        ? {
                            ...f,
                            items: [
                              ...f.items,
                              { itemName: "", amount: "0" },
                            ],
                          }
                        : f
                    )
                  }
                >
                  Add line
                </Button>
              </div>
              <div className="space-y-2 rounded-md border border-zinc-200 dark:border-zinc-800 p-3">
                {editForm.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-2 sm:items-end"
                  >
                    <div className="flex-1 space-y-1">
                      <span className="text-xs text-zinc-500">Item</span>
                      <Input
                        value={it.itemName}
                        onChange={(e) =>
                          setEditForm((f) => {
                            if (!f) return f;
                            const next = [...f.items];
                            next[idx] = {
                              ...next[idx],
                              itemName: e.target.value,
                            };
                            return { ...f, items: next };
                          })
                        }
                        disabled={editSaving}
                        placeholder="Description"
                      />
                    </div>
                    <div className="w-full sm:w-32 space-y-1">
                      <span className="text-xs text-zinc-500">Amount</span>
                      <Input
                        type="number"
                        step="any"
                        min="0"
                        value={it.amount}
                        onChange={(e) =>
                          setEditForm((f) => {
                            if (!f) return f;
                            const next = [...f.items];
                            next[idx] = {
                              ...next[idx],
                              amount: e.target.value,
                            };
                            return { ...f, items: next };
                          })
                        }
                        disabled={editSaving}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 shrink-0"
                      disabled={editSaving || editForm.items.length <= 1}
                      onClick={() =>
                        setEditForm((f) => {
                          if (!f || f.items.length <= 1) return f;
                          return {
                            ...f,
                            items: f.items.filter((_, i) => i !== idx),
                          };
                        })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Sum of line amounts plus delivery must equal order total (within
                0.02).
              </p>
            </div>

            {editError && (
              <p className="text-sm text-red-600 dark:text-red-400">{editError}</p>
            )}

            <div className="flex flex-wrap gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={closeEdit}
                disabled={editSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => void handleSaveEdit()}
                disabled={editSaving}
              >
                {editSaving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

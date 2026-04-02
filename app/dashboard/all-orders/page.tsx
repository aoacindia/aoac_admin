"use client";

import { Fragment, useEffect, useState } from "react";
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

export default function AllOrdersListPage() {
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
  }, [page, month, year]);

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
                      <TableCell colSpan={5} className="bg-zinc-50 dark:bg-zinc-950/50 p-0">
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
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CreditSummaryRow = {
  paymentMethod: string;
  orderCount: number;
  creditAmount: number;
};

type ApiResponse = {
  success: boolean;
  data?: CreditSummaryRow[];
  error?: string;
  meta?: {
    statuses: string[];
    start: string | null;
    end: string | null;
    totalCredit: number;
    totalOrders: number;
  };
};

const STATUS_PRESETS = [
  { id: "paid", label: "Paid", statuses: ["PAID"] },
  { id: "paid_delivered", label: "Paid + Delivered", statuses: ["PAID", "DELIVERED"] },
  { id: "all", label: "All", statuses: [] as string[] },
];

export default function CreditSummaryPage() {
  const [rows, setRows] = useState<CreditSummaryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [statusPresetId, setStatusPresetId] = useState<string>("paid");
  const [meta, setMeta] = useState<ApiResponse["meta"] | null>(null);

  const statuses = useMemo(() => {
    const preset = STATUS_PRESETS.find((p) => p.id === statusPresetId) ?? STATUS_PRESETS[0];
    return preset.statuses;
  }, [statusPresetId]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (start) params.set("start", start);
      if (end) params.set("end", end);
      if (statuses.length > 0) params.set("statuses", statuses.join(","));

      const response = await fetch(`/api/accounts/credit-summary?${params.toString()}`);
      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load credit summary");
      }

      setRows(data.data || []);
      setMeta(data.meta || null);
    } catch (err: any) {
      setError(err.message || "Failed to load credit summary");
      setRows([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, statusPresetId]);

  const totalCredit = meta?.totalCredit ?? rows.reduce((sum, r) => sum + r.creditAmount, 0);
  const totalOrders = meta?.totalOrders ?? rows.reduce((sum, r) => sum + r.orderCount, 0);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Credit Summary
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Total credited amount grouped by payment method.
          </p>
        </div>

        <Link
          href="/dashboard/accounts"
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-lg transition-colors text-center"
        >
          Back to Accounts
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Start date
            </Label>
            <Input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              End date
            </Label>
            <Input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Status preset
            </Label>
            <select
              value={statusPresetId}
              onChange={(e) => setStatusPresetId(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {STATUS_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing <strong>{totalOrders}</strong> orders • Total credit{" "}
            <strong>₹{totalCredit.toFixed(2)}</strong>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setStart("");
                setEnd("");
                setStatusPresetId("paid");
              }}
              className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              Reset
            </Button>
            <Button
              onClick={fetchSummary}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Payment Method
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Orders
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Credit Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {loading && rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    Loading summary...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.paymentMethod} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                        {r.paymentMethod}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {r.orderCount}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap text-right">
                      <span className="text-sm text-zinc-900 dark:text-zinc-100 font-semibold">
                        ₹{r.creditAmount.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}


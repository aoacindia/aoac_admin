"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SAMPLE_HREF = "/sample-files/imported-orders-sample.csv";

export default function UploadImportedOrdersPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Choose a CSV or Excel file.");
      return;
    }
    const name = file.name.toLowerCase();
    if (!name.endsWith(".csv") && !name.endsWith(".xlsx")) {
      setError("Only .csv and .xlsx files are supported.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/imported-orders", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Import failed.");
        return;
      }
      setFile(null);
      router.push("/dashboard/all-orders");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground">Upload order file</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Upload a CSV or Excel file with one row per line item. Repeat order date, order
        name, delivery charges, and order total on each line for the same order.
      </p>

      <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Required columns</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">order_date</code> — date (YYYY-MM-DD or DD/MM/YYYY)
          </li>
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">order_name</code> — unique name for the order
          </li>
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">item_name</code> — line item description
          </li>
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">item_amount</code> — amount for that line
          </li>
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">delivery_charges</code> — same on every row for that order
          </li>
          <li>
            <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800 px-1 rounded">order_total</code> — must equal sum of item amounts + delivery
          </li>
        </ul>
      </div>

      <p className="mt-4">
        <a
          href={SAMPLE_HREF}
          download="imported-orders-sample.csv"
          className="text-primary underline text-sm font-medium"
        >
          Download sample CSV
        </a>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="file">File (.csv or .xlsx)</Label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            className="block w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-200 file:px-4 file:py-2 file:text-sm file:font-medium dark:file:bg-zinc-800"
            disabled={loading}
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setError(null);
            }}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading || !file}>
            {loading ? "Uploading…" : "Import orders"}
          </Button>
          <Button type="button" variant="secondary" asChild>
            <Link href="/dashboard/all-orders">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

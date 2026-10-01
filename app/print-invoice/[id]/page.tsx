"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ALLOWED_COPIES = new Set(["original", "duplicate", "triplicate"]);

function PrintInvoicePageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = String(params.id || "");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    async function load() {
      if (!orderId) {
        setError("Missing order ID");
        setLoading(false);
        return;
      }

      const copies = (searchParams.get("copies") || "original")
        .split(",")
        .map((c) => c.trim())
        .filter((c) => ALLOWED_COPIES.has(c));

      try {
        const response = await fetch(
          `/api/orders/${encodeURIComponent(orderId)}/download-invoice`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              copies: copies.length ? copies : ["original"],
              downloadItemsOnly: false,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "Failed to generate invoice PDF");
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(
          new Blob([blob], { type: "application/pdf" })
        );
        if (!cancelled) setPdfUrl(objectUrl);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load invoice");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [orderId, searchParams]);

  const triggerPrint = () => {
    const frame = iframeRef.current;
    if (frame?.contentWindow) {
      frame.contentWindow.focus();
      frame.contentWindow.print();
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black flex flex-col">
      <div className="print:hidden flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          Invoice {orderId}
        </p>
        <Button
          type="button"
          onClick={triggerPrint}
          disabled={!pdfUrl}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-50"
        >
          Print
        </Button>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400">
          Generating invoice PDF…
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center text-sm text-red-600 px-4">
          {error}
        </div>
      )}

      {pdfUrl && (
        <iframe
          ref={iframeRef}
          title="Invoice PDF"
          src={pdfUrl}
          className="flex-1 w-full border-0 bg-white"
          onLoad={() => {
            window.setTimeout(() => triggerPrint(), 400);
          }}
        />
      )}
    </div>
  );
}

export default function PrintInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-zinc-600">
          Loading print preview…
        </div>
      }
    >
      <PrintInvoicePageInner />
    </Suspense>
  );
}


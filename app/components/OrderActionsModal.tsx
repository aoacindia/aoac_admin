"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";

export const PAYMENT_LINK_ELIGIBLE_STATUSES = [
  "PENDING",
  "ORDER_SHIPPED_WITHOUT_PAYMENT",
] as const;

export function canGeneratePaymentLink(status: string): boolean {
  return (PAYMENT_LINK_ELIGIBLE_STATUSES as readonly string[]).includes(status);
}

export type OrderActionsOrder = {
  id: string;
  status: string;
  InvoiceNumber: string | null;
  paymentLinkUrl: string | null;
  user: { name: string; email: string };
};

type OrderActionsModalProps = {
  order: OrderActionsOrder;
  onClose: () => void;
  showViewButton?: boolean;
  onDownloadPdf: () => void;
  onSendPi: () => void;
  onDelete: () => void;
  deleting?: boolean;
  onPaymentLinkGenerated?: (paymentLink: string) => void;
};

export default function OrderActionsModal({
  order,
  onClose,
  showViewButton = true,
  onDownloadPdf,
  onSendPi,
  onDelete,
  deleting = false,
  onPaymentLinkGenerated,
}: OrderActionsModalProps) {
  const router = useRouter();
  const [generatingLink, setGeneratingLink] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(order.paymentLinkUrl);
  const [linkError, setLinkError] = useState<string | null>(null);

  const busy = generatingLink || deleting;

  const handleGeneratePaymentLink = async () => {
    setGeneratingLink(true);
    setLinkError(null);
    try {
      const response = await fetch(
        `/api/admin/orders/${encodeURIComponent(order.id)}/generate-payment-link`,
        { method: "POST", credentials: "include" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate payment link");
      }

      setPaymentLink(data.paymentLink);
      onPaymentLinkGenerated?.(data.paymentLink);

      try {
        await navigator.clipboard.writeText(data.paymentLink);
        alert("Payment link generated and copied to clipboard.");
      } catch {
        alert("Payment link generated successfully.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to generate payment link";
      setLinkError(message);
    } finally {
      setGeneratingLink(false);
    }
  };

  const handleCopyLink = async () => {
    if (!paymentLink) return;
    try {
      await navigator.clipboard.writeText(paymentLink);
      alert("Payment link copied to clipboard.");
    } catch {
      alert("Could not copy to clipboard. Please copy the link manually.");
    }
  };

  const actionButtonClass =
    "w-full justify-center px-4 py-2 text-sm text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <Modal
      title="Order Actions"
      disableClose={busy}
      onClose={onClose}
      maxWidthClassName="max-w-md"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Order <strong>{order.id}</strong>
        {order.InvoiceNumber ? ` · ${order.InvoiceNumber}` : ""}
      </p>

      <div className="flex flex-col gap-2">
        {showViewButton && (
          <Button
            onClick={() => {
              router.push(`/dashboard/orders/${order.id}`);
              onClose();
            }}
            disabled={busy}
            className={`${actionButtonClass} bg-purple-600 hover:bg-purple-700`}
          >
            View
          </Button>
        )}
        <Button
          onClick={() => {
            router.push(`/dashboard/orders/${order.id}/edit`);
            onClose();
          }}
          disabled={busy}
          className={`${actionButtonClass} bg-blue-600 hover:bg-blue-700`}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            onClose();
            onDownloadPdf();
          }}
          disabled={busy}
          className={`${actionButtonClass} bg-green-600 hover:bg-green-700`}
        >
          Download PDF
        </Button>
        <Button
          onClick={() => {
            onClose();
            onSendPi();
          }}
          disabled={busy}
          className={`${actionButtonClass} bg-indigo-600 hover:bg-indigo-700`}
        >
          Send PI
        </Button>
        {canGeneratePaymentLink(order.status) && (
          <Button
            onClick={handleGeneratePaymentLink}
            disabled={busy}
            className={`${actionButtonClass} bg-amber-600 hover:bg-amber-700`}
          >
            {generatingLink ? "Generating link..." : "Generate Payment Link"}
          </Button>
        )}
        <Button
          onClick={() => {
            onClose();
            onDelete();
          }}
          disabled={busy}
          className={`${actionButtonClass} bg-red-600 hover:bg-red-700`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {linkError && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{linkError}</p>
      )}

      {paymentLink && (
        <div className="mt-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Payment link
          </p>
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 break-all hover:underline"
          >
            {paymentLink}
          </a>
          <Button
            onClick={handleCopyLink}
            disabled={busy}
            className="mt-2 w-full px-3 py-1.5 text-sm bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg"
          >
            Copy link
          </Button>
        </div>
      )}

      <Button
        onClick={onClose}
        disabled={busy}
        className="mt-4 w-full px-4 py-2 bg-zinc-500 hover:bg-zinc-600 text-white rounded-lg transition-colors disabled:opacity-50"
      >
        Close
      </Button>
    </Modal>
  );
}

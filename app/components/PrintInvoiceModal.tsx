"use client";

import { useState } from "react";

import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type InvoiceCopies = {
  original: boolean;
  duplicate: boolean;
  triplicate: boolean;
};

export default function PrintInvoiceModal({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) {
  const [copies, setCopies] = useState<InvoiceCopies>({
    original: true,
    duplicate: false,
    triplicate: false,
  });

  const openPrintPage = () => {
    const selected = Object.entries(copies)
      .filter(([, checked]) => checked)
      .map(([key]) => key);
    const copiesParam = (selected.length ? selected : ["original"]).join(",");
    const url = `/print-invoice/${encodeURIComponent(orderId)}?copies=${encodeURIComponent(copiesParam)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal title="Print Invoice" onClose={onClose} maxWidthClassName="max-w-md">
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Choose which invoice copies to print. A new page will open with the PDF and
        the print dialog.
      </p>
      <div className="space-y-2 mb-6">
        <Label className="text-sm text-zinc-700 dark:text-zinc-300">
          Select invoice copies to include
        </Label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={copies.original}
              onChange={(event) =>
                setCopies((prev) => ({ ...prev, original: event.target.checked }))
              }
            />
            Original for Recipient
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={copies.duplicate}
              onChange={(event) =>
                setCopies((prev) => ({ ...prev, duplicate: event.target.checked }))
              }
            />
            Duplicate for Transport/Courier
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={copies.triplicate}
              onChange={(event) =>
                setCopies((prev) => ({
                  ...prev,
                  triplicate: event.target.checked,
                }))
              }
            />
            Triplicate for Supplier
          </label>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={openPrintPage}
          className="flex-1 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
        >
          Open print preview
        </Button>
        <Button
          onClick={onClose}
          className="px-6 py-2 bg-zinc-500 hover:bg-zinc-600 text-white rounded-lg"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

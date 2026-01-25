import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";


type ModalProps = {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  disableClose?: boolean;
  maxWidthClassName?: string;
  panelClassName?: string;
  overlayClassName?: string;
};

export default function Modal({
  title,
  onClose,
  children,
  disableClose = false,
  maxWidthClassName = "max-w-md",
  panelClassName = "",
  overlayClassName = "fixed inset-0 bg-black/70 z-50",
}: ModalProps) {
  const handleRequestClose = () => {
    if (disableClose) return;
    onClose();
  };

  const handlePreventClose = (event: Event) => {
    if (disableClose) {
      event.preventDefault();
    }
  };

  return (
    <Dialog open onOpenChange={(open) => (!open ? handleRequestClose() : null)}>
      <DialogContent
        overlayClassName={overlayClassName}
        showClose={!disableClose}
        onEscapeKeyDown={handlePreventClose}
        onInteractOutside={handlePreventClose}
        className={cn("w-full", maxWidthClassName, panelClassName)}
      >
        <DialogHeader className="mb-4 text-left">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}


import "server-only";
import { PDFDocument, StandardFonts, rgb, PDFFont } from "pdf-lib";
import {
  type PdfExportOptions,
  pdfExportHasOrderColumns,
} from "@/lib/pdf-export-options";

const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type PdfOrder = {
  orderName: string;
  deliveryCharges: number;
  orderTotal: number;
};

export type { PdfExportOptions };

function formatInr(n: number): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function sanitizeLine(s: string): string {
  return s.replace(/[^\x20-\x7E\n]/g, "?").slice(0, 500);
}

function wrapLine(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const t = sanitizeLine(text);
  const words = t.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (font.widthOfTextAtSize(test, fontSize) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      if (font.widthOfTextAtSize(w, fontSize) <= maxWidth) {
        current = w;
      } else {
        let rest = w;
        while (rest.length > 0) {
          let low = 1;
          let high = rest.length;
          let fit = "";
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const slice = rest.slice(0, mid);
            if (font.widthOfTextAtSize(slice, fontSize) <= maxWidth) {
              fit = slice;
              low = mid + 1;
            } else {
              high = mid - 1;
            }
          }
          if (!fit) fit = rest.slice(0, 1);
          lines.push(fit);
          rest = rest.slice(fit.length);
        }
        current = "";
      }
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export async function buildAllOrdersMonthPdf(input: {
  year: number;
  month: number;
  orderCount: number;
  totalAmount: number;
  orders: PdfOrder[];
  options: PdfExportOptions;
}): Promise<Uint8Array> {
  const opts = input.options;
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageW = 595.28;
  const pageH = 841.89;
  const margin = 44;
  const maxTextW = pageW - 2 * margin;
  const titleSize = 14;
  const bodySize = 9;
  const smallSize = 8;
  const lh = 11;
  const lhSmall = 10;

  let page = pdfDoc.addPage([pageW, pageH]);
  let y = pageH - margin;

  const ensureSpace = (needed: number) => {
    if (y - needed < margin + 24) {
      page = pdfDoc.addPage([pageW, pageH]);
      y = pageH - margin;
    }
  };

  const draw = (
    text: string,
    lineOpts: { size?: number; bold?: boolean; indent?: number } = {}
  ) => {
    const size = lineOpts.size ?? bodySize;
    const f = lineOpts.bold ? fontBold : font;
    const indent = lineOpts.indent ?? 0;
    const lines = wrapLine(text, maxTextW - indent, f, size);
    for (const line of lines) {
      ensureSpace(lh);
      page.drawText(line, {
        x: margin + indent,
        y: y - size,
        size,
        font: f,
        color: rgb(0, 0, 0),
      });
      y -= lh;
    }
  };

  const monthName = MONTH_NAMES[input.month] ?? String(input.month);

  const summaryBlock =
    opts.includeSummaryOrderCount ||
    opts.includeSummaryTotalAmount ||
    opts.includeDocumentTitle;

  const orderCols = pdfExportHasOrderColumns(opts);

  if (opts.includeDocumentTitle) {
    draw(`All orders — ${monthName} ${input.year}`, {
      size: titleSize,
      bold: true,
    });
    y -= 4;
  }

  if (opts.includeSummaryOrderCount) {
    draw(
      `Orders in period: ${input.orderCount.toLocaleString("en-IN")}`
    );
  }

  if (opts.includeSummaryTotalAmount) {
    draw(`Total amount: Rs. ${formatInr(input.totalAmount)}`);
  }

  if (summaryBlock && orderCols) {
    y -= 8;
    draw("—".repeat(72), { size: smallSize });
    y -= 4;
  } else if (orderCols && !summaryBlock) {
    /* orders only: no extra gap before list */
  }

  if (orderCols) {
    for (const order of input.orders) {
      const parts: string[] = [];
      if (opts.orderRowName) parts.push(order.orderName);
      if (opts.orderRowDelivery) {
        parts.push(`Delivery: Rs. ${formatInr(order.deliveryCharges)}`);
      }
      if (opts.orderRowTotal) {
        parts.push(`Total: Rs. ${formatInr(order.orderTotal)}`);
      }
      if (parts.length === 0) continue;
      ensureSpace(24);
      draw(parts.join("  |  "), { bold: true });
      y -= lhSmall;
    }
  }

  return pdfDoc.save();
}

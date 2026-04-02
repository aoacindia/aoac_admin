/** PDF field selection for All orders monthly export — no defaults; user chooses each time. */
export type PdfExportOptions = {
  includeDocumentTitle: boolean;
  includeSummaryOrderCount: boolean;
  includeSummaryTotalAmount: boolean;
  orderRowName: boolean;
  orderRowDelivery: boolean;
  orderRowTotal: boolean;
};

export function emptyPdfExportOptions(): PdfExportOptions {
  return {
    includeDocumentTitle: false,
    includeSummaryOrderCount: false,
    includeSummaryTotalAmount: false,
    orderRowName: false,
    orderRowDelivery: false,
    orderRowTotal: false,
  };
}

export function pdfExportHasSelection(o: PdfExportOptions): boolean {
  return (
    o.includeDocumentTitle ||
    o.includeSummaryOrderCount ||
    o.includeSummaryTotalAmount ||
    o.orderRowName ||
    o.orderRowDelivery ||
    o.orderRowTotal
  );
}

export function pdfExportHasOrderColumns(o: PdfExportOptions): boolean {
  return o.orderRowName || o.orderRowDelivery || o.orderRowTotal;
}

/** PDF field selection for All orders monthly export — no defaults; user chooses each time. */
export type PdfExportOptions = {
  includeDocumentTitle: boolean;
  includeSummaryOrderCount: boolean;
  includeSummaryTotalAmount: boolean;
  orderRowDate: boolean;
  orderRowName: boolean;
  orderRowDelivery: boolean;
  orderRowTotal: boolean;
  orderRowItems: boolean;
};

export function emptyPdfExportOptions(): PdfExportOptions {
  return {
    includeDocumentTitle: false,
    includeSummaryOrderCount: false,
    includeSummaryTotalAmount: false,
    orderRowDate: false,
    orderRowName: false,
    orderRowDelivery: false,
    orderRowTotal: false,
    orderRowItems: false,
  };
}

export function pdfExportHasSelection(o: PdfExportOptions): boolean {
  return (
    o.includeDocumentTitle ||
    o.includeSummaryOrderCount ||
    o.includeSummaryTotalAmount ||
    o.orderRowDate ||
    o.orderRowName ||
    o.orderRowDelivery ||
    o.orderRowTotal ||
    o.orderRowItems
  );
}

/** Any per-order content (main row and/or line items). */
export function pdfExportHasOrderColumns(o: PdfExportOptions): boolean {
  return (
    o.orderRowDate ||
    o.orderRowName ||
    o.orderRowDelivery ||
    o.orderRowTotal ||
    o.orderRowItems
  );
}

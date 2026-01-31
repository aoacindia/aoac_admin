import 'server-only';
import fs from 'fs';
import path from 'path';
import { PDFDocument, PageSizes, StandardFonts, rgb, PDFPage, PDFFont, PDFImage } from 'pdf-lib';
import { adminPrisma } from './admin-prisma';

interface SuspensionReason {
  id: string;
  reason: string;
  suspendedAt: Date;
}

interface BillingAddress {
  id: string;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

interface Address {
  id: string;
  type: string;
  name: string;
  phone: string;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  createdAt: Date;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  discount: number;
}

interface ShippingAddress {
  id: string;
  type: string;
  name: string;
  phone: string;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  stateCode: string | null;
  country: string;
  pincode: string;
}

interface InvoiceOffice {
  id: string;
  gstin: string;
  address: string;
  city?: string | null;
  state: string;
  stateCode: string;
  pincode: string;
  country: string;
}

interface Order {
  id: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
  discountAmount: number | null;
  paidAmount: number | null;
  packed: boolean;
  refund: boolean;
  customOrder: boolean;
  r_orderId: string | null;
  r_paymentId: string | null;
  paymentLinkUrl: string | null;
  paymentMethod: string | null;
  paymentBank: string | null;
  paymentVpa: string | null;
  courierId: number | null;
  shippingId: string | null;
  shippingOrderId: string | null;
  shippingAmount: number | null;
  awsCode: string | null;
  shippingInvoiceNumber: string | null;
  shippingCourierName: string | null;
  estimatedDeliveryDate: string | null;
  pickupScheduled: Date | null;
  deliveredAt: Date | null;
  manifestGenerated: boolean | null;
  InvoiceNumber: string | null;
  refundId: string | null;
  refundReceipt: string | null;
  refundArn: string | null;
  refundCreatedAt: Date | null;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress | null;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  suspended: boolean;
  suspended_number: number;
  terminated: boolean;
  isBusinessAccount: boolean | null;
  businessName: string | null;
  gstNumber: string | null;
  hasAdditionalTradeName: boolean | null;
  additionalTradeName: string | null;
  createdAt: Date;
  updatedAt: Date;
  suspensionReasons: SuspensionReason[];
  billingAddress: BillingAddress | null;
  addresses: Address[];
  order: Order[];
}

interface PdfContext {
  pdfDoc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  boldFont: PDFFont;
  margin: number;
  pageWidth: number;
  pageHeight: number;
}

const PAGE_MARGIN = 36;
const ROW_HEIGHT = 18;
const HEADER_FONT_SIZE = 10;
const SECTION_TITLE_SIZE = 8;
const BODY_FONT_SIZE = 7;
const COMPANY_ADDRESS_SIZE = 6;
const LINE_HEIGHT = 9;

function drawPageBorder(ctx: PdfContext) {
  ctx.page.drawRectangle({
    x: ctx.margin / 2,
    y: ctx.margin / 2,
    width: ctx.pageWidth - ctx.margin,
    height: ctx.pageHeight - ctx.margin,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0)
  });
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Array<{ key: string; value: string }> {
  const rows: Array<{ key: string; value: string }> = [];

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value instanceof Date) {
      rows.push({ key: fullKey, value: value.toLocaleString() });
      return;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        rows.push({ key: fullKey, value: '' });
        return;
      }
      value.forEach((item, index) => {
        const arrayKey = `${fullKey}[${index}]`;
        if (item && typeof item === 'object' && !(item instanceof Date)) {
          rows.push(...flattenObject(item as Record<string, unknown>, arrayKey));
        } else {
          rows.push({ key: arrayKey, value: formatValue(item) });
        }
      });
      return;
    }
    if (value && typeof value === 'object') {
      rows.push(...flattenObject(value as Record<string, unknown>, fullKey));
      return;
    }
    rows.push({ key: fullKey, value: formatValue(value) });
  });

  return rows;
}

function toPdfY(ctx: PdfContext, yFromTop: number, fontSize: number): number {
  return ctx.pageHeight - yFromTop - fontSize;
}

function truncateText(text: string, maxWidth: number, font: PDFFont, fontSize: number): string {
  if (!text) return '';
  if (font.widthOfTextAtSize(text, fontSize) <= maxWidth) return text;
  const ellipsis = '...';
  const ellipsisWidth = font.widthOfTextAtSize(ellipsis, fontSize);
  if (ellipsisWidth > maxWidth) return '';
  let truncated = text;
  while (
    truncated.length > 0 &&
    font.widthOfTextAtSize(truncated, fontSize) + ellipsisWidth > maxWidth
  ) {
    truncated = truncated.slice(0, -1);
  }
  return `${truncated}${ellipsis}`;
}

function drawTextLine(
  ctx: PdfContext,
  text: string,
  x: number,
  yFromTop: number,
  size: number,
  font: PDFFont = ctx.font,
  color = rgb(0, 0, 0)
) {
  ctx.page.drawText(text, {
    x,
    y: toPdfY(ctx, yFromTop, size),
    size,
    font,
    color
  });
}

function drawCenteredText(ctx: PdfContext, text: string, yFromTop: number, size: number, font: PDFFont = ctx.font) {
  const textWidth = font.widthOfTextAtSize(text, size);
  const x = Math.max(ctx.margin, (ctx.pageWidth - textWidth) / 2);
  drawTextLine(ctx, text, x, yFromTop, size, font);
}

function drawImageAtTopLeft(
  ctx: PdfContext,
  image: PDFImage,
  x: number,
  yFromTop: number,
  width: number,
  height: number
) {
  ctx.page.drawImage(image, {
    x,
    y: ctx.pageHeight - yFromTop - height,
    width,
    height
  });
}

function drawHorizontalLine(ctx: PdfContext, yFromTop: number) {
  ctx.page.drawLine({
    start: { x: ctx.margin, y: ctx.pageHeight - yFromTop },
    end: { x: ctx.pageWidth - ctx.margin, y: ctx.pageHeight - yFromTop },
    thickness: 1,
    color: rgb(0, 0, 0)
  });
}

function wrapText(text: string, maxWidth: number, font: PDFFont, fontSize: number): string[] {
  if (!text) return [''];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
      line = testLine;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function wrapTextLinesWithStyle(
  items: Array<{ text: string; bold: boolean }>,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): Array<{ text: string; bold: boolean }> {
  return items.flatMap((item) =>
    wrapText(item.text, maxWidth, font, fontSize).map((line) => ({
      text: line,
      bold: item.bold
    }))
  );
}

function drawTextBlock(
  ctx: PdfContext,
  lines: string[],
  x: number,
  yFromTop: number,
  size: number
): number {
  let y = yFromTop;
  lines.forEach((line) => {
    drawTextLine(ctx, line, x, y, size);
    y += LINE_HEIGHT;
  });
  return y;
}

function getTermsBlockHeight(
  ctx: PdfContext,
  terms: string[],
  width: number,
  hasSignature: boolean
): number {
  const padding = 6;
  const titleSize = SECTION_TITLE_SIZE + 2;
  const titleGap = 4;
  const signatureAreaWidth = hasSignature ? 140 : 0;
  const innerWidth = width - padding * 2;
  const textWidth = hasSignature ? Math.max(80, innerWidth - signatureAreaWidth - 6) : innerWidth;
  const termsFontSize = Math.max(5, BODY_FONT_SIZE - 1);
  const termsLineHeight = Math.max(7, LINE_HEIGHT - 1);
  const wrappedTerms = terms.flatMap((term) =>
    wrapText(`- ${term}`, textWidth, ctx.font, termsFontSize)
  );
  const textHeight = padding * 2 + titleSize + titleGap + wrappedTerms.length * termsLineHeight;
  const signatureHeight = hasSignature ? padding * 2 + 70 + (BODY_FONT_SIZE + 1) + 2 : 0;
  return Math.max(textHeight, signatureHeight);
}

function drawTermsBlock(
  ctx: PdfContext,
  terms: string[],
  x: number,
  yFromTop: number,
  width: number,
  signImage: PDFImage | null
): number {
  const padding = 6;
  const title = 'Terms & Conditions';
  const titleSize = SECTION_TITLE_SIZE + 2;
  const titleGap = 4;
  const signatureAreaWidth = signImage ? 140 : 0;
  const innerWidth = width - padding * 2;
  const textWidth = signImage ? Math.max(80, innerWidth - signatureAreaWidth - 6) : innerWidth;
  const termsFontSize = Math.max(5, BODY_FONT_SIZE - 1);
  const termsLineHeight = Math.max(7, LINE_HEIGHT - 1);
  const termsColor = rgb(0.35, 0.35, 0.35);
  const wrappedTerms = terms.flatMap((term) =>
    wrapText(`- ${term}`, textWidth, ctx.font, termsFontSize)
  );
  const textHeight = padding * 2 + titleSize + titleGap + wrappedTerms.length * termsLineHeight;
  const signatureHeight = signImage ? padding * 2 + 70 + (BODY_FONT_SIZE + 1) + 2 : 0;
  const blockHeight = Math.max(textHeight, signatureHeight);

  ctx.page.drawRectangle({
    x,
    y: ctx.pageHeight - yFromTop - blockHeight,
    width,
    height: blockHeight,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0)
  });

  drawTextLine(ctx, title, x + padding, yFromTop + padding, titleSize, ctx.boldFont);
  const textStartY = yFromTop + padding + titleSize + titleGap;
  let termLineY = textStartY;
  wrappedTerms.forEach((line) => {
    drawTextLine(ctx, line, x + padding, termLineY, termsFontSize, ctx.font, termsColor);
    termLineY += termsLineHeight;
  });

  if (signImage) {
    const signHeight = 70;
    const signWidth = (signImage.width / signImage.height) * signHeight;
    const signatureX = x + width - padding - signatureAreaWidth;
    const signTextSize = BODY_FONT_SIZE + 1;
    const signatureTopY = yFromTop + blockHeight - padding - signHeight - signTextSize - 2;
    drawImageAtTopLeft(ctx, signImage, signatureX + (signatureAreaWidth - signWidth) / 2, signatureTopY, signWidth, signHeight);
    const signText = 'Authorized Signatory';
    const signTextWidth = ctx.font.widthOfTextAtSize(signText, signTextSize);
    const signTextX = signatureX + (signatureAreaWidth - signTextWidth) / 2;
    drawTextLine(ctx, signText, signTextX, signatureTopY + signHeight + 2, signTextSize, ctx.font);
  }

  return yFromTop + blockHeight;
}

function drawTextBlockWithStyle(
  ctx: PdfContext,
  lines: Array<{ text: string; bold: boolean }>,
  x: number,
  yFromTop: number,
  size: number
): number {
  let y = yFromTop;
  lines.forEach((line) => {
    drawTextLine(ctx, line.text, x, y, size, line.bold ? ctx.boldFont : ctx.font);
    y += LINE_HEIGHT;
  });
  return y;
}

function drawCellText(
  ctx: PdfContext,
  text: string,
  x: number,
  yFromTop: number,
  width: number,
  size: number,
  align: 'left' | 'right' | 'center' = 'left'
) {
  const truncated = truncateText(text, width - 6, ctx.font, size);
  let textX = x + 3;
  if (align !== 'left') {
    const textWidth = ctx.font.widthOfTextAtSize(truncated, size);
    if (align === 'right') {
      textX = x + width - textWidth - 3;
    } else {
      textX = x + (width - textWidth) / 2;
    }
  }
  drawTextLine(ctx, truncated, textX, yFromTop, size);
}

function drawCellLines(
  ctx: PdfContext,
  lines: string[],
  x: number,
  yFromTop: number,
  width: number,
  size: number,
  align: 'left' | 'right' | 'center' = 'left'
) {
  let lineY = yFromTop;
  lines.forEach((line) => {
    const textWidth = ctx.font.widthOfTextAtSize(line, size);
    let textX = x + 3;
    if (align === 'right') {
      textX = x + width - textWidth - 3;
    } else if (align === 'center') {
      textX = x + (width - textWidth) / 2;
    }
    drawTextLine(ctx, line, textX, lineY, size);
    lineY += LINE_HEIGHT;
  });
}

function formatAmount(value: number | null | undefined): string {
  const safeValue = Number(value ?? 0);
  return safeValue.toFixed(2);
}

function numberToWordsIndian(num: number): string {
  if (!Number.isFinite(num)) return '';
  if (num === 0) return 'Zero';

  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const twoDigit = (n: number) => {
    if (n < 20) return ones[n];
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return `${tens[ten]}${one ? ` ${ones[one]}` : ''}`.trim();
  };

  const threeDigit = (n: number) => {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    if (!hundred) return twoDigit(rest);
    return `${ones[hundred]} Hundred${rest ? ` ${twoDigit(rest)}` : ''}`.trim();
  };

  let remaining = Math.floor(num);
  const parts: string[] = [];
  const crore = Math.floor(remaining / 10000000);
  if (crore) {
    parts.push(`${threeDigit(crore)} Crore`);
    remaining %= 10000000;
  }
  const lakh = Math.floor(remaining / 100000);
  if (lakh) {
    parts.push(`${threeDigit(lakh)} Lakh`);
    remaining %= 100000;
  }
  const thousand = Math.floor(remaining / 1000);
  if (thousand) {
    parts.push(`${threeDigit(thousand)} Thousand`);
    remaining %= 1000;
  }
  if (remaining) {
    parts.push(threeDigit(remaining));
  }
  return parts.join(' ').trim();
}

function amountInWords(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const rupees = Math.floor(safeAmount);
  const paise = Math.round((safeAmount - rupees) * 100);
  const rupeesWords = numberToWordsIndian(rupees);
  if (paise > 0) {
    return `Rupees ${rupeesWords} and Paise ${numberToWordsIndian(paise)} Only`;
  }
  return `Rupees ${rupeesWords} Only`;
}

function addPage(ctx: PdfContext) {
  ctx.page = ctx.pdfDoc.addPage(PageSizes.A4);
  const { width, height } = ctx.page.getSize();
  ctx.pageWidth = width;
  ctx.pageHeight = height;
  drawPageBorder(ctx);
}

function ensureSpace(ctx: PdfContext, y: number, rowHeight: number): number {
  if (y + rowHeight > ctx.pageHeight - ctx.margin) {
    addPage(ctx);
    return ctx.margin + 10;
  }
  return y;
}

export function printKeyValue(
  ctx: PdfContext,
  key: string,
  value: string,
  y: number
): number {
  const tableWidth = ctx.pageWidth - ctx.margin * 2;
  const keyColumnWidth = Math.floor(tableWidth * 0.35);
  const valueColumnWidth = tableWidth - keyColumnWidth;

  const nextY = ensureSpace(ctx, y, ROW_HEIGHT);
  const rowBottomY = ctx.pageHeight - nextY - ROW_HEIGHT;

  ctx.page.drawRectangle({
    x: ctx.margin,
    y: rowBottomY,
    width: keyColumnWidth,
    height: ROW_HEIGHT,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0)
  });
  ctx.page.drawRectangle({
    x: ctx.margin + keyColumnWidth,
    y: rowBottomY,
    width: valueColumnWidth,
    height: ROW_HEIGHT,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0)
  });

  const keyText = truncateText(key, keyColumnWidth - 12, ctx.font, BODY_FONT_SIZE);
  const valueText = truncateText(value, valueColumnWidth - 12, ctx.font, BODY_FONT_SIZE);

  drawTextLine(ctx, keyText, ctx.margin + 6, nextY + 4, BODY_FONT_SIZE);
  drawTextLine(ctx, valueText, ctx.margin + keyColumnWidth + 6, nextY + 4, BODY_FONT_SIZE);

  return nextY + ROW_HEIGHT;
}

function printSection(
  ctx: PdfContext,
  title: string,
  rows: Array<{ key: string; value: string }>,
  startY: number
): number {
  let y = ensureSpace(ctx, startY, 24);

  drawTextLine(ctx, title, ctx.margin, y, SECTION_TITLE_SIZE);
  y += 18;

  rows.forEach((row) => {
    y = printKeyValue(ctx, row.key, row.value, y);
  });

  return y + 6;
}

async function createPdfBuffer(build: (ctx: PdfContext) => void | Promise<void>): Promise<Uint8Array> {
  // PDFKit can fail in bundled environments when Helvetica.afm is missing at runtime.
  // pdf-lib embeds StandardFonts directly, avoiding external font files.
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();

  const ctx: PdfContext = {
    pdfDoc,
    page,
    font,
    boldFont,
    margin: PAGE_MARGIN,
    pageWidth: width,
    pageHeight: height
  };

  drawPageBorder(ctx);
  await build(ctx);

  const pdfBytes = await pdfDoc.save();
  return new Uint8Array(pdfBytes);
}

export async function generateCustomerPDF(
  customer: Customer,
  sections: string[]
): Promise<Uint8Array> {
  return createPdfBuffer((ctx) => {
    drawCenteredText(ctx, 'Customer Details Report', ctx.margin, HEADER_FONT_SIZE);
    let y = ctx.margin + 20;

    const reportMeta = flattenObject({
      reportDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      customerId: customer.id
    });
    y = printSection(ctx, 'Report Info', reportMeta, y);

    if (sections.includes('customerInfo')) {
      y = printSection(
        ctx,
        'Customer Info',
        flattenObject({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          status: customer.terminated
            ? 'Terminated'
            : customer.suspended
            ? `Suspended (${customer.suspended_number} time(s))`
            : 'Active',
          accountType: customer.isBusinessAccount ? 'Business' : 'Personal'
        }),
        y
      );
    }

    if (sections.includes('businessInfo') && customer.isBusinessAccount) {
      y = printSection(
        ctx,
        'Business Info',
        flattenObject({
          businessName: customer.businessName,
          gstNumber: customer.gstNumber,
          hasAdditionalTradeName: customer.hasAdditionalTradeName,
          additionalTradeName: customer.additionalTradeName
        }),
        y
      );
    }

    if (sections.includes('billingAddress')) {
      y = printSection(
        ctx,
        'Billing Address',
        customer.billingAddress
          ? flattenObject(customer.billingAddress as unknown as Record<string, unknown>)
          : [{ key: 'billingAddress', value: '' }],
        y
      );
    }

    if (sections.includes('suspensionHistory')) {
      const rows = customer.suspensionReasons.length
        ? flattenObject({ suspensionReasons: customer.suspensionReasons as unknown as Record<string, unknown> })
        : [{ key: 'suspensionReasons', value: '' }];
      y = printSection(ctx, 'Suspension History', rows, y);
    }

    if (sections.includes('addresses')) {
      const rows = customer.addresses.length
        ? flattenObject({ addresses: customer.addresses as unknown as Record<string, unknown> })
        : [{ key: 'addresses', value: '' }];
      y = printSection(ctx, 'Addresses', rows, y);
    }

    if (sections.includes('orders')) {
      const rows = customer.order.length
        ? flattenObject({ orders: customer.order as unknown as Record<string, unknown> })
        : [{ key: 'orders', value: '' }];
      printSection(ctx, 'Orders', rows, y);
    }
  });
}

interface InvoiceOrder {
  id: string;
  InvoiceNumber: string | null;
  invoiceType: string | null; // "PI" or "TAX_INVOICE"
  orderDate: Date;
  totalAmount: number;
  discountAmount: number | null;
  shippingAmount: number | null;
  invoiceAmount: number | null;
  roundedOffAmount: number | null;
  isDifferentSupplier: boolean | null;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    businessName: string | null;
    gstNumber: string | null;
    isBusinessAccount: boolean | null;
    hasAdditionalTradeName: boolean | null;
    additionalTradeName: string | null;
    billingAddress: {
      houseNo: string;
      line1: string;
      line2: string | null;
      city: string;
      district: string;
      state: string;
      stateCode: string | null;
      country: string;
      pincode: string;
    } | null;
  };
  shippingAddress: {
    id: string;
    name: string;
    phone: string;
    houseNo: string;
    line1: string;
    line2: string | null;
    city: string;
    district: string;
    state: string;
    stateCode: string | null;
    country: string;
    pincode: string;
  } | null;
  supplier: {
    id: string;
    name: string;
    type: string;
    gstNumber?: string | null;
    houseNo: string;
    line1: string;
    line2: string | null;
    city: string;
    district: string;
    state: string;
    stateCode: string | null;
    country: string;
    pincode: string;
  } | null;
  orderItems: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
    tax: number;
    discount: number;
    productName?: string;
    hsnsac?: string;
    weight?: number | null;
  }>;
  invoiceOffice?: InvoiceOffice | null;
}

type InvoiceCopyType = 'original' | 'duplicate' | 'triplicate';

const INVOICE_COPY_LABELS: Record<InvoiceCopyType, string> = {
  original: 'Original for Recipient',
  duplicate: 'Duplicate for Transport/Courier',
  triplicate: 'Triplicate for Supplier'
};

function resolvePlaceOfSupply(order: InvoiceOrder) {
  const state = order.shippingAddress?.state || order.user.billingAddress?.state || '';
  const stateCode = order.shippingAddress?.stateCode || order.user.billingAddress?.stateCode || '';
  return { state, stateCode };
}

function formatOfficeAddress(office: InvoiceOffice): string {
  const stateWithCode = office.stateCode?.trim()
    ? `${office.state?.trim() || ''} (${office.stateCode.trim()})`.trim()
    : office.state?.trim();
  const parts = [
    office.address?.trim(),
    office.city?.trim(),
    stateWithCode,
    office.pincode?.trim(),
    office.country?.trim(),
  ].filter(Boolean);

  return parts.join(', ');
}

export async function generateInvoicePDF(
  order: InvoiceOrder,
  copies: InvoiceCopyType[] = ['original']
): Promise<Uint8Array> {
  return createPdfBuffer(async (ctx) => {
    const bank = await adminPrisma.account.findFirst({ where: { isDefault: true } });
    const logoPath = path.join(process.cwd(), 'public/logo/logo.png');
    const signPath = path.join(process.cwd(), 'public/img/imp/auth_sign.png');
    const logoImage = fs.existsSync(logoPath)
      ? await ctx.pdfDoc.embedPng(fs.readFileSync(logoPath))
      : null;
    const signImage = fs.existsSync(signPath)
      ? await ctx.pdfDoc.embedPng(fs.readFileSync(signPath))
      : null;

    const renderInvoicePage = (copyType: InvoiceCopyType) => {
      const headerTop = ctx.margin;
      let headerLeftWidth = 0;
      let logoHeight = 0;
      if (logoImage) {
        logoHeight = 46;
        const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
        drawImageAtTopLeft(ctx, logoImage, ctx.margin, headerTop, logoWidth, logoHeight);
        headerLeftWidth = logoWidth + 10;
      }

      const invoiceTitle = order.invoiceType === 'TAX_INVOICE' ? 'TAX INVOICE' : 'PROFORMA INVOICE';
      const copyLabel = INVOICE_COPY_LABELS[copyType];
      const copyLabelSize = BODY_FONT_SIZE + 2;
      const headerTitleGap = 6;
      const titleWidth = ctx.font.widthOfTextAtSize(invoiceTitle, HEADER_FONT_SIZE);
      const copyLabelWidth = ctx.font.widthOfTextAtSize(copyLabel, copyLabelSize);
      const headerRightLimit = Math.min(
        ctx.pageWidth - ctx.margin - titleWidth,
        ctx.pageWidth - ctx.margin - copyLabelWidth
      ) - 10;

      const companyX = ctx.margin + headerLeftWidth;
      const computedCompanyWidth =
        headerRightLimit > companyX
          ? headerRightLimit - companyX
          : ctx.pageWidth - ctx.margin - companyX;
      const maxCompanyWidth = Math.max(40, computedCompanyWidth * 0.85);
      const companyName = 'Allahabad Organic Agricultural Company Private Limited';
      const officeAddress = order.invoiceOffice
        ? formatOfficeAddress(order.invoiceOffice)
        : '';
      const companyAddressLine =
        officeAddress ||
        '620 G Flr, Ganga Bihar, Anisabad, Phulwari, Patna - 800002, Bihar, India';
      const jurisdictionParts = [
        order.invoiceOffice?.city?.trim(),
        order.invoiceOffice?.state?.trim()
      ].filter(Boolean);
      const jurisdictionLocation = jurisdictionParts.length ? jurisdictionParts.join(', ') : 'Prayagraj, Uttar Pradesh';
      const companyGstin = order.invoiceOffice?.gstin || '10ABECA4299B1Z4';
      const companyLines = [
        { text: companyName, size: 9 },
        {
          text: companyAddressLine,
          size: COMPANY_ADDRESS_SIZE
        },
        {
          text: `CIN : U63120BR2025PTC080942 | PAN : ABECA4299B | GSTIN : ${companyGstin}`,
          size: COMPANY_ADDRESS_SIZE
        },
        { text: 'Phone : (+91) 8986937875 | Email : hello@aoac.in', size: COMPANY_ADDRESS_SIZE }
      ];
      const companyBlockHeight = companyLines.reduce((total, line, index) => {
        const wrappedCount = wrapText(line.text, maxCompanyWidth, ctx.font, line.size).length || 1;
        return total + wrappedCount * LINE_HEIGHT + (index === 0 ? 2 : 0);
      }, 0);
      const companyStartY =
        logoHeight > 0 && logoHeight > companyBlockHeight
          ? headerTop + (logoHeight - companyBlockHeight) / 2
          : headerTop;
      let companyBlockBottom = companyStartY;
      companyLines.forEach((line, index) => {
        const wrappedLines = wrapText(line.text, maxCompanyWidth, ctx.font, line.size);
        wrappedLines.forEach((wrappedLine) => {
          drawTextLine(ctx, wrappedLine, companyX, companyBlockBottom, line.size);
          companyBlockBottom += LINE_HEIGHT;
        });
        if (index === 0) {
          companyBlockBottom += 2;
        }
      });
      const headerBlockHeight = Math.max(companyBlockBottom, headerTop + logoHeight) - headerTop;
      const titleBlockHeight = HEADER_FONT_SIZE + headerTitleGap + copyLabelSize;
      const titleStartY =
        headerTop + Math.max(0, (headerBlockHeight - titleBlockHeight) / 2);

      const titleX = ctx.pageWidth - ctx.margin - titleWidth;
      drawTextLine(ctx, invoiceTitle, titleX, titleStartY, HEADER_FONT_SIZE);
      drawTextLine(
        ctx,
        copyLabel,
        ctx.pageWidth - ctx.margin - copyLabelWidth,
        titleStartY + HEADER_FONT_SIZE + headerTitleGap,
        copyLabelSize
      );

      const titleBlockBottom = titleStartY + titleBlockHeight;
      const headerBottom = Math.max(companyBlockBottom, headerTop + logoHeight, titleBlockBottom);
      drawHorizontalLine(ctx, headerBottom + 8);
      let y = headerBottom + 18;

      const { state, stateCode } = resolvePlaceOfSupply(order);
      const placeOfSupply = state ? `${state}${stateCode ? ` (${stateCode})` : ''}` : '-';

      const infoBoxPadding = 6;
      const infoBoxHeight = LINE_HEIGHT * 2 + infoBoxPadding * 2;
      const infoBoxY = ensureSpace(ctx, y, infoBoxHeight);
      ctx.page.drawRectangle({
        x: ctx.margin,
        y: ctx.pageHeight - infoBoxY - infoBoxHeight,
        width: ctx.pageWidth - ctx.margin * 2,
        height: infoBoxHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0)
      });
      const infoLeftX = ctx.margin + infoBoxPadding;
      const infoRightX = ctx.pageWidth - ctx.margin - infoBoxPadding;
      const infoLineY = infoBoxY + infoBoxPadding;
      const invoiceNoValue = order.InvoiceNumber || order.id;
      const invoiceNoLabel = 'Invoice No:';
      drawTextLine(ctx, invoiceNoLabel, infoLeftX, infoLineY, BODY_FONT_SIZE, ctx.boldFont);
      const invoiceNoLabelWidth = ctx.boldFont.widthOfTextAtSize(invoiceNoLabel, BODY_FONT_SIZE);
      drawTextLine(
        ctx,
        ` ${invoiceNoValue}`,
        infoLeftX + invoiceNoLabelWidth,
        infoLineY,
        BODY_FONT_SIZE
      );

      const invoiceDateValue = order.orderDate.toLocaleDateString('en-IN');
      const invoiceDateLabel = 'Invoice Date:';
      const invoiceDateLabelWidth = ctx.boldFont.widthOfTextAtSize(invoiceDateLabel, BODY_FONT_SIZE);
      const invoiceDateValueWidth = ctx.font.widthOfTextAtSize(invoiceDateValue, BODY_FONT_SIZE);
      const invoiceDateX = infoRightX - invoiceDateLabelWidth - invoiceDateValueWidth;
      drawTextLine(ctx, invoiceDateLabel, invoiceDateX, infoLineY, BODY_FONT_SIZE, ctx.boldFont);
      drawTextLine(
        ctx,
        ` ${invoiceDateValue}`,
        invoiceDateX + invoiceDateLabelWidth,
        infoLineY,
        BODY_FONT_SIZE
      );

      const orderIdLabel = 'Order ID:';
      drawTextLine(ctx, orderIdLabel, infoLeftX, infoLineY + LINE_HEIGHT, BODY_FONT_SIZE, ctx.boldFont);
      const orderIdLabelWidth = ctx.boldFont.widthOfTextAtSize(orderIdLabel, BODY_FONT_SIZE);
      drawTextLine(
        ctx,
        ` ${order.id}`,
        infoLeftX + orderIdLabelWidth,
        infoLineY + LINE_HEIGHT,
        BODY_FONT_SIZE
      );

      const placeLabel = 'Place of Supply:';
      const placeLabelWidth = ctx.boldFont.widthOfTextAtSize(placeLabel, BODY_FONT_SIZE);
      const placeValueWidth = ctx.font.widthOfTextAtSize(placeOfSupply, BODY_FONT_SIZE);
      const placeX = infoRightX - placeLabelWidth - placeValueWidth;
      drawTextLine(ctx, placeLabel, placeX, infoLineY + LINE_HEIGHT, BODY_FONT_SIZE, ctx.boldFont);
      drawTextLine(
        ctx,
        ` ${placeOfSupply}`,
        placeX + placeLabelWidth,
        infoLineY + LINE_HEIGHT,
        BODY_FONT_SIZE
      );

      y = infoBoxY + infoBoxHeight + 10;

    const tableWidth = ctx.pageWidth - ctx.margin * 2;
    const columnGap = 12;
    const columnWidth = (tableWidth - columnGap) / 2;
    const isBusinessAccount = Boolean(order.user.isBusinessAccount);
    const businessSuffix =
      isBusinessAccount && order.user.hasAdditionalTradeName && order.user.additionalTradeName
        ? ` (${order.user.additionalTradeName})`
        : '';
    const businessDisplayName = isBusinessAccount && order.user.businessName
      ? `${order.user.businessName}${businessSuffix}`
      : order.user.name;
    const contactPersonLine = isBusinessAccount ? `Contact Person: ${order.user.name}` : '';

    const shippingContactLine =
      isBusinessAccount && order.shippingAddress?.name ? `Contact Person: ${order.shippingAddress.name}` : '';
    const shippedLines = [
      businessDisplayName,
      shippingContactLine,
      order.shippingAddress
        ? [order.shippingAddress.houseNo, order.shippingAddress.line1, order.shippingAddress.line2]
            .filter(Boolean)
            .join(', ')
        : '',
      order.shippingAddress
        ? [order.shippingAddress.city, order.shippingAddress.district].filter(Boolean).join(', ')
        : '',
      order.shippingAddress
        ? [order.shippingAddress.state, order.shippingAddress.country, order.shippingAddress.pincode]
            .filter(Boolean)
            .join(', ')
        : '',
      order.shippingAddress ? `Phone: ${order.shippingAddress.phone}` : '',
      `GSTIN: ${order.user.gstNumber || '-'}`
    ]
      .filter(Boolean)
      .map((line) => ({
        text: line,
        bold: line === businessDisplayName || line.startsWith('Phone:')
      }));

    const billedLines = isBusinessAccount
      ? [
          businessDisplayName,
          contactPersonLine,
          order.user.billingAddress
            ? [order.user.billingAddress.houseNo, order.user.billingAddress.line1, order.user.billingAddress.line2]
                .filter(Boolean)
                .join(', ')
            : '',
          order.user.billingAddress
            ? [order.user.billingAddress.city, order.user.billingAddress.district].filter(Boolean).join(', ')
            : '',
          order.user.billingAddress
            ? [order.user.billingAddress.state, order.user.billingAddress.country, order.user.billingAddress.pincode]
                .filter(Boolean)
                .join(', ')
            : '',
          `Phone: ${order.user.phone}`,
          `GSTIN: ${order.user.gstNumber || '-'}`
        ]
          .filter(Boolean)
          .map((line) => ({
            text: line,
            bold: line === businessDisplayName || line.startsWith('Phone:')
          }))
      : shippedLines;

    const addressPadding = 6;
    const addressInnerWidth = columnWidth - addressPadding * 2;
    const billedWrapped = wrapTextLinesWithStyle(
      billedLines,
      addressInnerWidth,
      ctx.font,
      BODY_FONT_SIZE
    );
    const shippedWrapped = wrapTextLinesWithStyle(
      shippedLines,
      addressInnerWidth,
      ctx.font,
      BODY_FONT_SIZE
    );
    const titleLineHeight = LINE_HEIGHT;
    const titleGap = 4;
    const maxAddressLines = Math.max(billedWrapped.length, shippedWrapped.length, 1);
    const blockHeight =
      addressPadding * 2 + titleLineHeight + titleGap + maxAddressLines * LINE_HEIGHT;

    ctx.page.drawRectangle({
      x: ctx.margin,
      y: ctx.pageHeight - y - blockHeight,
      width: columnWidth,
      height: blockHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0)
    });
    ctx.page.drawRectangle({
      x: ctx.margin + columnWidth + columnGap,
      y: ctx.pageHeight - y - blockHeight,
      width: columnWidth,
      height: blockHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0)
    });

    const addressTitleSize = SECTION_TITLE_SIZE + 2;
    drawTextLine(ctx, 'Billed To', ctx.margin + addressPadding, y + addressPadding, addressTitleSize);
    drawTextLine(
      ctx,
      'Shipped To',
      ctx.margin + columnWidth + columnGap + addressPadding,
      y + addressPadding,
      addressTitleSize
    );
    const billedStart = y + addressPadding + titleLineHeight + titleGap;
    const shippedStart = y + addressPadding + titleLineHeight + titleGap;
    drawTextBlockWithStyle(ctx, billedWrapped, ctx.margin + addressPadding, billedStart, BODY_FONT_SIZE);
    drawTextBlockWithStyle(
      ctx,
      shippedWrapped,
      ctx.margin + columnWidth + columnGap + addressPadding,
      shippedStart,
      BODY_FONT_SIZE
    );

      y += blockHeight + 6;

    const { stateCode: placeOfSupplyStateCode } = resolvePlaceOfSupply(order);
    const companyStateCode = order.invoiceOffice?.stateCode || '';
    const isIntraStateSupply =
      Boolean(companyStateCode) &&
      Boolean(placeOfSupplyStateCode) &&
      companyStateCode === placeOfSupplyStateCode;

    const baseColumns = [
      { label: 'Sr No', percent: 6, align: 'center' as const },
      { label: 'Item Name', percent: 24, align: 'left' as const },
      { label: 'HSN', percent: 8, align: 'center' as const },
      { label: 'Qty', percent: 6, align: 'center' as const },
      { label: 'Rate', percent: 8, align: 'right' as const },
      { label: 'Taxable Amount', percent: 12, align: 'right' as const }
    ];

    const taxColumns = isIntraStateSupply
      ? [
          { label: 'CGST %', percent: 4, align: 'center' as const },
          { label: 'CGST Amt', percent: 5, align: 'right' as const },
          { label: 'SGST %', percent: 4, align: 'center' as const },
          { label: 'SGST Amt', percent: 5, align: 'right' as const }
        ]
      : [
          { label: 'IGST %', percent: 6, align: 'center' as const },
          { label: 'IGST Amt', percent: 12, align: 'right' as const }
        ];

    const tailColumns = [
      { label: 'Discount', percent: 8, align: 'right' as const },
      { label: 'Line Total', percent: 10, align: 'right' as const }
    ];

    const columns = [...baseColumns, ...taxColumns, ...tailColumns];
    const widths: number[] = [];
    let used = 0;
    columns.forEach((col, index) => {
      if (index === columns.length - 1) {
        widths.push(tableWidth - used);
      } else {
        const width = Math.floor((tableWidth * col.percent) / 100);
        widths.push(width);
        used += width;
      }
    });

    const drawTableHeader = () => {
      const headerHeight = 20;
      const headerY = ensureSpace(ctx, y, headerHeight);
      let x = ctx.margin;
      columns.forEach((col, index) => {
        ctx.page.drawRectangle({
          x,
          y: ctx.pageHeight - headerY - headerHeight,
          width: widths[index],
          height: headerHeight,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0)
        });
        drawCellText(ctx, col.label, x, headerY + 4, widths[index], BODY_FONT_SIZE, 'center');
        x += widths[index];
      });
      y = headerY + headerHeight;
    };

    drawTableHeader();

    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    order.orderItems.forEach((item, index) => {
      const rate = Number(item.price ?? 0);
      const qty = Number(item.quantity ?? 0);
      const discount = Number(item.discount ?? 0);
      const taxPercent = Number(item.tax ?? 0);
      const grossAmount = Math.max(0, rate * qty - discount);
      const taxDivisor = taxPercent > 0 ? 1 + taxPercent / 100 : 1;
      const taxableAmount = grossAmount / taxDivisor;
      const taxAmount = grossAmount - taxableAmount;
      const total = taxableAmount + taxAmount;

      subtotal += taxableAmount;
      totalDiscount += discount;
      totalTax += taxAmount;

      const itemName = item.productName || `Product ${item.productId}`;
      const taxCells = isIntraStateSupply
        ? [
            wrapText(`${taxPercent / 2}`, widths[6] - 6, ctx.font, BODY_FONT_SIZE),
            wrapText(formatAmount(taxAmount / 2), widths[7] - 6, ctx.font, BODY_FONT_SIZE),
            wrapText(`${taxPercent / 2}`, widths[8] - 6, ctx.font, BODY_FONT_SIZE),
            wrapText(formatAmount(taxAmount / 2), widths[9] - 6, ctx.font, BODY_FONT_SIZE)
          ]
        : [
            wrapText(`${taxPercent}`, widths[6] - 6, ctx.font, BODY_FONT_SIZE),
            wrapText(formatAmount(taxAmount), widths[7] - 6, ctx.font, BODY_FONT_SIZE)
          ];

      const cellLines = [
        wrapText(String(index + 1), widths[0] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(itemName, widths[1] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(item.hsnsac || '-', widths[2] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(String(qty), widths[3] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(formatAmount(rate), widths[4] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(formatAmount(taxableAmount), widths[5] - 6, ctx.font, BODY_FONT_SIZE),
        ...taxCells,
        wrapText(formatAmount(discount), widths[widths.length - 2] - 6, ctx.font, BODY_FONT_SIZE),
        wrapText(formatAmount(total), widths[widths.length - 1] - 6, ctx.font, BODY_FONT_SIZE)
      ];
      const maxLines = Math.max(...cellLines.map((lines) => lines.length), 1);
      const rowHeight = Math.max(ROW_HEIGHT, maxLines * LINE_HEIGHT + 6);
      const nextY = ensureSpace(ctx, y, rowHeight);
      if (nextY !== y) {
        y = nextY;
        drawTableHeader();
      }

      let x = ctx.margin;
      const rowBottom = ctx.pageHeight - y - rowHeight;
      widths.forEach((width) => {
        ctx.page.drawRectangle({
          x,
          y: rowBottom,
          width,
          height: rowHeight,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0)
        });
        x += width;
      });

      x = ctx.margin;
      cellLines.forEach((lines, cellIndex) => {
        drawCellLines(ctx, lines, x, y + 4, widths[cellIndex], BODY_FONT_SIZE, columns[cellIndex].align);
        x += widths[cellIndex];
      });

      y = y + rowHeight;
    });

    const shipping = Number(order.shippingAmount ?? 0);
    const courierBase = shipping > 0 ? shipping / 1.18 : 0;
    const courierTax = shipping > 0 ? shipping - courierBase : 0;
    const roundedTotal = Number(order.invoiceAmount ?? subtotal + totalTax + shipping);
    const taxSummaryLines = isIntraStateSupply
      ? [
          { label: 'CGST', value: formatAmount(totalTax / 2) },
          { label: 'SGST', value: formatAmount(totalTax / 2) }
        ]
      : [{ label: 'IGST', value: formatAmount(totalTax) }];

    const courierTaxLines =
      shipping > 0
        ? isIntraStateSupply
          ? [
              { label: 'Courier Charges', value: formatAmount(courierBase) },
              { label: 'Courier CGST', value: formatAmount(courierTax / 2) },
              { label: 'Courier SGST', value: formatAmount(courierTax / 2) },
              { label: 'Courier Total', value: formatAmount(shipping) }
            ]
          : [
              { label: 'Courier Charges', value: formatAmount(courierBase) },
              { label: 'Courier IGST', value: formatAmount(courierTax) },
              { label: 'Courier Total', value: formatAmount(shipping) }
            ]
        : [];

    const summaryLines = [
      { label: 'Subtotal', value: formatAmount(subtotal) },
      ...taxSummaryLines,
      { label: 'Discount', value: formatAmount(totalDiscount) },
      ...courierTaxLines,
      { label: 'Invoice Amount', value: formatAmount(roundedTotal) }
    ];

    const bankDetails = [
      { label: 'Bank Name', value: bank?.bankName || '-' },
      { label: 'Account Holder Name', value: bank?.accountHolderName || '-' },
      { label: 'Account Number', value: bank?.accountNumber || '-' },
      { label: 'IFSC Code', value: bank?.ifsc || '-' },
      { label: 'Branch', value: bank?.branch || '-' },
      ...(bank?.swiftCode ? [{ label: 'SWIFT Code', value: bank.swiftCode }] : [])
    ];
    const bankNotes = [
      `All cheques / DD should be made payable to ${companyName}.`
    ];

    const terms = [
      'Goods once sold will not be taken back or exchanged unless agreed in writing.',
      'Payment due within 7 days from invoice date unless otherwise agreed.',
      'Interest @18% per annum on delayed payments.',
      `All disputes are subject to ${jurisdictionLocation} jurisdiction only.`,
      "Goods are dispatched at buyer's risk; no responsibility after dispatch.",
      'Taxes are charged as applicable under GST laws.',
      'Bank charges, if any, shall be borne by the buyer.'
    ];

    const summaryWidth = 220;
    const summaryX = ctx.pageWidth - ctx.margin - summaryWidth;
    const summaryPadding = 6;
    const summaryInnerWidth = summaryWidth - summaryPadding * 2;
    const labelColumnWidth = Math.floor(summaryInnerWidth * 0.6);
    const valueColumnWidth = summaryInnerWidth - labelColumnWidth;
    const wordsLabel = 'Amount in Words:';
    const words = amountInWords(roundedTotal);
    const wordsLines = wrapText(words, summaryInnerWidth, ctx.font, BODY_FONT_SIZE);
    const wordsBlockHeight = LINE_HEIGHT + wordsLines.length * LINE_HEIGHT;
    const summaryRowHeights = summaryLines.map((line) => {
      const rowSize = line.label === 'Invoice Amount' ? BODY_FONT_SIZE + 1 : BODY_FONT_SIZE;
      const rowLineHeight = line.label === 'Invoice Amount' ? LINE_HEIGHT + 1 : LINE_HEIGHT;
      const labelLines = wrapText(line.label, labelColumnWidth, ctx.font, rowSize);
      const valueLines = wrapText(line.value, valueColumnWidth, ctx.font, rowSize);
      return Math.max(labelLines.length, valueLines.length, 1) * rowLineHeight;
    });
    const summaryHeight =
      summaryPadding * 2 +
      summaryRowHeights.reduce((sum, rowHeight) => sum + rowHeight, 0) +
      wordsBlockHeight +
      2;

    const bankGap = 10;
    const bankWidth = Math.max(120, summaryX - ctx.margin - bankGap);
    const bankPadding = 6;
    const bankTitleSize = SECTION_TITLE_SIZE + 2;
    const bankTitleGap = 4;
    const bankInnerWidth = bankWidth - bankPadding * 2;
    const bankLabelWidth = Math.floor(bankInnerWidth * 0.45);
    const bankValueWidth = bankInnerWidth - bankLabelWidth;
    const bankRowHeights = bankDetails.map((line) => {
      const labelLines = wrapText(line.label, bankLabelWidth, ctx.boldFont, BODY_FONT_SIZE);
      const valueLines = wrapText(line.value, bankValueWidth, ctx.font, BODY_FONT_SIZE);
      return Math.max(labelLines.length, valueLines.length, 1) * LINE_HEIGHT;
    });
    const bankNoteLines = bankNotes.flatMap((note) =>
      wrapText(note, bankInnerWidth, ctx.font, BODY_FONT_SIZE)
    );
    const bankNoteHeight = bankNoteLines.length * LINE_HEIGHT;
    const bankHeight =
      bankPadding * 2 +
      bankTitleSize +
      bankTitleGap +
      bankRowHeights.reduce((sum, rowHeight) => sum + rowHeight, 0) +
      (bankNoteLines.length ? bankNoteHeight + 4 : 0);

    y = ensureSpace(ctx, y + 10, Math.max(summaryHeight, bankHeight));

    ctx.page.drawRectangle({
      x: summaryX,
      y: ctx.pageHeight - y - summaryHeight,
      width: summaryWidth,
      height: summaryHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0)
    });

    let summaryY = y + summaryPadding;
    summaryLines.forEach((line, index) => {
      const isInvoiceAmount = line.label === 'Invoice Amount';
      const rowSize = isInvoiceAmount ? BODY_FONT_SIZE + 1 : BODY_FONT_SIZE;
      const rowLineHeight = isInvoiceAmount ? LINE_HEIGHT + 1 : LINE_HEIGHT;
      const rowHeight = summaryRowHeights[index];
      const labelLines = wrapText(line.label, labelColumnWidth, ctx.font, rowSize);
      const valueLines = wrapText(line.value, valueColumnWidth, ctx.font, rowSize);

      let labelLineY = summaryY;
      labelLines.forEach((labelLine) => {
        drawTextLine(
          ctx,
          labelLine,
          summaryX + summaryPadding,
          labelLineY,
          rowSize,
          isInvoiceAmount ? ctx.boldFont : ctx.font
        );
        labelLineY += rowLineHeight;
      });

      let valueLineY = summaryY;
      valueLines.forEach((valueLine) => {
        const textWidth = (isInvoiceAmount ? ctx.boldFont : ctx.font).widthOfTextAtSize(valueLine, rowSize);
        const textX = summaryX + summaryPadding + labelColumnWidth + valueColumnWidth - textWidth;
        drawTextLine(
          ctx,
          valueLine,
          textX,
          valueLineY,
          rowSize,
          isInvoiceAmount ? ctx.boldFont : ctx.font
        );
        valueLineY += rowLineHeight;
      });

      summaryY += rowHeight;
    });

    const wordsStartY = summaryY + 2;
    drawTextLine(ctx, wordsLabel, summaryX + summaryPadding, wordsStartY, BODY_FONT_SIZE, ctx.boldFont);
    let wordsLineY = wordsStartY + LINE_HEIGHT;
    wordsLines.forEach((line) => {
      drawTextLine(ctx, line, summaryX + summaryPadding, wordsLineY, BODY_FONT_SIZE, ctx.boldFont);
      wordsLineY += LINE_HEIGHT;
    });

    const bankX = ctx.margin;
    ctx.page.drawRectangle({
      x: bankX,
      y: ctx.pageHeight - y - bankHeight,
      width: bankWidth,
      height: bankHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0)
    });

    drawTextLine(ctx, 'Bank Details', bankX + bankPadding, y + bankPadding, bankTitleSize, ctx.boldFont);
    let bankLineY = y + bankPadding + bankTitleSize + bankTitleGap;
    bankDetails.forEach((line, index) => {
      const rowHeight = bankRowHeights[index];
      const labelLines = wrapText(line.label, bankLabelWidth, ctx.boldFont, BODY_FONT_SIZE);
      const valueLines = wrapText(line.value, bankValueWidth, ctx.font, BODY_FONT_SIZE);
      labelLines.forEach((labelLine, lineIndex) => {
        drawTextLine(
          ctx,
          labelLine,
          bankX + bankPadding,
          bankLineY + lineIndex * LINE_HEIGHT,
          BODY_FONT_SIZE,
          ctx.boldFont
        );
      });
      valueLines.forEach((valueLine, lineIndex) => {
        drawTextLine(
          ctx,
          valueLine,
          bankX + bankPadding + bankLabelWidth,
          bankLineY + lineIndex * LINE_HEIGHT,
          BODY_FONT_SIZE
        );
      });
      bankLineY += rowHeight;
    });
    if (bankNoteLines.length) {
      bankLineY += 4;
      bankNoteLines.forEach((noteLine, index) => {
        drawTextLine(ctx, noteLine, bankX + bankPadding, bankLineY + index * LINE_HEIGHT, BODY_FONT_SIZE);
      });
    }

    y += Math.max(summaryHeight, bankHeight) + 6;

    const termsWidth = ctx.pageWidth - ctx.margin * 2;
    const termsHeight = getTermsBlockHeight(ctx, terms, termsWidth, Boolean(signImage));
    const termsY = ensureSpace(ctx, y, termsHeight);
    y = drawTermsBlock(ctx, terms, ctx.margin, termsY, termsWidth, signImage) + 6;
    };

    const normalizedCopies: InvoiceCopyType[] = copies.length ? copies : ['original'];
    normalizedCopies.forEach((copyType, index) => {
      if (index > 0) {
        addPage(ctx);
      }
      renderInvoicePage(copyType);
    });
  });
}


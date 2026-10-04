import { sendOrderDispatchedEmail } from "@/lib/email";

const PRIMARY = "#168e2d";
const PRIMARY_DARK = "#0f6b21";
const PRIMARY_LIGHT = "#1fb83c";
const PRIMARY_SOFT = "#e8f6eb";
const PRIMARY_BORDER = "#b7e3c0";

type DispatchEmailOrder = {
  id: string;
  status?: string | null;
  InvoiceNumber?: string | null;
  shippingCourierName?: string | null;
  awsCode?: string | null;
  shippingId?: string | null;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

export async function maybeSendOrderDispatchedEmail(
  previousStatus: string | null | undefined,
  order: DispatchEmailOrder | null | undefined
): Promise<void> {
  if (!order || !isShippedStatus(order.status)) return;
  if (isShippedStatus(previousStatus)) return;

  const to = order.user?.email?.trim();
  if (!to) {
    console.warn(`Skip dispatch email for ${order.id}: customer has no email`);
    return;
  }

  const courierName = formatCourierDisplayName(order.shippingCourierName);
  const trackingId =
    (order.awsCode || order.shippingId || "").trim() || "Not provided";
  const sentAt = formatEmailTimestamp();
  const customerName = (order.user?.name || "").trim() || "Customer";

  try {
    await sendOrderDispatchedEmail({
      to,
      subject: `Your order ${order.id} has been dispatched`,
      html: buildOrderDispatchedEmailHtml({
        customerName,
        orderId: order.id,
        invoiceNumber: order.InvoiceNumber,
        courierName,
        trackingId,
        sentAt,
      }),
      text: [
        `Hi ${customerName},`,
        "",
        `Your order ${order.id} has been dispatched by ${courierName} with tracking ID ${trackingId}.`,
        "",
        `Email sent on ${sentAt} (IST).`,
        "Allahabad Organic Agricultural Company Private Limited",
      ].join("\n"),
    });
  } catch (error) {
    console.error(`Failed to send dispatch email for order ${order.id}:`, error);
  }
}

export function isShippedStatus(status: string | null | undefined): boolean {
  return status === "SHIPPED" || status === "ORDER_SHIPPED_WITHOUT_PAYMENT";
}

export function formatCourierDisplayName(name: string | null | undefined): string {
  const raw = (name || "").trim();
  if (!raw) return "our courier partner";
  if (raw === "BLUE_DART") return "Blue Dart";
  if (raw === "DELHIVERY") return "Delhivery";
  return raw;
}

export function formatEmailTimestamp(date = new Date()): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function buildOrderDispatchedEmailHtml(params: {
  customerName: string;
  orderId: string;
  invoiceNumber?: string | null;
  courierName: string;
  trackingId: string;
  sentAt: string;
}): string {
  const invoiceLine = params.invoiceNumber
    ? `<p style="margin:0 0 8px;color:#333;font-size:14px;">Invoice: <strong>${escapeHtml(params.invoiceNumber)}</strong></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Order dispatched</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${PRIMARY_BORDER};">
          <tr>
            <td style="background:${PRIMARY};padding:28px 28px 22px;">
              <p style="margin:0 0 6px;color:#d9f5df;font-size:12px;letter-spacing:1px;text-transform:uppercase;">AOAC Orders</p>
              <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;">Your order has been dispatched</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px;color:#222;font-size:16px;">Hi ${escapeHtml(params.customerName)},</p>
              <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.6;">
                Good news — your order <strong style="color:${PRIMARY_DARK};">${escapeHtml(params.orderId)}</strong>
                has been dispatched.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${PRIMARY_SOFT};border:1px solid ${PRIMARY_BORDER};border-radius:10px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 8px;color:#333;font-size:14px;">Order ID: <strong>${escapeHtml(params.orderId)}</strong></p>
                    ${invoiceLine}
                    <p style="margin:0 0 8px;color:#333;font-size:14px;">Courier: <strong>${escapeHtml(params.courierName)}</strong></p>
                    <p style="margin:0;color:#333;font-size:14px;">Tracking ID: <strong>${escapeHtml(params.trackingId)}</strong></p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;color:#555;font-size:14px;line-height:1.6;">
                You can use the tracking ID above on the courier website to follow the shipment.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:${PRIMARY_DARK};padding:16px 28px;">
              <p style="margin:0 0 4px;color:#ffffff;font-size:12px;">Email sent on ${escapeHtml(params.sentAt)} (IST)</p>
              <p style="margin:0;color:${PRIMARY_LIGHT};font-size:12px;">Allahabad Organic Agricultural Company Private Limited</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

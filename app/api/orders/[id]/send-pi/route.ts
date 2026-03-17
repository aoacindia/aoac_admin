import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { adminPrisma } from "@/lib/admin-prisma";
import { productPrisma } from "@/lib/product-prisma";
import { sendEmail } from "@/lib/email";
import { auth } from "@/auth";

function formatWeightLabel(weightGrams?: number | null): string | null {
  if (weightGrams === null || weightGrams === undefined) {
    return null;
  }
  const grams = Number(weightGrams);
  if (!Number.isFinite(grams) || grams <= 0) {
    return null;
  }
  const formatNumber = (value: number) => value.toFixed(2).replace(/\.?0+$/, "");
  if (grams < 1000) {
    return `${formatNumber(grams)} g`;
  }
  return `${formatNumber(grams / 1000)} kg`;
}

function formatAmount(value: number | null | undefined): string {
  const safeValue = Number(value ?? 0);
  return safeValue.toFixed(2);
}

function formatAddress(address: {
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}): string {
  const parts = [
    address.houseNo,
    address.line1,
    address.line2,
    address.city,
    address.district,
    address.state,
    address.country,
    address.pincode,
  ].filter(Boolean);
  return parts.join(", ");
}

function generatePIEmailHTML(order: any, bank: any, invoiceOffice: any): string {
  const invoiceTitle = order.invoiceType === "TAX_INVOICE" ? "TAX INVOICE" : "PROFORMA INVOICE";
  const piNumber = order.InvoiceNumber || order.id;
  const invoiceDate = new Date(order.orderDate).toLocaleDateString("en-IN");
  
  const companyName = "Allahabad Organic Agricultural Company Private Limited";
  const officeAddress = invoiceOffice
    ? `${invoiceOffice.address}, ${invoiceOffice.city || ""}, ${invoiceOffice.state} (${invoiceOffice.stateCode}), ${invoiceOffice.pincode || ""}, ${invoiceOffice.country || ""}`
    : "620 G Flr, Ganga Bihar, Anisabad, Phulwari, Patna - 800002, Bihar, India";
  const companyGstin = invoiceOffice?.gstin || "10ABECA4299B1Z4";
  
  const isBusinessAccount = Boolean(order.user.isBusinessAccount);
  const businessSuffix =
    isBusinessAccount && order.user.hasAdditionalTradeName && order.user.additionalTradeName
      ? ` (${order.user.additionalTradeName})`
      : "";
  const businessDisplayName = isBusinessAccount && order.user.businessName
    ? `${order.user.businessName}${businessSuffix}`
    : order.user.name;
  const contactPersonLine = isBusinessAccount ? `Contact Person: ${order.user.name}` : "";

  const billingAddress = order.user.billingAddress
    ? formatAddress(order.user.billingAddress)
    : "N/A";
  const shippingAddress = order.shippingAddress
    ? formatAddress(order.shippingAddress)
    : "N/A";

  const shippingContactLine =
    isBusinessAccount && order.shippingAddress?.name
      ? `Contact Person: ${order.shippingAddress.name}`
      : "";

  // Calculate totals
  let subtotal = 0;
  let totalDiscount = 0;
  let totalTax = 0;
  
  // Resolve place of supply (same logic as PDF generator)
  const placeOfSupplyState = order.shippingAddress?.state || order.user.billingAddress?.state || "";
  const placeOfSupplyStateCode = order.shippingAddress?.stateCode || order.user.billingAddress?.stateCode || "";
  const companyStateCode = invoiceOffice?.stateCode || "";
  const isIntraStateSupply =
    Boolean(companyStateCode) &&
    Boolean(placeOfSupplyStateCode) &&
    companyStateCode === placeOfSupplyStateCode;

  const itemsHTML = order.orderItems
    .map((item: any, index: number) => {
      const rate = Number(item.price ?? 0);
      const qty = Number(item.quantity ?? 0);
      const discount = Number(item.discount ?? 0);
      const taxPercent = Number(item.tax ?? 0);
      const grossAmount = Math.max(0, rate * qty - discount);
      const taxDivisor = taxPercent > 0 ? 1 + taxPercent / 100 : 1;
      const taxableAmount = grossAmount / taxDivisor;
      const taxAmount = grossAmount - taxableAmount;
      const total = taxableAmount + taxAmount;
      const taxablePerUnit = qty > 0 ? taxableAmount / qty : 0;

      subtotal += taxableAmount;
      totalDiscount += discount;
      totalTax += taxAmount;

      const itemName = item.productName || `Product ${item.productId}`;
      const itemWeightGrams =
        item.customWeightItem === true && typeof item.customWeight === "number"
          ? item.customWeight
          : item.weight ?? null;
      const weightLabel = formatWeightLabel(itemWeightGrams);
      const itemDisplayName = weightLabel ? `${itemName} (${weightLabel})` : itemName;

      const taxDisplay = isIntraStateSupply
        ? `<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${taxPercent / 2}%</td>
           <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(taxAmount / 2)}</td>
           <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${taxPercent / 2}%</td>
           <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(taxAmount / 2)}</td>`
        : `<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${taxPercent}%</td>
           <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(taxAmount)}</td>`;

      return `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${itemDisplayName}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.hsnsac || "-"}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${qty}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(taxablePerUnit)}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(taxableAmount)}</td>
          ${taxDisplay}
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(discount)}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${formatAmount(total)}</td>
        </tr>
      `;
    })
    .join("");

  const shipping = Number(order.shippingAmount ?? 0);
  const courierBase = shipping > 0 ? shipping / 1.18 : 0;
  const courierTax = shipping > 0 ? shipping - courierBase : 0;
  const roundedTotal = Number(order.invoiceAmount ?? subtotal + totalTax + shipping);

  const taxSummaryRows = isIntraStateSupply
    ? `
      <tr>
        <td style="padding: 8px; font-weight: bold;">CGST</td>
        <td style="padding: 8px; text-align: right;">₹${formatAmount(totalTax / 2)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">SGST</td>
        <td style="padding: 8px; text-align: right;">₹${formatAmount(totalTax / 2)}</td>
      </tr>
    `
    : `
      <tr>
        <td style="padding: 8px; font-weight: bold;">IGST</td>
        <td style="padding: 8px; text-align: right;">₹${formatAmount(totalTax)}</td>
      </tr>
    `;

  const courierRows =
    shipping > 0
      ? isIntraStateSupply
        ? `
          <tr>
            <td style="padding: 8px;">Courier Charges</td>
            <td style="padding: 8px; text-align: right;">₹${formatAmount(courierBase)}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Courier CGST</td>
            <td style="padding: 8px; text-align: right;">₹${formatAmount(courierTax / 2)}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Courier SGST</td>
            <td style="padding: 8px; text-align: right;">₹${formatAmount(courierTax / 2)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Courier Total</td>
            <td style="padding: 8px; text-align: right; font-weight: bold;">₹${formatAmount(shipping)}</td>
          </tr>
        `
        : `
          <tr>
            <td style="padding: 8px;">Courier Charges</td>
            <td style="padding: 8px; text-align: right;">₹${formatAmount(courierBase)}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Courier IGST</td>
            <td style="padding: 8px; text-align: right;">₹${formatAmount(courierTax)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Courier Total</td>
            <td style="padding: 8px; text-align: right; font-weight: bold;">₹${formatAmount(shipping)}</td>
          </tr>
        `
      : "";

  const tableHeaders = isIntraStateSupply
    ? `
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">Sr No</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Item Name</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">HSN</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">Qty</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Rate</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Taxable Amount</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">CGST %</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">CGST Amt</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">SGST %</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">SGST Amt</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Discount</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Line Total</th>
    `
    : `
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">Sr No</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Item Name</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">HSN</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">Qty</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Rate</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Taxable Amount</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: center;">IGST %</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">IGST Amt</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Discount</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; text-align: right;">Line Total</th>
    `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .company-info {
          margin-bottom: 10px;
        }
        .invoice-title {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }
        .info-box {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 20px 0;
        }
        .address-section {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }
        .address-box {
          border: 1px solid #ddd;
          padding: 15px;
          flex: 1;
        }
        .address-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .summary-section {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }
        .summary-box {
          border: 1px solid #ddd;
          padding: 15px;
          flex: 1;
        }
        .summary-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .bank-details {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <h2>${companyName}</h2>
          <p>${officeAddress}</p>
          <p>CIN : U63120BR2025PTC080942 | PAN : ABECA4299B | GSTIN : ${companyGstin}</p>
          <p>Phone : (+91) 8986937875 | Email : hello@aoac.in</p>
        </div>
        <div class="invoice-title">${invoiceTitle}</div>
      </div>

      <div class="info-box">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>Invoice No:</strong> ${piNumber}<br>
            <strong>Order ID:</strong> ${order.id}
          </div>
          <div>
            <strong>Invoice Date:</strong> ${invoiceDate}<br>
            <strong>Place of Supply:</strong> ${placeOfSupplyState ? `${placeOfSupplyState}${placeOfSupplyStateCode ? ` (${placeOfSupplyStateCode})` : ""}` : "-"}
          </div>
        </div>
      </div>

      <div class="address-section">
        <div class="address-box">
          <div class="address-title">Billed To</div>
          <div>
            <strong>${businessDisplayName}</strong><br>
            ${contactPersonLine ? `${contactPersonLine}<br>` : ""}
            ${billingAddress}<br>
            Phone: ${order.user.phone}<br>
            GSTIN: ${order.user.gstNumber || "-"}
          </div>
        </div>
        <div class="address-box">
          <div class="address-title">Shipped To</div>
          <div>
            <strong>${businessDisplayName}</strong><br>
            ${shippingContactLine ? `${shippingContactLine}<br>` : ""}
            ${shippingAddress}<br>
            ${order.shippingAddress ? `Phone: ${order.shippingAddress.phone}<br>` : ""}
            GSTIN: ${order.user.gstNumber || "-"}
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            ${tableHeaders}
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="summary-section">
        <div class="summary-box">
          <div class="summary-title">Summary</div>
          <table style="width: 100%; border: none;">
            <tr>
              <td style="padding: 8px;">Subtotal</td>
              <td style="padding: 8px; text-align: right;">₹${formatAmount(subtotal)}</td>
            </tr>
            ${taxSummaryRows}
            <tr>
              <td style="padding: 8px;">Discount</td>
              <td style="padding: 8px; text-align: right;">₹${formatAmount(totalDiscount)}</td>
            </tr>
            ${courierRows}
            <tr style="border-top: 2px solid #333;">
              <td style="padding: 8px; font-weight: bold; font-size: 16px;">Invoice Amount</td>
              <td style="padding: 8px; text-align: right; font-weight: bold; font-size: 16px;">₹${formatAmount(roundedTotal)}</td>
            </tr>
          </table>
        </div>
        <div class="summary-box">
          <div class="summary-title">Bank Details</div>
          <table style="width: 100%; border: none;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Bank Name:</td>
              <td style="padding: 8px;">${bank?.bankName || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Account Holder Name:</td>
              <td style="padding: 8px;">${bank?.accountHolderName || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Account Number:</td>
              <td style="padding: 8px;">${bank?.accountNumber || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">IFSC Code:</td>
              <td style="padding: 8px;">${bank?.ifsc || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Branch:</td>
              <td style="padding: 8px;">${bank?.branch || "-"}</td>
            </tr>
            ${bank?.swiftCode ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">SWIFT Code:</td>
              <td style="padding: 8px;">${bank.swiftCode}</td>
            </tr>
            ` : ""}
          </table>
          <p style="margin-top: 10px; font-size: 12px; color: #666;">
            All cheques / DD should be made payable to ${companyName}.
          </p>
        </div>
      </div>

      ${order.shippingCourierName || order.deliveryPartner || order.shippingId || order.shippingOrderId || order.estimatedDeliveryDate ? `
      <div class="info-box">
        <div class="summary-title">Delivery Details</div>
        ${order.shippingCourierName ? `<p><strong>Courier Name:</strong> ${order.shippingCourierName}</p>` : ""}
        ${order.deliveryPartner ? `<p><strong>Delivery Partner:</strong> ${order.deliveryPartner}${order.deliveryPartnerName ? ` - ${order.deliveryPartnerName}` : ""}</p>` : ""}
        ${order.shippingId ? `<p><strong>Shipping ID:</strong> ${order.shippingId}</p>` : ""}
        ${order.shippingOrderId ? `<p><strong>Shipping Order ID:</strong> ${order.shippingOrderId}</p>` : ""}
        ${order.estimatedDeliveryDate ? `<p><strong>Estimated Delivery Date:</strong> ${order.estimatedDeliveryDate}</p>` : ""}
      </div>
      ` : ""}

      <div class="footer">
        <p><strong>For payment, please use the given bank account details.</strong></p>
        <p>For any further query, please feel free to reply anytime.</p>
      </div>
    </body>
    </html>
  `;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { emailAccountId, recipientEmail } = body;

    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: "Recipient email is required" },
        { status: 400 }
      );
    }

    // Fetch order with all necessary data
    const order = await userPrisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            businessName: true,
            gstNumber: true,
            isBusinessAccount: true,
            hasAdditionalTradeName: true,
            additionalTradeName: true,
            billingAddress: true,
          },
        },
        shippingAddress: true,
        supplier: true,
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Fetch invoice office
    const invoiceOffice = order.invoiceOfficeId
      ? await adminPrisma.office.findUnique({
          where: { id: order.invoiceOfficeId },
          select: {
            id: true,
            gstin: true,
            address: true,
            city: true,
            state: true,
            stateCode: true,
            pincode: true,
            country: true,
          },
        })
      : null;

    // Fetch bank details
    const bank = await adminPrisma.account.findFirst({
      where: { isDefault: true },
    });

    // Fetch product details for each order item
    const orderItemsWithProducts = await Promise.all(
      order.orderItems.map(async (item) => {
        try {
          const product = await productPrisma.product.findUnique({
            where: { id: item.productId },
            select: {
              name: true,
              hsnsac: true,
              weight: true,
            },
          });
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight: typeof item.customWeight === "number" ? item.customWeight : null,
            productName: product?.name || `Product ${item.productId}`,
            hsnsac: product?.hsnsac || "-",
            weight: product?.weight ?? null,
          };
        } catch (error) {
          return {
            ...item,
            customWeightItem: item.customWeightItem === true,
            customWeight: typeof item.customWeight === "number" ? item.customWeight : null,
            productName: `Product ${item.productId}`,
            hsnsac: "-",
            weight: null,
          };
        }
      })
    );

    const orderWithProducts = {
      ...order,
      orderItems: orderItemsWithProducts,
    };

    // Generate email HTML
    const emailHTML = generatePIEmailHTML(orderWithProducts, bank, invoiceOffice);

    // Determine email configuration
    let emailConfig;
    let ccEmail: string | undefined;

    if (emailAccountId && emailAccountId !== "hello@aoac.in") {
      // Fetch email account from database
      const emailAccount = await adminPrisma.emailAccount.findUnique({
        where: { id: emailAccountId },
      });

      if (!emailAccount) {
        return NextResponse.json(
          { success: false, error: "Email account not found" },
          { status: 404 }
        );
      }

      emailConfig = {
        host: emailAccount.smtpHost,
        port: emailAccount.smtpPort,
        user: emailAccount.smtpUser,
        password: emailAccount.smtpPassword,
        from: emailAccount.fromEmail,
      };

      // Always CC hello@aoac.in when using other email accounts
      ccEmail = "hello@aoac.in";
    } else {
      // Use .env configuration (hello@aoac.in)
      emailConfig = undefined;
    }

    // Send email
    const invoiceTitle = order.invoiceType === "TAX_INVOICE" ? "TAX INVOICE" : "PROFORMA INVOICE";
    const piNumber = order.InvoiceNumber || order.id;
    const subject = `${invoiceTitle} - ${piNumber}`;

    await sendEmail(recipientEmail, subject, emailHTML, emailConfig, ccEmail);

    return NextResponse.json({
      success: true,
      message: "PI email sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending PI email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send PI email" },
      { status: 500 }
    );
  }
}


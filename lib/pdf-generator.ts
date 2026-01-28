import 'server-only';

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

async function launchPdfBrowser() {
  const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_ENV);

  if (isVercel) {
    const puppeteer = await import('puppeteer-core');
    const chromiumModule = await import('@sparticuz/chromium-min');
    const chromium = chromiumModule.default;

    const executablePath = await chromium.executablePath();
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
  }

  try {
    const puppeteerFull = await import('puppeteer');
    return puppeteerFull.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (error) {
    const puppeteer = await import('puppeteer-core');
    const fs = await import('fs');

    const possiblePaths: (string | undefined)[] = [
      process.env.PUPPETEER_EXECUTABLE_PATH,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.CHROME_PATH,
    ].filter((path): path is string => typeof path === 'string' && path.length > 0);

    let executablePath: string | undefined;
    for (const path of possiblePaths) {
      if (path && fs.existsSync(path)) {
        executablePath = path;
        break;
      }
    }

    if (!executablePath) {
      throw new Error(
        'Chromium executable not found. Please install puppeteer or set PUPPETEER_EXECUTABLE_PATH'
      );
    }

    return puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
}

export async function generateCustomerPDF(
  customer: Customer,
  sections: string[]
): Promise<Uint8Array> {
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Build HTML sections based on selected sections
  let htmlSections = '';

  if (sections.includes('customerInfo')) {
    if (customer.isBusinessAccount) {
      // For business accounts, show contact person information
      htmlSections += `
        <div class="section-title">Contact Person Information</div>
        <div class="info-box">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Contact Person Name:</span>
              <span class="info-value">${escapeHtml(customer.name)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">${escapeHtml(customer.email)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone:</span>
              <span class="info-value">${escapeHtml(customer.phone)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Customer ID:</span>
              <span class="info-value">${escapeHtml(customer.id)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Account Type:</span>
              <span class="info-value">Business</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">${
                customer.terminated
                  ? 'Terminated'
                  : customer.suspended
                  ? `Suspended (${customer.suspended_number} time(s))`
                  : 'Active'
              }</span>
            </div>
          </div>
        </div>
      `;
    } else {
      // For personal accounts, show regular customer information
      htmlSections += `
        <div class="section-title">Customer Information</div>
        <div class="info-box">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Customer Name:</span>
              <span class="info-value">${escapeHtml(customer.name)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">${escapeHtml(customer.email)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone:</span>
              <span class="info-value">${escapeHtml(customer.phone)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Customer ID:</span>
              <span class="info-value">${escapeHtml(customer.id)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Account Type:</span>
              <span class="info-value">Personal</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">${
                customer.terminated
                  ? 'Terminated'
                  : customer.suspended
                  ? `Suspended (${customer.suspended_number} time(s))`
                  : 'Active'
              }</span>
            </div>
          </div>
        </div>
      `;
  }
  }

  if (sections.includes('businessInfo') && customer.isBusinessAccount) {
    htmlSections += `
      <div class="section-title">Business Information</div>
      <div class="info-box">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Business Name:</span>
            <span class="info-value">${escapeHtml(customer.businessName || 'N/A')}</span>
          </div>
          <div class="info-item">
            <span class="info-label">GST Number:</span>
            <span class="info-value">${escapeHtml(customer.gstNumber || 'N/A')}</span>
          </div>
          ${customer.hasAdditionalTradeName ? `
            <div class="info-item">
              <span class="info-label">Additional Trade Name:</span>
              <span class="info-value">${escapeHtml(customer.additionalTradeName || 'N/A')}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  if (sections.includes('billingAddress') && customer.billingAddress) {
    htmlSections += `
      <div class="section-title">Billing Address</div>
      <div class="info-box">
        <div class="address-content">
          <p>${escapeHtml(customer.billingAddress.houseNo)}, ${escapeHtml(customer.billingAddress.line1)}</p>
          ${customer.billingAddress.line2 ? `<p>${escapeHtml(customer.billingAddress.line2)}</p>` : ''}
          <p>${escapeHtml(customer.billingAddress.city)}, ${escapeHtml(customer.billingAddress.district)}, ${escapeHtml(customer.billingAddress.state)}</p>
          <p>${escapeHtml(customer.billingAddress.country)} - ${escapeHtml(customer.billingAddress.pincode)}</p>
        </div>
      </div>
    `;
  }

  if (sections.includes('suspensionHistory') && customer.suspensionReasons.length > 0) {
    htmlSections += `
      <div class="section-title">Suspension History (${customer.suspensionReasons.length})</div>
      <div class="info-box">
        ${customer.suspensionReasons.map((reason, index) => `
          <div class="suspension-item">
            <div class="suspension-header">
              <span class="suspension-number">Suspension #${customer.suspensionReasons.length - index}</span>
              <span class="suspension-date">${reason.suspendedAt.toLocaleString()}</span>
            </div>
            <div class="suspension-reason">${escapeHtml(reason.reason)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (sections.includes('addresses') && customer.addresses.length > 0) {
    htmlSections += `
      <div class="section-title">Addresses (${customer.addresses.length})</div>
      <div class="info-box">
        ${customer.addresses.map((address) => `
          <div class="address-card ${address.isDefault ? 'default-address' : ''}">
            <div class="address-header">
              <span class="address-type">${escapeHtml(address.type)}</span>
              ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <div class="address-content">
              <p><strong>${escapeHtml(address.name)}</strong> - ${escapeHtml(address.phone)}</p>
              <p>${escapeHtml(address.houseNo)}, ${escapeHtml(address.line1)}</p>
              ${address.line2 ? `<p>${escapeHtml(address.line2)}</p>` : ''}
              <p>${escapeHtml(address.city)}, ${escapeHtml(address.district)}, ${escapeHtml(address.state)}</p>
              <p>${escapeHtml(address.country)} - ${escapeHtml(address.pincode)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (sections.includes('orders') && customer.order.length > 0) {
    htmlSections += `
      <div class="section-title">Orders (${customer.order.length})</div>
      <div class="info-box">
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            ${customer.order.map((order) => `
              <tr>
                <td>
                  <div>${order.id.substring(0, 8)}...</div>
                  ${order.InvoiceNumber ? `<div class="invoice-number">Invoice: ${escapeHtml(order.InvoiceNumber)}</div>` : ''}
                </td>
                <td>${order.orderDate.toLocaleDateString()}</td>
                <td>
                  <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
                </td>
                <td>${order.orderItems.length} item(s)</td>
                <td>
                  <div class="amount">₹${order.totalAmount.toFixed(2)}</div>
                  ${order.discountAmount && order.discountAmount > 0 ? `<div class="discount">Discount: ₹${order.discountAmount.toFixed(2)}</div>` : ''}
                </td>
                <td>
                  ${order.paymentMethod ? `
                    <div>${escapeHtml(order.paymentMethod)}</div>
                    ${order.paidAmount ? `<div class="paid-amount">₹${order.paidAmount.toFixed(2)}</div>` : ''}
                  ` : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page {
            margin: 0;
            size: A4;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            padding: 15mm;
            color: #0f172a;
            background: #fff;
            font-size: 10px;
          }
          .header {
            background: white;
            border: 1px solid #e2e8f0;
            padding: 15px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }
          .header-logo {
            width: 60px;
            height: 60px;
            object-fit: contain;
            flex-shrink: 0;
          }
          .header-divider {
            width: 3px;
            height: 60px;
            background: #22c55e;
            flex-shrink: 0;
          }
          .header-text {
            flex-shrink: 0;
          }
          .header-text h1 {
            font-size: 20px;
            font-weight: bold;
            color: #0f172a;
            margin: 0;
          }
          .report-title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
            margin: 20px 0 10px 0;
            display: flex;
            align-items: center;
            padding-bottom: 5px;
            border-bottom: 2px solid #22c55e;
          }
          .info-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
          }
          .info-item {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 3px;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .info-label {
            color: #475569;
            font-size: 10px;
            font-weight: 600;
          }
          .info-value {
            color: #0f172a;
            font-weight: bold;
            font-size: 10px;
            text-align: right;
          }
          .address-content {
            color: #0f172a;
            line-height: 1.6;
          }
          .address-content p {
            margin: 3px 0;
            font-size: 10px;
          }
          .address-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 10px;
          }
          .address-card.default-address {
            border: 2px solid #22c55e;
            background: #f0fdf4;
          }
          .address-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          .address-type {
            font-weight: bold;
            font-size: 11px;
            color: #0f172a;
          }
          .default-badge {
            background: #22c55e;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
          }
          .suspension-item {
            background: white;
            border-left: 4px solid #f59e0b;
            border-radius: 3px;
            padding: 10px;
            margin-bottom: 10px;
          }
          .suspension-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          }
          .suspension-number {
            font-weight: bold;
            font-size: 10px;
            color: #0f172a;
          }
          .suspension-date {
            font-size: 9px;
            color: #64748b;
          }
          .suspension-reason {
            font-size: 10px;
            color: #334155;
            line-height: 1.4;
          }
          .orders-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
          }
          .orders-table th {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            padding: 8px;
            text-align: left;
            font-weight: bold;
            color: #0f172a;
          }
          .orders-table td {
            border: 1px solid #e2e8f0;
            padding: 8px;
            color: #334155;
          }
          .orders-table tr:nth-child(even) {
            background: #f8fafc;
          }
          .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .status-delivered {
            background: #dcfce7;
            color: #166534;
          }
          .status-cancelled, .status-refunded {
            background: #fee2e2;
            color: #991b1b;
          }
          .status-shipped {
            background: #dcfce7;
            color: #166534;
          }
          .status-pending, .status-payment_pending, .status-order_ready, .status-processing, .status-paid {
            background: #fef3c7;
            color: #92400e;
          }
          .invoice-number {
            font-size: 8px;
            color: #64748b;
            margin-top: 2px;
          }
          .amount {
            font-weight: bold;
            color: #0f172a;
          }
          .discount {
            font-size: 8px;
            color: #64748b;
            margin-top: 2px;
          }
          .paid-amount {
            font-size: 8px;
            color: #64748b;
            margin-top: 2px;
          }
          .footer {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 15px;
            text-align: center;
            margin-top: 30px;
          }
          .footer p {
            font-size: 10px;
            color: #64748b;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="logo/logo.png" alt="Logo" class="header-logo" onerror="this.style.display='none'" />
          <div class="header-divider"></div>
          <div class="header-text">
            <h1>AOAC Customer Management System</h1>
          </div>
        </div>

        <div class="report-title">Customer Details Report</div>

        ${htmlSections}

        <div class="footer">
          <p>Customer ID: ${escapeHtml(customer.id)}</p>
        </div>
      </body>
    </html>
  `;

  // Generate PDF using Puppeteer
  const browser = await launchPdfBrowser();

  const page = await browser.newPage();
  
  // Get base URL for images (use environment variable or default to localhost)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  // Replace logo path with absolute URL
  const htmlWithAbsolutePaths = htmlContent.replace(
    /src="logo\/logo\.png"/g,
    `src="${baseUrl}/logo/logo.png"`
  );
  
  await page.setContent(htmlWithAbsolutePaths, {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '15mm',
      bottom: '15mm',
      left: '15mm'
    }
  });

  await browser.close();

  return pdf;
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
}

export async function generateInvoicePDF(order: InvoiceOrder): Promise<Uint8Array> {
  // Company details
  const companyName = "Allahabad Organic Agricultural Company Private Limited";
  const companyAddress = "620 G Flr, Ganga Bihar, Anisabad, Phulwari, Patna - 800002, Bihar, India";
  const companyCIN = "U63120BR2025PTC080942";
  const companyPAN = "ABECA4299B";
  const companyGSTIN = "10ABECA4299B1Z4";
  // const companyFSSAI = "100053535653365";
  const companyPhone = "(+91) 8986937875";
  const companyEmail = "hello@aoac.in";

  // Use supplier address if different supplier is selected, otherwise use company address
  const dispatchAddress = order.isDifferentSupplier && order.supplier
    ? `${order.supplier.houseNo}, ${order.supplier.line1}${order.supplier.line2 ? `, ${order.supplier.line2}` : ""}, ${order.supplier.city}, ${order.supplier.district}, ${order.supplier.state} - ${order.supplier.pincode}`
    : companyAddress;

  // Calculate totals for items only (excluding delivery charge)
  let itemsTaxableAmount = 0;
  let itemsTax = 0;
  let subtotal = 0;
  let totalDiscount = 0;

  order.orderItems.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    const itemDiscount = item.discount * item.quantity;
    const taxableAmount = (item.price / (1 + item.tax / 100)) * item.quantity;
    const taxAmount = itemPrice - taxableAmount;
    
    itemsTaxableAmount += taxableAmount;
    itemsTax += taxAmount;
    subtotal += itemPrice;
    totalDiscount += itemDiscount;
  });

  const deliveryCharge = order.shippingAmount || 0;
  // Delivery charge tax (18% GST standard for delivery charges in India)
  const deliveryChargeTax = 18;
  // Calculate delivery charge taxable amount and tax
  const deliveryChargeTaxableAmount = deliveryCharge > 0 ? deliveryCharge / (1 + deliveryChargeTax / 100) : 0;
  const deliveryChargeTaxAmount = deliveryCharge - deliveryChargeTaxableAmount;
  
  // Total taxable amount and tax (items + delivery)
  const totalTaxableAmount = itemsTaxableAmount + deliveryChargeTaxableAmount;
  const totalTax = itemsTax + deliveryChargeTaxAmount;
  
  const grandTotal = subtotal - totalDiscount + deliveryCharge;
  const roundedTotal = order.invoiceAmount || Math.round(grandTotal);
  const roundingOff = order.roundedOffAmount || (roundedTotal - grandTotal);

  // Determine if buyer is business customer
  const isBusinessCustomer = order.user.isBusinessAccount === true;

  // Place of supply:
  // - For business customers: from billing address state
  // - For non-business customers: from shipping/delivery address state
  let placeOfSupply = "N/A";
  if (isBusinessCustomer) {
    placeOfSupply = order.user.billingAddress 
      ? `${order.user.billingAddress.state}${order.user.billingAddress.stateCode ? ` (${order.user.billingAddress.stateCode})` : ""}`
      : "N/A";
  } else {
    // For non-business, use shipping address state
    placeOfSupply = order.shippingAddress
      ? `${order.shippingAddress.state}${order.shippingAddress.stateCode ? ` (${order.shippingAddress.stateCode})` : ""}`
      : "N/A";
  }

  // Buyer details
  const buyerName = order.user.businessName || order.user.name;
  // Include additional trade name if it exists
  const buyerDisplayName = order.user.hasAdditionalTradeName && order.user.additionalTradeName
    ? `${buyerName} (${order.user.additionalTradeName})`
    : buyerName;
  const buyerGST = order.user.gstNumber || "N/A";
  
  // For non-business customers, use shipping address instead of billing address
  let buyerBillingAddress = "N/A";
  if (isBusinessCustomer) {
    // Business customers: use billing address
    buyerBillingAddress = order.user.billingAddress
      ? `${order.user.billingAddress.houseNo}, ${order.user.billingAddress.line1}${order.user.billingAddress.line2 ? `, ${order.user.billingAddress.line2}` : ""}, ${order.user.billingAddress.city}, ${order.user.billingAddress.district}, ${order.user.billingAddress.state} - ${order.user.billingAddress.pincode}`
      : "N/A";
  } else {
    // Non-business customers: use shipping address
    buyerBillingAddress = order.shippingAddress
      ? `${order.shippingAddress.houseNo}, ${order.shippingAddress.line1}${order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}, ${order.shippingAddress.city}, ${order.shippingAddress.district}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
      : "N/A";
  }
  
  const buyerShippingAddress = order.shippingAddress
    ? `${order.shippingAddress.houseNo}, ${order.shippingAddress.line1}${order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}, ${order.shippingAddress.city}, ${order.shippingAddress.district}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
    : "N/A";

  // Determine invoice title based on invoice type
  const invoiceTitle = order.invoiceType === "PI" ? "Proforma Invoice" : "TAX INVOICE";
  
  // Invoice/PI number and date
  const invoiceNumber = order.InvoiceNumber || order.id;
  const invoiceDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const invoiceTypeLabel = order.invoiceType === "PI" ? "PI" : "Invoice";
  
  // Convert rounded total to words
  const amountInWords = numberToWords(Math.round(roundedTotal));

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page {
            margin: 0;
            size: A4;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            padding: 10mm;
            color: #000;
            background: #fff;
            font-size: 9px;
          }
          .header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
            gap: 10px;
          }
          .logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
            flex-shrink: 0;
          }
          .vertical-line {
            width: 1px;
            height: 50px;
            background: #000;
            flex-shrink: 0;
          }
          .header-content {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .company-details-small {
            line-height: 1.3;
            font-size: 8px;
            flex: 1;
          }
          .company-details-small p {
            margin: 1px 0;
            font-size: 8px;
          }
          .invoice-title {
            text-align: right;
            flex-shrink: 0;
          }
          .invoice-title h1 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          .invoice-title p {
            font-size: 8px;
            color: #666;
          }
          .dispatch-section {
            line-height: 1.4;
            margin: 15px 0;
            font-size: 9px;
          }
          .dispatch-section h3 {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .dispatch-section p {
            margin: 2px 0;
            font-size: 9px;
          }
          .dispatch-section {
            line-height: 1.4;
          }
          .dispatch-section h3 {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .dispatch-section p {
            margin: 2px 0;
            font-size: 9px;
          }
          .buyer-section {
            margin: 15px 0;
             border-top: 1px solid #ccc;
            padding-top: 10px;
            font-size: 9px;
          }
          .buyer-section h3 {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .buyer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .buyer-details {
            line-height: 1.4;
          }
          .buyer-details p {
            margin: 2px 0;
            font-size: 9px;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 8px;
          }
          .items-table th,
          .items-table td {
            border: 1px solid #000;
            padding: 4px;
            text-align: left;
          }
          .items-table th {
            background: #f0f0f0;
            font-weight: bold;
            font-size: 8px;
          }
          .items-table td {
            font-size: 8px;
          }
          .summary {
            margin-top: 15px;
            font-size: 9px;
            text-align: right;
          }
          .summary-row {
            margin: 3px 0;
            font-size: 9px;
          }
          .summary-row span {
            display: inline;
          }
          .invoice-info {
            margin: 15px 0;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            font-size: 9px;
            line-height: 1.6;
          }
          .invoice-info p {
            margin: 2px 0;
            font-size: 9px;
          }
          .amount-in-words {
            margin-top: 10px;
            font-size: 9px;
            font-style: italic;
          }
          .summary-total {
            font-weight: bold;
            border-top: 1px solid #000;
            padding-top: 5px;
            margin-top: 5px;
            font-size: 10px;
          }
          .terms-signature-section {
            margin-top: 20px;
            display: flex;
            gap: 20px;
            border-top: 1px solid #ccc;
            padding-top: 15px;
          }
          .terms-section {
            flex: 1;
            font-size: 7px;
            color: #888888;
            line-height: 1.4;
          }
          .terms-section h4 {
            font-size: 8px;
            color: #666666;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .terms-section p {
            margin: 2px 0;
            color: #888888;
          }
          .signature-section {
            flex: 1;
            text-align: center;
          }
          .signature-section h4 {
            font-size: 9px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
          }
          .signature-image {
            width: 6.5cm;
            height: 3cm;
            object-fit: contain;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="logo/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'" />
          <div class="vertical-line"></div>
          <div class="header-content">
            <div class="company-details-small">
              <p><strong>${escapeHtml(companyName)}</strong></p>
              <p>${escapeHtml(companyAddress)}</p>
              <p>CIN : ${escapeHtml(companyCIN)} | PAN : ${escapeHtml(companyPAN)} | GSTIN : ${escapeHtml(companyGSTIN)}</p>
              <p>Phone : ${escapeHtml(companyPhone)} | Email : ${escapeHtml(companyEmail)}</p>
            </div>
            <div class="invoice-title">
              <h1>${escapeHtml(invoiceTitle)}</h1>
              <p>Original for Recipient</p>
            </div>
          </div>
        </div>

        ${order.isDifferentSupplier && order.supplier ? `
        <div class="dispatch-section">
          <h3>Dispatched From</h3>
          <p><strong>${escapeHtml(order.supplier.name)}</strong></p>
          <p>${escapeHtml(dispatchAddress)}</p>
        </div>
        ` : ''}

        <div class="invoice-info">
          <p><strong>${invoiceTypeLabel} No.:</strong> ${escapeHtml(invoiceNumber)} | <strong>Order ID:</strong> ${escapeHtml(order.id)} | <strong>${invoiceTypeLabel} Date:</strong> ${escapeHtml(invoiceDate)} | <strong>${invoiceTypeLabel} Amount:</strong> ₹${roundedTotal.toFixed(2)}</p>
        </div>

        <div class="buyer-section">
          <h3>Billed and Shipped To</h3>
          <div class="buyer-grid">
            <div class="buyer-details">
              <p><strong>Name:</strong> ${escapeHtml(buyerDisplayName)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(order.user.phone)}</p>
              <p><strong>Email:</strong> ${escapeHtml(order.user.email)}</p>
              ${isBusinessCustomer ? `<p><strong>GSTIN:</strong> ${escapeHtml(buyerGST)}</p>` : ''}
              ${isBusinessCustomer ? `
                <p><strong>Billing Address:</strong></p>
                <p>${escapeHtml(buyerBillingAddress)}</p>
              ` : `
                <p>${escapeHtml(buyerBillingAddress)}</p>
              `}
            </div>
            <div class="buyer-details">
              ${isBusinessCustomer ? `
                <p><strong>Delivery Address:</strong></p>
                <p>${escapeHtml(buyerShippingAddress)}</p>
                <p style="margin-top: 8px;"><strong>Place of Supply:</strong> ${escapeHtml(placeOfSupply)}</p>
              ` : `
                <p><strong>Place of Supply:</strong> ${escapeHtml(placeOfSupply)}</p>
              `}
            </div>
          </div>
        </div>

        <div style="margin-top: 15px; margin-bottom: 10px;">
          <h3 style="font-size: 10px; font-weight: bold;">Items List</h3>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Item Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Taxable Amount</th>
              ${(() => {
                // Determine if supplier state code is 10 (Bihar)
                // If no supplier, company is supplier (state code 10)
                const supplierStateCode = order.supplier?.stateCode || "10";
                const isSameState = supplierStateCode === "10";
                
                if (isSameState) {
                  return '<th>SGST %</th><th>CGST %</th>';
                } else {
                  return '<th>IGST %</th>';
                }
              })()}
              <th>Tax Amount</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.orderItems.map((item, index) => {
              const taxableAmount = (item.price / (1 + item.tax / 100)) * item.quantity;
              const taxAmount = (item.price * item.quantity) - taxableAmount;
              const itemTotal = (item.price * item.quantity) - (item.discount * item.quantity);
              
              // Calculate rate as price / (1 + tax/100)
              const rate = item.price / (1 + item.tax / 100);
              
              // Determine if supplier state code is 10
              // If no supplier, company is supplier (state code 10)
              const supplierStateCode = order.supplier?.stateCode || "10";
              const isSameState = supplierStateCode === "10";
              
              // Generate tax columns based on state code
              let taxColumns = '';
              if (isSameState) {
                // Split tax percentage in half for SGST and CGST
                const sgstPercent = (item.tax / 2).toFixed(2);
                const cgstPercent = (item.tax / 2).toFixed(2);
                taxColumns = `<td>${sgstPercent}%</td><td>${cgstPercent}%</td>`;
              } else {
                // Show full tax percentage for IGST
                taxColumns = `<td>${item.tax}%</td>`;
              }
              
              // Convert weight from grams to kg and format product name
              let productDisplayName = escapeHtml(item.productName || `Product ${item.productId}`);
              if (item.weight && item.weight > 0) {
                const weightInKg = (item.weight / 1000).toFixed(2);
                productDisplayName = `${productDisplayName} (${weightInKg} kg)`;
              }
              
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${productDisplayName}</td>
                  <td>${escapeHtml(item.hsnsac || "-")}</td>
                  <td>${item.quantity}</td>
                  <td>₹${rate.toFixed(2)}</td>
                  <td>₹${taxableAmount.toFixed(2)}</td>
                  ${taxColumns}
                  <td>₹${taxAmount.toFixed(2)}</td>
                  <td>₹${(item.discount * item.quantity).toFixed(2)}</td>
                  <td>₹${itemTotal.toFixed(2)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row">
            <span>Total Taxable Amount (Items): ₹${itemsTaxableAmount.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Total Tax (Items): ₹${itemsTax.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Total Discount: ₹${totalDiscount.toFixed(2)}</span>
          </div>
          ${deliveryCharge > 0 ? `
          <div class="summary-row">
            <span>Delivery Charge Taxable Amount: ₹${deliveryChargeTaxableAmount.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Charge Tax: ₹${deliveryChargeTaxAmount.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Charge: ₹${deliveryCharge.toFixed(2)}</span>
          </div>
          ` : ''}
          ${roundingOff !== 0 ? `
          <div class="summary-row">
            <span>Rounding Off: ₹${roundingOff.toFixed(2)}</span>
          </div>
          ` : ''}
          <div class="summary-row summary-total">
            <span>Rounded Total: ₹${roundedTotal.toFixed(2)}</span>
          </div>
          <div class="amount-in-words">
            <p><strong>Total Invoice Amount in Words:</strong> ${escapeHtml(amountInWords)} Rupees Only</p>
          </div>
        </div>

        <div style="margin-top: 15px;"></div>

        <div class="terms-signature-section">
          <div class="terms-section">
            <h4>Terms and Conditions:</h4>
            <p>1. Goods once sold will not be taken back or exchanged.</p>
            <p>2. Interest @ 18% p.a. will be charged if the payment is not made within the agreed time.</p>
            <p>3. Subject to Patna Jurisdiction only.</p>
            <p>4. All disputes are subject to Patna Jurisdiction only.</p>
            <p>5. E. & O.E. (Errors and Omissions Excepted)</p>
            <p>6. Payment should be made as per the terms mentioned in the invoice.</p>
            <p>7. Goods are sold on "as is where is" basis.</p>
            <p>8. The buyer is responsible for verifying the quality and quantity of goods before acceptance.</p>
            <p>9. Any claim for shortage or damage must be reported within 48 hours of delivery.</p>
            <p>10. The seller reserves the right to cancel the order in case of non-payment or breach of terms.</p>
          </div>
          <div class="signature-section">
            <h4>Authorized Signature</h4>
            <img src="img/imp/auth_sign.png" alt="Authorized Signature" class="signature-image" onerror="this.style.display='none'" />
          </div>
        </div>

      </body>
    </html>
  `;

  // Generate PDF using Puppeteer (same method as customer PDF)
  const browser = await launchPdfBrowser();

  const page = await browser.newPage();
  
  // Get base URL for images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  // Replace logo and signature image paths with absolute URLs
  const htmlWithAbsolutePaths = htmlContent
    .replace(
      /src="logo\/logo\.png"/g,
      `src="${baseUrl}/logo/logo.png"`
    )
    .replace(
      /src="img\/imp\/auth_sign\.png"/g,
      `src="${baseUrl}/img/imp/auth_sign.png"`
    );
  
  await page.setContent(htmlWithAbsolutePaths, {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
    }
  });

  await browser.close();

  return pdf;
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function numberToWords(amount: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const crores = Math.floor(amount / 10000000);
  const lakhs = Math.floor((amount % 10000000) / 100000);
  const thousands = Math.floor((amount % 100000) / 1000);
  const hundreds = Math.floor((amount % 1000) / 100);
  const remainder = amount % 100;
  
  let words = '';
  
  if (crores > 0) {
    words += convertHundreds(crores, ones, tens) + ' Crore ';
  }
  if (lakhs > 0) {
    words += convertHundreds(lakhs, ones, tens) + ' Lakh ';
  }
  if (thousands > 0) {
    words += convertHundreds(thousands, ones, tens) + ' Thousand ';
  }
  if (hundreds > 0) {
    words += ones[hundreds] + ' Hundred ';
  }
  if (remainder > 0) {
    words += convertHundreds(remainder, ones, tens);
  }
  
  return words.trim() || 'Zero';
}

function convertHundreds(num: number, ones: string[], tens: string[]): string {
  if (num === 0) return '';
  if (num < 20) return ones[num];
  const ten = Math.floor(num / 10);
  const one = num % 10;
  return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
}


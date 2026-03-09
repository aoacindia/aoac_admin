"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  tax: number;
  discount: number;
  productName?: string;
  weightInGrams?: number | null;
}

interface Address {
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
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string | null;
  gstNumber: string | null;
  isBusinessAccount: boolean | null;
}

interface Order {
  id: string;
  orderBy: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  discountAmount: number | null;
  paidAmount: number | null;
  packed: boolean;
  refund: boolean;
  customOrder: boolean;
  // Payment Details
  r_orderId: string | null;
  r_paymentId: string | null;
  paymentLinkUrl: string | null;
  paymentMethod: string | null;
  paymentVpa: string | null;
  // Shipping Details
  courierId: number | null;
  shippingId: string | null;
  shippingAmount: number | null;
  awsCode: string | null;
  shippingInvoiceNumber: string | null;
  shippingCourierName: string | null;
  estimatedDeliveryDate: string | null;
  pickupScheduled: string | null;
  deliveredAt: string | null;
  // Documentation
  manifestGenerated: boolean | null;
  InvoiceNumber: string | null;
  invoiceType: string | null;
  invoiceSequenceNumber: number | null;
  invoiceOfficeId: string | null;
  // Invoice Amounts
  roundedOffAmount: number | null;
  invoiceAmount: number | null;
  // Refund Details
  refundId: string | null;
  refundReceipt: string | null;
  refundArn: string | null;
  refundCreatedAt: string | null;
  // Supplier Details
  isDifferentSupplier: boolean | null;
  supplierId: string | null;
  // Relations
  user: Customer;
  shippingAddress: Address | null;
  orderItems: OrderItem[];
}

export default function ViewOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [invoiceCopies, setInvoiceCopies] = useState({
    original: true,
    duplicate: false,
    triplicate: false,
  });

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        const orderData = data.data;
        // Order items already include productName and weightInGrams from API
        setOrder(orderData);
      } else {
        setError(data.error || "Order not found");
      }
    } catch (err: any) {
      console.error("Error fetching order:", err);
      setError(err.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  // Format weight: show in kg if >= 1000g, else show in grams
  const formatWeight = (weightInGrams: number | null | undefined): string => {
    if (weightInGrams == null || weightInGrams === undefined) return "—";
    if (weightInGrams >= 1000) {
      return `${(weightInGrams / 1000).toFixed(2)} kg`;
    }
    return `${weightInGrams} g`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "CANCELLED":
      case "REFUNDED":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "SHIPPED":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "PAID":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
      default:
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error: {error || "Order not found"}
          </p>
          <Link
            href="/dashboard/orders"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  let subtotal = 0;
  let totalDiscount = 0;
  order.orderItems.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalDiscount += item.discount * item.quantity;
  });
  const deliveryCharge = order.shippingAmount || 0;
  const grandTotal = subtotal - totalDiscount + deliveryCharge;
  const roundedTotal = order.invoiceAmount || Math.round(grandTotal);
  const roundingOff = order.roundedOffAmount || (roundedTotal - grandTotal);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/dashboard/orders"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Order Details
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Order ID: {order.id}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowDownloadPopup(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Download Invoice PDF
          </Button>
          <Link
            href={`/dashboard/orders/${orderId}/edit`}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
          >
            Edit Order
          </Link>
        </div>
      </div>

      {/* Order Information */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Order Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Order ID
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.id}</p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Invoice Number
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.InvoiceNumber || "N/A"}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Invoice Type
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.invoiceType || "N/A"}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Order Date
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Status
            </Label>
            <span
              className={`inline-block px-3 py-1 text-sm rounded ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Payment Method
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.paymentMethod || "N/A"}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Packed
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.packed ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Refund
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.refund ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Custom Order
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.customOrder ? "Yes" : "No"}
            </p>
          </div>
          {order.paidAmount !== null && order.paidAmount !== undefined && (
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Paid Amount
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                ₹{order.paidAmount.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details */}
      {(order.r_orderId || order.r_paymentId || order.paymentLinkUrl || order.paymentVpa) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Payment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.r_orderId && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Razorpay Order ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.r_orderId}</p>
              </div>
            )}
            {order.r_paymentId && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Razorpay Payment ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.r_paymentId}</p>
              </div>
            )}
            {order.paymentLinkUrl && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Payment Link URL
                </Label>
                <a
                  href={order.paymentLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {order.paymentLinkUrl}
                </a>
              </div>
            )}
            {order.paymentVpa && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Payment VPA
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.paymentVpa}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Information */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Name
            </Label>
            <Link
              href={`/dashboard/customers/${order.user.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {order.user.name}
            </Link>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Email
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.user.email}</p>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Phone
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.user.phone}</p>
          </div>
          {order.user.businessName && (
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Business Name
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                {order.user.businessName}
              </p>
            </div>
          )}
          {order.user.gstNumber && (
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                GST Number
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                {order.user.gstNumber}
              </p>
            </div>
          )}
          <div>
            <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Account Type
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              {order.user.isBusinessAccount ? "Business" : "Personal"}
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Shipping Address
          </h2>
          <div className="space-y-2">
            <p className="text-zinc-900 dark:text-zinc-100">
              <strong>{order.shippingAddress.name}</strong> - {order.shippingAddress.phone}
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {order.shippingAddress.houseNo}, {order.shippingAddress.line1}
            </p>
            {order.shippingAddress.line2 && (
              <p className="text-zinc-900 dark:text-zinc-100">{order.shippingAddress.line2}</p>
            )}
            <p className="text-zinc-900 dark:text-zinc-100">
              {order.shippingAddress.city}, {order.shippingAddress.district}, {order.shippingAddress.state}
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {order.shippingAddress.country} - {order.shippingAddress.pincode}
            </p>
          </div>
        </div>
      )}

      {/* Shipping Information */}
      {(order.shippingCourierName || order.courierId || order.shippingId || order.awsCode || 
        order.shippingInvoiceNumber || order.estimatedDeliveryDate || order.pickupScheduled || 
        order.deliveredAt || order.manifestGenerated) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.shippingCourierName && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Courier Name
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {order.shippingCourierName}
                </p>
              </div>
            )}
            {order.courierId !== null && order.courierId !== undefined && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Courier ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.courierId}</p>
              </div>
            )}
            {order.shippingId && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Shipping ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.shippingId}</p>
              </div>
            )}
            {order.awsCode && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  AWS Code
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.awsCode}</p>
              </div>
            )}
            {order.shippingInvoiceNumber && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Shipping Invoice Number
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {order.shippingInvoiceNumber}
                </p>
              </div>
            )}
            {order.estimatedDeliveryDate && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Estimated Delivery Date
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {order.estimatedDeliveryDate}
                </p>
              </div>
            )}
            {order.pickupScheduled && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Pickup Scheduled
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {new Date(order.pickupScheduled).toLocaleString()}
                </p>
              </div>
            )}
            {order.deliveredAt && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Delivered At
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {new Date(order.deliveredAt).toLocaleString()}
                </p>
              </div>
            )}
            {order.manifestGenerated !== null && order.manifestGenerated !== undefined && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Manifest Generated
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {order.manifestGenerated ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Refund Information */}
      {(order.refundId || order.refundReceipt || order.refundArn || order.refundCreatedAt) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Refund Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.refundId && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Refund ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.refundId}</p>
              </div>
            )}
            {order.refundReceipt && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Refund Receipt
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.refundReceipt}</p>
              </div>
            )}
            {order.refundArn && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Refund ARN
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.refundArn}</p>
              </div>
            )}
            {order.refundCreatedAt && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Refund Created At
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {new Date(order.refundCreatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Supplier Information */}
      {order.isDifferentSupplier && order.supplierId && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Supplier Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Different Supplier
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium">Yes</p>
            </div>
            {order.supplierId && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Supplier ID
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{order.supplierId}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Order Items ({order.orderItems.length})
        </h2>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-zinc-200 dark:border-zinc-700">
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Product
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Quantity
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Price (per unit)
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Weight
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Tax (%)
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Discount (per item)
                </TableHead>
                <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Line Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => {
                // price from API is already discounted per unit; original price = price + discount
                const originalPricePerUnit = item.price + item.discount;
                const itemTotal = item.price * item.quantity;
                const itemDiscount = item.discount * item.quantity;
                const lineTotal = itemTotal - itemDiscount;
                return (
                  <TableRow
                    key={item.id}
                    className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {item.productName || "Unknown Product"}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Product ID: {item.productId}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      ₹{originalPricePerUnit.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {formatWeight(item.weightInGrams)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {item.tax}%
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      ₹{item.discount.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        ₹{lineTotal.toFixed(2)}
                      </div>
                      {itemDiscount > 0 && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Discount: ₹{itemDiscount.toFixed(2)}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Order Summary
        </h2>
        <div className="space-y-2 max-w-md">
          <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
              <span>Total Discount:</span>
              <span className="text-red-600">-₹{totalDiscount.toFixed(2)}</span>
            </div>
          )}
          {deliveryCharge > 0 && (
            <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
              <span>Delivery Charge:</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
            <div className="flex justify-between text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          {roundingOff !== 0 && (
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
              <span>Rounding Off:</span>
              <span>
                {roundingOff > 0 ? "+" : ""}₹{roundingOff.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
            <div className="flex justify-between text-xl font-bold text-zinc-900 dark:text-zinc-100">
              <span>Rounded Total:</span>
              <span>₹{roundedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download PDF Popup */}
      {showDownloadPopup && (
        <Modal
          title="Download Invoice"
          disableClose={downloading}
          onClose={() => setShowDownloadPopup(false)}
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Click the button below to download the invoice PDF for this order.
          </p>
          <div className="space-y-2 mb-6">
            <Label className="text-sm text-zinc-700 dark:text-zinc-300">
              Select invoice copies to include
            </Label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={invoiceCopies.original}
                  onChange={(event) =>
                    setInvoiceCopies((prev) => ({
                      ...prev,
                      original: event.target.checked,
                    }))
                  }
                />
                Original for Recipient
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={invoiceCopies.duplicate}
                  onChange={(event) =>
                    setInvoiceCopies((prev) => ({
                      ...prev,
                      duplicate: event.target.checked,
                    }))
                  }
                />
                Duplicate for Transport/Courier
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={invoiceCopies.triplicate}
                  onChange={(event) =>
                    setInvoiceCopies((prev) => ({
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
              onClick={async () => {
                setDownloading(true);
                try {
                  const selectedCopies = Object.entries(invoiceCopies)
                    .filter(([, checked]) => checked)
                    .map(([key]) => key);
                  const response = await fetch(`/api/orders/${orderId}/download-invoice`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      copies: selectedCopies.length ? selectedCopies : ["original"],
                    }),
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Failed to generate PDF");
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `invoice-${order.InvoiceNumber || orderId}-${Date.now()}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);

                  setShowDownloadPopup(false);
                } catch (error: any) {
                  alert("Error downloading invoice: " + error.message);
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? "Generating PDF..." : "Download Invoice"}
            </Button>
            <Button
              onClick={() => setShowDownloadPopup(false)}
              disabled={downloading}
              className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}



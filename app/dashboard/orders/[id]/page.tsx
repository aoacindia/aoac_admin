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
  InvoiceNumber: string | null;
  invoiceType: string | null;
  orderDate: string;
  status: string;
  totalAmount: number;
  discountAmount: number | null;
  shippingAmount: number | null;
  invoiceAmount: number | null;
  roundedOffAmount: number | null;
  paymentMethod: string | null;
  shippingCourierName: string | null;
  deliveryCharge: number | null;
  deliveryPartner: string | null;
  deliveryPartnerName: string | null;
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
        
        // Fetch product names for order items
        const itemsWithProducts = await Promise.all(
          orderData.orderItems.map(async (item: OrderItem) => {
            try {
              const productResponse = await fetch(`/api/products/${item.productId}`);
              const productData = await productResponse.json();
              return {
                ...item,
                productName: productData.success ? productData.data.name : "Unknown Product",
              };
            } catch (err) {
              return {
                ...item,
                productName: "Unknown Product",
              };
            }
          })
        );

        setOrder({
          ...orderData,
          orderItems: itemsWithProducts,
        });
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
        </div>
      </div>

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

      {/* Delivery Information */}
      {(order.deliveryPartner || order.shippingCourierName) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.deliveryPartner && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Delivery Partner
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {order.deliveryPartner === "OTHER"
                    ? order.deliveryPartnerName || "Other"
                    : order.deliveryPartner}
                </p>
              </div>
            )}
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
                      ₹{item.price.toFixed(2)}
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

          <div className="flex gap-4">
            <Button
              onClick={async () => {
                setDownloading(true);
                try {
                  const response = await fetch(`/api/orders/${orderId}/download-invoice`, {
                    method: "POST",
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



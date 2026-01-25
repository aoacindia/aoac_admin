"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  discount: number;
}

interface Address {
  id: string;
  name: string;
  houseNo: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  gstNumber?: string;
}

interface Order {
  id: string;
  InvoiceNumber: string | null;
  invoiceType: string | null;
  orderDate: string;
  status: string;
  totalAmount: number;
  discountAmount: number | null;
  invoiceAmount: number | null;
  roundedOffAmount: number | null;
  shippingAmount: number | null;
  shippingCourierName: string | null;
  user: Customer;
  shippingAddress: Address | null;
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterStatus) params.append("status", filterStatus);

      const url = params.toString() 
        ? `/api/orders?${params.toString()}`
        : "/api/orders";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error || "Failed to fetch orders");
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchOrders();
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("");
    setTimeout(() => {
      fetchOrders();
    }, 100);
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
          <p className="text-zinc-600 dark:text-zinc-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              All Orders
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Manage and edit all orders
            </p>
          </div>
          <Link
            href="/dashboard/orders/create"
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Create New Order
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Search
            </Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by order ID, invoice number, customer name, email..."
                className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </Button>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Status
            </Label>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
            </Select>
          </div>
        </div>

        {(searchTerm || filterStatus) && (
          <div className="mt-4">
            <Button
              onClick={handleReset}
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Orders ({orders.length})
        </h2>
        {orders.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-zinc-200 dark:border-zinc-700">
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Order ID
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Invoice
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Customer
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Date
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Status
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Items
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Amount
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {order.id}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {order.InvoiceNumber ? (
                        <>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {order.InvoiceNumber}
                          </div>
                          {order.invoiceType && (
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {order.invoiceType}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-zinc-400">No Invoice</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {order.user.name}
                      </div>
                      {order.user.businessName && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {order.user.businessName}
                        </div>
                      )}
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {order.orderItems.length} item(s)
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        ₹{order.invoiceAmount?.toFixed(2) || order.totalAmount.toFixed(2)}
                      </div>
                      {order.discountAmount && order.discountAmount > 0 && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Discount: ₹{order.discountAmount.toFixed(2)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                          className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => router.push(`/dashboard/orders/${order.id}/edit`)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            setShowDownloadPopup(true);
                          }}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Download PDF
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Download PDF Popup */}
      {showDownloadPopup && (
        <Modal
          title="Download Invoice"
          disableClose={downloading}
          onClose={() => {
            setShowDownloadPopup(false);
            setSelectedOrderId(null);
          }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Click the button below to download the invoice PDF for this order.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={async () => {
                if (!selectedOrderId) return;

                setDownloading(true);
                try {
                  const response = await fetch(`/api/orders/${selectedOrderId}/download-invoice`, {
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
                  a.download = `invoice-${selectedOrderId}-${Date.now()}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);

                  setShowDownloadPopup(false);
                  setSelectedOrderId(null);
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
              onClick={() => {
                setShowDownloadPopup(false);
                setSelectedOrderId(null);
              }}
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



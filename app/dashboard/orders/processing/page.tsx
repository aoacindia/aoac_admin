"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  orderBy: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  discountAmount: number | null;
  paidAmount: number | null;
  packed: boolean;
  refund: boolean;
  customOrder: boolean;
  paymentMethod: string | null;
  shippingAmount: number | null;
  InvoiceNumber: string | null;
  invoiceType: string | null;
  invoiceAmount: number | null;
  user: Customer;
  shippingAddress: Address | null;
  orderItems: OrderItem[];
}

type TabType = "business" | "personal";

const PROCESSING_STATUSES = ["PENDING", "PAYMENT_PENDING", "PAID"] as const;

export default function ProcessingOrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("business");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
      case "ORDER_SHIPPED_WITHOUT_PAYMENT":
        return "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200";
      case "PAYMENT_PENDING":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
      default:
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    }
  };

  const fetchOrders = async (tabType: TabType, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("orderType", tabType);
      params.append("page", page.toString());
      params.append("limit", "10");
      if (searchTerm) params.append("search", searchTerm);

      if (filterStatus) {
        params.append("status", filterStatus);
      } else {
        params.append("statuses", PROCESSING_STATUSES.join(","));
      }

      const url = `/api/orders?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.meta?.totalPages || 1);
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

  useEffect(() => {
    fetchOrders(activeTab, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentPage, filterStatus]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders(activeTab, 1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("");
    setCurrentPage(1);
    setTimeout(() => fetchOrders(activeTab, 1), 100);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setFilterStatus("");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Processing Orders
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              PENDING, PAYMENT_PENDING, and PAID orders.
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="mt-4 md:mt-0 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors inline-block"
          >
            Back to All Orders
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="flex border-b border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => handleTabChange("business")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "business"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Business Orders
          </button>
          <button
            onClick={() => handleTabChange("personal")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "personal"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Personal Orders
          </button>
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
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All (processing)</option>
              <option value="PENDING">Pending</option>
              <option value="PAYMENT_PENDING">Payment Pending</option>
              <option value="PAID">Paid</option>
              <option value="ORDER_SHIPPED_WITHOUT_PAYMENT">Shipped (no payment)</option>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {activeTab === "business" && "Business Orders"}
            {activeTab === "personal" && "Personal Orders"}
          </h2>
          {loading && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading...</p>
          )}
        </div>

        {loading && orders.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-zinc-600 dark:text-zinc-400">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No orders found.</p>
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
                      <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(order.status)}`}>
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {orders.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


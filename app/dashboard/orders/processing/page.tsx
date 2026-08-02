"use client";

import { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/Modal";
import OrderActionsModal from "@/app/components/OrderActionsModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

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
  r_orderId: string | null;
  r_paymentId: string | null;
  paymentLinkUrl: string | null;
  paymentMethod: string | null;
  paymentVpa: string | null;
  courierId: number | null;
  shippingId: string | null;
  shippingAmount: number | null;
  awsCode: string | null;
  shippingInvoiceNumber: string | null;
  shippingCourierName: string | null;
  estimatedDeliveryDate: string | null;
  pickupScheduled: string | null;
  deliveredAt: string | null;
  manifestGenerated: boolean | null;
  InvoiceNumber: string | null;
  invoiceType: string | null;
  invoiceSequenceNumber: number | null;
  invoiceOfficeId: string | null;
  roundedOffAmount: number | null;
  invoiceAmount: number | null;
  refundId: string | null;
  refundReceipt: string | null;
  refundArn: string | null;
  refundCreatedAt: string | null;
  isDifferentSupplier: boolean | null;
  supplierId: string | null;
  user: Customer;
  shippingAddress: Address | null;
  orderItems: OrderItem[];
}

const PROCESSING_STATUSES = ["PAYMENT_PENDING", "PAID"] as const;

const ORDER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "PAYMENT_PENDING", label: "Payment Pending" },
  { value: "PAID", label: "Paid" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  {
    value: "ORDER_SHIPPED_WITHOUT_PAYMENT",
    label: "Shipped (no payment)",
  },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

export default function ProcessingOrdersPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadItemsOnly, setDownloadItemsOnly] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [invoiceCopies, setInvoiceCopies] = useState({
    original: true,
    duplicate: false,
    triplicate: false,
  });
  const [showSendPIPopup, setShowSendPIPopup] = useState(false);
  const [selectedOrderForPI, setSelectedOrderForPI] = useState<Order | null>(null);
  const [emailAccounts, setEmailAccounts] = useState<Array<{ id: string; fromEmail: string }>>([]);
  const [selectedEmailAccountId, setSelectedEmailAccountId] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [sendingPI, setSendingPI] = useState(false);
  const [showStatusEditModal, setShowStatusEditModal] = useState(false);
  const [orderForStatusEdit, setOrderForStatusEdit] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusEditAwsCode, setStatusEditAwsCode] = useState("");
  const [statusEditDeliveryPartner, setStatusEditDeliveryPartner] = useState("");
  const [statusEditDeliveryPartnerName, setStatusEditDeliveryPartnerName] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showInvoiceEditModal, setShowInvoiceEditModal] = useState(false);
  const [orderForInvoiceEdit, setOrderForInvoiceEdit] = useState<Order | null>(null);
  const [newInvoiceNumber, setNewInvoiceNumber] = useState("");
  const [updatingInvoiceNumber, setUpdatingInvoiceNumber] = useState(false);
  const [showActionsPopup, setShowActionsPopup] = useState(false);
  const [selectedOrderForActions, setSelectedOrderForActions] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterStatus]);

  useEffect(() => {
    if (showSendPIPopup) {
      fetchEmailAccounts();
      if (selectedOrderForPI) {
        setRecipientEmail(selectedOrderForPI.user.email);
      }
    }
  }, [showSendPIPopup, selectedOrderForPI]);

  const fetchEmailAccounts = async () => {
    try {
      const response = await fetch("/api/emails?isActive=true");
      const data = await response.json();
      if (data.success) {
        setEmailAccounts(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching email accounts:", err);
    }
  };

  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (searchTerm) params.append("search", searchTerm);

      if (filterStatus && (PROCESSING_STATUSES as readonly string[]).includes(filterStatus)) {
        params.append("status", filterStatus);
      } else {
        params.append("statuses", PROCESSING_STATUSES.join(","));
      }

      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalOrders(data.meta?.total || 0);
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
    setCurrentPage(1);
    fetchOrders(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("");
    setCurrentPage(1);
    setTimeout(() => fetchOrders(1), 100);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
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
      case "ORDER_SHIPPED_WITHOUT_PAYMENT":
        return "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200";
      case "PAID":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
      case "PAYMENT_PENDING":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
      default:
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    }
  };

  const isShippedStatus = (status: string) =>
    status === "SHIPPED" || status === "ORDER_SHIPPED_WITHOUT_PAYMENT";

  const parseDeliveryPartnerFromCourier = (courierName: string | null) => {
    if (!courierName) return { partner: "", partnerName: "" };
    if (courierName === "BLUE_DART") return { partner: "BLUE_DART", partnerName: "" };
    if (courierName === "DELHIVERY") return { partner: "DELHIVERY", partnerName: "" };
    return { partner: "OTHER", partnerName: courierName };
  };

  const resetStatusEditForm = () => {
    setShowStatusEditModal(false);
    setOrderForStatusEdit(null);
    setNewStatus("");
    setStatusEditAwsCode("");
    setStatusEditDeliveryPartner("");
    setStatusEditDeliveryPartnerName("");
  };

  const openStatusEdit = (order: Order) => {
    setOrderForStatusEdit(order);
    setNewStatus(order.status);
    setStatusEditAwsCode(order.awsCode || "");
    const { partner, partnerName } = parseDeliveryPartnerFromCourier(
      order.shippingCourierName
    );
    setStatusEditDeliveryPartner(partner);
    setStatusEditDeliveryPartnerName(partnerName);
    setShowStatusEditModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!orderForStatusEdit || !newStatus) return;

    if (isShippedStatus(newStatus)) {
      if (!statusEditDeliveryPartner) {
        alert("Please select a shipping courier");
        return;
      }
      if (
        statusEditDeliveryPartner === "OTHER" &&
        !statusEditDeliveryPartnerName.trim()
      ) {
        alert("Please enter the shipping courier name");
        return;
      }
      if (!statusEditAwsCode.trim()) {
        alert("Please enter the AWB code");
        return;
      }
    }

    setUpdatingStatus(true);
    try {
      const payload: Record<string, string | null> = { status: newStatus };
      if (isShippedStatus(newStatus)) {
        payload.awsCode = statusEditAwsCode.trim();
        payload.deliveryPartner = statusEditDeliveryPartner;
        payload.deliveryPartnerName =
          statusEditDeliveryPartner === "OTHER"
            ? statusEditDeliveryPartnerName.trim()
            : null;
      }

      const response = await fetch(`/api/orders/${orderForStatusEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to update status");
      }

      resetStatusEditForm();
      fetchOrders(currentPage);
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const resetInvoiceEditForm = () => {
    setShowInvoiceEditModal(false);
    setOrderForInvoiceEdit(null);
    setNewInvoiceNumber("");
  };

  const openInvoiceEdit = (order: Order) => {
    if (!isAdmin) return;
    setOrderForInvoiceEdit(order);
    setNewInvoiceNumber(order.InvoiceNumber || "");
    setShowInvoiceEditModal(true);
  };

  const handleUpdateInvoiceNumber = async () => {
    if (!isAdmin || !orderForInvoiceEdit) return;
    const trimmed = newInvoiceNumber.trim();
    if (!trimmed) {
      alert("Please enter an invoice number");
      return;
    }
    if (trimmed === (orderForInvoiceEdit.InvoiceNumber || "")) {
      resetInvoiceEditForm();
      return;
    }

    setUpdatingInvoiceNumber(true);
    try {
      const response = await fetch(`/api/orders/${orderForInvoiceEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ InvoiceNumber: trimmed }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to update invoice number");
      }

      resetInvoiceEditForm();
      fetchOrders(currentPage);
    } catch (err: any) {
      alert("Error updating invoice number: " + err.message);
    } finally {
      setUpdatingInvoiceNumber(false);
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    const roundedAmount = order.invoiceAmount ?? order.totalAmount ?? 0;
    const details = [
      `Order ID: ${order.id}`,
      `Rounded Amount: ₹${roundedAmount.toFixed(2)}`,
      `Buyer: ${order.user.name}`,
      order.user.businessName ? `Business Name: ${order.user.businessName}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const confirmed = window.confirm(
      `Are you sure you want to delete this order?\n\n${details}`
    );
    if (!confirmed) return;

    setDeletingOrderId(order.id);
    try {
      const response = await fetch(`/api/orders/${order.id}`, { method: "DELETE" });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to delete order");
      }
      fetchOrders(currentPage);
    } catch (err: any) {
      alert("Error deleting order: " + err.message);
    } finally {
      setDeletingOrderId(null);
    }
  };

  const statusFilterLabel = useMemo(() => {
    if (filterStatus === "PAYMENT_PENDING") return "Payment Pending";
    if (filterStatus === "PAID") return "Paid";
    return "Payment Pending & Paid";
  }, [filterStatus]);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Processing Orders
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              PAYMENT_PENDING and PAID orders only.
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="mt-4 md:mt-0 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors inline-block text-center"
          >
            Back to All Orders
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
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All (processing)</option>
              <option value="PAYMENT_PENDING">Payment Pending</option>
              <option value="PAID">Paid</option>
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

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {statusFilterLabel}
            {totalOrders > 0 && ` (${totalOrders})`}
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
                        <div className="flex items-start gap-1.5">
                          <div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                              {order.InvoiceNumber}
                            </div>
                            {order.invoiceType && (
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {order.invoiceType}
                              </div>
                            )}
                          </div>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => openInvoiceEdit(order)}
                              className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mt-0.5"
                              title="Change invoice number"
                              aria-label="Change invoice number"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-400">No Invoice</span>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => openInvoiceEdit(order)}
                              className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                              title="Set invoice number"
                              aria-label="Set invoice number"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
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
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => openStatusEdit(order)}
                          className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                          title="Change status"
                          aria-label="Change order status"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
                      <Button
                        onClick={() => {
                          setSelectedOrderForActions(order);
                          setShowActionsPopup(true);
                        }}
                        className="px-3 py-1 text-sm bg-zinc-700 text-white rounded hover:bg-zinc-800 transition-colors"
                      >
                        Actions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {orders.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Page {currentPage} of {totalPages} ({totalOrders} total orders)
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

      {showActionsPopup && selectedOrderForActions && (
        <OrderActionsModal
          order={selectedOrderForActions}
          onClose={() => {
            setShowActionsPopup(false);
            setSelectedOrderForActions(null);
          }}
          onDownloadPdf={() => {
            setSelectedOrderId(selectedOrderForActions.id);
            setShowDownloadPopup(true);
          }}
          onSendPi={() => {
            setSelectedOrderForPI(selectedOrderForActions);
            setShowSendPIPopup(true);
            setSelectedEmailAccountId("");
          }}
          onDelete={() => handleDeleteOrder(selectedOrderForActions)}
          deleting={deletingOrderId === selectedOrderForActions.id}
          onPaymentLinkGenerated={(paymentLink) => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === selectedOrderForActions.id
                  ? { ...o, paymentLinkUrl: paymentLink }
                  : o
              )
            );
            setSelectedOrderForActions((prev) =>
              prev ? { ...prev, paymentLinkUrl: paymentLink } : prev
            );
          }}
        />
      )}

      {showDownloadPopup && (
        <Modal
          title="Download Invoice"
          disableClose={downloading}
          onClose={() => {
            setShowDownloadPopup(false);
            setSelectedOrderId(null);
            setDownloadItemsOnly(false);
          }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Click the button below to download the invoice PDF for this order.
          </p>
          <div className="space-y-2 mb-6">
            <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={downloadItemsOnly}
                onChange={(event) => setDownloadItemsOnly(event.target.checked)}
              />
              Download items PDF (Order ID + Invoice No + item list only)
            </label>
          </div>
          <div className="space-y-2 mb-6">
            <Label className="text-sm text-zinc-700 dark:text-zinc-300">
              Select invoice copies to include
            </Label>
            <div
              className={`flex flex-col gap-2 ${downloadItemsOnly ? "opacity-50 pointer-events-none" : ""}`}
            >
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
                if (!selectedOrderId) return;
                setDownloading(true);
                try {
                  const selectedCopies = Object.entries(invoiceCopies)
                    .filter(([, checked]) => checked)
                    .map(([key]) => key);
                  const response = await fetch(
                    `/api/orders/${selectedOrderId}/download-invoice`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        copies: selectedCopies.length ? selectedCopies : ["original"],
                        downloadItemsOnly,
                      }),
                    }
                  );

                  if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || "Failed to generate PDF");
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${downloadItemsOnly ? "order-items" : "invoice"}-${selectedOrderId}-${Date.now()}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);

                  setShowDownloadPopup(false);
                  setSelectedOrderId(null);
                  setDownloadItemsOnly(false);
                } catch (err: any) {
                  alert("Error downloading invoice: " + err.message);
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading
                ? "Generating PDF..."
                : downloadItemsOnly
                  ? "Download Items PDF"
                  : "Download Invoice"}
            </Button>
            <Button
              onClick={() => {
                setShowDownloadPopup(false);
                setSelectedOrderId(null);
                setDownloadItemsOnly(false);
              }}
              disabled={downloading}
              className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}

      {showSendPIPopup && selectedOrderForPI && (
        <Modal
          title="Send Proforma Invoice"
          disableClose={sendingPI}
          onClose={() => {
            setShowSendPIPopup(false);
            setSelectedOrderForPI(null);
            setSelectedEmailAccountId("");
            setRecipientEmail("");
          }}
        >
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Select Email Account
              </Label>
              <Select
                value={selectedEmailAccountId}
                onChange={(e) => setSelectedEmailAccountId(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={sendingPI}
              >
                <option value="">hello@aoac.in (Default)</option>
                {emailAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.fromEmail}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Recipient Email
              </Label>
              <Input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Enter recipient email address"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={sendingPI}
              />
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <strong>Order Details:</strong>
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Order ID: {selectedOrderForPI.id}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                PI Number: {selectedOrderForPI.InvoiceNumber || "N/A"}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Customer: {selectedOrderForPI.user.name}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={async () => {
                  if (!recipientEmail) {
                    alert("Please enter recipient email address");
                    return;
                  }
                  setSendingPI(true);
                  try {
                    const response = await fetch(
                      `/api/orders/${selectedOrderForPI.id}/send-pi`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          emailAccountId: selectedEmailAccountId || "hello@aoac.in",
                          recipientEmail,
                        }),
                      }
                    );
                    const data = await response.json();
                    if (!response.ok) {
                      throw new Error(data.error || "Failed to send PI email");
                    }
                    alert("PI email sent successfully!");
                    setShowSendPIPopup(false);
                    setSelectedOrderForPI(null);
                    setSelectedEmailAccountId("");
                    setRecipientEmail("");
                  } catch (err: any) {
                    alert("Error sending PI email: " + err.message);
                  } finally {
                    setSendingPI(false);
                  }
                }}
                disabled={sendingPI || !recipientEmail}
                className="flex-1 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingPI ? "Sending..." : "Send Email"}
              </Button>
              <Button
                onClick={() => {
                  setShowSendPIPopup(false);
                  setSelectedOrderForPI(null);
                  setSelectedEmailAccountId("");
                  setRecipientEmail("");
                }}
                disabled={sendingPI}
                className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showStatusEditModal && orderForStatusEdit && (
        <Modal
          title="Change Order Status"
          disableClose={updatingStatus}
          onClose={resetStatusEditForm}
        >
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Order <strong>{orderForStatusEdit.id}</strong> — Current status:{" "}
              <span
                className={`inline-block px-2 py-0.5 text-xs rounded ${getStatusColor(orderForStatusEdit.status)}`}
              >
                {orderForStatusEdit.status}
              </span>
            </p>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                New status
              </Label>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={updatingStatus}
              >
                {ORDER_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
            {isShippedStatus(newStatus) && (
              <>
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Shipping Courier <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={statusEditDeliveryPartner}
                    onChange={(e) => {
                      setStatusEditDeliveryPartner(e.target.value);
                      if (e.target.value !== "OTHER") {
                        setStatusEditDeliveryPartnerName("");
                      }
                    }}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={updatingStatus}
                  >
                    <option value="">Select delivery partner</option>
                    <option value="BLUE_DART">Blue Dart</option>
                    <option value="DELHIVERY">Delhivery</option>
                    <option value="OTHER">Other</option>
                  </Select>
                </div>
                {statusEditDeliveryPartner === "OTHER" && (
                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Courier Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={statusEditDeliveryPartnerName}
                      onChange={(e) => setStatusEditDeliveryPartnerName(e.target.value)}
                      placeholder="Enter courier name"
                      disabled={updatingStatus}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    AWB Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={statusEditAwsCode}
                    onChange={(e) => setStatusEditAwsCode(e.target.value)}
                    placeholder="Enter AWB / tracking code"
                    disabled={updatingStatus}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
            <div className="flex gap-3 justify-end pt-2">
              <Button
                onClick={resetStatusEditForm}
                disabled={updatingStatus}
                className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateStatus}
                disabled={
                  updatingStatus ||
                  (!isShippedStatus(newStatus) &&
                    newStatus === orderForStatusEdit.status)
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingStatus ? "Updating..." : "Submit"}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isAdmin && showInvoiceEditModal && orderForInvoiceEdit && (
        <Modal
          title="Change Invoice Number"
          disableClose={updatingInvoiceNumber}
          onClose={resetInvoiceEditForm}
        >
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Order <strong>{orderForInvoiceEdit.id}</strong> — Current invoice:{" "}
              <strong>{orderForInvoiceEdit.InvoiceNumber || "None"}</strong>
            </p>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Invoice Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={newInvoiceNumber}
                onChange={(e) => setNewInvoiceNumber(e.target.value)}
                placeholder="Enter invoice number"
                disabled={updatingInvoiceNumber}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button
                onClick={resetInvoiceEditForm}
                disabled={updatingInvoiceNumber}
                className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateInvoiceNumber}
                disabled={
                  updatingInvoiceNumber ||
                  !newInvoiceNumber.trim() ||
                  newInvoiceNumber.trim() === (orderForInvoiceEdit.InvoiceNumber || "")
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingInvoiceNumber ? "Updating..." : "Submit"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SuspensionReason {
  id: string;
  reason: string;
  suspendedAt: string;
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
  createdAt: string;
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
  country: string;
  pincode: string;
}

interface Order {
  id: string;
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
  pickupScheduled: string | null;
  deliveredAt: string | null;
  manifestGenerated: boolean | null;
  InvoiceNumber: string | null;
  refundId: string | null;
  refundReceipt: string | null;
  refundArn: string | null;
  refundCreatedAt: string | null;
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
  createdAt: string;
  updatedAt: string;
  suspensionReasons: SuspensionReason[];
  billingAddress: BillingAddress | null;
  addresses: Address[];
  order: Order[];
}

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const availableSections = [
    { id: 'customerInfo', label: 'Customer Information' },
    { id: 'businessInfo', label: 'Business Information' },
    { id: 'billingAddress', label: 'Billing Address' },
    { id: 'suspensionHistory', label: 'Suspension History' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'orders', label: 'Orders' },
  ];

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/customers/${id}`);
      const data = await response.json();

      if (data.success) {
        setCustomer(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error: {error || "Customer not found"}
          </p>
          <Link
            href="/dashboard/customers"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customers"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            ← Back to Customers
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Customer Details
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Complete information about {customer.isBusinessAccount && customer.businessName ? customer.businessName : customer.name}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowDownloadPopup(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-center"
          >
            Download Data
          </Button>
          <Link
            href={`/dashboard/customers/${id}/edit`}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
          >
            Edit Customer
          </Link>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Customer Name
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.name}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Email
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.email}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Phone
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.phone}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Customer ID
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.id}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Account Type
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.isBusinessAccount ? (
                <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
                  Business
                </span>
              ) : (
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  Personal
                </span>
              )}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Status
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {customer.terminated ? (
                <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                  Terminated
                </span>
              ) : customer.suspended ? (
                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                  Suspended ({customer.suspended_number} time(s))
                </span>
              ) : (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                  Active
                </span>
              )}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Created At
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {new Date(customer.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Last Updated
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {new Date(customer.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      {customer.isBusinessAccount && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Business Name
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
                {customer.businessName || "N/A"}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                GST Number
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
                {customer.gstNumber || "N/A"}
              </p>
            </div>
            {customer.hasAdditionalTradeName && (
              <div>
                <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Additional Trade Name
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
                  {customer.additionalTradeName || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Billing Address */}
      {customer.isBusinessAccount && customer.billingAddress && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Billing Address
          </h2>
          <div className="text-zinc-900 dark:text-zinc-100">
            <p className="mb-2">
              {customer.billingAddress.houseNo}, {customer.billingAddress.line1}
            </p>
            {customer.billingAddress.line2 && (
              <p className="mb-2">{customer.billingAddress.line2}</p>
            )}
            <p className="mb-2">
              {customer.billingAddress.city}, {customer.billingAddress.district}, {customer.billingAddress.state}
            </p>
            <p className="mb-2">
              {customer.billingAddress.country} - {customer.billingAddress.pincode}
            </p>
          </div>
        </div>
      )}

      {/* Suspension Reasons */}
      {customer.suspensionReasons.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Suspension History ({customer.suspensionReasons.length})
          </h2>
          <div className="space-y-4">
            {customer.suspensionReasons.map((reason, index) => (
              <div
                key={reason.id}
                className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Suspension #{customer.suspensionReasons.length - index}
                    </p>
                    <p className="text-zinc-900 dark:text-zinc-100 mt-1">
                      {reason.reason}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(reason.suspendedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Addresses */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Addresses ({customer.addresses.length})
        </h2>
        {customer.addresses.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No addresses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 ${
                  address.isDefault
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                  <p className="mb-1">{address.name} - {address.phone}</p>
                  <p className="mb-1">
                    {address.houseNo}, {address.line1}
                  </p>
                  {address.line2 && <p className="mb-1">{address.line2}</p>}
                  <p className="mb-1">
                    {address.city}, {address.district}, {address.state}
                  </p>
                  <p>
                    {address.country} - {address.pincode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Orders ({customer.order.length})
        </h2>
        {customer.order.length === 0 ? (
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
                    Date
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Status
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Items
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Total Amount
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Payment
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.order.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {order.id.substring(0, 8)}...
                      </div>
                      {order.InvoiceNumber && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Invoice: {order.InvoiceNumber}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : order.status === "CANCELLED" || order.status === "REFUNDED"
                            ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {order.orderItems.length} item(s)
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="text-zinc-900 dark:text-zinc-100 font-medium">
                        ₹{order.totalAmount.toFixed(2)}
                      </div>
                      {order.discountAmount && order.discountAmount > 0 && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Discount: ₹{order.discountAmount.toFixed(2)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {order.paymentMethod ? (
                        <div>
                          <div className="text-sm text-zinc-900 dark:text-zinc-100">
                            {order.paymentMethod}
                          </div>
                          {order.paidAmount && (
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              ₹{order.paidAmount.toFixed(2)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-zinc-400 dark:text-zinc-500">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Download Data Popup */}
      {showDownloadPopup && (
        <Modal
          title="Download Customer Data"
          onClose={() => setShowDownloadPopup(false)}
        >
          <div className="mb-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Select the sections you want to include in the PDF:
            </p>
            <div className="space-y-3">
              {availableSections.map((section) => {
                // Skip business info and billing address if not a business account
                if (
                  (section.id === 'businessInfo' || section.id === 'billingAddress') &&
                  !customer.isBusinessAccount
                ) {
                  return null;
                }
                // Skip suspension history if no suspensions
                if (
                  section.id === 'suspensionHistory' &&
                  customer.suspensionReasons.length === 0
                ) {
                  return null;
                }
                return (
                  <Label
                    key={section.id}
                    className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Input
                      type="checkbox"
                      checked={selectedSections.includes(section.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSections([...selectedSections, section.id]);
                        } else {
                          setSelectedSections(
                            selectedSections.filter((id) => id !== section.id)
                          );
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {section.label}
                    </span>
                  </Label>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={async () => {
                if (selectedSections.length === 0) {
                  alert('Please select at least one section to download');
                  return;
                }

                setDownloading(true);
                try {
                  const response = await fetch(`/api/customers/${id}/download-pdf`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sections: selectedSections }),
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to generate PDF');
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `customer-${customer.id}-${Date.now()}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);

                  setShowDownloadPopup(false);
                  setSelectedSections([]);
                } catch (error: any) {
                  alert('Error downloading PDF: ' + error.message);
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading || selectedSections.length === 0}
              className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
            <Button
              onClick={() => {
                setShowDownloadPopup(false);
                setSelectedSections([]);
              }}
              className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}


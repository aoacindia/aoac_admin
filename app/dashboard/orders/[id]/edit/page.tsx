"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
}

interface Address {
  id: string;
  type: string;
  name: string;
  phone: string;
  houseNo: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  tax: number;
  description?: string;
  weight?: number | null;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  tax: number;
  discount: number;
  lineTotal: number;
  totalDiscount: number;
  weightKg: number;
  originalWeightGrams: number | null;
  customWeightItem: boolean;
  customWeightGrams: number | null;
}

interface Supplier {
  id: string;
  name: string;
  type: string;
}

interface Office {
  id: string;
  gstin: string;
  address: string;
  state: string;
  stateCode: string;
}

interface OrderData {
  id: string;
  InvoiceNumber: string | null;
  invoiceType: string | null;
  invoiceOfficeId?: string | null;
  orderDate: string;
  status: string;
  user: Customer;
  shippingAddress: Address | null;
  shippingAddressId: string | null;
  orderItems: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
    tax: number;
    discount: number;
    customWeightItem?: boolean | null;
    customWeight?: number | null;
  }>;
  shippingAmount: number | null;
  shippingCourierName: string | null;
  totalAmount: number;
  discountAmount: number | null;
  invoiceAmount: number | null;
  roundedOffAmount: number | null;
  paymentMethod: string | null;
  isDifferentSupplier: boolean | null;
  supplierId: string | null;
  supplier: Supplier | null;
}

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [loadingOffices, setLoadingOffices] = useState(false);
  const [isDifferentSupplier, setIsDifferentSupplier] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");

  const [invoiceType, setInvoiceType] = useState<"PI" | "TAX_INVOICE">("PI");
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedInvoiceOfficeId, setSelectedInvoiceOfficeId] = useState<string>("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [deliveryCharge, setDeliveryCharge] = useState<string>("");
  const [deliveryPartner, setDeliveryPartner] = useState<string>("");
  const [deliveryPartnerName, setDeliveryPartnerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");

  // Fetch order data
  useEffect(() => {
    if (orderId) {
      fetchOrder();
      fetchProducts();
      fetchOffices();
    }
  }, [orderId]);

  // Fetch addresses when order is loaded
  useEffect(() => {
    if (order?.user?.id) {
      fetchAddresses(order.user.id);
    }
  }, [order?.user?.id]);

  const toDateInputValue = (dateString?: string | null) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().slice(0, 10);
  };

  const fetchOrder = async () => {
    try {
      setLoadingOrder(true);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        const orderData = data.data;
        setOrder(orderData);
        setInvoiceType((orderData.invoiceType as "PI" | "TAX_INVOICE") || "PI");
        setSelectedAddressId(orderData.shippingAddressId || "");
        setSelectedInvoiceOfficeId(orderData.invoiceOfficeId || "");
        setInvoiceDate(toDateInputValue(orderData.orderDate));
        setDeliveryCharge(orderData.shippingAmount?.toString() || "");
        setPaymentMethod(orderData.paymentMethod || "");
        setStatus(orderData.status || "PENDING");
        setIsDifferentSupplier(orderData.isDifferentSupplier || false);
        setSelectedSupplierId(orderData.supplierId || "");
        
        // Determine delivery partner
        if (orderData.shippingCourierName) {
          if (orderData.shippingCourierName === "BLUE_DART") {
            setDeliveryPartner("BLUE_DART");
          } else if (orderData.shippingCourierName === "DELHIVERY") {
            setDeliveryPartner("DELHIVERY");
          } else {
            setDeliveryPartner("OTHER");
            setDeliveryPartnerName(orderData.shippingCourierName);
          }
        }

        // Convert order items to items format
        const orderItems: OrderItem[] = await Promise.all(
          orderData.orderItems.map(async (item: any) => {
            // Fetch product details
            const productResponse = await fetch(`/api/products/${item.productId}`);
            const productData = await productResponse.json();
            const product = productData.success ? productData.data : null;
            const productWeightGrams =
              typeof product?.weight === "number" ? product.weight : null;
            const effectiveWeightGrams =
              item.customWeightItem && typeof item.customWeight === "number"
                ? item.customWeight
                : productWeightGrams;

            return {
              id: item.id,
              productId: item.productId,
              productName: product?.name || "Unknown Product",
              quantity: item.quantity,
              price: item.price,
              tax: item.tax || 0, // Include tax from order item
              discount: item.discount,
              lineTotal: item.price * item.quantity - item.discount * item.quantity,
              totalDiscount: item.discount * item.quantity,
              weightKg: effectiveWeightGrams ? effectiveWeightGrams / 1000 : 0,
              originalWeightGrams: productWeightGrams,
              customWeightItem: item.customWeightItem === true,
              customWeightGrams:
                typeof item.customWeight === "number" ? item.customWeight : null,
            };
          })
        );
        setItems(orderItems);
      } else {
        alert("Error loading order: " + data.error);
        router.push("/dashboard/orders");
      }
    } catch (error: any) {
      console.error("Error fetching order:", error);
      alert("Error loading order: " + error.message);
      router.push("/dashboard/orders");
    } finally {
      setLoadingOrder(false);
    }
  };

  const fetchAddresses = async (customerId: string) => {
    try {
      setLoadingAddresses(true);
      const response = await fetch(`/api/customers/${customerId}/addresses`);
      const data = await response.json();
      if (data.success) {
        setAddresses(data.data);
      }
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch("/api/products?approved=true");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      setLoadingSuppliers(true);
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      if (data.success) {
        setSuppliers(data.data);
      }
    } catch (error: any) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoadingSuppliers(false);
    }
  };

  const fetchOffices = async () => {
    try {
      setLoadingOffices(true);
      const response = await fetch("/api/offices");
      const data = await response.json();
      if (data.success) {
        setOffices(data.data);
      }
    } catch (error: any) {
      console.error("Error fetching offices:", error);
    } finally {
      setLoadingOffices(false);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        productId: "",
        productName: "",
        quantity: 1,
        price: 0,
        tax: 0,
        discount: 0,
        lineTotal: 0,
        totalDiscount: 0,
        weightKg: 0,
        originalWeightGrams: null,
        customWeightItem: false,
        customWeightGrams: null,
      },
    ]);
  };

  const handleRemoveItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const gramsToKg = (grams?: number | null) => {
    if (typeof grams !== "number" || Number.isNaN(grams)) {
      return 0;
    }
    return grams / 1000;
  };

  const kgToGrams = (kg: number) => {
    if (Number.isNaN(kg)) {
      return null;
    }
    return Math.round(kg * 1000);
  };

  const applyCustomWeight = (updatedItem: OrderItem, nextWeightKg: number) => {
    const nextWeightGrams = kgToGrams(nextWeightKg);
    updatedItem.weightKg = nextWeightKg;

    if (nextWeightGrams === null) {
      updatedItem.customWeightItem = false;
      updatedItem.customWeightGrams = null;
      return;
    }

    const originalWeight = updatedItem.originalWeightGrams;
    if (typeof originalWeight === "number" && nextWeightGrams === originalWeight) {
      updatedItem.customWeightItem = false;
      updatedItem.customWeightGrams = null;
    } else {
      updatedItem.customWeightItem = true;
      updatedItem.customWeightGrams = nextWeightGrams;
    }
  };

  const handleItemChange = (
    itemId: string,
    field: keyof OrderItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };

          if (field === "productId" && value) {
            const product = products.find((p) => p.id === value);
            if (product) {
              updatedItem.productId = product.id;
              updatedItem.productName = product.name;
              updatedItem.price = product.price;
              updatedItem.tax = product.tax || 0; // Set tax from product
              const productWeightGrams =
                typeof product.weight === "number" ? product.weight : null;
              updatedItem.originalWeightGrams = productWeightGrams;
              updatedItem.weightKg = gramsToKg(productWeightGrams);
              updatedItem.customWeightItem = false;
              updatedItem.customWeightGrams = null;
            }
          }

          if (field === "weightKg") {
            applyCustomWeight(updatedItem, Number(value));
          }

          // Recalculate line totals whenever product, quantity, price, or discount changes
          if (field === "productId" || field === "quantity" || field === "price" || field === "discount") {
            const qty = field === "quantity" ? Number(value) : updatedItem.quantity;
            const price = field === "price" ? Number(value) : updatedItem.price;
            const discount = field === "discount" ? Number(value) : updatedItem.discount;

            updatedItem.quantity = qty;
            updatedItem.price = price;
            updatedItem.discount = discount;
            updatedItem.totalDiscount = discount * qty;
            updatedItem.lineTotal = price * qty - updatedItem.totalDiscount;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const getTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    items.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      totalDiscount += item.totalDiscount;
    });

    const deliveryChargeAmount = deliveryCharge ? parseFloat(deliveryCharge) : 0;
    const grandTotal = subtotal - totalDiscount + deliveryChargeAmount;
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    return {
      subtotal,
      totalDiscount,
      deliveryCharge: deliveryChargeAmount,
      grandTotal,
      roundedTotal,
      roundingOff,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedAddressId) {
        alert("Please select an address");
        setLoading(false);
        return;
      }

      if (!selectedInvoiceOfficeId) {
        alert("Please select an invoice office");
        setLoading(false);
        return;
      }

      if (items.some((item) => !item.productId || item.quantity <= 0)) {
        alert("Please fill in all item details correctly");
        setLoading(false);
        return;
      }

      if (deliveryPartner === "OTHER" && !deliveryPartnerName.trim()) {
        alert("Please enter delivery partner name");
        setLoading(false);
        return;
      }

      if (isDifferentSupplier && !selectedSupplierId) {
        alert("Please select a supplier or uncheck 'Different Supplier'");
        setLoading(false);
        return;
      }

      const payload: any = {
        addressId: selectedAddressId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          tax: item.tax || 0, // Include tax field
          discount: item.discount,
          customWeightItem: item.customWeightItem,
          customWeight: item.customWeightGrams,
        })),
        invoiceOfficeId: selectedInvoiceOfficeId,
        orderDate: invoiceDate || null,
        deliveryCharge: deliveryCharge || null,
        deliveryPartner: deliveryPartner || null,
        deliveryPartnerName: deliveryPartner === "OTHER" ? deliveryPartnerName : null,
        paymentMethod: paymentMethod || null,
        status: status || "PENDING",
        isDifferentSupplier: isDifferentSupplier || false,
        supplierId: isDifferentSupplier ? selectedSupplierId : null,
      };

      // Invoice type is always required
      payload.invoiceType = invoiceType;

      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order updated successfully!");
        router.push("/dashboard/orders");
      } else {
        alert("Error updating order: " + data.error);
      }
    } catch (error: any) {
      console.error("Error updating order:", error);
      alert("Error updating order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingOrder) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Order not found</p>
        </div>
      </div>
    );
  }

  const totals = getTotals();

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Edit Order
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Order ID: {order.id}
          {order.InvoiceNumber && ` | Invoice: ${order.InvoiceNumber}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info (Read-only) */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Name
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{order.user.name}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{order.user.email}</p>
            </div>
            {order.user.businessName && (
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Business Name
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100">{order.user.businessName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Type Selection */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="mb-6">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Invoice Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-4">
              <Label className="flex items-center">
                <Input
                  type="radio"
                  name="invoiceType"
                  value="PI"
                  checked={invoiceType === "PI"}
                  onChange={(e) => setInvoiceType(e.target.value as "PI" | "TAX_INVOICE")}
                  className="mr-2"
                />
                <span className="text-zinc-700 dark:text-zinc-300">PI (Proforma Invoice)</span>
              </Label>
              <Label className="flex items-center">
                <Input
                  type="radio"
                  name="invoiceType"
                  value="TAX_INVOICE"
                  checked={invoiceType === "TAX_INVOICE"}
                  onChange={(e) => setInvoiceType(e.target.value as "PI" | "TAX_INVOICE")}
                  className="mr-2"
                />
                <span className="text-zinc-700 dark:text-zinc-300">Tax Invoice</span>
              </Label>
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Invoice Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-6">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Invoice Office <span className="text-red-500">*</span>
            </Label>
            {loadingOffices ? (
              <p className="text-sm text-zinc-500 mt-1">Loading offices...</p>
            ) : offices.length === 0 ? (
              <p className="text-sm text-zinc-500 mt-1">No offices found</p>
            ) : (
              <Select
                value={selectedInvoiceOfficeId}
                onChange={(e) => setSelectedInvoiceOfficeId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an office</option>
                {offices.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.gstin} - {office.state} ({office.stateCode})
                  </option>
                ))}
              </Select>
            )}
          </div>
        </div>

        {/* Address Selection */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="mb-6">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Delivery Address <span className="text-red-500">*</span>
            </Label>
            {loadingAddresses ? (
              <p className="text-sm text-zinc-500">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p className="text-sm text-zinc-500">No addresses found for this customer</p>
            ) : (
              <Select
                value={selectedAddressId}
                onChange={(e) => setSelectedAddressId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an address</option>
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.name} - {address.houseNo}, {address.line1}, {address.city}, {address.state} - {address.pincode}
                  </option>
                ))}
              </Select>
            )}
          </div>
        </div>

        {/* Supplier Selection */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={isDifferentSupplier}
                  onChange={(e) => {
                    setIsDifferentSupplier(e.target.checked);
                    if (!e.target.checked) {
                      setSelectedSupplierId("");
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Different Supplier
                </span>
              </Label>
              {order?.supplier && isDifferentSupplier && (
                <Button
                  type="button"
                  onClick={() => {
                    setIsDifferentSupplier(false);
                    setSelectedSupplierId("");
                  }}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Remove Supplier
                </Button>
              )}
            </div>
            {isDifferentSupplier && (
              <div className="mt-2">
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Supplier <span className="text-red-500">*</span>
                </Label>
                {loadingSuppliers ? (
                  <p className="text-sm text-zinc-500">Loading suppliers...</p>
                ) : suppliers.length === 0 ? (
                  <p className="text-sm text-zinc-500">No suppliers found</p>
                ) : (
                  <Select
                    value={selectedSupplierId}
                    onChange={(e) => setSelectedSupplierId(e.target.value)}
                    required={isDifferentSupplier}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name} ({supplier.type})
                      </option>
                    ))}
                  </Select>
                )}
              </div>
            )}
            {order?.supplier && !isDifferentSupplier && (
              <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                  Current Supplier:
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {order.supplier.name} ({order.supplier.type})
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Check "Different Supplier" above to change or remove the supplier.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Items Section - Same structure as create page */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Items
            </h2>
            <Button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Item {index + 1}
                  </h3>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="md:col-span-2">
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Product <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={item.productId}
                      onChange={(e) => handleItemChange(item.id, "productId", e.target.value)}
                      required
                      disabled={loadingProducts}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => {
                        const weightDisplay = product.weight && product.weight > 0
                          ? ` (${(product.weight / 1000).toFixed(2)} kg)`
                          : "";
                        return (
                          <option key={product.id} value={product.id}>
                            {product.code} - {product.name}{weightDisplay} (₹{product.price})
                          </option>
                        );
                      })}
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(item.id, "quantity", parseInt(e.target.value) || 1)
                      }
                      required
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Price (per unit)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.price}
                      disabled
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Discount (per item)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemChange(item.id, "discount", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weightKg}
                      onChange={(e) =>
                        handleItemChange(item.id, "weightKg", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Discount:
                    </span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ₹{item.totalDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Line Total:
                    </span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ₹{item.lineTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Fields and Summary - Same as create page */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Delivery Charge
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Delivery Partner
              </Label>
              <Select
                value={deliveryPartner}
                onChange={(e) => setDeliveryPartner(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select delivery partner</option>
                <option value="BLUE_DART">Blue Dart</option>
                <option value="DELHIVERY">Delhivery</option>
                <option value="OTHER">Other</option>
              </Select>
            </div>

            {deliveryPartner === "OTHER" && (
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Delivery Partner Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={deliveryPartnerName}
                  onChange={(e) => setDeliveryPartnerName(e.target.value)}
                  required={deliveryPartner === "OTHER"}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Payment Method
              </Label>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PG_RZP">PG_RZP</option>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PENDING">Pending</option>
                <option value="ORDER_READY">Order Ready</option>
                <option value="PAYMENT_PENDING">Payment Pending</option>
                <option value="PAID">Paid</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="REFUNDED">Refunded</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Summary
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
              <span>Subtotal:</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
              <span>Total Discount:</span>
              <span className="text-red-600">-₹{totals.totalDiscount.toFixed(2)}</span>
            </div>
            {totals.deliveryCharge > 0 && (
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                <span>Delivery Charge:</span>
                <span>₹{totals.deliveryCharge.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
              <div className="flex justify-between text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                <span>Grand Total:</span>
                <span>₹{totals.grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
              <span>Rounding Off:</span>
              <span>
                {totals.roundingOff > 0 ? "+" : ""}₹{totals.roundingOff.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
              <div className="flex justify-between text-xl font-bold text-zinc-900 dark:text-zinc-100">
                <span>Rounded Total:</span>
                <span>₹{totals.roundedTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}



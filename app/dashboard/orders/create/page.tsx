"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  gstNumber?: string | null;
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
  price: number; // Price with tax included
  tax: number; // Tax percentage
  taxableAmount: number; // Price without tax (price / (1 + tax/100))
  taxAmount: number; // Tax amount (price - taxableAmount)
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

export default function CreateOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [loadingOffices, setLoadingOffices] = useState(false);

  const [invoiceType, setInvoiceType] = useState<"PI" | "TAX_INVOICE">("PI");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedInvoiceOfficeId, setSelectedInvoiceOfficeId] = useState<string>("");
  const [isDifferentSupplier, setIsDifferentSupplier] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
      tax: 0,
      taxableAmount: 0,
      taxAmount: 0,
      discount: 0,
      lineTotal: 0,
      totalDiscount: 0,
      weightKg: 0,
      originalWeightGrams: null,
      customWeightItem: false,
      customWeightGrams: null,
    },
  ]);
  const [deliveryCharge, setDeliveryCharge] = useState<string>("");
  const [deliveryPartner, setDeliveryPartner] = useState<string>("");
  const [deliveryPartnerName, setDeliveryPartnerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchSuppliers();
    fetchOffices();
  }, []);

  // Fetch addresses when customer is selected
  useEffect(() => {
    if (selectedCustomerId) {
      fetchAddresses(selectedCustomerId);
    } else {
      setAddresses([]);
      setSelectedAddressId("");
    }
  }, [selectedCustomerId]);

  const fetchCustomers = async (search?: string) => {
    try {
      setLoadingCustomers(true);
      const trimmedSearch = search?.trim();
      const url = trimmedSearch
        ? `/api/customers?search=${encodeURIComponent(trimmedSearch)}`
        : "/api/customers";
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setCustomers(data.data);
      }
    } catch (error: any) {
      console.error("Error fetching customers:", error);
      alert("Error fetching customers: " + error.message);
    } finally {
      setLoadingCustomers(false);
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
      alert("Error fetching addresses: " + error.message);
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
      alert("Error fetching products: " + error.message);
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
      alert("Error fetching suppliers: " + error.message);
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
      alert("Error fetching offices: " + error.message);
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
        taxableAmount: 0,
        taxAmount: 0,
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

  const calculateTaxDetails = (price: number, taxPercent: number) => {
    // Calculate taxable amount: price / (1 + tax/100)
    // IMPORTANT: Do NOT round intermediate values - maintain full precision
    const taxableAmount = price / (1 + taxPercent / 100);
    // Calculate tax amount: price - taxable amount
    // IMPORTANT: Do NOT round intermediate values - maintain full precision
    const taxAmount = price - taxableAmount;
    return { taxableAmount, taxAmount };
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

          // If product is selected, fetch price and tax
          if (field === "productId" && value) {
            const product = products.find((p) => p.id === value);
            if (product) {
              updatedItem.productId = product.id;
              updatedItem.productName = product.name;
              updatedItem.price = product.price;
              updatedItem.tax = product.tax;
              const productWeightGrams =
                typeof product.weight === "number" ? product.weight : null;
              updatedItem.originalWeightGrams = productWeightGrams;
              updatedItem.weightKg = gramsToKg(productWeightGrams);
              updatedItem.customWeightItem = false;
              updatedItem.customWeightGrams = null;
              // Calculate taxable amount and tax amount
              const { taxableAmount, taxAmount } = calculateTaxDetails(product.price, product.tax);
              updatedItem.taxableAmount = taxableAmount;
              updatedItem.taxAmount = taxAmount;
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
            const tax = updatedItem.tax;

            updatedItem.quantity = qty;
            updatedItem.price = price;
            updatedItem.discount = discount;
            
            // Recalculate taxable amount and tax amount when price changes
            // IMPORTANT: Do NOT round intermediate values - maintain full precision
            if (field === "price") {
              if (tax > 0) {
                const { taxableAmount, taxAmount } = calculateTaxDetails(price, tax);
                updatedItem.taxableAmount = taxableAmount;
                updatedItem.taxAmount = taxAmount;
              } else {
                // If no tax, taxable amount equals price and tax amount is 0
                updatedItem.taxableAmount = price;
                updatedItem.taxAmount = 0;
              }
            }
            
            // IMPORTANT: Do NOT round intermediate values - maintain full precision
            updatedItem.totalDiscount = discount * qty;
            // Line total = (price * quantity) - total discount
            // IMPORTANT: Do NOT round intermediate values - maintain full precision
            updatedItem.lineTotal = price * qty - updatedItem.totalDiscount;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const getTotals = () => {
    let totalTaxableAmount = 0;
    let totalTax = 0;
    let totalDiscount = 0;
    let subtotal = 0;

    // IMPORTANT: Do NOT round intermediate values - maintain full precision for all item-level calculations
    items.forEach((item) => {
      // Calculate total taxable amount (taxable amount per unit × quantity)
      // Maintain full precision - no rounding
      totalTaxableAmount += item.taxableAmount * item.quantity;
      // Calculate total tax (tax amount per unit × quantity)
      // Maintain full precision - no rounding
      totalTax += item.taxAmount * item.quantity;
      // Calculate total discount
      // Maintain full precision - no rounding
      totalDiscount += item.totalDiscount;
      // Calculate subtotal (price with tax × quantity)
      // Maintain full precision - no rounding
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
    });

    const deliveryChargeAmount = deliveryCharge ? parseFloat(deliveryCharge) : 0;
    // Maintain full precision until final calculation
    const grandTotal = subtotal - totalDiscount + deliveryChargeAmount;
    // ONLY round the final total - this is the only place rounding should occur
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    return {
      totalTaxableAmount,
      totalTax,
      totalDiscount,
      subtotal,
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
      // Validation
      if (!selectedCustomerId) {
        alert("Please select a customer");
        setLoading(false);
        return;
      }

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
        alert("Please select a supplier");
        setLoading(false);
        return;
      }

      const payload = {
        invoiceType,
        invoiceOfficeId: selectedInvoiceOfficeId,
        customerId: selectedCustomerId,
        addressId: selectedAddressId,
        isDifferentSupplier: isDifferentSupplier || false,
        supplierId: isDifferentSupplier ? selectedSupplierId : null,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price, // Total price with tax included
          tax: item.tax,
          discount: item.discount,
          customWeightItem: item.customWeightItem,
          customWeight: item.customWeightGrams,
        })),
        deliveryCharge: deliveryCharge || null,
        deliveryPartner: deliveryPartner || null,
        deliveryPartnerName: deliveryPartner === "OTHER" ? deliveryPartnerName : null,
        paymentMethod: paymentMethod || null,
        status: status || "PENDING",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order created successfully!");
        router.push("/dashboard/orders");
      } else {
        alert("Error creating order: " + data.error);
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      alert("Error creating order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totals = getTotals();

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Create Order
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Create a new order for a customer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          {/* Invoice Type Selection */}
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

          {/* Invoice Office Selection */}
          <div className="mb-6">
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

          {/* Customer Selection */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Customer <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col md:flex-row gap-2 mb-2">
              <Input
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search by name, business name, or GST number"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fetchCustomers(customerSearch);
                  }
                }}
                className="w-full"
              />
              <Button
                type="button"
                onClick={() => fetchCustomers(customerSearch)}
                disabled={loadingCustomers}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Find Customer
              </Button>
            </div>
            <Select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
              disabled={loadingCustomers}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                  {customer.businessName ? ` (${customer.businessName})` : ""}
                  {customer.gstNumber ? ` - GST: ${customer.gstNumber}` : ""}
                </option>
              ))}
            </Select>
            {loadingCustomers && (
              <p className="text-sm text-zinc-500 mt-1">Loading customers...</p>
            )}
          </div>

          {/* Supplier Selection */}
          <div className="mb-6">
            <Label className="flex items-center space-x-2 cursor-pointer mb-2">
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
          </div>

          {/* Address Selection */}
          {selectedCustomerId && (
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
          )}
        </div>

        {/* Items Section - Same as invoice page */}
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
                          : '';
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
                      min="0"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(item.id, "price", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Taxable Amount:
                    </span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ₹{(item.taxableAmount * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Tax ({item.tax}%):
                    </span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ₹{(item.taxAmount * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Discount:
                    </span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ₹{item.totalDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="md:col-span-2 lg:col-span-1">
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

        {/* Additional Fields and Summary - Same structure as invoice page */}
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
              <span>Total Taxable Amount:</span>
              <span>₹{totals.totalTaxableAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
              <span>Total Tax:</span>
              <span>₹{totals.totalTax.toFixed(2)}</span>
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
            {loading ? "Creating..." : "Create Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}



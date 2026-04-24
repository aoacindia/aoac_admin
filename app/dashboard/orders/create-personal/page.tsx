"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

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

export default function CreatePersonalOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productQueryByItemId, setProductQueryByItemId] = useState<Record<string, string>>({});
  const [productSearchOpenByItemId, setProductSearchOpenByItemId] = useState<Record<string, boolean>>(
    {}
  );

  // Locked requirements for this POS page:
  // - orderBy = US2026149 (server-enforced)
  // - customOrder = true (server-enforced)
  // - invoiceType = TAX_INVOICE (server-enforced)
  // - status = DELIVERED + deliveredAt = now (server-enforced)
  const invoiceOfficeId = "cml092i700000jxt8bjv8opzq";
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

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

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const calculateTaxDetails = (price: number, taxPercent: number) => {
    // IMPORTANT: Do NOT round intermediate values - maintain full precision
    const taxableAmount = price / (1 + taxPercent / 100);
    const taxAmount = price - taxableAmount;
    return { taxableAmount, taxAmount };
  };

  const gramsToKg = (grams?: number | null) => {
    if (typeof grams !== "number" || Number.isNaN(grams)) return 0;
    return grams / 1000;
  };

  const kgToGrams = (kg: number) => {
    if (Number.isNaN(kg)) return null;
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

  const handleAddItem = () => {
    const id = Date.now().toString();
    setItems([
      ...items,
      {
        id,
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
    setProductQueryByItemId((prev) => ({ ...prev, [id]: "" }));
    setProductSearchOpenByItemId((prev) => ({ ...prev, [id]: true }));
  };

  const handleRemoveItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== itemId));
    }
    setProductQueryByItemId((prev) => {
      if (!(itemId in prev)) return prev;
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setProductSearchOpenByItemId((prev) => {
      if (!(itemId in prev)) return prev;
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const setProductQuery = (itemId: string, value: string) => {
    setProductQueryByItemId((prev) => ({ ...prev, [itemId]: value }));
    setProductSearchOpenByItemId((prev) => ({ ...prev, [itemId]: true }));
  };

  const getFilteredProducts = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const code = (p.code || "").toLowerCase();
      return name.includes(q) || code.includes(q);
    });
  };

  const handlePickProduct = (itemId: string, productId: string) => {
    handleItemChange(itemId, "productId", productId);
    const picked = products.find((p) => p.id === productId);
    setProductQueryByItemId((prev) => ({
      ...prev,
      [itemId]: picked ? `${picked.code} - ${picked.name}` : "",
    }));
    setProductSearchOpenByItemId((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleItemChange = (itemId: string, field: keyof OrderItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id !== itemId) return item;

        const updatedItem = { ...item, [field]: value };

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
            const { taxableAmount, taxAmount } = calculateTaxDetails(product.price, product.tax);
            updatedItem.taxableAmount = taxableAmount;
            updatedItem.taxAmount = taxAmount;
          }
        }

        if (field === "weightKg") {
          applyCustomWeight(updatedItem, Number(value));
        }

        if (
          field === "productId" ||
          field === "quantity" ||
          field === "price" ||
          field === "discount"
        ) {
          const qty = field === "quantity" ? Number(value) : updatedItem.quantity;
          const price = field === "price" ? Number(value) : updatedItem.price;
          const discount = field === "discount" ? Number(value) : updatedItem.discount;
          const tax = updatedItem.tax;

          updatedItem.quantity = qty;
          updatedItem.price = price;
          updatedItem.discount = discount;

          if (field === "price") {
            if (tax > 0) {
              const { taxableAmount, taxAmount } = calculateTaxDetails(price, tax);
              updatedItem.taxableAmount = taxableAmount;
              updatedItem.taxAmount = taxAmount;
            } else {
              updatedItem.taxableAmount = price;
              updatedItem.taxAmount = 0;
            }
          }

          updatedItem.totalDiscount = discount * qty;
          updatedItem.lineTotal = price * qty - updatedItem.totalDiscount;
        }

        return updatedItem;
      })
    );
  };

  const totals = useMemo(() => {
    let totalTaxableAmount = 0;
    let totalTax = 0;
    let totalDiscount = 0;
    let subtotal = 0;

    items.forEach((item) => {
      totalTaxableAmount += item.taxableAmount * item.quantity;
      totalTax += item.taxAmount * item.quantity;
      totalDiscount += item.totalDiscount;
      subtotal += item.price * item.quantity;
    });

    const grandTotal = subtotal - totalDiscount;
    const roundedTotal = Math.round(grandTotal);
    const roundingOff = roundedTotal - grandTotal;

    return {
      totalTaxableAmount,
      totalTax,
      totalDiscount,
      subtotal,
      grandTotal,
      roundedTotal,
      roundingOff,
    };
  }, [items]);

  const printInvoiceForOrder = async (orderId: string) => {
    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/download-invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ copies: ["original"] }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Invoice download failed");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) {
      // Popup blocked; fallback to direct download in same tab
      window.location.href = url;
      return;
    }

    // Best-effort auto print; browsers may ignore without user gesture.
    w.onload = () => {
      try {
        w.focus();
        w.print();
      } catch {
        // ignore
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!invoiceOfficeId) {
        // Should never happen (fixed office id), but keep guard.
        alert("Invoice office is missing.");
        return;
      }

      if (items.some((item) => !item.productId || item.quantity <= 0)) {
        alert("Please fill in all item details correctly");
        return;
      }

      if (paymentMethod && paymentMethod !== "cash" && paymentMethod !== "PG_RZP") {
        alert("Please select a valid payment method");
        return;
      }

      const payload = {
        invoiceOfficeId,
        paymentMethod: paymentMethod || null,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          tax: item.tax,
          discount: item.discount,
          customWeightItem: item.customWeightItem,
          customWeight: item.customWeightGrams,
        })),
      };

      const response = await fetch("/api/orders/personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!data.success) {
        alert("Error creating order: " + data.error);
        return;
      }

      const orderId = data.data?.order?.id as string | undefined;
      if (!orderId) {
        alert("Order created but response missing order id.");
        router.push("/dashboard/orders");
        return;
      }

      await printInvoiceForOrder(orderId);
      router.push(`/dashboard/orders/${encodeURIComponent(orderId)}`);
    } catch (error: any) {
      console.error("Error creating personal order:", error);
      alert("Error creating order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Create Personal Order
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Fast retail billing (B2C). Delivered immediately with GST invoice.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Product selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Products
              </h2>

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
                        <div className="relative">
                          <Input
                            value={productQueryByItemId[item.id] ?? ""}
                            onChange={(e) => setProductQuery(item.id, e.target.value)}
                            placeholder="Search product by name/code"
                            onFocus={() =>
                              setProductSearchOpenByItemId((prev) => ({ ...prev, [item.id]: true }))
                            }
                            disabled={loadingProducts}
                            className="w-full"
                          />

                          {productSearchOpenByItemId[item.id] ? (
                            <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                              {loadingProducts ? (
                                <div className="p-3 text-sm text-zinc-500">Loading products...</div>
                              ) : getFilteredProducts(productQueryByItemId[item.id] ?? "").length === 0 ? (
                                <div className="p-3 text-sm text-zinc-500">No matching products.</div>
                              ) : (
                                getFilteredProducts(productQueryByItemId[item.id] ?? "").map((product) => {
                                  const weightDisplay =
                                    product.weight && product.weight > 0
                                      ? ` • ${(product.weight / 1000).toFixed(2)} kg`
                                      : "";
                                  const isSelected = item.productId === product.id;
                                  return (
                                    <button
                                      key={product.id}
                                      type="button"
                                      onMouseDown={(e) => {
                                        // Prevent input blur before click handler runs
                                        e.preventDefault();
                                      }}
                                      onClick={() => handlePickProduct(item.id, product.id)}
                                      className={[
                                        "w-full text-left px-3 py-2 text-sm border-b border-zinc-100 dark:border-zinc-800",
                                        "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                                        isSelected ? "bg-zinc-50 dark:bg-zinc-800" : "bg-transparent",
                                      ].join(" ")}
                                    >
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                          <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                            {product.code} - {product.name}
                                          </div>
                                          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                            ₹{product.price} • Tax {product.tax}%{weightDisplay}
                                          </div>
                                        </div>
                                        {isSelected && (
                                          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                            Selected
                                          </div>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          ) : null}
                        </div>
                        {loadingProducts && (
                          <p className="text-sm text-zinc-500 mt-1">Loading products...</p>
                        )}
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
                            handleItemChange(
                              item.id,
                              "quantity",
                              parseInt(e.target.value, 10) || 1
                            )
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
                            handleItemChange(
                              item.id,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
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
                            handleItemChange(
                              item.id,
                              "weightKg",
                              parseFloat(e.target.value) || 0
                            )
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

              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Billing
              </h2>

              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Payment Method
                  </Label>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cash">CASH</option>
                    <option value="PG_RZP">PG_RZP</option>
                  </Select>
                </div>
              </div>
            </div>

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
                {loading ? "Creating..." : "Create Order & Print Invoice"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


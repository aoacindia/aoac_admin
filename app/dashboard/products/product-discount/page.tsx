"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface WeightDiscount {
  weight: number; // in grams for UI
  price: number;
}

interface WeightDiscountResponse {
  minWeight: number; // in kg from API
  price: number;
}

export default function ProductDiscountPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [discounts, setDiscounts] = useState<WeightDiscount[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/get-all-products");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const fetchDiscounts = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/products/weight-discounts?productId=${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch discounts");
      }
      const data = await response.json();
      // Convert minWeight from kg to g for UI
      const formattedDiscounts = (data.weightDiscounts || []).map(
        (d: WeightDiscountResponse) => ({
          weight: d.minWeight * 1000, // Convert kg to grams
          price: d.price,
        })
      );
      setDiscounts(
        formattedDiscounts.length > 0 ? formattedDiscounts : [{ weight: 0, price: 0 }]
      );
    } catch (error) {
      console.error("Error fetching discounts:", error);
      toast.error("Failed to fetch discounts");
      setDiscounts([{ weight: 0, price: 0 }]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      await fetchDiscounts(productId);
    }
  };

  const addNewRow = () => {
    setDiscounts([...discounts, { weight: 0, price: 0 }]);
  };

  const deleteRow = (index: number) => {
    const newDiscounts = discounts.filter((_, i) => i !== index);
    setDiscounts(newDiscounts.length > 0 ? newDiscounts : [{ weight: 0, price: 0 }]);
  };

  const updateDiscount = (
    index: number,
    field: keyof WeightDiscount,
    value: number
  ) => {
    const newDiscounts = [...discounts];
    newDiscounts[index][field] = value;
    setDiscounts(newDiscounts);
  };

  const handleSave = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    try {
      setSaving(true);
      // Convert weight from g to kg before sending to API
      const discountsInKg = discounts.map((d) => ({
        minWeight: d.weight / 1000, // Convert grams to kg
        price: d.price,
      }));

      const response = await fetch("/api/products/weight-discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
          weightDiscounts: discountsInKg,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save discounts");
      }

      toast.success("Weight discounts saved successfully");
    } catch (error) {
      console.error("Error saving discounts:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save discounts"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Weight Discounts</h1>

      <div className="mb-6 w-full max-w-md">
        <Select
          value={selectedProduct?.id || ""}
          onChange={(e) => handleProductChange(e.target.value)}
          disabled={loading}
          className="w-full"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="p-8">
          <p className="text-center">Loading discounts...</p>
        </div>
      ) : selectedProduct ? (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Weight (g)
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    {selectedProduct.name} - ₹{selectedProduct.price}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {discounts.map((discount, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={discount.weight || ""}
                        onChange={(e) =>
                          updateDiscount(
                            index,
                            "weight",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-32"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={discount.price || ""}
                        onChange={(e) =>
                          updateDiscount(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-32"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRow(index)}
                        disabled={discounts.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between">
            <Button onClick={addNewRow} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Row
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="p-8 border rounded-md text-center">
          <p className="text-lg">Please select a product to manage discounts</p>
        </div>
      )}
    </div>
  );
}


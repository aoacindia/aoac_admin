"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface DiscountRow {
  id: string;
  minWeight: number; // in grams for UI
  productPrices: Record<string, number>;
}

interface ProductDiscount {
  productId: string;
  discountPrice: number;
}

export default function CategoryDiscountPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [discountRows, setDiscountRows] = useState<DiscountRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch categories on mount
    fetch("/api/categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);
    Promise.all([
      // Fetch products
      fetch(`/api/products/get_bycategory?categoryId=${selectedCategory}`).then(
        (res) => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        }
      ),
      // Fetch existing discounts
      fetch(
        `/api/products/category-discounts?categoryId=${selectedCategory}`
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch discounts");
        return res.json();
      }),
    ])
      .then(([productsData, discountsData]) => {
        setProducts(productsData);

        if (discountsData && discountsData.length > 0) {
          // Transform existing discounts into rows
          // Convert minWeight from kg to grams for UI
          const rows = discountsData.map(
            (discount: {
              minWeight: number;
              productDiscounts: ProductDiscount[];
            }) => ({
              id: Math.random().toString(),
              minWeight: discount.minWeight * 1000, // Convert kg to grams
              productPrices: discount.productDiscounts.reduce(
                (acc: Record<string, number>, pd: ProductDiscount) => ({
                  ...acc,
                  [pd.productId]: pd.discountPrice,
                }),
                {}
              ),
            })
          );
          setDiscountRows(rows);
        } else {
          // Start with one empty row
          setDiscountRows([
            {
              id: Math.random().toString(),
              minWeight: 0,
              productPrices: {},
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch discount data");
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const addRow = () => {
    setDiscountRows((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        minWeight: 0,
        productPrices: {},
      },
    ]);
  };

  const deleteRow = (id: string) => {
    setDiscountRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateWeight = (id: string, weight: number) => {
    setDiscountRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, minWeight: weight } : row))
    );
  };

  const updatePrice = (rowId: string, productId: string, price: number) => {
    setDiscountRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              productPrices: { ...row.productPrices, [productId]: price },
            }
          : row
      )
    );
  };

  const saveDiscounts = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    setSaving(true);
    try {
      // Convert weight from grams to kg before sending to API
      const response = await fetch("/api/products/category-discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCategory,
          discounts: discountRows.map((row) => ({
            minWeight: row.minWeight / 1000, // Convert grams to kg
            productPrices: row.productPrices,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save discounts");
      }

      // Show success message
      toast.success("Discounts saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save discounts"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage Category Weight Discounts
      </h1>

      <div className="w-full max-w-xs">
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={loading}
          className="w-full"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="p-8 border rounded-md text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading products and discounts...</p>
        </div>
      ) : selectedCategory && products.length === 0 ? (
        <div className="p-8 border rounded-md text-center">
          <p className="text-lg">
            There are no products available in this category.
          </p>
        </div>
      ) : (
        selectedCategory && (
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Weight (g)</th>
                    {products.map((product) => (
                      <th key={product.id} className="text-left p-2">
                        {product.name}
                        <div className="text-sm text-gray-500">
                          Regular: ₹{product.price}
                        </div>
                      </th>
                    ))}
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discountRows.map((row) => (
                    <tr key={row.id}>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          value={row.minWeight || ""}
                          onChange={(e) =>
                            updateWeight(
                              row.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24"
                        />
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-2">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={row.productPrices[product.id] || ""}
                            onChange={(e) =>
                              updatePrice(
                                row.id,
                                product.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24"
                          />
                        </td>
                      ))}
                      <td className="p-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteRow(row.id)}
                          disabled={discountRows.length === 1}
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
              <Button onClick={addRow} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Row
              </Button>
              <Button onClick={saveDiscounts} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  price: number;
  regularPrice: number | null;
  tax: number;
  mainImage: string | null;
  inStock: boolean;
  approved: boolean;
  stockCount: number | null;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [unapprovedProducts, setUnapprovedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [approvedRes, unapprovedRes] = await Promise.all([
        fetch("/api/products?approved=true"),
        fetch("/api/products?approved=false"),
      ]);

      const approvedData = await approvedRes.json();
      const unapprovedData = await unapprovedRes.json();

      if (approvedData.success) {
        setProducts(approvedData.data);
      }
      if (unapprovedData.success) {
        setUnapprovedProducts(unapprovedData.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchProducts();
      } else {
        alert("Error deleting product: " + data.error);
      }
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Combine all products for the table
  const allProducts = [...unapprovedProducts, ...products];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            All Products
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your product inventory
          </p>
        </div>
        <Link
          href="/dashboard/products/create"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Create Product
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Products</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {allProducts.length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {products.length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {unapprovedProducts.length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Image
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Code
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Name
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Price
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Regular Price
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Tax
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Stock
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {allProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                allProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {product.mainImage ? (
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center">
                          <span className="text-xs text-zinc-400 dark:text-zinc-500">No Image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                        {product.code}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {product.category.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {product.regularPrice ? (
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 line-through">
                          ₹{product.regularPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-400 dark:text-zinc-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {product.tax}%
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            product.inStock
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                        {product.stockCount !== null && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            ({product.stockCount})
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {product.approved ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                          title="View"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          title="Edit"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                          title="Delete"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}


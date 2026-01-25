"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string, productCount: number) => {
    if (productCount > 0) {
      alert(
        `Cannot delete category "${name}". It has ${productCount} product(s) associated with it.`
      );
      return;
    }

    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchCategories();
      } else {
        alert("Error deleting category: " + data.error);
      }
    } catch (err: any) {
      alert("Error deleting category: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading categories...</p>
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

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          All Categories
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your product categories
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              No categories found.
            </p>
            <Link
              href="/dashboard/products/categories/create"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create First Category
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center flex-col sm:flex-row gap-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                Total Categories: {categories.length}
              </p>
              <Link
                href="/dashboard/products/categories/create"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm md:text-base"
              >
                + Add New Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Products: {category._count.products}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      Created: {new Date(category.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/dashboard/products/categories/${category.id}/edit`}
                      className="flex-1 min-w-[80px] text-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() =>
                        handleDelete(
                          category.id,
                          category.name,
                          category._count.products
                        )
                      }
                      disabled={category._count.products > 0}
                      className={`flex-1 min-w-[80px] px-3 py-2 text-white text-xs md:text-sm rounded-lg transition-colors ${
                        category._count.products > 0
                          ? "bg-zinc-400 dark:bg-zinc-600 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      title={
                        category._count.products > 0
                          ? "Cannot delete category with products"
                          : "Delete category"
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  price: number;
  regularPrice: number | null;
  length: number | null;
  breadth: number | null;
  height: number | null;
  weight: number | null;
  packingWeight: number | null;
  tax: number;
  hsnsac: string | null;
  mainImage: string | null;
  images: any;
  inStock: boolean;
  approved: boolean;
  stockCount: number | null;
  vegetable: boolean;
  veg: boolean;
  frozen: boolean;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

export default function ViewProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.error || "Product not found");
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
          <p className="text-zinc-600 dark:text-zinc-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error: {error || "Product not found"}
          </p>
          <Link
            href="/dashboard/products"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images
    ? Array.isArray(product.images)
      ? product.images
      : typeof product.images === "string"
      ? JSON.parse(product.images)
      : []
    : [];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link
          href="/dashboard/products"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Products
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {product.name}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">Product Details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Images
          </h2>
          {product.mainImage ? (
            <div className="mb-4">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-zinc-400 dark:text-zinc-500">No Main Image</span>
            </div>
          )}

          {images.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Additional Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Product Code:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">{product.code}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Name:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">{product.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Category:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.category.name}
                </p>
              </div>
              {product.description && (
                <div>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Description:
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}
              {product.hsnsac && (
                <div>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    HSN/SAC Code:
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {product.hsnsac}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Pricing
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Price:
                </span>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
              {product.regularPrice && (
                <div>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Regular Price:
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100 line-through">
                    ₹{product.regularPrice.toFixed(2)}
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Tax:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">{product.tax}%</p>
              </div>
            </div>
          </div>

          {/* Dimensions & Weight */}
          {(product.length ||
            product.breadth ||
            product.height ||
            product.weight ||
            product.packingWeight) && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Dimensions & Weight
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {product.length && (
                  <div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Length:
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {product.length} cm
                    </p>
                  </div>
                )}
                {product.breadth && (
                  <div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Breadth:
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {product.breadth} cm
                    </p>
                  </div>
                )}
                {product.height && (
                  <div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Height:
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {product.height} cm
                    </p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Weight:
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {product.weight} kg
                    </p>
                  </div>
                )}
                {product.packingWeight && (
                  <div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Packing Weight:
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {product.packingWeight} kg
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stock Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Stock Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Status:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.inStock ? (
                    <span className="text-green-600 dark:text-green-400">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">
                      Out of Stock
                    </span>
                  )}
                </p>
              </div>
              {product.stockCount !== null && (
                <div>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Stock Count:
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {product.stockCount}
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Approval Status:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.approved ? (
                    <span className="text-green-600 dark:text-green-400">
                      Approved
                    </span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">
                      Pending Approval
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Product Type Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Product Type
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Vegetable:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.vegetable ? (
                    <span className="text-green-600 dark:text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500">No</span>
                  )}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Veg:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.veg ? (
                    <span className="text-green-600 dark:text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500">No</span>
                  )}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Frozen:
                </span>
                <p className="text-zinc-900 dark:text-zinc-100">
                  {product.frozen ? (
                    <span className="text-blue-600 dark:text-blue-400">
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500">No</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Audit Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Audit Information
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Created By:</span>{" "}
                <span className="text-zinc-900 dark:text-zinc-100">
                  {product.createdBy}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Created At:</span>{" "}
                <span className="text-zinc-900 dark:text-zinc-100">
                  {new Date(product.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Updated By:</span>{" "}
                <span className="text-zinc-900 dark:text-zinc-100">
                  {product.updatedBy}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Updated At:</span>{" "}
                <span className="text-zinc-900 dark:text-zinc-100">
                  {new Date(product.updatedAt).toLocaleString()}
                </span>
              </div>
              {product.approvedAt && (
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Approved At:
                  </span>{" "}
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {new Date(product.approvedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {product.approvedBy && (
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Approved By:
                  </span>{" "}
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {product.approvedBy}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/dashboard/products/${product.id}/edit`}
              className="flex-1 text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Edit Product
            </Link>
            <Link
              href="/dashboard/products"
              className="flex-1 text-center px-6 py-3 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


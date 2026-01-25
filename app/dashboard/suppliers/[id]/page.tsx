"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Supplier {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  gstNumber: string | null;
  fssaiLicense: string | null;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  stateCode: string | null;
  country: string;
  pincode: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/suppliers/${id}`);
      const data = await response.json();

      if (data.success) {
        setSupplier(data.data);
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
          <p className="text-zinc-600 dark:text-zinc-400">Loading supplier...</p>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error: {error || "Supplier not found"}
          </p>
          <Button
            onClick={() => router.push("/dashboard/suppliers")}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Suppliers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Supplier Details
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            View supplier information
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/suppliers/${id}/edit`}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Edit
          </Link>
          <Button
            onClick={() => router.push("/dashboard/suppliers")}
            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Back
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Type
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{supplier.type}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Name
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{supplier.name}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Email
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{supplier.email}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Phone
              </Label>
              <p className="text-zinc-900 dark:text-zinc-100">{supplier.phone}</p>
            </div>
            {supplier.gstNumber && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  GST Number
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100">{supplier.gstNumber}</p>
              </div>
            )}
            {supplier.fssaiLicense && (
              <div>
                <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  FSSAI License
                </Label>
                <p className="text-zinc-900 dark:text-zinc-100">{supplier.fssaiLicense}</p>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Address
          </h2>
          <div className="space-y-2">
            <p className="text-zinc-900 dark:text-zinc-100">
              {supplier.houseNo}, {supplier.line1}
              {supplier.line2 && `, ${supplier.line2}`}
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {supplier.city}, {supplier.district}, {supplier.state}
              {supplier.stateCode && ` (${supplier.stateCode})`}
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {supplier.pincode}, {supplier.country}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Created At
              </Label>
              <p className="text-zinc-600 dark:text-zinc-400">
                {new Date(supplier.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Updated At
              </Label>
              <p className="text-zinc-600 dark:text-zinc-400">
                {new Date(supplier.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

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
}

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    type: "Individual",
    name: "",
    phone: "",
    email: "",
    gstNumber: "",
    fssaiLicense: "",
    houseNo: "",
    line1: "",
    line2: "",
    city: "",
    district: "",
    state: "",
    stateCode: "",
    country: "India",
    pincode: "",
  });

  useEffect(() => {
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchSupplier = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/suppliers/${id}`);
      const data = await response.json();

      if (data.success) {
        const supplier: Supplier = data.data;
        setFormData({
          type: supplier.type,
          name: supplier.name,
          phone: supplier.phone,
          email: supplier.email,
          gstNumber: supplier.gstNumber || "",
          fssaiLicense: supplier.fssaiLicense || "",
          houseNo: supplier.houseNo,
          line1: supplier.line1,
          line2: supplier.line2 || "",
          city: supplier.city,
          district: supplier.district,
          state: supplier.state,
          stateCode: supplier.stateCode || "",
          country: supplier.country,
          pincode: supplier.pincode,
        });
      } else {
        setError(data.error);
        alert("Error fetching supplier: " + data.error);
        router.push("/dashboard/suppliers");
      }
    } catch (error: any) {
      setError(error.message);
      alert("Error fetching supplier: " + error.message);
      router.push("/dashboard/suppliers");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = INDIAN_STATES.find((s) => s.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      state: e.target.value,
      stateCode: selectedState?.code || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        gstNumber: formData.type === "Business" ? formData.gstNumber : null,
        fssaiLicense: formData.fssaiLicense || null,
        line2: formData.line2 || null,
        stateCode: formData.stateCode || null,
      };

      const response = await fetch(`/api/suppliers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Supplier updated successfully");
        router.push(`/dashboard/suppliers/${id}`);
      } else {
        setError(data.error);
        alert("Error updating supplier: " + data.error);
      }
    } catch (error: any) {
      setError(error.message);
      alert("Error updating supplier: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading supplier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Edit Supplier
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Update supplier information
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
        {/* Type Selection */}
        <div>
          <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Type <span className="text-red-500">*</span>
          </Label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* GST Number (only if Business) */}
          {formData.type === "Business" && (
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                GST Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                required={formData.type === "Business"}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Phone */}
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* FSSAI License */}
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              FSSAI License (Optional)
            </Label>
            <Input
              type="text"
              name="fssaiLicense"
              value={formData.fssaiLicense}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* House No */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                House/Flat No <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address Line 2
              </Label>
              <Input
                type="text"
                name="line2"
                value={formData.line2}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* District */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                District <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* State */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state.code} value={state.name}>
                    {state.name} ({state.code})
                  </option>
                ))}
              </Select>
            </div>

            {/* Country */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Country
              </Label>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Pincode */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Pincode <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Supplier"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push(`/dashboard/suppliers/${id}`)}
            className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


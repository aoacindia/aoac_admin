"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import Link from "next/link";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

export default function SuppliersPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form data for new supplier
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
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/suppliers");
      const data = await response.json();

      if (data.success) {
        setSuppliers(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
    setFormData({
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
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        gstNumber: formData.type === "Business" ? formData.gstNumber : null,
        fssaiLicense: formData.fssaiLicense || null,
        line2: formData.line2 || null,
        stateCode: formData.stateCode || null,
      };

      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Supplier added successfully");
        handleClosePopup();
        fetchSuppliers();
      } else {
        alert("Error adding supplier: " + data.error);
      }
    } catch (error: any) {
      alert("Error adding supplier: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier?")) {
      return;
    }

    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Supplier deleted successfully");
        fetchSuppliers();
      } else {
        alert("Error deleting supplier: " + data.error);
      }
    } catch (err: any) {
      alert("Error deleting supplier: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading suppliers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Suppliers
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your suppliers
          </p>
        </div>
        <Button
          onClick={handleOpenPopup}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
        >
          Add Supplier
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      )}

      {/* Suppliers Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Type
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Name
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Phone
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Address
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {suppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No suppliers found.
                  </TableCell>
                </TableRow>
              ) : (
                suppliers.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {supplier.type}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {supplier.name}
                      </div>
                      {supplier.gstNumber && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          GST: {supplier.gstNumber}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {supplier.email}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {supplier.phone}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {supplier.houseNo}, {supplier.line1}
                        {supplier.line2 && `, ${supplier.line2}`}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {supplier.city}, {supplier.district}, {supplier.state} - {supplier.pincode}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/suppliers/${supplier.id}`}
                          className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                          title="View"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/suppliers/${supplier.id}/edit`}
                          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          title="Edit"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleDelete(supplier.id)}
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

      {/* Add Supplier Popup */}
      {showPopup && (
        <Modal
          title="Add New Supplier"
          onClose={handleClosePopup}
          maxWidthClassName="max-w-3xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* FSSAI License (Optional) */}
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
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Adding..." : "Add Supplier"}
                </Button>
                <Button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </form>
        </Modal>
      )}
    </div>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface Business {
  id: string;
  businessName: string;
  gstNumber?: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  businesses?: Business[];
}

export default function AddBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState<User[]>([]);
  const [customerSearchHasRun, setCustomerSearchHasRun] = useState(false);
  const [searchingCustomers, setSearchingCustomers] = useState(false);
  const [customerSearchError, setCustomerSearchError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    businessName: "",
    gstNumber: "",
    hasAdditionalTradeName: false,
    additionalTradeName: "",
  });

  const [billingAddress, setBillingAddress] = useState({
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

  const handleBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomerSearch = async () => {
    const query = customerSearchQuery.trim();
    setCustomerSearchHasRun(true);
    setCustomerSearchError(null);

    if (!query) {
      setCustomerSearchResults([]);
      return;
    }

    try {
      setSearchingCustomers(true);
      const params = new URLSearchParams({
        search: query,
        searchMode: "prefix",
        page: "1",
        limit: "50",
      });
      const response = await fetch(`/api/customers?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setCustomerSearchResults(data.data || []);
      } else {
        setCustomerSearchResults([]);
        setCustomerSearchError(data.error || "Unable to search customers.");
      }
    } catch (err: unknown) {
      setCustomerSearchResults([]);
      setCustomerSearchError(
        err instanceof Error ? err.message : "Unable to search customers."
      );
    } finally {
      setSearchingCustomers(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedCustomer(user);
    setCustomerSearchQuery(
      user.businesses?.[0]?.businessName
        ? `${user.businesses[0].businessName} (${user.name})`
        : user.name
    );
    setCustomerSearchResults([]);
    setCustomerSearchHasRun(false);
    setCustomerSearchError(null);
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setCustomerSearchQuery("");
    setCustomerSearchResults([]);
    setCustomerSearchHasRun(false);
    setCustomerSearchError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a user to link this business to");
      return;
    }

    if (!formData.businessName.trim()) {
      alert("Business name is required");
      return;
    }

    if (
      !billingAddress.houseNo ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.district ||
      !billingAddress.state ||
      !billingAddress.pincode
    ) {
      alert("Please fill in all required billing address fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/customers/${selectedCustomer.id}/businesses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: formData.businessName.trim(),
            gstNumber: formData.gstNumber || null,
            hasAdditionalTradeName: formData.hasAdditionalTradeName,
            additionalTradeName: formData.hasAdditionalTradeName
              ? formData.additionalTradeName || null
              : null,
            billingAddress,
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        router.push(`/dashboard/customers/${selectedCustomer.id}`);
      } else {
        alert("Error adding business: " + data.error);
      }
    } catch (error: unknown) {
      alert(
        "Error adding business: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Add Business
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Select an existing user, then fill in the business details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Select User <span className="text-red-500">*</span>
          </h2>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                type="text"
                placeholder="Search by user name or business name"
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCustomerSearch();
                  }
                }}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                type="button"
                onClick={handleCustomerSearch}
                disabled={searchingCustomers}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {searchingCustomers ? "Searching..." : "Search"}
              </Button>
            </div>

            {customerSearchError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {customerSearchError}
              </p>
            )}

            {customerSearchHasRun &&
              !searchingCustomers &&
              customerSearchResults.length === 0 &&
              !customerSearchError && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No matching users found.
                </p>
              )}

            {customerSearchResults.length > 0 && (
              <div className="max-h-56 overflow-y-auto border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-700">
                {customerSearchResults.map((user) => (
                  <button
                    type="button"
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.email} · {user.phone}
                      {user.businesses?.[0]?.businessName
                        ? ` · ${user.businesses[0].businessName}`
                        : ""}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedCustomer && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">
                    Business will be linked to
                  </p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {selectedCustomer.name}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {selectedCustomer.email} · {selectedCustomer.phone} ·{" "}
                    {selectedCustomer.id}
                  </p>
                  {(selectedCustomer.businesses?.length ?? 0) > 0 && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Existing businesses:{" "}
                      {selectedCustomer.businesses
                        ?.map((b) => b.businessName)
                        .join(", ")}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleClearCustomer}
                  className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Change User
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                GST Number
              </Label>
              <Input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  name="hasAdditionalTradeName"
                  checked={formData.hasAdditionalTradeName}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Business has additional trade name
                </span>
              </Label>
            </div>
            {formData.hasAdditionalTradeName && (
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Additional Trade Name
                </Label>
                <Input
                  type="text"
                  name="additionalTradeName"
                  value={formData.additionalTradeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Billing Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                House/Flat No <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="houseNo"
                value={billingAddress.houseNo}
                onChange={handleBillingAddressChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="line1"
                value={billingAddress.line1}
                onChange={handleBillingAddressChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address Line 2
              </Label>
              <Input
                type="text"
                name="line2"
                value={billingAddress.line2}
                onChange={handleBillingAddressChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="city"
                value={billingAddress.city}
                onChange={handleBillingAddressChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                District <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="district"
                value={billingAddress.district}
                onChange={handleBillingAddressChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                name="state"
                value={billingAddress.state}
                onChange={(e) => {
                  const selectedState = INDIAN_STATES.find(
                    (s) => s.name === e.target.value
                  );
                  setBillingAddress((prev) => ({
                    ...prev,
                    state: e.target.value,
                    stateCode: selectedState?.code || "",
                  }));
                }}
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
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Country
              </Label>
              <Input
                type="text"
                name="country"
                value={billingAddress.country}
                onChange={handleBillingAddressChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Pincode <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="pincode"
                value={billingAddress.pincode}
                onChange={handleBillingAddressChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading || !selectedCustomer}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Business"}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

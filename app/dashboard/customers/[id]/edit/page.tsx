"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface BillingAddress {
  id: string;
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

interface Customer {
  name: string;
  email: string;
  phone: string;
  isBusinessAccount: boolean | null;
  businessName: string | null;
  gstNumber: string | null;
  hasAdditionalTradeName: boolean | null;
  additionalTradeName: string | null;
  billingAddress: BillingAddress | null;
}

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isBusinessAccount: false,
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

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/customers/${id}`);
      const data = await response.json();

      if (data.success) {
        const customer: Customer = data.data;
        setFormData({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          isBusinessAccount: customer.isBusinessAccount || false,
          businessName: customer.businessName || "",
          gstNumber: customer.gstNumber || "",
          hasAdditionalTradeName: customer.hasAdditionalTradeName || false,
          additionalTradeName: customer.additionalTradeName || "",
        });
        setIsBusinessAccount(customer.isBusinessAccount || false);

        if (customer.billingAddress) {
          setBillingAddress({
            houseNo: customer.billingAddress.houseNo,
            line1: customer.billingAddress.line1,
            line2: customer.billingAddress.line2 || "",
            city: customer.billingAddress.city,
            district: customer.billingAddress.district,
            state: customer.billingAddress.state,
            stateCode: customer.billingAddress.stateCode || "",
            country: customer.billingAddress.country,
            pincode: customer.billingAddress.pincode,
          });
        }
      } else {
        alert("Error fetching customer: " + data.error);
        router.push("/dashboard/customers");
      }
    } catch (error: any) {
      alert("Error fetching customer: " + error.message);
      router.push("/dashboard/customers");
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
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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

  const handleBusinessAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsBusinessAccount(checked);
    setFormData((prev) => ({
      ...prev,
      isBusinessAccount: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        isBusinessAccount: isBusinessAccount,
      };

      if (isBusinessAccount) {
        payload.businessName = formData.businessName;
        payload.gstNumber = formData.gstNumber;
        payload.hasAdditionalTradeName = formData.hasAdditionalTradeName;
        payload.additionalTradeName = formData.hasAdditionalTradeName ? formData.additionalTradeName : null;

        // Validate billing address if business account
        if (
          !billingAddress.houseNo ||
          !billingAddress.line1 ||
          !billingAddress.city ||
          !billingAddress.district ||
          !billingAddress.state ||
          !billingAddress.pincode
        ) {
          alert("Please fill in all required billing address fields");
          setLoading(false);
          return;
        }
        payload.billingAddress = billingAddress;
      }

      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Customer updated successfully");
        router.push("/dashboard/customers");
      } else {
        alert("Error updating customer: " + data.error);
      }
    } catch (error: any) {
      alert("Error updating customer: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading customer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Edit Customer
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Update customer information
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    checked={isBusinessAccount}
                    onChange={handleBusinessAccountChange}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Business Account
                  </span>
                </Label>
              </div>
            </div>
          </div>

          {/* Business Information */}
          {isBusinessAccount && (
            <div>
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
                    required={isBusinessAccount}
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
          )}

          {/* Billing Address (only for business accounts) */}
          {isBusinessAccount && (
            <div>
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
                    required={isBusinessAccount}
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
                    required={isBusinessAccount}
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
                    required={isBusinessAccount}
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
                    required={isBusinessAccount}
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
                      const selectedState = INDIAN_STATES.find(s => s.name === e.target.value);
                      setBillingAddress(prev => ({
                        ...prev,
                        state: e.target.value,
                        stateCode: selectedState?.code || "",
                      }));
                    }}
                    required={isBusinessAccount}
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
                    required={isBusinessAccount}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Customer"}
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
    </div>
  );
}


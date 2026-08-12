"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface BillingAddress {
  id?: string;
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

interface Business {
  id: string;
  businessName: string;
  gstNumber: string | null;
  hasAdditionalTradeName: boolean;
  additionalTradeName: string | null;
  billingAddress?: BillingAddress | null;
}

type BillingForm = {
  houseNo: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  state: string;
  stateCode: string;
  country: string;
  pincode: string;
};

type BusinessForm = {
  businessName: string;
  gstNumber: string;
  hasAdditionalTradeName: boolean;
  additionalTradeName: string;
  billingAddress: BillingForm;
};

const emptyBilling = (): BillingForm => ({
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

const emptyBusinessForm = (): BusinessForm => ({
  businessName: "",
  gstNumber: "",
  hasAdditionalTradeName: false,
  additionalTradeName: "",
  billingAddress: emptyBilling(),
});

function billingFromApi(billing?: BillingAddress | null): BillingForm {
  if (!billing) return emptyBilling();
  return {
    houseNo: billing.houseNo || "",
    line1: billing.line1 || "",
    line2: billing.line2 || "",
    city: billing.city || "",
    district: billing.district || "",
    state: billing.state || "",
    stateCode: billing.stateCode || "",
    country: billing.country || "India",
    pincode: billing.pincode || "",
  };
}

function businessToForm(business: Business): BusinessForm {
  return {
    businessName: business.businessName || "",
    gstNumber: business.gstNumber || "",
    hasAdditionalTradeName: business.hasAdditionalTradeName || false,
    additionalTradeName: business.additionalTradeName || "",
    billingAddress: billingFromApi(business.billingAddress),
  };
}

function validateBilling(billing: BillingForm): boolean {
  return Boolean(
    billing.houseNo &&
      billing.line1 &&
      billing.city &&
      billing.district &&
      billing.state &&
      billing.pincode
  );
}

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [savingBusinessId, setSavingBusinessId] = useState<string | null>(null);
  const [addingBusiness, setAddingBusiness] = useState(false);
  const [deletingBusinessId, setDeletingBusinessId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessForms, setBusinessForms] = useState<Record<string, BusinessForm>>({});
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [newBusiness, setNewBusiness] = useState<BusinessForm>(emptyBusinessForm());

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const applyBusinesses = (list: Business[]) => {
    setBusinesses(list);
    const forms: Record<string, BusinessForm> = {};
    for (const business of list) {
      forms[business.id] = businessToForm(business);
    }
    setBusinessForms(forms);
  };

  const fetchCustomer = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/customers/${id}`);
      const data = await response.json();

      if (data.success) {
        setFormData({
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
        });
        applyBusinesses(data.data.businesses || []);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateBusinessForm = (
    businessId: string,
    updater: (prev: BusinessForm) => BusinessForm
  ) => {
    setBusinessForms((prev) => ({
      ...prev,
      [businessId]: updater(prev[businessId] || emptyBusinessForm()),
    }));
  };

  const handleSubmitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Customer account updated successfully");
      } else {
        alert("Error updating customer: " + data.error);
      }
    } catch (error: any) {
      alert("Error updating customer: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusiness = async (businessId: string) => {
    const form = businessForms[businessId];
    if (!form) return;

    if (!form.businessName.trim()) {
      alert("Business name is required");
      return;
    }
    if (!validateBilling(form.billingAddress)) {
      alert("Please fill in all required billing address fields");
      return;
    }

    setSavingBusinessId(businessId);
    try {
      const response = await fetch(`/api/customers/${id}/businesses/${businessId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          gstNumber: form.gstNumber || null,
          hasAdditionalTradeName: form.hasAdditionalTradeName,
          additionalTradeName: form.hasAdditionalTradeName
            ? form.additionalTradeName || null
            : null,
          billingAddress: form.billingAddress,
        }),
      });
      const data = await response.json();
      if (data.success) {
        applyBusinesses(
          businesses.map((b) => (b.id === businessId ? data.data : b))
        );
        alert("Business updated successfully");
      } else {
        alert("Error updating business: " + data.error);
      }
    } catch (error: any) {
      alert("Error updating business: " + error.message);
    } finally {
      setSavingBusinessId(null);
    }
  };

  const handleDeleteBusiness = async (businessId: string) => {
    if (!confirm("Delete this business? This cannot be undone if it has no linked orders.")) {
      return;
    }
    setDeletingBusinessId(businessId);
    try {
      const response = await fetch(`/api/customers/${id}/businesses/${businessId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        const next = businesses.filter((b) => b.id !== businessId);
        applyBusinesses(next);
      } else {
        alert("Error deleting business: " + data.error);
      }
    } catch (error: any) {
      alert("Error deleting business: " + error.message);
    } finally {
      setDeletingBusinessId(null);
    }
  };

  const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusiness.businessName.trim()) {
      alert("Business name is required");
      return;
    }
    if (!validateBilling(newBusiness.billingAddress)) {
      alert("Please fill in all required billing address fields");
      return;
    }

    setAddingBusiness(true);
    try {
      const response = await fetch(`/api/customers/${id}/businesses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: newBusiness.businessName,
          gstNumber: newBusiness.gstNumber || null,
          hasAdditionalTradeName: newBusiness.hasAdditionalTradeName,
          additionalTradeName: newBusiness.hasAdditionalTradeName
            ? newBusiness.additionalTradeName || null
            : null,
          billingAddress: newBusiness.billingAddress,
        }),
      });
      const data = await response.json();
      if (data.success) {
        applyBusinesses([...businesses, data.data]);
        setNewBusiness(emptyBusinessForm());
        setShowAddBusiness(false);
        alert("Business added successfully");
      } else {
        alert("Error adding business: " + data.error);
      }
    } catch (error: any) {
      alert("Error adding business: " + error.message);
    } finally {
      setAddingBusiness(false);
    }
  };

  const renderBillingFields = (
    billing: BillingForm,
    onChange: (next: BillingForm) => void,
    required: boolean
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          House/Flat No {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          value={billing.houseNo}
          onChange={(e) => onChange({ ...billing, houseNo: e.target.value })}
          required={required}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Address Line 1 {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          value={billing.line1}
          onChange={(e) => onChange({ ...billing, line1: e.target.value })}
          required={required}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Address Line 2
        </Label>
        <Input
          type="text"
          value={billing.line2}
          onChange={(e) => onChange({ ...billing, line2: e.target.value })}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          City {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          value={billing.city}
          onChange={(e) => onChange({ ...billing, city: e.target.value })}
          required={required}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          District {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          value={billing.district}
          onChange={(e) => onChange({ ...billing, district: e.target.value })}
          required={required}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          State {required && <span className="text-red-500">*</span>}
        </Label>
        <Select
          value={billing.state}
          onChange={(e) => {
            const selectedState = INDIAN_STATES.find((s) => s.name === e.target.value);
            onChange({
              ...billing,
              state: e.target.value,
              stateCode: selectedState?.code || "",
            });
          }}
          required={required}
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
          value={billing.country}
          onChange={(e) => onChange({ ...billing, country: e.target.value })}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Pincode {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          value={billing.pincode}
          onChange={(e) => onChange({ ...billing, pincode: e.target.value })}
          required={required}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderBusinessFields = (
    form: BusinessForm,
    onChange: (next: BusinessForm) => void
  ) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Business Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={form.businessName}
            onChange={(e) => onChange({ ...form, businessName: e.target.value })}
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
            value={form.gstNumber}
            onChange={(e) => onChange({ ...form, gstNumber: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <Label className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={form.hasAdditionalTradeName}
              onChange={(e) =>
                onChange({ ...form, hasAdditionalTradeName: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Business has additional trade name
            </span>
          </Label>
        </div>
        {form.hasAdditionalTradeName && (
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Additional Trade Name
            </Label>
            <Input
              type="text"
              value={form.additionalTradeName}
              onChange={(e) =>
                onChange({ ...form, additionalTradeName: e.target.value })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
          Billing Address
        </h3>
        {renderBillingFields(
          form.billingAddress,
          (billingAddress) => onChange({ ...form, billingAddress }),
          true
        )}
      </div>
    </div>
  );

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
          Update account details and manage businesses
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <form onSubmit={handleSubmitAccount} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Account Information
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
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Account"}
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

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Businesses ({businesses.length})
          </h2>
          <Button
            type="button"
            onClick={() => {
              setShowAddBusiness(true);
              setNewBusiness(emptyBusinessForm());
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Add Business
          </Button>
        </div>

        {businesses.length === 0 && !showAddBusiness && (
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            No businesses yet. Add one to make this a business customer.
          </p>
        )}

        <div className="space-y-6">
          {businesses.map((business) => {
            const form = businessForms[business.id] || businessToForm(business);
            return (
              <div
                key={business.id}
                className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 md:p-6 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {business.businessName}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{business.id}</p>
                </div>
                {renderBusinessFields(form, (next) =>
                  updateBusinessForm(business.id, () => next)
                )}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={() => handleSaveBusiness(business.id)}
                    disabled={savingBusinessId === business.id}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {savingBusinessId === business.id ? "Saving..." : "Save Business"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDeleteBusiness(business.id)}
                    disabled={deletingBusinessId === business.id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deletingBusinessId === business.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            );
          })}

          {showAddBusiness && (
            <form
              onSubmit={handleAddBusiness}
              className="border border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 md:p-6 space-y-4 bg-blue-50/40 dark:bg-blue-950/20"
            >
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                New Business
              </h3>
              {renderBusinessFields(newBusiness, setNewBusiness)}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={addingBusiness}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {addingBusiness ? "Adding..." : "Create Business"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddBusiness(false);
                    setNewBusiness(emptyBusinessForm());
                  }}
                  className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

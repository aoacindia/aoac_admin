"use client";

import { useEffect, useState } from "react";
import { INDIAN_STATES } from "@/lib/indian-states";
import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isBusinessAccount: boolean | null;
  businessName: string | null;
}

interface Address {
  id: string;
  userId: string;
  type: string;
  name: string;
  phone: string;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  stateCode: string | null;
  country: string;
  pincode: string;
  isDefault: boolean;
  createdAt: string;
  user: User;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [billingAddress, setBillingAddress] = useState<any>(null);
  const [loadingBillingAddress, setLoadingBillingAddress] = useState(false);

  // Search filters
  const [searchFilters, setSearchFilters] = useState({
    pincode: "",
    district: "",
    state: "",
    userName: "",
    businessName: "",
  });

  // Form data for new address
  const [formData, setFormData] = useState({
    userId: "",
    type: "Home",
    name: "",
    phone: "",
    houseNo: "",
    line1: "",
    line2: "",
    city: "",
    district: "",
    state: "",
    stateCode: "",
    country: "India",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
    fetchUsers();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchFilters.pincode) params.append("pincode", searchFilters.pincode);
      if (searchFilters.district) params.append("district", searchFilters.district);
      if (searchFilters.state) params.append("state", searchFilters.state);
      if (searchFilters.userName) params.append("userName", searchFilters.userName);
      if (searchFilters.businessName) params.append("businessName", searchFilters.businessName);

      const url = params.toString() 
        ? `/api/addresses?${params.toString()}`
        : "/api/addresses";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAddresses(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch("/api/customers");
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (err: any) {
      console.error("Error fetching users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSearch = () => {
    fetchAddresses();
  };

  const handleReset = () => {
    setSearchFilters({
      pincode: "",
      district: "",
      state: "",
      userName: "",
      businessName: "",
    });
    setTimeout(() => {
      fetchAddresses();
    }, 100);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
    // Reset form when opening
    setFormData({
      userId: "",
      type: "Home",
      name: "",
      phone: "",
      houseNo: "",
      line1: "",
      line2: "",
      city: "",
      district: "",
      state: "",
      stateCode: "",
      country: "India",
      pincode: "",
      isDefault: false,
    });
    setBillingAddress(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      userId: address.userId,
      type: address.type,
      name: address.name,
      phone: address.phone,
      houseNo: address.houseNo,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      district: address.district,
      state: address.state,
      stateCode: address.stateCode || "",
      country: address.country,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setEditingAddress(null);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress) return;

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(`/api/addresses/${editingAddress.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchAddresses();
        handleCloseEditPopup();
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
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

  const handleUserSelect = async (userId: string) => {
    const selectedUser = users.find((u) => u.id === userId);
    if (selectedUser) {
      setFormData((prev) => ({
        ...prev,
        userId,
        name: selectedUser.name,
        phone: selectedUser.phone,
      }));

      // Fetch billing address if it's a business account
      if (selectedUser.isBusinessAccount) {
        await fetchBillingAddress(userId);
      } else {
        setBillingAddress(null);
      }
    }
  };

  const fetchBillingAddress = async (userId: string) => {
    try {
      setLoadingBillingAddress(true);
      const response = await fetch(`/api/customers/${userId}`);
      const data = await response.json();

      if (data.success && data.data.billingAddress) {
        setBillingAddress(data.data.billingAddress);
      } else {
        setBillingAddress(null);
      }
    } catch (err: any) {
      console.error("Error fetching billing address:", err);
      setBillingAddress(null);
    } finally {
      setLoadingBillingAddress(false);
    }
  };

  const handleCopyBillingAddress = () => {
    if (billingAddress) {
      setFormData((prev) => ({
        ...prev,
        houseNo: billingAddress.houseNo || "",
        line1: billingAddress.line1 || "",
        line2: billingAddress.line2 || "",
        city: billingAddress.city || "",
        district: billingAddress.district || "",
        state: billingAddress.state || "",
        stateCode: billingAddress.stateCode || "",
        country: billingAddress.country || "India",
        pincode: billingAddress.pincode || "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("Please select a customer");
      return;
    }

    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Address added successfully");
        handleClosePopup();
        fetchAddresses();
      } else {
        alert("Error adding address: " + data.error);
      }
    } catch (error: any) {
      alert("Error adding address: " + error.message);
    }
  };

  if (loading && addresses.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            All Addresses
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage customer addresses
          </p>
        </div>
        <Button
          onClick={handleOpenPopup}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
        >
          Add Address
        </Button>
      </div>

      {/* Search Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Search Addresses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Pincode
            </Label>
            <Input
              type="text"
              value={searchFilters.pincode}
              onChange={(e) =>
                setSearchFilters((prev) => ({ ...prev, pincode: e.target.value }))
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              District
            </Label>
            <Input
              type="text"
              value={searchFilters.district}
              onChange={(e) =>
                setSearchFilters((prev) => ({ ...prev, district: e.target.value }))
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              State
            </Label>
            <Input
              type="text"
              value={searchFilters.state}
              onChange={(e) =>
                setSearchFilters((prev) => ({ ...prev, state: e.target.value }))
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              User Name
            </Label>
            <Input
              type="text"
              value={searchFilters.userName}
              onChange={(e) =>
                setSearchFilters((prev) => ({ ...prev, userName: e.target.value }))
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Business Name
            </Label>
            <Input
              type="text"
              value={searchFilters.businessName}
              onChange={(e) =>
                setSearchFilters((prev) => ({ ...prev, businessName: e.target.value }))
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search
          </Button>
          <Button
            onClick={handleReset}
            className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Addresses List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Addresses ({addresses.length})
        </h2>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        )}
        {addresses.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No addresses found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-zinc-200 dark:border-zinc-700">
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Customer
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Type
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Address
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    City/District/State
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Pincode
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Default
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((address) => (
                  <TableRow
                    key={address.id}
                    className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {address.user.isBusinessAccount && address.user.businessName
                          ? address.user.businessName
                          : address.user.name}
                      </div>
                      {address.user.isBusinessAccount && address.user.businessName && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {address.user.name}
                        </div>
                      )}
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {address.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {address.type}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        {address.houseNo}, {address.line1}
                      </div>
                      {address.line2 && (
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {address.line2}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {address.city}, {address.district}, {address.state}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {address.pincode}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {address.isDefault ? (
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          Default
                        </span>
                      ) : (
                        <span className="text-zinc-400 dark:text-zinc-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Button
                        onClick={() => handleEditAddress(address)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add Address Popup */}
      {showPopup && (
        <Modal
          title="Add New Address"
          onClose={handleClosePopup}
          maxWidthClassName="max-w-2xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Selection */}
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Customer <span className="text-red-500">*</span>
                </Label>
                {loadingUsers ? (
                  <p className="text-zinc-600 dark:text-zinc-400">Loading customers...</p>
                ) : (
                  <Select
                    name="userId"
                    value={formData.userId}
                    onChange={(e) => handleUserSelect(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.isBusinessAccount && user.businessName
                          ? `${user.businessName} (${user.name})`
                          : user.name}{" "}
                        - {user.email}
                      </option>
                    ))}
                  </Select>
                )}
                {/* Billing Address Copy Option */}
                {formData.userId && (
                  <div className="mt-3">
                    {loadingBillingAddress ? (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Checking for billing address...
                      </p>
                    ) : billingAddress ? (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                          Billing address found for this business
                        </p>
                        <Button
                          type="button"
                          onClick={handleCopyBillingAddress}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copy Billing Address
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {users.find((u) => u.id === formData.userId)?.isBusinessAccount
                          ? "No billing address found for this business"
                          : ""}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Address Type */}
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Address Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
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
                    onChange={(e) => {
                      const selectedState = INDIAN_STATES.find(s => s.name === e.target.value);
                      setFormData(prev => ({
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

              {/* Is Default */}
              <div>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Set as default address
                  </span>
                </Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Address
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

      {/* Edit Address Popup */}
      {showEditPopup && editingAddress && (
        <Modal
          title="Edit Address"
          onClose={handleCloseEditPopup}
          maxWidthClassName="max-w-2xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleUpdateAddress} className="space-y-4">
              {/* Customer Info (Read-only) */}
              <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Customer</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {editingAddress.user.isBusinessAccount && editingAddress.user.businessName
                    ? `${editingAddress.user.businessName} (${editingAddress.user.name})`
                    : editingAddress.user.name}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{editingAddress.user.email}</p>
              </div>

              {/* Address Type */}
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Address Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
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

                {/* Phone */}
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* House No */}
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    House No <span className="text-red-500">*</span>
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
                    onChange={(e) => {
                      const selectedState = INDIAN_STATES.find(s => s.name === e.target.value);
                      setFormData(prev => ({
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

              {/* Is Default */}
              <div>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Set as default address
                  </span>
                </Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Updating..." : "Update Address"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseEditPopup}
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


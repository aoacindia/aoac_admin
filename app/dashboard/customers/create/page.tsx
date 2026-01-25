"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BulkCsvRecord = {
  name: string;
  email: string;
  phone: string;
  accountType: string;
  businessName: string;
  gstNumber: string;
  hasAdditionalTradeName: string;
  additionalTradeName: string;
  billingHouseNo: string;
  billingLine1: string;
  billingLine2: string;
  billingCity: string;
  billingDistrict: string;
  billingState: string;
  billingStateCode: string;
  billingCountry: string;
  billingPincode: string;
};

type BulkPreviewRow = {
  rowNumber: number;
  expectedId: string;
  data: {
    name: string;
    email: string;
    phone: string;
    isBusinessAccount: boolean;
    businessName: string | null;
    gstNumber: string | null;
    hasAdditionalTradeName: boolean;
    additionalTradeName: string | null;
    billingAddress: {
      houseNo: string;
      line1: string;
      line2: string | null;
      city: string;
      district: string;
      state: string;
      stateCode: string | null;
      country: string;
      pincode: string;
    } | null;
  };
  errors: string[];
};

export default function CreateCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [bulkRecords, setBulkRecords] = useState<BulkCsvRecord[]>([]);
  const [bulkPreviewRows, setBulkPreviewRows] = useState<BulkPreviewRow[]>([]);
  const [bulkValid, setBulkValid] = useState(false);
  const [bulkFileName, setBulkFileName] = useState("");
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState("");
  const [bulkError, setBulkError] = useState<string | null>(null);

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
        if (!formData.businessName) {
          alert("Business name is required for business accounts");
          setLoading(false);
          return;
        }
        payload.businessName = formData.businessName;
        payload.gstNumber = formData.gstNumber;
        payload.hasAdditionalTradeName = formData.hasAdditionalTradeName;
        payload.additionalTradeName = formData.hasAdditionalTradeName ? formData.additionalTradeName : null;

        // Validate billing address
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

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard/customers");
      } else {
        alert("Error creating customer: " + data.error);
      }
    } catch (error: any) {
      alert("Error creating customer: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const parseCsvLine = (line: string) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current);
    return result.map((value) => value.trim());
  };

  const parseCsv = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) return [];

    const headers = parseCsvLine(lines[0]).map((header) => header.trim());
    return lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      return headers.reduce<Record<string, string>>((acc, header, index) => {
        acc[header] = values[index] ?? "";
        return acc;
      }, {});
    });
  };

  const mapCsvRowToRecord = (row: Record<string, string>): BulkCsvRecord => ({
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    accountType: row.accountType || row.userType || row.type || "",
    businessName: row.businessName || "",
    gstNumber: row.gstNumber || "",
    hasAdditionalTradeName: row.hasAdditionalTradeName || "",
    additionalTradeName: row.additionalTradeName || "",
    billingHouseNo: row.billingHouseNo || "",
    billingLine1: row.billingLine1 || "",
    billingLine2: row.billingLine2 || "",
    billingCity: row.billingCity || "",
    billingDistrict: row.billingDistrict || "",
    billingState: row.billingState || "",
    billingStateCode: row.billingStateCode || "",
    billingCountry: row.billingCountry || "",
    billingPincode: row.billingPincode || "",
  });

  const resetBulkState = () => {
    setBulkRecords([]);
    setBulkPreviewRows([]);
    setBulkValid(false);
    setBulkFileName("");
    setBulkError(null);
  };

  const handleCsvUpload = async (file: File) => {
    setBulkProcessing(true);
    setBulkError(null);
    setProcessStatus("Reading CSV file");

    try {
      const csvText = await file.text();
      setProcessStatus("Parsing CSV");
      const parsedRows = parseCsv(csvText);

      if (!parsedRows.length) {
        setBulkError("CSV is empty or has no data rows.");
        setBulkProcessing(false);
        return;
      }

      const records = parsedRows.map(mapCsvRowToRecord);
      setBulkRecords(records);

      setProcessStatus("Validating data and generating IDs");
      const response = await fetch("/api/customers/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records, dryRun: true }),
      });

      const data = await response.json();
      if (!data.success) {
        setBulkError(data.error || "Failed to preview bulk customers.");
        setBulkProcessing(false);
        return;
      }

      setBulkPreviewRows(data.data.rows);
      setBulkValid(Boolean(data.data.valid));
    } catch (error: any) {
      setBulkError(error.message || "Failed to process CSV file.");
    } finally {
      setProcessStatus("");
      setBulkProcessing(false);
    }
  };

  const handleBulkConfirm = async () => {
    if (!bulkRecords.length) return;
    setBulkProcessing(true);
    setBulkError(null);
    setProcessStatus("Saving customers");

    try {
      const response = await fetch("/api/customers/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: bulkRecords, dryRun: false }),
      });

      const data = await response.json();
      if (!data.success) {
        setBulkError(data.error || "Failed to save bulk customers.");
        setBulkPreviewRows(data.data?.rows || bulkPreviewRows);
        setBulkValid(false);
        return;
      }

      router.push("/dashboard/customers");
    } catch (error: any) {
      setBulkError(error.message || "Failed to save bulk customers.");
    } finally {
      setProcessStatus("");
      setBulkProcessing(false);
    }
  };

  const downloadSampleCsv = () => {
    const sampleHeaders = [
      "name",
      "email",
      "phone",
      "accountType",
      "businessName",
      "gstNumber",
      "hasAdditionalTradeName",
      "additionalTradeName",
      "billingHouseNo",
      "billingLine1",
      "billingLine2",
      "billingCity",
      "billingDistrict",
      "billingState",
      "billingStateCode",
      "billingCountry",
      "billingPincode",
    ];

    const sampleRows = [
      [
        "Aman Verma",
        "aman@example.com",
        "9876543210",
        "individual",
        "",
        "",
        "false",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Nexa Foods",
        "accounts@nexafoods.com",
        "9876500001",
        "business",
        "Nexa Foods Pvt Ltd",
        "27ABCDE1234F1Z5",
        "true",
        "Nexa Kitchens",
        "12B",
        "Main Road",
        "Industrial Area",
        "Mumbai",
        "Mumbai",
        "Maharashtra",
        "MH",
        "India",
        "400001",
      ],
    ];

    const csvContent = [sampleHeaders.join(","), ...sampleRows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bulk-customers-sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Create Customer
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Add a new customer to your system
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Bulk Customer Creation (CSV)
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Upload a CSV file to generate IDs and confirm before saving.
            </p>
          </div>
          <Button
            type="button"
            onClick={downloadSampleCsv}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-lg transition-colors"
          >
            Download Sample CSV
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setBulkFileName(file.name);
                handleCsvUpload(file);
              }
            }}
            className="w-full md:w-auto text-sm text-zinc-600 dark:text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {bulkFileName && (
            <Button
              type="button"
              onClick={resetBulkState}
              className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 rounded-lg transition-colors"
            >
              Clear CSV
            </Button>
          )}
        </div>

        {(bulkProcessing || processStatus) && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            <span className="font-semibold">Processing:</span>{" "}
            <span className={bulkProcessing ? "animate-pulse" : ""}>
              {processStatus || "Working..."}
            </span>
          </div>
        )}

        {bulkError && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {bulkError}
          </div>
        )}

        {bulkPreviewRows.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {bulkValid
                  ? "All rows look good. Review the expected IDs and confirm."
                  : "Fix the highlighted issues before confirming."}
              </p>
              <Button
                type="button"
                disabled={!bulkValid || bulkProcessing}
                onClick={handleBulkConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bulkProcessing ? "Saving..." : "Confirm & Save"}
              </Button>
            </div>

            <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <Table className="min-w-full text-sm">
                <TableHeader className="bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <TableRow>
                    <TableHead className="px-4 py-3 text-left">Row</TableHead>
                    <TableHead className="px-4 py-3 text-left">Expected ID</TableHead>
                    <TableHead className="px-4 py-3 text-left">Name</TableHead>
                    <TableHead className="px-4 py-3 text-left">Email</TableHead>
                    <TableHead className="px-4 py-3 text-left">Phone</TableHead>
                    <TableHead className="px-4 py-3 text-left">Account Type</TableHead>
                    <TableHead className="px-4 py-3 text-left">Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bulkPreviewRows.map((row) => (
                    <TableRow
                      key={`${row.rowNumber}-${row.expectedId}`}
                      className={`border-t border-zinc-200 dark:border-zinc-800 ${
                        row.errors.length ? "bg-red-50 dark:bg-red-950/40" : "bg-white dark:bg-zinc-900"
                      }`}
                    >
                      <TableCell className="px-4 py-3">{row.rowNumber}</TableCell>
                      <TableCell className="px-4 py-3 font-medium text-blue-700 dark:text-blue-300">
                        {row.expectedId}
                      </TableCell>
                      <TableCell className="px-4 py-3">{row.data.name}</TableCell>
                      <TableCell className="px-4 py-3">{row.data.email}</TableCell>
                      <TableCell className="px-4 py-3">{row.data.phone}</TableCell>
                      <TableCell className="px-4 py-3">
                        {row.data.isBusinessAccount ? "Business" : "Individual"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-red-600 dark:text-red-300">
                        {row.errors.length ? row.errors.join(", ") : "OK"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
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
              {loading ? "Creating..." : "Create Customer"}
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


"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Account {
  id: string;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  swiftCode?: string | null;
  bankName: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

const EMPTY_FORM = {
  accountHolderName: "",
  accountNumber: "",
  ifsc: "",
  branch: "",
  swiftCode: "",
  bankName: "",
  isDefault: false,
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/accounts");
      const data = await response.json();
      if (data.success) {
        setAccounts(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to load accounts");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = () => {
    setEditingAccountId(null);
    setFormData(EMPTY_FORM);
    setShowPopup(true);
  };

  const handleEditPopup = (account: Account) => {
    setEditingAccountId(account.id);
    setFormData({
      accountHolderName: account.accountHolderName,
      accountNumber: account.accountNumber,
      ifsc: account.ifsc,
      branch: account.branch,
      swiftCode: account.swiftCode || "",
      bankName: account.bankName,
      isDefault: account.isDefault,
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDefaultChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      isDefault: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        accountHolderName: formData.accountHolderName.trim(),
        accountNumber: formData.accountNumber.trim(),
        ifsc: formData.ifsc.trim(),
        branch: formData.branch.trim(),
        swiftCode: formData.swiftCode.trim(),
        bankName: formData.bankName.trim(),
        isDefault: formData.isDefault,
      };

      const url = editingAccountId ? `/api/accounts/${editingAccountId}` : "/api/accounts";
      const method = editingAccountId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingAccountId ? "Account updated successfully" : "Account added successfully");
        handleClosePopup();
        fetchAccounts();
      } else {
        alert(data.error || "Failed to save account");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save account");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this account?")) {
      return;
    }

    try {
      const response = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Account deleted successfully");
        fetchAccounts();
      } else {
        alert(data.error || "Failed to delete account");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Accounts
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage bank account details</p>
        </div>
        <Button
          onClick={handleOpenPopup}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
        >
          Add Account
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Account Holder
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Account Number
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  IFSC
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Branch
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Swift Code
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Bank Name
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Default
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No accounts found.
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((account) => (
                  <TableRow key={account.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {account.accountHolderName}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {account.accountNumber}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{account.ifsc}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{account.branch}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {account.swiftCode || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{account.bankName}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {account.isDefault ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditPopup(account)}
                          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          title="Edit"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(account.id)}
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

      {showPopup && (
        <Modal
          title={editingAccountId ? "Edit Account" : "Add New Account"}
          onClose={handleClosePopup}
          maxWidthClassName="max-w-3xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Account Holder Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  IFSC <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Branch <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Swift Code
                </Label>
                <Input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Bank Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Default to Receive Payment
              </Label>
              <Select
                name="isDefault"
                value={formData.isDefault ? "true" : "false"}
                onChange={handleDefaultChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving..." : editingAccountId ? "Update Account" : "Add Account"}
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


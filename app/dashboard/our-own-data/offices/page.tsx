"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Office {
  id: string;
  gstin: string;
  address: string;
  state: string;
  stateCode: string;
  createdAt: string;
  updatedAt: string;
}

const EMPTY_FORM = {
  gstin: "",
  address: "",
  state: "",
  stateCode: "",
};

export default function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/offices");
      const data = await response.json();
      if (data.success) {
        setOffices(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to load offices");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load offices");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = () => {
    setEditingOfficeId(null);
    setFormData(EMPTY_FORM);
    setShowPopup(true);
  };

  const handleEditPopup = (office: Office) => {
    setEditingOfficeId(office.id);
    setFormData({
      gstin: office.gstin,
      address: office.address,
      state: office.state,
      stateCode: office.stateCode,
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        gstin: formData.gstin.trim(),
        address: formData.address.trim(),
        state: formData.state,
        stateCode: formData.stateCode,
      };

      const url = editingOfficeId ? `/api/offices/${editingOfficeId}` : "/api/offices";
      const method = editingOfficeId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingOfficeId ? "Office updated successfully" : "Office added successfully");
        handleClosePopup();
        fetchOffices();
      } else {
        alert(data.error || "Failed to save office");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save office");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this office?")) {
      return;
    }

    try {
      const response = await fetch(`/api/offices/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Office deleted successfully");
        fetchOffices();
      } else {
        alert(data.error || "Failed to delete office");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete office");
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading offices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Offices
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage your office records</p>
        </div>
        <Button
          onClick={handleOpenPopup}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
        >
          Add Office
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
                  GSTIN
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Address
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  State
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {offices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No offices found.
                  </TableCell>
                </TableRow>
              ) : (
                offices.map((office) => (
                  <TableRow key={office.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{office.gstin}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{office.address}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.state} ({office.stateCode})
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditPopup(office)}
                          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          title="Edit"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(office.id)}
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
          title={editingOfficeId ? "Edit Office" : "Add New Office"}
          onClose={handleClosePopup}
          maxWidthClassName="max-w-2xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  GSTIN <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  State (with code) <span className="text-red-500">*</span>
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
            </div>
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving..." : editingOfficeId ? "Update Office" : "Add Office"}
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



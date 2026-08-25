"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import { INDIAN_STATES } from "@/lib/indian-states";
import {
  OFFICE_CUSTOM_DOC_TYPE,
  OFFICE_FIXED_DOC_TYPES,
} from "@/lib/office-documents";
import {
  compressFileForUpload,
  type CompressPhase,
} from "@/lib/compress-for-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Office {
  id: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  pincode?: string | null;
  country?: string | null;
  createdAt: string;
  updatedAt: string;
}

type OfficeDocument = {
  id: string;
  officeId: string;
  docType: string;
  name: string;
  filePath: string;
  originalFilename: string | null;
  mimeType: string | null;
  fileSize: number | null;
  createdAt: string;
  updatedAt: string;
};

const EMPTY_FORM = {
  gstin: "",
  address: "",
  city: "",
  state: "",
  stateCode: "",
  pincode: "",
  country: "",
};

type UploadRow = {
  localId: string;
  name: string;
  file: File | null;
};

function newUploadRow(): UploadRow {
  return {
    localId: `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    file: null,
  };
}

const FILE_ACCEPT =
  ".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp";

export default function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [docsOffice, setDocsOffice] = useState<Office | null>(null);
  const [documents, setDocuments] = useState<OfficeDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadPhase, setUploadPhase] = useState<CompressPhase>("idle");
  const [uploadPhaseMessage, setUploadPhaseMessage] = useState<string>("");
  const [uploadRows, setUploadRows] = useState<UploadRow[]>([newUploadRow()]);

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load offices");
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
      city: office.city,
      state: office.state,
      stateCode: office.stateCode,
      pincode: office.pincode || "",
      country: office.country || "",
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        city: formData.city.trim(),
        state: formData.state,
        stateCode: formData.stateCode,
        pincode: formData.pincode.trim(),
        country: formData.country.trim(),
      };

      const url = editingOfficeId
        ? `/api/offices/${editingOfficeId}`
        : "/api/offices";
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
        alert(
          editingOfficeId
            ? "Office updated successfully"
            : "Office added successfully"
        );
        handleClosePopup();
        fetchOffices();
      } else {
        alert(data.error || "Failed to save office");
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save office");
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
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete office");
    }
  };

  const openDocuments = async (office: Office) => {
    setDocsOffice(office);
    setUploadRows([newUploadRow()]);
    await loadDocuments(office.id);
  };

  const loadDocuments = async (officeId: string) => {
    try {
      setLoadingDocs(true);
      const res = await fetch(`/api/offices/${officeId}/documents`);
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Failed to load documents");
        setDocuments([]);
        return;
      }
      setDocuments(data.data.documents || []);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to load documents");
      setDocuments([]);
    } finally {
      setLoadingDocs(false);
    }
  };

  const uploadDocument = async (
    officeId: string,
    file: File,
    options: { docType: string; name?: string }
  ) => {
    const { file: readyFile } = await compressFileForUpload(file, (p) => {
      setUploadPhase(p.phase);
      setUploadPhaseMessage(p.message || "");
    });
    setUploadPhase("uploading");
    setUploadPhaseMessage("Uploading…");

    const body = new FormData();
    body.append("file", readyFile);
    body.append("docType", options.docType);
    if (options.name) body.append("name", options.name);

    const res = await fetch(`/api/offices/${officeId}/documents`, {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Upload failed");
    }
    return data.data as OfficeDocument;
  };

  const findDocForType = (type: string) =>
    documents.find((d) => d.docType === type) || null;

  const extraDocuments = documents.filter(
    (d) => d.docType === OFFICE_CUSTOM_DOC_TYPE
  );

  const handleFixedUpload = async (docType: string, file: File | null) => {
    if (!docsOffice || !file) return;
    setUploadingKey(docType);
    setUploadPhase("idle");
    setUploadPhaseMessage("");
    try {
      await uploadDocument(docsOffice.id, file, { docType });
      await loadDocuments(docsOffice.id);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingKey(null);
      setUploadPhase("idle");
      setUploadPhaseMessage("");
    }
  };

  const updateUploadRow = (
    localId: string,
    patch: Partial<Pick<UploadRow, "name" | "file">>
  ) => {
    setUploadRows((prev) =>
      prev.map((row) => (row.localId === localId ? { ...row, ...patch } : row))
    );
  };

  const addUploadRow = () => {
    setUploadRows((prev) => [...prev, newUploadRow()]);
  };

  const removeUploadRow = (localId: string) => {
    setUploadRows((prev) => {
      if (prev.length <= 1) {
        return [newUploadRow()];
      }
      return prev.filter((row) => row.localId !== localId);
    });
  };

  const handleUploadRow = async (row: UploadRow) => {
    if (!docsOffice) return;
    if (!row.name.trim()) {
      alert("Please enter a document name");
      return;
    }
    if (!row.file) {
      alert("Please choose a file");
      return;
    }
    setUploadingKey(row.localId);
    setUploadPhase("idle");
    setUploadPhaseMessage("");
    try {
      await uploadDocument(docsOffice.id, row.file, {
        docType: OFFICE_CUSTOM_DOC_TYPE,
        name: row.name.trim(),
      });
      setUploadRows((prev) => {
        const remaining = prev.filter((r) => r.localId !== row.localId);
        return remaining.length > 0 ? remaining : [newUploadRow()];
      });
      await loadDocuments(docsOffice.id);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingKey(null);
      setUploadPhase("idle");
      setUploadPhaseMessage("");
    }
  };

  const openDoc = (doc: OfficeDocument, disposition: "inline" | "attachment") => {
    if (!docsOffice) return;
    const url = `/api/offices/${docsOffice.id}/documents/${doc.id}?disposition=${disposition}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDeleteDoc = async (doc: OfficeDocument) => {
    if (!docsOffice) return;
    if (!confirm(`Delete "${doc.name}"?`)) return;
    try {
      const res = await fetch(
        `/api/offices/${docsOffice.id}/documents/${doc.id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Failed to delete");
        return;
      }
      await loadDocuments(docsOffice.id);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete");
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
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage office records and documents
          </p>
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
                  City
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  State
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Pincode
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Country
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {offices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    No offices found.
                  </TableCell>
                </TableRow>
              ) : (
                offices.map((office) => (
                  <TableRow
                    key={office.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.gstin}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.address}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.city}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.state} ({office.stateCode})
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.pincode}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {office.country}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => void openDocuments(office)}
                          className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                          title="Documents"
                        >
                          Documents
                        </Button>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Pincode
                </Label>
                <Input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Saving..."
                  : editingOfficeId
                    ? "Update Office"
                    : "Add Office"}
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

      {docsOffice && (
        <Modal
          title={`Documents — ${docsOffice.gstin}`}
          onClose={() => setDocsOffice(null)}
          maxWidthClassName="max-w-3xl"
          panelClassName="max-h-[90vh] overflow-y-auto"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Upload the required documents below, or add more with a custom name.
            PDF, JPG, PNG, or WEBP — max 10 MB after automatic compression (larger
            files are compressed before upload).
          </p>

          {loadingDocs ? (
            <p className="text-zinc-500">Loading documents…</p>
          ) : (
            <div className="space-y-5">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Required documents
                </h3>
                {OFFICE_FIXED_DOC_TYPES.map((field) => {
                  const doc = findDocForType(field.type);
                  const busy = uploadingKey === field.type;
                  return (
                    <div
                      key={field.type}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 space-y-3"
                    >
                      <Label className="block text-sm font-medium">
                        {field.label}
                      </Label>
                      <Input
                        type="file"
                        accept={FILE_ACCEPT}
                        disabled={busy}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          void handleFixedUpload(field.type, file);
                          e.target.value = "";
                        }}
                        className="w-full"
                      />
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        {busy ? (
                          <span className="text-amber-600 dark:text-amber-400">
                            {uploadPhase === "compressing"
                              ? uploadPhaseMessage || "Compressing…"
                              : uploadPhase === "uploading"
                                ? "Uploading…"
                                : "Preparing…"}
                          </span>
                        ) : doc ? (
                          <>
                            <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-md">
                              {doc.originalFilename || doc.name}
                            </span>
                            <Button
                              type="button"
                              onClick={() => openDoc(doc, "inline")}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              View
                            </Button>
                            <Button
                              type="button"
                              onClick={() => openDoc(doc, "attachment")}
                              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              Download
                            </Button>
                            <Button
                              type="button"
                              onClick={() => void handleDeleteDoc(doc)}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          <span className="text-zinc-400">No file uploaded</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {extraDocuments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Additional uploaded documents
                  </h3>
                  {extraDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 space-y-2"
                    >
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {doc.name}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {doc.originalFilename || doc.filePath}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          onClick={() => openDoc(doc, "inline")}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View
                        </Button>
                        <Button
                          type="button"
                          onClick={() => openDoc(doc, "attachment")}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          Download
                        </Button>
                        <Button
                          type="button"
                          onClick={() => void handleDeleteDoc(doc)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Add more documents
                </h3>
                {uploadRows.map((row, index) => {
                  const busy = uploadingKey === row.localId;
                  return (
                    <div
                      key={row.localId}
                      className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-sm font-medium">
                          Extra document {index + 1}
                        </Label>
                        <Button
                          type="button"
                          onClick={() => removeUploadRow(row.localId)}
                          disabled={busy}
                          className="px-3 py-1 text-xs bg-zinc-600 hover:bg-zinc-700 text-white rounded"
                        >
                          Remove
                        </Button>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium mb-2">
                          Document name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={row.name}
                          onChange={(e) =>
                            updateUploadRow(row.localId, {
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. Registry of Business Place, Fire NOC"
                          disabled={busy}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium mb-2">
                          File <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="file"
                          accept={FILE_ACCEPT}
                          disabled={busy}
                          onChange={(e) =>
                            updateUploadRow(row.localId, {
                              file: e.target.files?.[0] || null,
                            })
                          }
                          className="w-full"
                        />
                        {row.file && (
                          <p className="mt-1 text-xs text-zinc-500">
                            Selected: {row.file.name}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleUploadRow(row)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                      >
                        {busy
                          ? uploadPhase === "compressing"
                            ? "Compressing…"
                            : "Uploading…"
                          : "Upload"}
                      </Button>
                      {busy && uploadPhaseMessage && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          {uploadPhaseMessage}
                        </p>
                      )}
                    </div>
                  );
                })}

                <Button
                  type="button"
                  onClick={addUploadRow}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Add more
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

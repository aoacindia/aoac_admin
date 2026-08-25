"use client";

import { useEffect, useState } from "react";
import { INDIAN_STATES } from "@/lib/indian-states";
import { COMPANY_DOC_FIELDS, type CompanyDocPathKey } from "@/lib/company-administration-docs";
import {
  compressFileForUpload,
  type CompressPhase,
} from "@/lib/compress-for-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  companyName: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  stateCode: string;
  pincode: string;
  country: string;
  uin: string;
  pan: string;
  tin: string;
  panDocumentPath: string | null;
  tinDocumentPath: string | null;
  certificateOfIncorporationPath: string | null;
  memorandumOfAssociationPath: string | null;
  articlesOfAssociationPath: string | null;
};

const EMPTY_FORM: FormState = {
  companyName: "",
  addressLine: "",
  city: "",
  district: "",
  state: "",
  stateCode: "",
  pincode: "",
  country: "India",
  uin: "",
  pan: "",
  tin: "",
  panDocumentPath: null,
  tinDocumentPath: null,
  certificateOfIncorporationPath: null,
  memorandumOfAssociationPath: null,
  articlesOfAssociationPath: null,
};

export default function AdministrationPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadPhase, setUploadPhase] = useState<CompressPhase>("idle");
  const [uploadPhaseMessage, setUploadPhaseMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/company-administration");
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Failed to load administration data");
        return;
      }
      const row = data.data || {};
      setForm({
        companyName: row.companyName || "",
        addressLine: row.addressLine || "",
        city: row.city || "",
        district: row.district || "",
        state: row.state || "",
        stateCode: row.stateCode || "",
        pincode: row.pincode || "",
        country: row.country || "India",
        uin: row.uin || "",
        pan: row.pan || "",
        tin: row.tin || "",
        panDocumentPath: row.panDocumentPath || null,
        tinDocumentPath: row.tinDocumentPath || null,
        certificateOfIncorporationPath: row.certificateOfIncorporationPath || null,
        memorandumOfAssociationPath: row.memorandumOfAssociationPath || null,
        articlesOfAssociationPath: row.articlesOfAssociationPath || null,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = INDIAN_STATES.find((s) => s.name === e.target.value);
    setForm((prev) => ({
      ...prev,
      state: e.target.value,
      stateCode: selected?.code || "",
    }));
  };

  const getPath = (key: CompanyDocPathKey): string | null => form[key];

  const setPath = (key: CompanyDocPathKey, path: string | null) => {
    setForm((prev) => ({ ...prev, [key]: path }));
  };

  const handleUpload = async (uploadKey: string, fieldKey: CompanyDocPathKey, file: File | null) => {
    if (!file) return;
    setUploadingKey(uploadKey);
    setUploadPhase("idle");
    setUploadPhaseMessage("");
    try {
      const { file: readyFile } = await compressFileForUpload(file, (p) => {
        setUploadPhase(p.phase);
        setUploadPhaseMessage(p.message || "");
      });
      setUploadPhase("uploading");
      setUploadPhaseMessage("Uploading…");

      const body = new FormData();
      body.append("file", readyFile);
      body.append("uploadKey", uploadKey);
      const res = await fetch("/api/company-administration/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Upload failed");
        return;
      }
      setPath(fieldKey, data.data.path);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingKey(null);
      setUploadPhase("idle");
      setUploadPhaseMessage("");
    }
  };

  const handleViewFile = (path: string | null) => {
    if (!path) return;
    window.open(
      `/api/company-administration/file?path=${encodeURIComponent(path)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDownloadFile = (path: string | null) => {
    if (!path) return;
    window.open(
      `/api/company-administration/file?path=${encodeURIComponent(path)}&disposition=attachment`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/company-administration", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Failed to save");
        return;
      }
      alert("Administration details saved successfully");
      if (data.data) {
        setForm((prev) => ({
          ...prev,
          ...data.data,
        }));
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-zinc-600 dark:text-zinc-400">Loading administration…</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Administration
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Company legal details and statutory documents.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Company
          </h2>
          <div>
            <Label className="block text-sm font-medium mb-2">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Registered Address
          </h2>
          <div>
            <Label className="block text-sm font-medium mb-2">
              Address Line <span className="text-red-500">*</span>
            </Label>
            <Textarea
              name="addressLine"
              value={form.addressLine}
              onChange={handleChange}
              required
              rows={3}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">
                District <span className="text-red-500">*</span>
              </Label>
              <Input
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                name="state"
                value={form.state}
                onChange={handleStateChange}
                required
                className="w-full"
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">
                Pincode <span className="text-red-500">*</span>
              </Label>
              <Input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">Country</Label>
              <Input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Identifiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium mb-2">UIN</Label>
              <Input name="uin" value={form.uin} onChange={handleChange} className="w-full" />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">PAN</Label>
              <Input
                name="pan"
                value={form.pan}
                onChange={handleChange}
                className="w-full uppercase"
                maxLength={10}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">TIN</Label>
              <Input name="tin" value={form.tin} onChange={handleChange} className="w-full" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Documents
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            PDF, JPG, PNG, or WEBP — larger files are auto-compressed to 10 MB or
            below before upload. Files are stored on internalfiles.aoac.in.
          </p>
          <div className="space-y-5">
            {COMPANY_DOC_FIELDS.map((field) => {
              const path = getPath(field.key);
              const busy = uploadingKey === field.uploadKey;
              return (
                <div
                  key={field.key}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 space-y-3"
                >
                  <Label className="block text-sm font-medium">{field.label}</Label>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                    disabled={busy || saving}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      void handleUpload(field.uploadKey, field.key, file);
                      e.target.value = "";
                    }}
                    className="w-full"
                  />
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {busy ? (
                      <span className="text-amber-600 dark:text-amber-400">
                        {uploadPhase === "compressing"
                          ? uploadPhaseMessage || "Compressing…"
                          : uploadPhase === "uploading"
                            ? "Uploading…"
                            : "Preparing…"}
                      </span>
                    ) : path ? (
                      <>
                        <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-md">
                          Uploaded: {path.split("/").pop()}
                        </span>
                        <Button
                          type="button"
                          onClick={() => handleViewFile(path)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDownloadFile(path)}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          Download
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setPath(field.key, null)}
                          className="px-3 py-1 text-sm bg-zinc-600 text-white rounded hover:bg-zinc-700"
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
        </section>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={saving || uploadingKey !== null}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

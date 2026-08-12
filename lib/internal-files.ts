export {
  COMPANY_DOC_FIELDS,
  type CompanyDocPathKey,
} from "@/lib/company-administration-docs";

export function getInternalFilesBaseUrl(): string {
  const raw = process.env.INTERNAL_FILES_BASE_URL?.trim() || "";
  return raw.replace(/\/+$/, "");
}

export function getInternalFilesApiKey(): string {
  return process.env.INTERNAL_FILES_API_KEY?.trim() || "";
}

export function assertInternalFilesConfigured(): void {
  if (!getInternalFilesBaseUrl() || !getInternalFilesApiKey()) {
    throw new Error(
      "Internal files storage is not configured (INTERNAL_FILES_BASE_URL / INTERNAL_FILES_API_KEY)"
    );
  }
}

export type InternalUploadResult = {
  path: string;
  filename: string;
  mime: string;
  size: number;
};

export async function uploadToInternalFiles(
  file: Blob,
  filename: string,
  folder = "administration"
): Promise<InternalUploadResult> {
  assertInternalFilesConfigured();
  const base = getInternalFilesBaseUrl();
  const key = getInternalFilesApiKey();

  const form = new FormData();
  form.append("file", file, filename);
  form.append("folder", folder);
  form.append("action", "upload");

  const res = await fetch(`${base}/api.php?action=upload`, {
    method: "POST",
    headers: {
      "X-API-Key": key,
    },
    body: form,
  });

  const data = (await res.json().catch(() => null)) as {
    success?: boolean;
    error?: string;
    path?: string;
    filename?: string;
    mime?: string;
    size?: number;
  } | null;

  if (!res.ok || !data?.success || !data.path) {
    throw new Error(data?.error || `Upload failed (${res.status})`);
  }

  return {
    path: data.path,
    filename: data.filename || filename,
    mime: data.mime || "application/octet-stream",
    size: data.size || 0,
  };
}

export async function fetchFromInternalFiles(path: string): Promise<{
  buffer: ArrayBuffer;
  contentType: string;
  filename: string;
}> {
  assertInternalFilesConfigured();
  const base = getInternalFilesBaseUrl();
  const key = getInternalFilesApiKey();
  const url = `${base}/api.php?action=get&path=${encodeURIComponent(path)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "X-API-Key": key },
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || `File fetch failed (${res.status})`);
  }

  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  const buffer = await res.arrayBuffer();
  const filename = path.split("/").pop() || "file";
  return { buffer, contentType, filename };
}

export async function deleteFromInternalFiles(path: string): Promise<void> {
  assertInternalFilesConfigured();
  const base = getInternalFilesBaseUrl();
  const key = getInternalFilesApiKey();

  const res = await fetch(`${base}/api.php?action=delete`, {
    method: "POST",
    headers: {
      "X-API-Key": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  });

  const data = (await res.json().catch(() => null)) as {
    success?: boolean;
    error?: string;
  } | null;

  if (!res.ok || !data?.success) {
    throw new Error(data?.error || `Delete failed (${res.status})`);
  }
}

/** Allow only safe relative storage paths returned by the PHP API. */
export function isSafeInternalPath(path: string | null | undefined): boolean {
  if (!path || typeof path !== "string") return false;
  const trimmed = path.trim();
  if (!trimmed || trimmed.includes("..") || trimmed.startsWith("/")) return false;
  return /^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(trimmed);
}

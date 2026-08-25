/**
 * Browser-side compression so uploads stay within internalfiles 10MB limit.
 * - Images: browser-image-compression
 * - PDFs: render pages via pdf.js and rebuild with jpeg pages via pdf-lib
 */

import imageCompression from "browser-image-compression";
import { PDFDocument } from "pdf-lib";

/** Must stay at/under Hostinger internalfiles max_upload_bytes (10MB). */
export const UPLOAD_TARGET_MAX_BYTES = 10 * 1024 * 1024;

export type CompressPhase = "idle" | "compressing" | "uploading";

export type CompressProgress = {
  phase: CompressPhase;
  /** 0–100 while compressing, optional */
  percent?: number;
  message?: string;
};

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function isPdf(file: File) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function isImage(file: File) {
  return IMAGE_TYPES.has(file.type);
}

function formatMb(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Copy into a plain ArrayBuffer so `File`/`Blob` accept it under strict DOM typings. */
function toBlobPart(bytes: Uint8Array): BlobPart {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

async function compressImage(
  file: File,
  onProgress?: (p: CompressProgress) => void
): Promise<File> {
  onProgress?.({
    phase: "compressing",
    percent: 5,
    message: `Compressing image (${formatMb(file.size)})…`,
  });

  const targetMb = Math.max(0.5, (UPLOAD_TARGET_MAX_BYTES * 0.92) / (1024 * 1024));
  const compressed = await imageCompression(file, {
    maxSizeMB: targetMb,
    maxWidthOrHeight: 2500,
    useWebWorker: true,
    fileType: file.type === "image/png" ? "image/jpeg" : file.type,
    initialQuality: 0.85,
    onProgress: (pct) => {
      onProgress?.({
        phase: "compressing",
        percent: Math.min(99, Math.round(pct)),
        message: `Compressing image… ${Math.round(pct)}%`,
      });
    },
  });

  const out = new File(
    [compressed],
    file.name.replace(/\.(png|webp)$/i, ".jpg"),
    { type: compressed.type || "image/jpeg", lastModified: Date.now() }
  );

  if (out.size > UPLOAD_TARGET_MAX_BYTES) {
    throw new Error(
      `Could not compress image below 10 MB (got ${formatMb(out.size)}). Try a smaller file.`
    );
  }
  return out;
}

async function getPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined") {
    // CDN worker avoids Next/Turbopack bundling issues with the worker file
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
  }
  return pdfjs;
}

async function renderPdfToCompressedFile(
  file: File,
  opts: { scale: number; jpegQuality: number },
  onProgress?: (p: CompressProgress) => void
): Promise<File> {
  const pdfjs = await getPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  const outPdf = await PDFDocument.create();
  const pageCount = pdf.numPages;

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: opts.scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for PDF compression");

    await page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    } as Parameters<typeof page.render>[0]).promise;

    const jpegDataUrl = canvas.toDataURL("image/jpeg", opts.jpegQuality);
    const jpegBytes = await fetch(jpegDataUrl).then((r) => r.arrayBuffer());
    const jpg = await outPdf.embedJpg(jpegBytes);
    const pdfPage = outPdf.addPage([jpg.width, jpg.height]);
    pdfPage.drawImage(jpg, {
      x: 0,
      y: 0,
      width: jpg.width,
      height: jpg.height,
    });

    const percent = Math.round((pageNum / pageCount) * 100);
    onProgress?.({
      phase: "compressing",
      percent,
      message: `Compressing PDF page ${pageNum}/${pageCount}…`,
    });

    canvas.width = 0;
    canvas.height = 0;
  }

  const bytes = await outPdf.save({ useObjectStreams: true });
  return new File(
    [toBlobPart(bytes)],
    file.name.toLowerCase().endsWith(".pdf") ? file.name : `${file.name}.pdf`,
    {
      type: "application/pdf",
      lastModified: Date.now(),
    }
  );
}

async function compressPdf(
  file: File,
  onProgress?: (p: CompressProgress) => void
): Promise<File> {
  onProgress?.({
    phase: "compressing",
    percent: 1,
    message: `Compressing PDF (${formatMb(file.size)})…`,
  });

  // Try progressively stronger compression until under target
  const attempts: Array<{ scale: number; jpegQuality: number }> = [
    { scale: 1.4, jpegQuality: 0.72 },
    { scale: 1.2, jpegQuality: 0.62 },
    { scale: 1.0, jpegQuality: 0.52 },
    { scale: 0.85, jpegQuality: 0.42 },
    { scale: 0.7, jpegQuality: 0.35 },
  ];

  let last: File | null = null;
  for (let i = 0; i < attempts.length; i++) {
    const attempt = attempts[i]!;
    onProgress?.({
      phase: "compressing",
      percent: Math.round((i / attempts.length) * 100),
      message: `Compressing PDF (pass ${i + 1}/${attempts.length})…`,
    });
    last = await renderPdfToCompressedFile(file, attempt, onProgress);
    if (last.size <= UPLOAD_TARGET_MAX_BYTES) {
      return last;
    }
  }

  throw new Error(
    `Could not compress PDF below 10 MB (got ${formatMb(last?.size || file.size)}). Try a smaller or lower-quality scan.`
  );
}

/**
 * If file is already ≤ 10MB, returns it unchanged.
 * Otherwise compresses (PDF or image) to ≤ 10MB.
 */
export async function compressFileForUpload(
  file: File,
  onProgress?: (p: CompressProgress) => void
): Promise<{ file: File; wasCompressed: boolean }> {
  if (file.size <= UPLOAD_TARGET_MAX_BYTES) {
    return { file, wasCompressed: false };
  }

  if (isImage(file)) {
    const out = await compressImage(file, onProgress);
    return { file: out, wasCompressed: true };
  }

  if (isPdf(file)) {
    const out = await compressPdf(file, onProgress);
    return { file: out, wasCompressed: true };
  }

  throw new Error(
    `File is ${formatMb(file.size)} and cannot be compressed automatically. Max upload size is 10 MB.`
  );
}

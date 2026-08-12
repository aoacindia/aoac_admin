import { NextRequest, NextResponse } from "next/server";

import { COMPANY_DOC_FIELDS } from "@/lib/company-administration-docs";
import { uploadToInternalFiles } from "@/lib/internal-files";
import { requireAdminApi } from "@/lib/require-admin";

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const uploadKey = String(form.get("uploadKey") || "");

    const field = COMPANY_DOC_FIELDS.find((f) => f.uploadKey === uploadKey);
    if (!field) {
      return NextResponse.json(
        { success: false, error: "Invalid upload key" },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Missing file" },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "File must be between 1 byte and 10 MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF, JPG, PNG, or WEBP files are allowed",
        },
        { status: 400 }
      );
    }

    const uploaded = await uploadToInternalFiles(
      file,
      file.name || `${field.uploadKey}.bin`,
      field.folder
    );

    return NextResponse.json({
      success: true,
      data: {
        path: uploaded.path,
        filename: uploaded.filename,
        fieldKey: field.key,
        label: field.label,
      },
    });
  } catch (error: unknown) {
    console.error("Error uploading company document:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

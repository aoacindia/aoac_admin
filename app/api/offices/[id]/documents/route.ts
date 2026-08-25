import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { officeDocuments, offices } from "@/lib/db/admin-schema";
import {
  isOfficeDocType,
  labelForOfficeDocType,
  OFFICE_CUSTOM_DOC_TYPE,
  OFFICE_DOC_FOLDER,
  OFFICE_FIXED_DOC_TYPES,
} from "@/lib/office-documents";
import {
  deleteFromInternalFiles,
  uploadToInternalFiles,
} from "@/lib/internal-files";
import { requireAdminApi } from "@/lib/require-admin";

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_BYTES = 10 * 1024 * 1024;

async function assertOfficeExists(officeId: string) {
  const [office] = await dbAdmin
    .select({ id: offices.id, gstin: offices.gstin })
    .from(offices)
    .where(eq(offices.id, officeId))
    .limit(1);
  return office || null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    const office = await assertOfficeExists(id);
    if (!office) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    const docs = await dbAdmin
      .select()
      .from(officeDocuments)
      .where(eq(officeDocuments.officeId, id))
      .orderBy(asc(officeDocuments.createdAt));

    return NextResponse.json({
      success: true,
      data: {
        office,
        documents: docs,
        fixedTypes: OFFICE_FIXED_DOC_TYPES,
      },
    });
  } catch (error: unknown) {
    console.error("Error listing office documents:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    const office = await assertOfficeExists(id);
    if (!office) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    const form = await request.formData();
    const file = form.get("file");
    const docType = String(form.get("docType") || "").trim();
    const customName = String(form.get("name") || "").trim();

    if (!isOfficeDocType(docType)) {
      return NextResponse.json(
        { success: false, error: "Invalid document type" },
        { status: 400 }
      );
    }

    if (docType === OFFICE_CUSTOM_DOC_TYPE && !customName) {
      return NextResponse.json(
        { success: false, error: "Document name is required for custom uploads" },
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

    const name = labelForOfficeDocType(docType, customName);
    const uploaded = await uploadToInternalFiles(
      file,
      file.name || `${docType.toLowerCase()}.bin`,
      OFFICE_DOC_FOLDER
    );

    const now = new Date();

    // Fixed types: replace existing document of same type for this office
    if (docType !== OFFICE_CUSTOM_DOC_TYPE) {
      const existing = await dbAdmin
        .select()
        .from(officeDocuments)
        .where(
          and(
            eq(officeDocuments.officeId, id),
            eq(officeDocuments.docType, docType)
          )
        );

      for (const row of existing) {
        try {
          await deleteFromInternalFiles(row.filePath);
        } catch (err) {
          console.warn("Failed to delete old office document file:", err);
        }
        await dbAdmin
          .delete(officeDocuments)
          .where(eq(officeDocuments.id, row.id));
      }
    }

    const [doc] = await dbAdmin
      .insert(officeDocuments)
      .values({
        officeId: id,
        docType,
        name,
        filePath: uploaded.path,
        originalFilename: uploaded.filename,
        mimeType: uploaded.mime || file.type || null,
        fileSize: uploaded.size || file.size || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error uploading office document:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

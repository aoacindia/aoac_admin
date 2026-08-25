import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { officeDocuments } from "@/lib/db/admin-schema";
import {
  deleteFromInternalFiles,
  fetchFromInternalFiles,
  isSafeInternalPath,
} from "@/lib/internal-files";
import { requireAdminApi } from "@/lib/require-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id, docId } = await params;
    const disposition =
      request.nextUrl.searchParams.get("disposition") === "attachment"
        ? "attachment"
        : "inline";

    const [doc] = await dbAdmin
      .select()
      .from(officeDocuments)
      .where(
        and(eq(officeDocuments.id, docId), eq(officeDocuments.officeId, id))
      )
      .limit(1);

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    if (!isSafeInternalPath(doc.filePath)) {
      return NextResponse.json(
        { success: false, error: "Invalid file path" },
        { status: 400 }
      );
    }

    const file = await fetchFromInternalFiles(doc.filePath);
    const filename =
      doc.originalFilename || file.filename || `${doc.name || "document"}`;

    return new NextResponse(file.buffer, {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || file.contentType,
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching office document:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id, docId } = await params;
    const [doc] = await dbAdmin
      .select()
      .from(officeDocuments)
      .where(
        and(eq(officeDocuments.id, docId), eq(officeDocuments.officeId, id))
      )
      .limit(1);

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    if (isSafeInternalPath(doc.filePath)) {
      try {
        await deleteFromInternalFiles(doc.filePath);
      } catch (err) {
        console.warn("Failed to delete internal file for office doc:", err);
      }
    }

    await dbAdmin.delete(officeDocuments).where(eq(officeDocuments.id, docId));

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting office document:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

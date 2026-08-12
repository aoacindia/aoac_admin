import { NextRequest, NextResponse } from "next/server";

import {
  fetchFromInternalFiles,
  isSafeInternalPath,
} from "@/lib/internal-files";
import { requireAdminApi } from "@/lib/require-admin";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  const path = request.nextUrl.searchParams.get("path") || "";
  if (!isSafeInternalPath(path)) {
    return NextResponse.json(
      { success: false, error: "Invalid path" },
      { status: 400 }
    );
  }

  try {
    const file = await fetchFromInternalFiles(path);
    return new NextResponse(file.buffer, {
      status: 200,
      headers: {
        "Content-Type": file.contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(file.filename)}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching company document:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 404 }
    );
  }
}

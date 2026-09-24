import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { requireValidCredentialUnlock } from "@/lib/credential-unlock";
import {
  decryptCredentialSecrets,
  encryptCredentialSecrets,
  normalizeExtras,
} from "@/lib/credentials-crypto";
import { dbAdmin } from "@/lib/db";
import { credentials } from "@/lib/db/admin-schema";
import { requireAdminApi } from "@/lib/require-admin";

type RouteContext = { params: Promise<{ id: string }> };

function readUnlockToken(request: NextRequest, body?: { unlockToken?: unknown }) {
  const header = request.headers.get("x-credential-unlock");
  if (header?.trim()) return header.trim();
  const fromQuery = request.nextUrl.searchParams.get("unlockToken");
  if (fromQuery?.trim()) return fromQuery.trim();
  if (typeof body?.unlockToken === "string") return body.unlockToken.trim();
  return null;
}

/** Reveal one credential — requires valid OTP unlock token */
export async function GET(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  const userId = authResult.session.user.id;
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const unlockCheck = await requireValidCredentialUnlock(
    userId,
    readUnlockToken(request)
  );
  if (!unlockCheck.ok) {
    return NextResponse.json(
      { success: false, error: unlockCheck.error, code: "UNLOCK_REQUIRED" },
      { status: unlockCheck.status }
    );
  }

  try {
    const { id } = await context.params;
    const [row] = await dbAdmin
      .select()
      .from(credentials)
      .where(eq(credentials.id, id))
      .limit(1);

    if (!row) {
      return NextResponse.json(
        { success: false, error: "Credential not found" },
        { status: 404 }
      );
    }

    const secrets = decryptCredentialSecrets({
      ciphertext: row.ciphertext,
      iv: row.iv,
      authTag: row.authTag,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: row.id,
        title: row.title,
        email: secrets.email,
        password: secrets.password,
        extras: secrets.extras,
        createdByUserId: row.createdByUserId,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
    });
  } catch (error: unknown) {
    console.error("Error revealing credential:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load credential" },
      { status: 500 }
    );
  }
}

/** Update credential — requires unlock; re-encrypts secrets */
export async function PUT(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  const userId = authResult.session.user.id;
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const unlockCheck = await requireValidCredentialUnlock(
      userId,
      readUnlockToken(request, body)
    );
    if (!unlockCheck.ok) {
      return NextResponse.json(
        { success: false, error: unlockCheck.error, code: "UNLOCK_REQUIRED" },
        { status: unlockCheck.status }
      );
    }

    const { id } = await context.params;
    const [existing] = await dbAdmin
      .select({ id: credentials.id })
      .from(credentials)
      .where(eq(credentials.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Credential not found" },
        { status: 404 }
      );
    }

    const title = String(body?.title ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");
    const extras = normalizeExtras(body?.extras);

    if (!title || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, email or username, and password are required",
        },
        { status: 400 }
      );
    }

    const encrypted = encryptCredentialSecrets({ email, password, extras });
    const now = new Date();

    const [updated] = await dbAdmin
      .update(credentials)
      .set({
        title,
        ciphertext: encrypted.ciphertext,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
        updatedAt: now,
      })
      .where(eq(credentials.id, id))
      .returning({
        id: credentials.id,
        title: credentials.title,
        createdByUserId: credentials.createdByUserId,
        createdAt: credentials.createdAt,
        updatedAt: credentials.updatedAt,
      });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("Error updating credential:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update credential" },
      { status: 500 }
    );
  }
}

/** Delete credential — requires unlock */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  const userId = authResult.session.user.id;
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const unlockCheck = await requireValidCredentialUnlock(
    userId,
    readUnlockToken(request)
  );
  if (!unlockCheck.ok) {
    return NextResponse.json(
      { success: false, error: unlockCheck.error, code: "UNLOCK_REQUIRED" },
      { status: unlockCheck.status }
    );
  }

  try {
    const { id } = await context.params;
    const deleted = await dbAdmin
      .delete(credentials)
      .where(eq(credentials.id, id))
      .returning({ id: credentials.id });

    if (!deleted[0]) {
      return NextResponse.json(
        { success: false, error: "Credential not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deleted[0] });
  } catch (error: unknown) {
    console.error("Error deleting credential:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete credential" },
      { status: 500 }
    );
  }
}

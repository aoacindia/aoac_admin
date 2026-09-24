import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

import {
  encryptCredentialSecrets,
  normalizeExtras,
} from "@/lib/credentials-crypto";
import { dbAdmin } from "@/lib/db";
import { credentials } from "@/lib/db/admin-schema";
import { requireAdminApi } from "@/lib/require-admin";

/** List titles only — never returns decrypted secrets */
export async function GET() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const rows = await dbAdmin
      .select({
        id: credentials.id,
        title: credentials.title,
        createdByUserId: credentials.createdByUserId,
        createdAt: credentials.createdAt,
        updatedAt: credentials.updatedAt,
      })
      .from(credentials)
      .orderBy(desc(credentials.updatedAt));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error("Error listing credentials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to list credentials" },
      { status: 500 }
    );
  }
}

/** Create credential — secrets encrypted at rest */
export async function POST(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();
    const title = String(body?.title ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");
    const extras = normalizeExtras(body?.extras);

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email or username is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const encrypted = encryptCredentialSecrets({ email, password, extras });
    const now = new Date();
    const userId = authResult.session.user.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [created] = await dbAdmin
      .insert(credentials)
      .values({
        title,
        ciphertext: encrypted.ciphertext,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
        createdByUserId: userId,
        createdAt: now,
        updatedAt: now,
      })
      .returning({
        id: credentials.id,
        title: credentials.title,
        createdByUserId: credentials.createdByUserId,
        createdAt: credentials.createdAt,
        updatedAt: credentials.updatedAt,
      });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating credential:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save credential" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { and, eq } from "drizzle-orm";

import {
  CREDENTIAL_UNLOCK_EXPIRY_MINUTES,
} from "@/lib/credential-unlock";
import { dbAdmin } from "@/lib/db";
import { credentialUnlocks } from "@/lib/db/admin-schema";
import { requireAdminApi } from "@/lib/require-admin";

export async function POST(request: NextRequest) {
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
    const challengeToken = String(body?.challengeToken ?? "").trim();
    const otp = String(body?.otp ?? "").trim();

    if (!challengeToken || !otp) {
      return NextResponse.json(
        { success: false, error: "Challenge token and OTP are required" },
        { status: 400 }
      );
    }

    const [row] = await dbAdmin
      .select()
      .from(credentialUnlocks)
      .where(
        and(
          eq(credentialUnlocks.challengeToken, challengeToken),
          eq(credentialUnlocks.userId, userId)
        )
      )
      .limit(1);

    if (!row) {
      return NextResponse.json(
        { success: false, error: "Invalid unlock challenge" },
        { status: 400 }
      );
    }

    if (row.expiresAt < new Date()) {
      await dbAdmin
        .delete(credentialUnlocks)
        .where(eq(credentialUnlocks.id, row.id));
      return NextResponse.json(
        { success: false, error: "OTP expired. Request a new one." },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(otp, row.otp);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    const unlockToken = randomBytes(32).toString("hex");
    const unlockTokenHash = await bcrypt.hash(unlockToken, 10);
    const now = new Date();
    const unlockExpiresAt = new Date(
      Date.now() + CREDENTIAL_UNLOCK_EXPIRY_MINUTES * 60 * 1000
    );

    await dbAdmin
      .update(credentialUnlocks)
      .set({
        unlockTokenHash,
        unlockExpiresAt,
        updatedAt: now,
      })
      .where(eq(credentialUnlocks.id, row.id));

    return NextResponse.json({
      success: true,
      unlockToken,
      expiresInMinutes: CREDENTIAL_UNLOCK_EXPIRY_MINUTES,
    });
  } catch (error: unknown) {
    console.error("Error verifying credential unlock OTP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}

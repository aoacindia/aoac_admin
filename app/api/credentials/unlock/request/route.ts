import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

import {
  CREDENTIAL_OTP_EXPIRY_MINUTES,
  maskEmail,
} from "@/lib/credential-unlock";
import { dbAdmin } from "@/lib/db";
import { credentialUnlocks } from "@/lib/db/admin-schema";
import { sendCredentialUnlockOtpEmail } from "@/lib/email";
import { requireAdminApi } from "@/lib/require-admin";

export async function POST() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  const userId = authResult.session.user.id;
  const email = authResult.session.user.email?.trim().toLowerCase();
  if (!userId || !email) {
    return NextResponse.json(
      { success: false, error: "Signed-in user email is required" },
      { status: 401 }
    );
  }

  try {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpHash = await bcrypt.hash(otp, 10);
    const challengeToken = randomBytes(32).toString("hex");
    const now = new Date();
    const expiresAt = new Date(
      Date.now() + CREDENTIAL_OTP_EXPIRY_MINUTES * 60 * 1000
    );

    await dbAdmin
      .delete(credentialUnlocks)
      .where(eq(credentialUnlocks.userId, userId));

    await dbAdmin.insert(credentialUnlocks).values({
      userId,
      email,
      challengeToken,
      otp: otpHash,
      unlockTokenHash: null,
      expiresAt,
      unlockExpiresAt: null,
      createdAt: now,
      updatedAt: now,
    });

    await sendCredentialUnlockOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      challengeToken,
      email: maskEmail(email),
      expiresInMinutes: CREDENTIAL_OTP_EXPIRY_MINUTES,
    });
  } catch (error: unknown) {
    console.error("Error sending credential unlock OTP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { adminPrisma } from "@/lib/admin-prisma";
import { sendOtpEmail } from "@/lib/email";

const OTP_EXPIRY_MINUTES = 10;

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(name.length - 2, 0))}@${domain}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const identifier = String(body?.identifier || "").trim().toLowerCase();

    if (!identifier) {
      return NextResponse.json(
        { success: false, error: "Identifier is required" },
        { status: 400 }
      );
    }

    const user = await adminPrisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        suspended: true,
        terminated: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (user.suspended || user.terminated) {
      return NextResponse.json(
        { success: false, error: "Account is not active" },
        { status: 403 }
      );
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpHash = await bcrypt.hash(otp, 10);
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await adminPrisma.otpVerification.deleteMany({
      where: { email: user.email },
    });

    await adminPrisma.otpVerification.create({
      data: {
        email: user.email,
        token,
        otp: otpHash,
        expiresAt,
      },
    });

    await sendOtpEmail(user.email, otp);

    return NextResponse.json({
      success: true,
      token,
      email: maskEmail(user.email),
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}


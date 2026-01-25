import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

const smtpPort = SMTP_PORT ? Number(SMTP_PORT) : undefined;

export function ensureEmailConfigured() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !smtpPort) {
    throw new Error("Email is not configured");
  }
}

export async function sendOtpEmail(to: string, otp: string) {
  ensureEmailConfigured();
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Your Admin Login OTP",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
}


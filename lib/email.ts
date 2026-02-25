import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

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

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export async function createTransporter(config?: EmailConfig): Promise<Transporter> {
  if (config) {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  ensureEmailConfigured();
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort!,
    secure: smtpPort === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  config?: EmailConfig,
  cc?: string | string[]
) {
  const transporter = await createTransporter(config);
  const fromEmail = config?.from || SMTP_FROM!;

  await transporter.sendMail({
    from: fromEmail,
    to: Array.isArray(to) ? to.join(", ") : to,
    cc: cc ? (Array.isArray(cc) ? cc.join(", ") : cc) : undefined,
    subject,
    html,
  });
}


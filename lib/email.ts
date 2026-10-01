import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  OTP_SMTP_USER,
  OTP_SMTP_PASS,
} = process.env;

const smtpPort = SMTP_PORT ? Number(SMTP_PORT) : undefined;
const OTP_FROM_DEFAULT = "otp@mail.aoac.in";

export function ensureEmailConfigured() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !smtpPort) {
    throw new Error("Email is not configured");
  }
}

function getOtpMailConfig() {
  const user = (OTP_SMTP_USER || OTP_FROM_DEFAULT).trim();
  const pass = OTP_SMTP_PASS?.trim() || "";
  if (!SMTP_HOST || !smtpPort || !user || !pass) {
    throw new Error(
      "OTP email is not configured (OTP_SMTP_PASS, and SMTP_HOST / SMTP_PORT)"
    );
  }
  return { host: SMTP_HOST, port: smtpPort, user, pass, from: user };
}

function createOtpTransporter() {
  const config = getOtpMailConfig();
  return {
    from: config.from,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    }),
  };
}

export async function sendOtpEmail(to: string, otp: string) {
  const { from, transporter } = createOtpTransporter();
  await transporter.sendMail({
    from,
    to,
    subject: "Your Admin Login OTP",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
}

export async function sendCredentialUnlockOtpEmail(to: string, otp: string) {
  const { from, transporter } = createOtpTransporter();
  await transporter.sendMail({
    from,
    to,
    subject: "Credential vault unlock OTP",
    text: `Your OTP to view saved credentials is ${otp}. It expires in 10 minutes. If you did not request this, contact an administrator immediately.`,
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


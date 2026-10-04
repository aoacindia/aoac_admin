import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

const OTP_FROM_DEFAULT = "otp@mail.aoac.in";
const ORDERS_FROM_DEFAULT = "orders@mail.aoac.in";

function trimEnv(value: string | undefined): string {
  return value?.trim() || "";
}

function smtpPort(): number | undefined {
  const raw = trimEnv(process.env.SMTP_PORT);
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function ensureEmailConfigured() {
  if (
    !trimEnv(process.env.SMTP_HOST) ||
    !trimEnv(process.env.SMTP_USER) ||
    !trimEnv(process.env.SMTP_PASS) ||
    !trimEnv(process.env.SMTP_FROM) ||
    !smtpPort()
  ) {
    throw new Error("Email is not configured");
  }
}

function getOtpMailConfig() {
  const host = trimEnv(process.env.SMTP_HOST);
  const port = smtpPort();
  const user = trimEnv(process.env.OTP_SMTP_USER) || OTP_FROM_DEFAULT;
  const pass = trimEnv(process.env.OTP_SMTP_PASS);
  if (!host || !port || !user || !pass) {
    throw new Error(
      "OTP email is not configured (OTP_SMTP_PASS, and SMTP_HOST / SMTP_PORT)"
    );
  }
  return { host, port, user, pass, from: user };
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

function getOrdersMailConfig() {
  const host = trimEnv(process.env.SMTP_HOST);
  const port = smtpPort();
  const user = trimEnv(process.env.ORDERS_SMTP_USER) || ORDERS_FROM_DEFAULT;
  const pass = trimEnv(process.env.ORDERS_SMTP_PASS);
  if (!host || !port || !user || !pass) {
    throw new Error(
      "Orders email is not configured (ORDERS_SMTP_PASS, and SMTP_HOST / SMTP_PORT)"
    );
  }
  return { host, port, user, pass, from: user };
}

export async function sendOrderDispatchedEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const config = getOrdersMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `AOAC Orders <${config.from}>`,
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
    date: new Date(),
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
  const port = smtpPort()!;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
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
  const fromEmail = config?.from || process.env.SMTP_FROM!;

  await transporter.sendMail({
    from: fromEmail,
    to: Array.isArray(to) ? to.join(", ") : to,
    cc: cc ? (Array.isArray(cc) ? cc.join(", ") : cc) : undefined,
    subject,
    html,
  });
}


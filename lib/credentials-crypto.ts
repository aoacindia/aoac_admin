import { createCipheriv, createDecipheriv, createHash, randomBytes, scryptSync } from "crypto";

export type CredentialExtraField = {
  label: string;
  value: string;
};

export type CredentialSecretPayload = {
  email: string;
  password: string;
  extras: CredentialExtraField[];
};

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;

function getEncryptionKey(): Buffer {
  const raw = process.env.CREDENTIALS_ENCRYPTION_KEY?.trim();
  if (raw) {
    // Prefer 64-char hex (32 bytes). Also accept any string via SHA-256.
    if (/^[0-9a-fA-F]{64}$/.test(raw)) {
      return Buffer.from(raw, "hex");
    }
    return createHash("sha256").update(raw).digest();
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("CREDENTIALS_ENCRYPTION_KEY or AUTH_SECRET is required");
  }

  return scryptSync(secret, "aoac-credentials-v1", 32);
}

export function encryptCredentialSecrets(payload: CredentialSecretPayload): {
  ciphertext: string;
  iv: string;
  authTag: string;
} {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGO, key, iv);
  const plaintext = JSON.stringify({
    email: payload.email,
    password: payload.password,
    extras: payload.extras.map((e) => ({
      label: e.label.trim(),
      value: e.value,
    })),
  });
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

export function decryptCredentialSecrets(parts: {
  ciphertext: string;
  iv: string;
  authTag: string;
}): CredentialSecretPayload {
  const key = getEncryptionKey();
  const decipher = createDecipheriv(
    ALGO,
    key,
    Buffer.from(parts.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(parts.authTag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parts.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");

  const parsed = JSON.parse(decrypted) as Partial<CredentialSecretPayload>;
  return {
    email: typeof parsed.email === "string" ? parsed.email : "",
    password: typeof parsed.password === "string" ? parsed.password : "",
    extras: Array.isArray(parsed.extras)
      ? parsed.extras
          .filter(
            (e): e is CredentialExtraField =>
              !!e &&
              typeof e.label === "string" &&
              typeof e.value === "string"
          )
          .map((e) => ({ label: e.label, value: e.value }))
      : [],
  };
}

export function normalizeExtras(
  extras: unknown
): CredentialExtraField[] {
  if (!Array.isArray(extras)) return [];
  return extras
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const label = String((item as { label?: unknown }).label ?? "").trim();
      const value = String((item as { value?: unknown }).value ?? "");
      if (!label) return null;
      return { label, value };
    })
    .filter((e): e is CredentialExtraField => e !== null);
}

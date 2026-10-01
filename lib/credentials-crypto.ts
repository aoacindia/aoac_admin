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
const AUTH_TAG_LENGTH = 16;
const GCM_OPTIONS = { authTagLength: AUTH_TAG_LENGTH } as const;

export class CredentialDecryptError extends Error {
  constructor(
    message = "Could not decrypt this credential. It was saved with a different encryption key than this server is using. Set CREDENTIALS_ENCRYPTION_KEY (or AUTH_SECRET) to the same value used when the credential was saved, then restart the app."
  ) {
    super(message);
    this.name = "CredentialDecryptError";
  }
}

function addKey(keys: Buffer[], seen: Set<string>, key: Buffer) {
  const id = key.toString("hex");
  if (seen.has(id) || key.length !== 32) return;
  seen.add(id);
  keys.push(key);
}

/** Keys to try for decrypt, including older derivation paths. */
function candidateDecryptKeys(): Buffer[] {
  const keys: Buffer[] = [];
  const seen = new Set<string>();

  const raw = process.env.CREDENTIALS_ENCRYPTION_KEY?.trim();
  if (raw) {
    if (/^[0-9a-fA-F]{64}$/.test(raw)) {
      addKey(keys, seen, Buffer.from(raw, "hex"));
    }
    addKey(keys, seen, createHash("sha256").update(raw).digest());
    addKey(keys, seen, scryptSync(raw, "aoac-credentials-v1", 32));
  }

  for (const secret of [process.env.AUTH_SECRET, process.env.NEXTAUTH_SECRET]) {
    if (!secret) continue;
    addKey(keys, seen, scryptSync(secret, "aoac-credentials-v1", 32));
    addKey(keys, seen, createHash("sha256").update(secret).digest());
    const stripped = secret.replace(/^["']|["']$/g, "");
    if (stripped !== secret) {
      addKey(keys, seen, scryptSync(stripped, "aoac-credentials-v1", 32));
      addKey(keys, seen, createHash("sha256").update(stripped).digest());
    }
  }

  return keys;
}

function getEncryptionKey(): Buffer {
  const keys = candidateDecryptKeys();
  if (keys[0]) return keys[0];
  throw new Error("CREDENTIALS_ENCRYPTION_KEY or AUTH_SECRET is required");
}

function decodePart(value: string) {
  const trimmed = value.trim().replace(/\s/g, "");
  const padded = trimmed.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

function decryptWithKey(
  key: Buffer,
  iv: Buffer,
  authTag: Buffer,
  ciphertext: Buffer
): string {
  const decipher = createDecipheriv(ALGO, key, iv, GCM_OPTIONS);
  decipher.setAuthTag(authTag);
  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

export function encryptCredentialSecrets(payload: CredentialSecretPayload): {
  ciphertext: string;
  iv: string;
  authTag: string;
} {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGO, key, iv, GCM_OPTIONS);
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
  const iv = decodePart(parts.iv);
  const authTag = decodePart(parts.authTag);
  const ciphertext = decodePart(parts.ciphertext);
  if (iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
    throw new CredentialDecryptError();
  }

  let decrypted: string | null = null;
  for (const key of candidateDecryptKeys()) {
    try {
      decrypted = decryptWithKey(key, iv, authTag, ciphertext);
      break;
    } catch {
      // Wrong key or corrupted payload — try the next derivation.
    }
  }
  if (decrypted === null) {
    throw new CredentialDecryptError();
  }

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

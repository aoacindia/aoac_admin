type AuditEvent = {
  action: string;
  actorId?: string | null;
  actorRole?: string | null;
  targetType?: string;
  targetId?: string | null;
  outcome: "success" | "denied" | "error";
  meta?: Record<string, unknown>;
};

export function audit(event: AuditEvent) {
  const safeMeta = event.meta ? redact(event.meta) : undefined;
  console.info(
    "[audit]",
    JSON.stringify({
      ...event,
      meta: safeMeta,
      at: new Date().toISOString(),
    })
  );
}

const SENSITIVE_KEYS = /pass|secret|token|otp|key|authorization|cookie|hash/i;

function redact(value: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(value)) {
    if (SENSITIVE_KEYS.test(key)) {
      out[key] = "[redacted]";
      continue;
    }
    out[key] = raw;
  }
  return out;
}

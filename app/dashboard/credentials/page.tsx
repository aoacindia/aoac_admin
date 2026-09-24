"use client";

import { useCallback, useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CredentialListItem = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type ExtraField = { label: string; value: string };

type RevealedCredential = {
  id: string;
  title: string;
  email: string;
  password: string;
  extras: ExtraField[];
};

const EMPTY_FORM = {
  title: "",
  email: "",
  password: "",
  extras: [] as ExtraField[],
};

const UNLOCK_STORAGE_KEY = "credential_unlock_token";

export default function CredentialsPage() {
  const [items, setItems] = useState<CredentialListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [unlockToken, setUnlockToken] = useState<string | null>(null);
  const [unlockExpiresAt, setUnlockExpiresAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);

  const [showUnlock, setShowUnlock] = useState(false);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [maskedEmail, setMaskedEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [unlockBusy, setUnlockBusy] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [revealed, setRevealed] = useState<RevealedCredential | null>(null);
  const [revealBusy, setRevealBusy] = useState(false);

  const isUnlocked = Boolean(unlockToken) && remainingMs > 0;

  const clearUnlock = useCallback(() => {
    setUnlockToken(null);
    setUnlockExpiresAt(null);
    setRemainingMs(0);
    setRevealed(null);
    setEditingId((current) => {
      if (current) {
        setShowForm(false);
        setFormData(EMPTY_FORM);
      }
      return null;
    });
    sessionStorage.removeItem(UNLOCK_STORAGE_KEY);
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(UNLOCK_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        token?: string;
        expiresAt?: number;
      };
      if (
        parsed.token &&
        typeof parsed.expiresAt === "number" &&
        parsed.expiresAt > Date.now()
      ) {
        setUnlockToken(parsed.token);
        setUnlockExpiresAt(parsed.expiresAt);
        setRemainingMs(parsed.expiresAt - Date.now());
      } else {
        sessionStorage.removeItem(UNLOCK_STORAGE_KEY);
      }
    } catch {
      sessionStorage.removeItem(UNLOCK_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!unlockExpiresAt || !unlockToken) {
      setRemainingMs(0);
      return;
    }

    const tick = () => {
      const left = unlockExpiresAt - Date.now();
      if (left <= 0) {
        setRemainingMs(0);
        clearUnlock();
        return;
      }
      setRemainingMs(left);
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [unlockExpiresAt, unlockToken, clearUnlock]);

  const persistUnlock = (token: string, expiresInMinutes: number) => {
    const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
    setUnlockToken(token);
    setUnlockExpiresAt(expiresAt);
    setRemainingMs(expiresAt - Date.now());
    sessionStorage.setItem(
      UNLOCK_STORAGE_KEY,
      JSON.stringify({ token, expiresAt })
    );
  };

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/credentials");
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to load credentials");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load credentials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const requestOtp = async () => {
    setUnlockBusy(true);
    setUnlockError(null);
    setOtp("");
    try {
      const response = await fetch("/api/credentials/unlock/request", {
        method: "POST",
      });
      const data = await response.json();
      if (!data.success) {
        setUnlockError(data.error || "Failed to send OTP");
        return;
      }
      setChallengeToken(data.challengeToken);
      setMaskedEmail(data.email);
      setShowUnlock(true);
    } catch (err: unknown) {
      setUnlockError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setUnlockBusy(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeToken) return;
    setUnlockBusy(true);
    setUnlockError(null);
    try {
      const response = await fetch("/api/credentials/unlock/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeToken, otp: otp.trim() }),
      });
      const data = await response.json();
      if (!data.success) {
        setUnlockError(data.error || "Invalid OTP");
        return;
      }
      persistUnlock(data.unlockToken, data.expiresInMinutes || 3);
      setShowUnlock(false);
      setChallengeToken(null);
      setOtp("");
    } catch (err: unknown) {
      setUnlockError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setUnlockBusy(false);
    }
  };

  const ensureUnlocked = async () => {
    if (isUnlocked) return true;
    await requestOtp();
    return false;
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = async (id: string) => {
    const ok = await ensureUnlocked();
    if (!ok || !unlockToken) return;

    setRevealBusy(true);
    try {
      const response = await fetch(`/api/credentials/${id}`, {
        headers: { "x-credential-unlock": unlockToken },
      });
      const data = await response.json();
      if (data.code === "UNLOCK_REQUIRED") {
        clearUnlock();
        await requestOtp();
        return;
      }
      if (!data.success) {
        setError(data.error || "Failed to load credential");
        return;
      }
      const row = data.data as RevealedCredential;
      setEditingId(row.id);
      setFormData({
        title: row.title,
        email: row.email,
        password: row.password,
        extras: row.extras?.length ? row.extras : [],
      });
      setShowForm(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load credential");
    } finally {
      setRevealBusy(false);
    }
  };

  const viewCredential = async (id: string) => {
    let token = unlockToken;
    if (!isUnlocked || !token) {
      await requestOtp();
      return;
    }

    setRevealBusy(true);
    try {
      const response = await fetch(`/api/credentials/${id}`, {
        headers: { "x-credential-unlock": token },
      });
      const data = await response.json();
      if (data.code === "UNLOCK_REQUIRED") {
        clearUnlock();
        await requestOtp();
        return;
      }
      if (!data.success) {
        setError(data.error || "Failed to reveal credential");
        return;
      }
      setRevealed(data.data as RevealedCredential);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reveal credential");
    } finally {
      setRevealBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        if (!unlockToken || !isUnlocked) {
          setError("Vault must be unlocked to update credentials");
          setSubmitting(false);
          await requestOtp();
          return;
        }
      }

      const payload = {
        title: formData.title.trim(),
        email: formData.email.trim(),
        password: formData.password,
        extras: formData.extras.filter((x) => x.label.trim()),
        ...(editingId ? { unlockToken } : {}),
      };

      const url = editingId
        ? `/api/credentials/${editingId}`
        : "/api/credentials";
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(editingId && unlockToken
            ? { "x-credential-unlock": unlockToken }
            : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!data.success) {
        if (data.code === "UNLOCK_REQUIRED") {
          clearUnlock();
          await requestOtp();
        }
        setError(data.error || "Failed to save");
        return;
      }
      setShowForm(false);
      setFormData(EMPTY_FORM);
      setEditingId(null);
      await fetchList();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await ensureUnlocked();
    if (!ok) return;
    const token = unlockToken;
    if (!token) return;
    if (!window.confirm("Delete this credential permanently?")) return;

    try {
      const response = await fetch(`/api/credentials/${id}`, {
        method: "DELETE",
        headers: { "x-credential-unlock": token },
      });
      const data = await response.json();
      if (data.code === "UNLOCK_REQUIRED") {
        clearUnlock();
        await requestOtp();
        return;
      }
      if (!data.success) {
        setError(data.error || "Failed to delete");
        return;
      }
      if (revealed?.id === id) setRevealed(null);
      await fetchList();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const addExtra = () => {
    setFormData((prev) => ({
      ...prev,
      extras: [...prev.extras, { label: "", value: "" }],
    }));
  };

  const updateExtra = (index: number, field: "label" | "value", value: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      ),
    }));
  };

  const removeExtra = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.filter((_, i) => i !== index),
    }));
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  const countdownLabel = formatCountdown(remainingMs);

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Credentials</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ADMIN only. Secrets are encrypted at rest. Viewing requires an OTP
            sent to your login email. Unlock lasts 3 minutes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isUnlocked ? (
            <>
              <div
                className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 tabular-nums"
                aria-live="polite"
              >
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Unlocked — locks in{" "}
                <span className="font-mono text-base tracking-wider">
                  {countdownLabel}
                </span>
              </div>
              <Button type="button" variant="outline" onClick={clearUnlock}>
                Lock now
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={requestOtp}
              disabled={unlockBusy}
            >
              {unlockBusy ? "Sending OTP…" : "Unlock to view"}
            </Button>
          )}
          <Button type="button" onClick={openCreate}>
            Add credential
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-lg border border-border bg-background">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No credentials saved yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={revealBusy}
                        onClick={() => viewCredential(item.id)}
                      >
                        View
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={revealBusy}
                        onClick={() => openEdit(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {showUnlock && (
        <Modal
          title="Verify OTP to unlock vault"
          onClose={() => {
            if (unlockBusy) return;
            setShowUnlock(false);
          }}
          maxWidthClassName="max-w-md"
        >
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              An OTP was sent to{" "}
              <span className="font-medium text-foreground">
                {maskedEmail || "your email"}
              </span>
              . Enter it to view or edit credentials.
            </p>
            {unlockError && (
              <p className="text-sm text-red-600">{unlockError}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="credential-otp">OTP</Label>
              <Input
                id="credential-otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={unlockBusy}
                onClick={requestOtp}
              >
                Resend OTP
              </Button>
              <Button type="submit" disabled={unlockBusy || otp.trim().length < 4}>
                {unlockBusy ? "Verifying…" : "Unlock"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {showForm && (
        <Modal
          title={editingId ? "Edit credential" : "Add credential"}
          onClose={() => {
            if (submitting) return;
            setShowForm(false);
          }}
          maxWidthClassName="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cred-title">Title</Label>
              <Input
                id="cred-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. HDFC NetBanking"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cred-email">Email or username</Label>
              <Input
                id="cred-email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="email@example.com or username"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cred-password">Password</Label>
              <Input
                id="cred-password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, password: e.target.value }))
                }
                required
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Extra fields</Label>
                <Button type="button" size="sm" variant="outline" onClick={addExtra}>
                  Add field
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Optional — e.g. Username, Corporate ID for banking portals.
              </p>
              {formData.extras.map((extra, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    placeholder="Label"
                    value={extra.label}
                    onChange={(e) => updateExtra(index, "label", e.target.value)}
                  />
                  <Input
                    placeholder="Value"
                    value={extra.value}
                    onChange={(e) => updateExtra(index, "value", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeExtra(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save encrypted"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {revealed && (
        <Modal
          title={revealed.title}
          onClose={() => setRevealed(null)}
          maxWidthClassName="max-w-lg"
        >
          <div className="space-y-4">
            <SecretRow
              label="Email or username"
              value={revealed.email}
              onCopy={() => copyText(revealed.email)}
            />
            <SecretRow
              label="Password"
              value={revealed.password}
              secret
              onCopy={() => copyText(revealed.password)}
            />
            {revealed.extras.map((extra, i) => (
              <SecretRow
                key={`${extra.label}-${i}`}
                label={extra.label}
                value={extra.value}
                secret
                onCopy={() => copyText(extra.value)}
              />
            ))}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => setRevealed(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function SecretRow({
  label,
  value,
  secret,
  onCopy,
}: {
  label: string;
  value: string;
  secret?: boolean;
  onCopy: () => void;
}) {
  const [visible, setVisible] = useState(!secret);

  return (
    <div className="rounded-md border border-border p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="flex gap-1">
          {secret && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? "Hide" : "Show"}
            </Button>
          )}
          <Button type="button" size="sm" variant="ghost" onClick={onCopy}>
            Copy
          </Button>
        </div>
      </div>
      <p className="font-mono text-sm break-all text-foreground">
        {visible ? value || "—" : "••••••••••••"}
      </p>
    </div>
  );
}

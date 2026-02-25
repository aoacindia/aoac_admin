"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateEmailAccountPage() {
  const [fromEmail, setFromEmail] = useState("");
  const [smtpHost, setSmtpHost] = useState("smtp.hostinger.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!fromEmail.trim() || !smtpHost.trim() || !smtpPort.trim() || !smtpUser.trim() || !smtpPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail.trim())) {
      setError("Please enter a valid from email address.");
      return;
    }

    // Validate port number
    const port = parseInt(smtpPort);
    if (isNaN(port) || port < 1 || port > 65535) {
      setError("Please enter a valid port number (1-65535).");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromEmail: fromEmail.trim(),
          smtpHost: smtpHost.trim(),
          smtpPort: port,
          smtpUser: smtpUser.trim(),
          smtpPassword: smtpPassword.trim(),
          isActive,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Failed to save email account.");
        return;
      }
      setMessage("Email account saved successfully.");
      setFromEmail("");
      setSmtpHost("smtp.hostinger.com");
      setSmtpPort("587");
      setSmtpUser("");
      setSmtpPassword("");
      setIsActive(true);
    } catch (err: any) {
      setError(err.message || "Failed to save email account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-foreground">Add Email Account</h1>
      <p className="text-sm text-muted-foreground">
        Configure SMTP settings for email account (Hostinger SMTP).
      </p>

      <div className="mt-6 max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fromEmail">From Email Address *</Label>
          <Input
            id="fromEmail"
            type="email"
            placeholder="your-email@yourdomain.com"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            The email address that will appear as the sender.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpHost">SMTP Host *</Label>
          <Input
            id="smtpHost"
            placeholder="smtp.hostinger.com"
            value={smtpHost}
            onChange={(e) => setSmtpHost(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            SMTP server hostname (default: smtp.hostinger.com for Hostinger).
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPort">SMTP Port *</Label>
          <Input
            id="smtpPort"
            type="number"
            placeholder="587"
            value={smtpPort}
            onChange={(e) => setSmtpPort(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            SMTP port number (587 for TLS, 465 for SSL - default: 587 for Hostinger).
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpUser">SMTP Username *</Label>
          <Input
            id="smtpUser"
            type="email"
            placeholder="your-email@yourdomain.com"
            value={smtpUser}
            onChange={(e) => setSmtpUser(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Usually the same as your email address.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPassword">SMTP Password *</Label>
          <Input
            id="smtpPassword"
            type="password"
            placeholder="Enter SMTP password"
            value={smtpPassword}
            onChange={(e) => setSmtpPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Your email account password or app-specific password.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (Enable this email account)
            </Label>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Email Account"}
        </Button>
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"request" | "verify">("request");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleRequestOtp = async () => {
    setError("");
    setMessage("");
    if (!identifier.trim()) {
      setError("Please enter your email or phone number.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Failed to send OTP.");
        return;
      }
      setToken(data.token);
      setStep("verify");
      setMessage(
        data.email ? `OTP sent to ${data.email}` : "OTP sent to your email."
      );
    } catch (err: any) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        identifier,
        otp,
        token,
      });
      if (result?.error) {
        setError("Invalid OTP or account not allowed.");
        return;
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/logo.png"
            alt="AOAC logo"
            width={72}
            height={72}
            className="mb-3"
            priority
          />
          <h1 className="text-2xl font-semibold text-foreground">
            AOAC Admin panal
          </h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Use your email or phone number to receive a one-time password.
        </p>

        <div className="mt-6 space-y-4">
          <Input
            placeholder="Email or phone number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={loading || step === "verify"}
          />

          {step === "verify" && (
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          {step === "request" ? (
            <Button
              className="w-full"
              onClick={handleRequestOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login"}
            </Button>
          )}

          {step === "verify" && (
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => {
                setStep("request");
                setOtp("");
                setToken("");
                setMessage("");
                setError("");
              }}
              disabled={loading}
            >
              Use a different account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


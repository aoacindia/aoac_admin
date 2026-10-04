import { NextResponse } from "next/server";

export function jsonError(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export function authErrorResponse(result: {
  error: string;
  status: 401 | 403;
}) {
  return jsonError(result.error, result.status);
}

export function serverErrorResponse(error: unknown, context: string) {
  console.error(context, error);
  return jsonError("Server error", 500);
}

export function rateLimitResponse(retryAfterSec: number) {
  return NextResponse.json(
    { success: false, error: "Too many requests" },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    }
  );
}

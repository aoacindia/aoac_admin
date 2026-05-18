import jwt from "jsonwebtoken";

const ALGORITHM = "HS256" as const;

export type PaymentTokenPayload = {
  orderId: string;
};

function getPaymentTokenSecret(): string {
  const secret = process.env.PAYMENT_TOKEN_SECRET;
  if (!secret) {
    throw new Error("PAYMENT_TOKEN_SECRET is not configured");
  }
  return secret;
}

/** Signs a non-expiring JWT containing the order id (backend-only). */
export function createPaymentToken(orderId: string): string {
  const secret = getPaymentTokenSecret();
  return jwt.sign({ orderId }, secret, { algorithm: ALGORITHM });
}

/** Verifies token signature and returns payload, or null if invalid. */
export function verifyPaymentToken(token: string): PaymentTokenPayload | null {
  try {
    const secret = getPaymentTokenSecret();
    const decoded = jwt.verify(token, secret, {
      algorithms: [ALGORITHM],
    }) as jwt.JwtPayload;

    if (typeof decoded.orderId !== "string" || !decoded.orderId) {
      return null;
    }

    return { orderId: decoded.orderId };
  } catch {
    return null;
  }
}

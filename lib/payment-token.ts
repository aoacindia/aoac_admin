import jwt from "jsonwebtoken";

const ALGORITHM = "HS256" as const;
const PAYMENT_LINK_TYPE = "PAYMENT_LINK" as const;

export type PaymentTokenPayload = {
  orderId: string;
  type: typeof PAYMENT_LINK_TYPE;
};

function getPaymentTokenSecret(): string {
  const secret =
    process.env.PAYMENT_TOKEN_SECRET?.trim() ||
    process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "PAYMENT_TOKEN_SECRET (or JWT_SECRET) is not configured"
    );
  }
  return secret;
}

/** Signs a non-expiring JWT matching the pay app format (orderId + type). */
export function createPaymentToken(orderId: string): string {
  const secret = getPaymentTokenSecret();
  return jwt.sign(
    { orderId, type: PAYMENT_LINK_TYPE },
    secret,
    { algorithm: ALGORITHM }
  );
}

/** Verifies token signature and returns payload, or null if invalid. */
export function verifyPaymentToken(token: string): PaymentTokenPayload | null {
  try {
    const secret = getPaymentTokenSecret();
    const decoded = jwt.verify(token, secret, {
      algorithms: [ALGORITHM],
    }) as jwt.JwtPayload;

    if (
      typeof decoded.orderId !== "string" ||
      !decoded.orderId ||
      decoded.type !== PAYMENT_LINK_TYPE
    ) {
      return null;
    }

    return { orderId: decoded.orderId, type: PAYMENT_LINK_TYPE };
  } catch {
    return null;
  }
}

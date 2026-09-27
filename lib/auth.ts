import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

export type TokenPayload = {
  userId: string;
  email: string;
};

// Create Token ( include userId & email )
export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "7d", // Valid for 7 days
  });
}

// Verify Token ( make sure it is valid )
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET!) as TokenPayload;
  } catch {
    return null;
  }
}

// cookie name
export const AUTH_COOKIE_NAME = "auth_token";

// cookie settings ( protection & duration )
export function getAuthCookieOptions() {
  return {
    httpOnly: true, // JS can not read cookie from browser [ protection from XSS ]
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days session
  };
}

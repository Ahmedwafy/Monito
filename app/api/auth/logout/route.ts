import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/lib/auth";

// Delete / Remove Cookies from browser → user no longer signed in
export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 },
  );

  // Delete / Remove Cookies
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getAuthCookieOptions(),
    maxAge: 0,
  });

  return response;
}

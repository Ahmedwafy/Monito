import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

// Returns the currently authenticated user based on the auth cookie
export async function GET() {
  try {
    // 1) Read cookies sent with the request from browser
    const cookieStore = await cookies();

    // 2) Get the auth token value from the cookie
    // AUTH_COOKIE_NAME = "auth_token"
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    // 3) No token means the user is not logged in
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }, // Unauthorized
      );
    }

    // 4) Verify the token
    // - Checks signature
    // - Checks expiration
    // Returns payload { userId, email } if valid, otherwise null
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // 5) Connect to MongoDB
    await connectDB();

    // 6) Find the user by id (userId) from the token payload
    // select("-password") excludes the password field from the result
    const user = await User.findById(payload.userId).select("-password");

    // 7) Token is valid, but user no longer exists in the database
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 8) Success: return safe user data (without password)
    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          favorites: user.favorites,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    // 9) Unexpected server/database errors
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }, // Internal Server Error
    );
  }
}

//  cookie ?
// if no cookie → 401 Not authenticated
// if yes ↓
// token valid ?
// if token Invalid or expired → 401 Not authenticated
// if yes ↓
// User exist in Mongo ?
// if no → user not found + 404
// if yes ↓
// user data + 200

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken, AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1) Validation on body sent by user (inputs fields)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // 2) DB Connection
    await connectDB();

    // 3) Find the user in DB
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // response body if (!user)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 4) Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 5) Create Token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // 6) Create the response and attach the cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    // Add JWT into cookie in server response to browser
    // this line tells the browser : save a cookie named as (auth_token) & it's value = token. with the setteings of  getAuthCookieOptions()
    // browser will → save the cookie, any future requests → browser will send this cookie with the request.
    // ::: this line set JST into cookie and send it into the login response so the browser will be able to remember that user is logged in.
    response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// email + password
//       ↓
// find user (mail) ?
//       ↓ no → 401
//       ↓ yes
// password identical with hash ?
//       ↓ no → 401
//       ↓ yes
// Create JWT
//       ↓
// attach it in httpOnly cookie
//       ↓
// return data for user

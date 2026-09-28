import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1) Simple Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // 2) DB Connection
    await connectDB();

    // 3) Check if email already exists → if yes: 409 Conflict
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 },
      );
    }

    // 4) Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5) User.create → Create the user's document  in the Collection [users] in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      favorites: [],
    });

    // 6) Returen data without Password
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   return NextResponse.json(
    //     { error: "Something went wrong" },
    //     { status: 500 },
    //   );
    // }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

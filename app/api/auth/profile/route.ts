import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : undefined;
    const address =
      typeof body.address === "string" ? body.address.trim() : undefined;

    // Build only fields that were sent
    const updates: { name?: string; phone?: string; address?: string } = {};
    if (name !== undefined) {
      if (!name) {
        return NextResponse.json(
          { error: "Name cannot be empty" },
          { status: 400 },
        );
      }
      updates.name = name;
    }
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      payload.userId,
      { $set: updates }, // $set → Update sent fields only
      { new: true }, // return updated document
    ).select("-password"); // without password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone ?? "",
          address: user.address ?? "",
          favorites: user.favorites ?? [],
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

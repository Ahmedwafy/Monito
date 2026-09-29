import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

// Helper: get current user id from cookie (or null)
async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return payload.userId;
}

// ===================== GET /api/favorites =====================
// Returns the current user's favorites array
export async function GET() {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId).select("favorites");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { favorites: user.favorites ?? [] },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET favorites error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ===================== POST /api/favorites =====================
// Body: { petId: number }
// Adds petId to favorites (if not already there)
export async function POST(request: Request) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const petId = Number(body.petId);

    if (!petId || Number.isNaN(petId)) {
      return NextResponse.json(
        { error: "Valid petId is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add only if not already in favorites
    if (!user.favorites.includes(petId)) {
      user.favorites.push(petId);
      await user.save();
    }

    return NextResponse.json(
      {
        message: "Added to favorites",
        favorites: user.favorites,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST favorites error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ===================== DELETE /api/favorites =====================
// Body: { petId: number }
// Removes petId from favorites
export async function DELETE(request: Request) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const petId = Number(body.petId);

    if (!petId || Number.isNaN(petId)) {
      return NextResponse.json(
        { error: "Valid petId is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.favorites = user.favorites.filter((id: number) => id !== petId);
    await user.save();

    return NextResponse.json(
      {
        message: "Removed from favorites",
        favorites: user.favorites,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE favorites error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

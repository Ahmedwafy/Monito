import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return payload.userId;
}

// GET /api/orders → current user's orders (newest first)
export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        orders: orders.map((o) => ({
          id: o._id,
          items: o.items,
          fullName: o.fullName,
          phone: o.phone,
          address: o.address,
          city: o.city,
          notes: o.notes ?? "",
          status: o.status,
          totalItems: o.totalItems,
          createdAt: o.createdAt,
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET orders error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

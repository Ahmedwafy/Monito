import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return payload.userId;
}

// ===================== GET /api/cart =====================
export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId).select("cart");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart ?? [] }, { status: 200 });
  } catch (error) {
    console.error("GET cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ===================== POST /api/cart =====================
// Body: { productId: number, quantity?: number }
// If product already in cart → increase quantity
// POST /api/cart
export async function POST(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const productId = Number(body.productId);
    const quantity = body.quantity != null ? Number(body.quantity) : 1;

    if (!productId || Number.isNaN(productId)) {
      return NextResponse.json(
        { error: "Valid productId is required" },
        { status: 400 },
      );
    }
    if (!quantity || quantity < 1 || Number.isNaN(quantity)) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    await connectDB();

    // 1) Try to increment if product already in cart
    let user = await User.findOneAndUpdate(
      { _id: userId, "cart.productId": productId },
      { $inc: { "cart.$.quantity": quantity } },
      { new: true },
    ).select("cart");

    // 2) If not in cart → push new item
    if (!user) {
      user = await User.findByIdAndUpdate(
        userId,
        { $push: { cart: { productId, quantity } } },
        { new: true },
      ).select("cart");
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Added to cart",
        cart: user.cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ===================== PATCH /api/cart =====================
// Body: { productId: number, quantity: number }
// Set exact quantity (if quantity < 1 → remove item)
export async function PATCH(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const productId = Number(body.productId);
    const quantity = Number(body.quantity);

    if (!productId || Number.isNaN(productId)) {
      return NextResponse.json(
        { error: "Valid productId is required" },
        { status: 400 },
      );
    }
    if (Number.isNaN(quantity)) {
      return NextResponse.json(
        { error: "Valid quantity is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (quantity < 1) {
      user.cart = user.cart.filter(
        (item: { productId: number }) => item.productId !== productId,
      );
    } else {
      const item = user.cart.find(
        (item: { productId: number }) => item.productId === productId,
      );
      if (!item) {
        return NextResponse.json(
          { error: "Item not found in cart" },
          { status: 404 },
        );
      }
      item.quantity = quantity;
    }

    await user.save();

    return NextResponse.json(
      {
        message: "Cart updated",
        cart: user.cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ===================== DELETE /api/cart =====================
// Body: { productId: number }
export async function DELETE(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const productId = Number(body.productId);

    if (!productId || Number.isNaN(productId)) {
      return NextResponse.json(
        { error: "Valid productId is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.cart = user.cart.filter(
      (item: { productId: number }) => item.productId !== productId,
    );
    await user.save();

    return NextResponse.json(
      {
        message: "Removed from cart",
        cart: user.cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

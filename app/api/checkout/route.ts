import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";
import { productsData } from "@/app/mock-data/mockProducts";

// Utility function to get authenticated user ID from cookies - Used in both Cart and Checkout routes
// relocate to : lib/getAuthUserId.ts
async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return payload.userId;
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const address = typeof body.address === "string" ? body.address.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    if (!fullName || !phone || !address || !city) {
      return NextResponse.json(
        { error: "Please fill full name, phone, address, and city" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cart: { productId: number; quantity: number }[] = user.cart ?? [];
    if (!cart.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const items = [];
    for (const line of cart) {
      const product = productsData.find((p) => p.id === line.productId);
      if (!product) continue;

      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: line.quantity,
      });
    }

    if (!items.length) {
      return NextResponse.json(
        { error: "No valid products in cart" },
        { status: 400 },
      );
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const order = await Order.create({
      userId: user._id,
      items,
      fullName,
      phone,
      address,
      city,
      notes,
      status: "pending",
      totalItems,
    });

    // Same pattern as DELETE cart — empty the array then save
    user.cart = [];
    await user.save();

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId: order._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

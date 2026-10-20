import { Schema, models, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true }, // أو Number لو عندك رقم
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }, // optional
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(v: unknown[]) => v.length > 0, "Order must have items"],
    },
    // Shipping
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    // Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    // Optional summary
    totalItems: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = models.Order || model("Order", orderSchema);
export default Order;

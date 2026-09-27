import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  favorites: number[]; // pet ids from mock data
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    favorites: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt + updatedAt ( auto )
  },
);

// if 'User' exists → use it
// if 'User' dose not exist → Create new one
// important for Next.js to prevent Hot Reload create more than 1 model ( next connections use cache )
const User = models.User || model<IUser>("User", UserSchema);

export default User;

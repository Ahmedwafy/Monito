"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/atoms/Button";
import { toast } from "sonner";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const signup = useSignup();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const input = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    signup.mutate(input, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        // After signup → go to login (no auto-login unless your API sets a cookie)
        router.push("/Login");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-3xl shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join Us and find your perfect pet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-(--color-neutral-80) mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-(--color-secondary-monYellow) focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-(--color-neutral-80) mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-(--color-secondary-monYellow) focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-(--color-neutral-80) mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-(--color-secondary-monYellow) focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-(--color-neutral-80) mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-(--color-secondary-monYellow) focus:outline-none transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={signup.isPending}
            className="w-full py-4 text-lg mt-2"
          >
            {signup.isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="font-semibold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

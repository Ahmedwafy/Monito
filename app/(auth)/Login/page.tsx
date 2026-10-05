"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const login = useLogin();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    const input = {
      email: formData.email.trim(),
      password: formData.password,
    };

    login.mutate(input, {
      onSuccess: () => {
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-3xl shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Log in to continue your adoption journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-gray-200 mb-2">
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
            <label className="block text-sm font-medium text-(--color-primary-darkBlue) dark:text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-(--color-secondary-monYellow) focus:outline-none transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={login.isPending}
            className="w-full py-4 text-lg mt-2"
          >
            {login.isPending ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/SignUp"
            className="font-semibold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

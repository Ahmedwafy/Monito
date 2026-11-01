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
    <div className="min-h-screen bg-(--page-bg) flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="w-full max-w-md bg-(--login-card-bg) border border-transparent rounded-3xl shadow-xl p-8 md:p-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-(--login-card-title)">
            Welcome Back
          </h1>
          <p className="mt-2 text-(--login-card-sub-title)">
            Log in to continue your adoption journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-(--login-card-label) mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--login-card-input-border)
                bg-(--login-card-input-bg)
                text-(--login-card-input-text)
                hover:border-(--login-card-input-border-hover)
                focus:border-(--login-card-input-border-focus)
                focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--login-card-label) mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--login-card-input-border)
                bg-(--login-card-input-bg)
                text-(--login-card-input-text)
                hover:border-(--login-card-input-border-hover)
                focus:border-(--login-card-input-border-focus)
                focus:outline-none transition-colors"
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

        <p className="mt-6 text-center text-(--login-card-sub-title)">
          Don&apos;t have an account?{" "}
          <Link
            href="/SignUp"
            className="font-semibold text-(--login-card-question) hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

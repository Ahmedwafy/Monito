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
        router.push("/Login");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-(--page-bg) flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="w-full max-w-md bg-(--signUp-card-bg) border border-transparent rounded-3xl shadow-xl p-8 md:p-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-(--signUp-card-title)">
            Create Account
          </h1>
          <p className="mt-2 text-(--signUp-card-sub-title)">
            Join Us and find your perfect pet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-(--signUp-card-label) mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--signUp-card-input-border)
                bg-(--signUp-card-input-bg)
                text-(--signUp-card-input-text)
                hover:border-(--signUp-card-input-border-hover)
                focus:border-(--signUp-card-input-border-focus)
                focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--signUp-card-label) mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--signUp-card-input-border)
                bg-(--signUp-card-input-bg)
                text-(--signUp-card-input-text)
                hover:border-(--signUp-card-input-border-hover)
                focus:border-(--signUp-card-input-border-focus)
                focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--signUp-card-label) mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--signUp-card-input-border)
                bg-(--signUp-card-input-bg)
                text-(--signUp-card-input-text)
                hover:border-(--signUp-card-input-border-hover)
                focus:border-(--signUp-card-input-border-focus)
                focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--signUp-card-label) mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              className="w-full rounded-xl border-2 px-4 py-3
                border-(--signUp-card-input-border)
                bg-(--signUp-card-input-bg)
                text-(--signUp-card-input-text)
                hover:border-(--signUp-card-input-border-hover)
                focus:border-(--signUp-card-input-border-focus)
                focus:outline-none transition-colors"
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

        <p className="mt-6 text-center text-(--signUp-card-sub-title)">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="font-semibold text-(--signUp-card-question) hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

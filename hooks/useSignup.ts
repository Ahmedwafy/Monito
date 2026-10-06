// hooks/useSignup.ts
"use client";

import { useMutation } from "@tanstack/react-query";

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

const fetchSignup = async (input: SignupInput) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }

  return data;
};

export function useSignup() {
  return useMutation({ mutationFn: fetchSignup });
}

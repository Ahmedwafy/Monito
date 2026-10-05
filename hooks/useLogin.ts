// hooks/useLogin.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type LoginInput = {
  email: string;
  password: string;
};

const fetchLogin = async (input: LoginInput) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

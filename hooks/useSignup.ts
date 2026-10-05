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
  return useMutation({
    mutationFn: fetchSignup,
    onSuccess: async () => {
      {
        //  If API does auto-login → uncomment the following lines to invalidate queries and refresh the page
        //   await queryClient.invalidateQueries({ queryKey: ["me"] });
        //   await queryClient.invalidateQueries({ queryKey: ["favorites"] });
        //   router.push("/");
        //   router.refresh();
      }
    },
  });
}

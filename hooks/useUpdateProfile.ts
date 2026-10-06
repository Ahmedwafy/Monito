// hooks/useUpdateProfile.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthUser } from "./useMe";

type ProfileInput = {
  name: string;
  phone: string;
  address: string;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProfileInput) => {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not update profile");
      }
      return data.user as AuthUser;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
    },
  });
}

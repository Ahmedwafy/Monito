// hooks/useLogout.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.setQueryData(["favorites"], []);
      queryClient.setQueryData(["cart"], []);
    },
  });
}

// hooks/useLogout.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      toast.success("Logged out");
      router.push("/");
      router.refresh();
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
}

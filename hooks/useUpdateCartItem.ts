// hooks/useUpdateCartItem.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CartItem } from "./useCart";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not update cart");
      }
      return data.cart as CartItem[];
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// hooks/useRemoveFromCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "./useCart";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const removeCartItem = async ({ productId }: { productId: number }) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Could not remove item");
    }
    return data.cart as CartItem[];
  };

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
    },
  });
}

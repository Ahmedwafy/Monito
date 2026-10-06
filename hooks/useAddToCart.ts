// hooks/useAddToCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "./useCart";

export function useAddToCart() {
  const queryClient = useQueryClient();

  const addToCart = async ({
    productId,
    quantity = 1,
  }: {
    productId: number;
    quantity?: number;
  }) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (res.status === 401) {
      const err = new Error("Unauthorized");
      (err as Error & { status?: number }).status = 401;
      throw err;
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Could not add to cart");
    }
    return data.cart as CartItem[];
  };

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
    },
  });
}

// hooks/useCart.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export type CartItem = {
  productId: number;
  quantity: number;
};

async function fetchCart(): Promise<CartItem[]> {
  const res = await fetch("/api/cart");

  if (res.status === 401) return [];

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await res.json();
  return data.cart ?? [];
}

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

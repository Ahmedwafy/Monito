"use client";

import { useQuery } from "@tanstack/react-query";

export type OrderItem = {
  productId: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  status: string;
  totalItems: number;
  createdAt: string;
};

async function fetchOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders");

  if (res.status === 401) return [];

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await res.json();
  return data.orders ?? [];
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    retry: false,
  });
}

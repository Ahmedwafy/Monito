// hooks/useFavorites.ts
"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchFavorites(): Promise<number[]> {
  const res = await fetch("/api/favorites");

  //  Not logged in → empty list (not an error for UI)
  if (res.status === 401) return [];

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.favorites ?? [];
}

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    retry: false,
  });
}

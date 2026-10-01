// hooks/useMe.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorites?: number[];
};

async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch("/api/auth/me");

  // Not logged in
  if (res.status === 401) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.user ?? null; // const { data: user, isLoading, isError, refetch } = useMe();
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    // Don't retry on 401 / null session
    retry: false,
  });
}

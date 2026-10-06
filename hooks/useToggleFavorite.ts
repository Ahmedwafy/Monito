// hooks/useToggleFavorite.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      petId,
      isFavorite,
    }: {
      petId: number;
      isFavorite: boolean;
    }) => {
      const res = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });

      if (res.status === 401) {
        const err = new Error("Unauthorized");
        (err as Error & { status?: number }).status = 401;
        throw err;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not update favorites");
      }
      return data.favorites as number[];
    },
    onSuccess: (favorites) => {
      // Update favorites → useFavorites() hook will read the new cahched value and render it.
      // (no need to re-fetch) → queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.setQueryData(["favorites"], favorites);
    },
  });
}

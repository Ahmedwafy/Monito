"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FavoriteButton from "./FavoriteButton";

type PetFavoriteControlProps = {
  petId: number;
  initialIsFavorite: boolean;
};

export default function PetFavoriteControl({
  petId,
  initialIsFavorite,
}: PetFavoriteControlProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });

      if (response.status === 401) {
        toast.error("Please log in to manage favorites");
        router.push("/Login");
        return;
      }

      if (!response.ok) {
        toast.error(
          isFavorite
            ? "Could not remove from favorites"
            : "Could not add to favorites",
        );
        return;
      }

      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites",
      );
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FavoriteButton
      petId={petId}
      isFavorite={isFavorite}
      isLoading={isLoading}
      onClick={handleClick}
      //   className="w-full"
    />
  );
}

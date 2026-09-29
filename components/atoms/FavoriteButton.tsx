"use client";

import { Heart } from "lucide-react";
import Button from "./Button";

type FavoriteButtonProps = {
  petId: number;
  isFavorite?: boolean;
  isLoading?: boolean;
  checked?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function FavoriteButton({
  isFavorite = false,
  isLoading = false,
  checked = true,
  onClick,
  className = "",
}: FavoriteButtonProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        disabled={isLoading || !checked || !onClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`rounded-full p-2.5 shadow-md dark:text-(--action-primary-hover)
        disabled:opacity-50 group mx-auto w-fit gap-0 whitespace-nowrap overflow-hidden
        transition-colors duration-500 ease-in-out
        ${className}
      `}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
        <Heart
          className={`h-5 w-0 shrink-0 overflow-hidden opacity-0 group-hover:ml-2 group-hover:w-5 group-hover:opacity-100 transition-[width,margin,opacity] 
            duration-500 ease-in-out ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-500 dark:text-gray-300"}`}
        />
      </Button>
    </div>
  );
}

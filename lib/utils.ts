import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn = combine + normalize classes
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

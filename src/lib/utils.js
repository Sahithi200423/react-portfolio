import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind CSS conflict resolution.
 * Standard utility for shadcn/ui components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

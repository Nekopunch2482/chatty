import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const HOST = "http://localhost:8080";
export const HOST = "http://147.45.102.230:8080";

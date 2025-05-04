import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface ErrorState {
  errors?: Record<string, string[]>;
}
export function getErrorMessage({ errors }: ErrorState, field: string) {
  if (errors && field in errors) {
    return errors[field][0];
  }
  return "";
}

import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, {
    addSuffix: true,
  });
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

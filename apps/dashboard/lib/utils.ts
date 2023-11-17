import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type Model = {
    [key: string]: any
}

function exclude<T, U extends keyof T>(
    model: T,
    keys: U[]
): Omit<T, U> {
    return Object.fromEntries(
        Object.entries(model as Model).filter(([key]) => !keys.includes(key as any))
    ) as Omit<T, U>
}
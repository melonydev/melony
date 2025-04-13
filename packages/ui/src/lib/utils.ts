import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformData = (data: any, transform?: string) => {
  if (!transform) return data;

  try {
    // Create a safe function from the transform string
    const transformFn = new Function(
      "data",
      `return (data => ${transform})(data)`
    );
    return transformFn(data);
  } catch (error) {
    console.error("Error transforming response:", error);
    return data;
  }
};

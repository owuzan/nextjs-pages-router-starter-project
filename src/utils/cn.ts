import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classNames: Parameters<typeof clsx>) =>
  twMerge(clsx(...classNames));

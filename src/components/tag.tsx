import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const twNeutral = "text-gray-600 bg-slate-200";
const twBlue = "text-blue-600 bg-blue-100";

type Props = {
  children?: ReactNode;
  className?: string;
  colorScheme?: "blue" | "neutral";
};

export function Tag({ children, className, colorScheme = "neutral" }: Props) {
  return (
    <span
      className={twMerge(
        "text-sm font-medium rounded-full leading-relaxed inline-flex px-2",
        colorScheme === "blue" ? twBlue : twNeutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

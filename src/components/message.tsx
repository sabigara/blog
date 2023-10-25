import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
};

export function Message({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        "p-4 border text-[0.92em] rounded-md bg-slate-50 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
    >
      {children}
    </div>
  );
}

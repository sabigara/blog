import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import { ExclamationIcon, InfoIcon } from "@/components/icons";

type Props = {
  children?: ReactNode;
  className?: string;
  status?: "info" | "warning";
};

export function Message({ children, className, status = "info" }: Props) {
  const Icon = StatusIcon[status];
  return (
    <div
      className={twMerge(
        "p-4 border text-[0.92em] rounded-md bg-slate-50",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 ">
        <span className="rounded-full w-5 h-5 text-[0.75rem] flex justify-center items-center bg-slate-400 text-white">
          <Icon aria-hidden className="" />
        </span>
        <span className="text-md font-semibold leading-none text-slate-400 tracking-wider">
          {status.toUpperCase()}
        </span>
      </div>
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

const StatusIcon: { [key in Required<Props>["status"]]: IconType } = {
  info: InfoIcon,
  warning: ExclamationIcon,
};

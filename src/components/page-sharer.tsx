"use client";

import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { ShareChannel } from "@/constants/share-channel";
import { siteConfig } from "@/content/site-config";
import { ShareAction } from "@/lib/share-action";
import type { ShareChannelName } from "@/types/share-channel";

type Props = {
  className?: string;
  title: string;
};

export function PageSharer({ className, title }: Props) {
  const pathname = usePathname();

  const createClickHandler = (channel: ShareChannelName) => () => {
    ShareAction[channel]({
      title,
      url: siteConfig.url + pathname,
    });
  };

  return (
    <ul className={twMerge("flex gap-1", className)}>
      {Object.entries(ShareChannel).map(([key, { Icon, label }]) => (
        <li className="relative" key={key}>
          <button
            aria-label={`${label}でシェア`}
            className="grid place-items-center p-2 rounded-md text-gray-300 hover:text-gray-900"
            onClick={createClickHandler(key as ShareChannelName)}
          >
            <Icon className="text-xl" />
          </button>
        </li>
      ))}
    </ul>
  );
}

import { twMerge } from "tailwind-merge";

import { Link } from "@/components/link";
import { WebChannel } from "@/constants/web-channel";
import type { SocialAccount } from "@/types/social-account";

type Props = {
  socialLink: SocialAccount;
};

export function SocialAccountItem({ socialLink }: Props) {
  const website = WebChannel[socialLink.channel];
  const { Icon, label } = website;

  return (
    <Link
      className="rounded-2xl aspect-square w-full max-w-[8rem] grid place-content-center place-items-center gap-y-1 border hover:border-gray-300 group"
      external
      externalIcon={false}
      href={socialLink.url}
    >
      <Icon aria-hidden className={twMerge("w-9 h-9")} strokeWidth={1} />
      <span className="text-sm text-gray-300 group-hover:text-gray-600">
        {label}
      </span>
    </Link>
  );
}

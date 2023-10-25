import { twMerge } from "tailwind-merge";

import { Link } from "@/components/link";
import { Website } from "@/constants/website";
import type { SocialLink } from "@/types/social-link";

type Props = {
  socialLink: SocialLink;
};

export function SocialLinkItem({ socialLink }: Props) {
  const website = Website[socialLink.website];
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

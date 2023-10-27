import { twMerge } from "tailwind-merge";

import type { SiteMetadata } from "@/lib/og/fetch-site-metadata";
import { fetchSiteMetadata } from "@/lib/og/fetch-site-metadata";

type Props = {
  className?: string;
  href: string;
};

export async function OgLink({ className, href }: Props) {
  let metadata: SiteMetadata | null = null;
  let hostname: string | null = null;
  try {
    metadata = await fetchSiteMetadata(href);
  } catch (e) {
    console.error(e);
  }
  try {
    hostname = new URL(href).hostname;
  } catch (e) {
    console.error(e);
  }

  return (
    <a
      className={twMerge("relative h-full w-full flex", className)}
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      <span className="flex flex-col justify-between gap-1 overflow-hidden p-3">
        <span className="font-medium line-clamp-1 leading-tight">
          {metadata?.ogp.title || metadata?.title || href}
        </span>
        <span className="line-clamp-1 text-sm leading-tight text-gray-500">
          {metadata?.ogp.description || metadata?.description}
        </span>
        <span className="flex items-center gap-2 truncate text-sm leading-tight text-gray-500">
          <img alt="ファビコン" height={14} src={faviconUrl(href)} width={14} />
          {hostname}
        </span>
      </span>
      {metadata?.ogp.image && (
        <img
          alt="ページの画像"
          className="h-full ml-auto object-cover hidden border-l sm:block"
          src={metadata.ogp.image}
        />
      )}
    </a>
  );
}

function faviconUrl(url: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain_url=${url}`;
}

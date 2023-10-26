"use client";

import { usePathname } from "next/navigation";

import { CodeIcon, PenLineIcon } from "@/components/icons";
import { Link } from "@/components/link";

const twIconLink =
  "p-[6px] flex items-center justify-center rounded-lg hover:bg-slate-100";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container px-container h-[3.25rem] flex items-center bg-white">
        <div className="flex-1">
          <Link className="font-semibold text-xl leading-4" href="/">
            Sabigara
          </Link>
          <CategoryLink />
        </div>
        <div className="flex items-center gap-2">
          <Link className={twIconLink} href="/works">
            <CodeIcon size="1.5rem" strokeWidth={1.7} />
          </Link>
          <Link className={twIconLink} href="/posts">
            <PenLineIcon size="1.5rem" strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function CategoryLink() {
  const pathname = usePathname();
  const category = pathname.split("/")[1];
  if (!["posts", "works"].includes(category)) {
    return null;
  }

  return (
    <>
      <span className="mx-2 text-black/30">/</span>
      <Link className="font-medium" href={`/${category}`}>
        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
      </Link>
    </>
  );
}

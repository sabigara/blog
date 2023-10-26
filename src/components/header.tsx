"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container px-container h-[3.25rem] flex items-center bg-white">
        <Link className="font-bold text-xl leading-4" href="/">
          Sabigara
        </Link>
        <CategoryLink />
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
      <span className="mx-2">/</span>
      <Link className="font-medium" href={`/${category}`}>
        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
      </Link>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";

import { CategoryDropdown } from "@/components/category-dropdown";
import { Link } from "@/components/link";
import { CATEGORIES } from "@/constants/categories";
import { upperCaseFirst } from "@/lib/string/upper-case-first";
import type { Category } from "@/types/category";

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="container px-container h-[3.25rem] flex items-center bg-white">
        <div className="flex-1 h-full flex items-center">
          <div>
            <Link className="font-semibold text-xl leading-4" href="/">
              Sabigara
            </Link>
            <CategoryLink />
          </div>
          <CategoryDropdown className="ml-[2px]" />
        </div>
      </div>
    </header>
  );
}

function CategoryLink() {
  const pathname = usePathname();
  const category = pathname.split("/")[1];
  if (!CATEGORIES.includes(category as Category)) {
    return null;
  }

  return (
    <>
      <span className="mx-2 text-black/30">/</span>
      <Link className="font-medium" href={`/${category}`}>
        {upperCaseFirst(category)}
      </Link>
    </>
  );
}

"use client";

import { CategoryDropdown } from "@/components/category-dropdown";
import { Link } from "@/components/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="container px-container h-[3.25rem] flex items-center bg-white">
        <div className="flex-1 h-full flex items-center">
          <div>
            <Link className="font-semibold text-xl leading-4" href="/">
              Sabigara
            </Link>
          </div>
          <CategoryDropdown />
        </div>
      </div>
    </header>
  );
}

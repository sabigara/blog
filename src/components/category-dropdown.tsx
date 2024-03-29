"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

import { CheckIcon, SelectorIcon } from "@/components/icons";
import { CATEGORIES } from "@/constants/categories";
import { upperCaseFirst } from "@/lib/string/upper-case-first";
import type { Category } from "@/types/category";

export function CategoryDropdown() {
  const pathname = usePathname();
  const currentCategory = pathname.split("/")[1];
  const router = useRouter();

  if (!CATEGORIES.includes(currentCategory as Category)) {
    return null;
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="inline-flex items-center p-2 rounded-md hover:bg-slate-100">
        <span className="text-black/30">/</span>
        <span className="mx-2 font-medium">
          {upperCaseFirst(currentCategory)}
        </span>
        <SelectorIcon className="" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={4}>
          <DropdownMenu.RadioGroup
            onValueChange={(category) => router.push(`/${category}`)}
            value={currentCategory}
          >
            {CATEGORIES.map((category) => (
              <DropdownMenu.RadioItem
                className="DropdownMenuItem"
                key={category}
                value={category}
              >
                {upperCaseFirst(category)}
                <DropdownMenu.ItemIndicator>
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

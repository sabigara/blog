"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { CheckIcon, SelectorIcon } from "@/components/icons";
import { CATEGORIES } from "@/constants/categories";
import { upperCaseFirst } from "@/lib/string/upper-case-first";
import type { Category } from "@/types/category";

type Props = {
  className?: string;
};

export function CategoryDropdown({ className }: Props) {
  const pathname = usePathname();
  const current = pathname.split("/")[1];
  const router = useRouter();

  if (!CATEGORIES.includes(current as Category)) {
    return null;
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={twMerge(
            "inline-flex p-2 rounded-md hover:bg-slate-100",
            className
          )}
        >
          <SelectorIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={4}>
          <DropdownMenu.RadioGroup
            onValueChange={(category) => router.push(`/${category}`)}
            value={current}
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

import { localeToLabel } from "@/lib/i18n"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Menu, Transition } from "@headlessui/react"
import { HiOutlineTranslate } from "react-icons/hi"
import { HiChevronDown, HiCheck } from "react-icons/hi2"
import clsx from "clsx"

export default function LocaleSwitch() {
  const { locale: currentLocale, asPath } = useRouter()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          {({ open }) => (
            <div
              className={clsx(
                "inline-flex w-full items-center justify-center gap-1 rounded-md border px-2 py-1 font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                open && "bg-gray-100"
              )}
            >
              <HiOutlineTranslate className="text-lg" />
              <span className="font-normal">{localeToLabel[currentLocale]}</span>
              <HiChevronDown stroke-width="1" className="text-xs" />
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {["en", "ja"].map((locale) => (
            <Menu.Item key={locale} disabled={locale === currentLocale}>
              {({ active, disabled }) =>
                disabled ? (
                  <div className="flex items-center gap-2 px-4 py-2 text-sm">
                    <span className="flex-1">{localeToLabel[locale]}</span>
                    <HiCheck className="text-green-600" strokeWidth="2" />
                  </div>
                ) : (
                  <Link
                    href={asPath}
                    locale={locale}
                    className={clsx("flex px-4 py-2 text-sm", active && !disabled && "bg-gray-100")}
                    aria-current={disabled ? "page" : undefined}
                  >
                    {localeToLabel[locale]}
                  </Link>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

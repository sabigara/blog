import { localeToLabel } from "@/lib/i18n"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Menu, Transition } from "@headlessui/react"
import { HiOutlineTranslate } from "react-icons/hi"
import { HiChevronDown } from "react-icons/hi2"
import clsx from "clsx"

export default function LocaleSwitch() {
  const { locale: currentLocale, asPath } = useRouter()
  const itemClassName = (locale: string, active: boolean) =>
    clsx(
      "flex px-4 py-2 text-sm",
      locale === currentLocale && "font-bold",
      active && locale !== currentLocale && "bg-gray-100"
    )

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-1 rounded-md border px-2 py-1 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HiOutlineTranslate className="text-lg" />
          <HiChevronDown strokeWidth="1" className="text-xs" />
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
            <Menu.Item key={locale}>
              {({ active }) =>
                locale === currentLocale ? (
                  <span className={itemClassName(locale, active)}>{localeToLabel[locale]}</span>
                ) : (
                  <Link
                    href={asPath}
                    locale={locale}
                    className={itemClassName(locale, active)}
                    aria-current={locale === currentLocale ? "page" : undefined}
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

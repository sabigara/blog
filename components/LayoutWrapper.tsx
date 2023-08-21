import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Link from "./Link"
import SectionContainer from "./SectionContainer"
import Footer from "./Footer"
import { ReactNode } from "react"
import LocaleSwitch from "@/components/LocaleSwitch"

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-4">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle} className="hover:no-underline">
              <div className="flex items-center justify-between ">
                {typeof siteMetadata.headerTitle === "string" ? (
                  <div className="hidden h-6 text-2xl font-bold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-base leading-5">
            <div className="flex items-center md:gap-1">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-md rounded-md px-2 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:no-underline dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {link.title}
                </Link>
              ))}
              <LocaleSwitch />
            </div>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper

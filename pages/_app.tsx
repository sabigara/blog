import "@/css/tailwind.css"
import "@/css/prism.css"
import "katex/dist/katex.css"

import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"

import siteMetadata from "@/data/siteMetadata"
import Analytics from "@/components/analytics"
import LayoutWrapper from "@/components/LayoutWrapper"
import { ClientReload } from "@/components/ClientReload"
import { useRouter } from "next/router"
import React from "react"

const isDevelopment = process.env.NODE_ENV === "development"
const isSocket = process.env.SOCKET

const noWrapper = ["/embed/[url]"]

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const components = React.useMemo(() => {
    if (noWrapper.includes(router.pathname)) {
      return <Component {...pageProps} />
    } else {
      return (
        <>
          <Analytics />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </>
      )
    }
  }, [Component, pageProps, router.pathname])

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {components}
    </ThemeProvider>
  )
}

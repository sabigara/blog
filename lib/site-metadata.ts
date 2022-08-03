import { JSDOM } from "jsdom"

export type Ogp = {
  type?: string
  url?: string
  site_name: string
  title?: string
  description?: string
  image?: string
}

export type SiteMetadata = {
  ogp: Ogp
  title?: string
  description?: string
  url: string
}

export async function getSiteMetadata(url: string): Promise<SiteMetadata> {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }
  const htmlStr = await resp.text()
  const dom = new JSDOM(htmlStr)
  const meta = dom.window.document.querySelectorAll("head > meta")

  const description = dom.window.document
    .querySelector("meta[name=description]")
    ?.getAttribute("content")

  const ogp = Array.from(meta)
    .filter(
      (element) =>
        element.hasAttribute("property") && element.getAttribute("property").startsWith("og:")
    )
    .reduce((acc, ogp) => {
      const property = ogp.getAttribute("property").trim().replace("og:", "")
      const content = ogp.getAttribute("content")
      return {
        ...acc,
        [property]: content,
      }
    }, {} as Ogp)
  return {
    ogp,
    title: dom.window.document.title,
    description,
    url,
  }
}

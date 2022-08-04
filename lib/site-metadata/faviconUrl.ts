import { extractDomain } from "@/lib/utils/url"

export function faviconUrl(url: string) {
  const schema = url.startsWith("https") ? "https" : "http"
  return `https://www.google.com/s2/favicons?sz=14&domain_url=${schema}://${extractDomain(url)}`
}

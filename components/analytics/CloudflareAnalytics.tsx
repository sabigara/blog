import Script from "next/script"
import siteMetadata from "@/data/siteMetadata"

const { cloudflareAnalyticsToken } = siteMetadata.analytics

export default function CloudflareAnalytics() {
  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${cloudflareAnalyticsToken}"}`}
    />
  )
}

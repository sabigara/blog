import Script from "next/script"
import siteMetadata from "@/data/siteMetadata"

export default function GoogleAnalytics() {
  if (!siteMetadata.analytics.googleAnalyticsId) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${siteMetadata.analytics.googleAnalyticsId}');
    `}
      </Script>
    </>
  )
}

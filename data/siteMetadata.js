const siteMetadataBase = {
  title: "Rubiq",
  author: "Matsura Yuma",
  headerTitle: "Rubiq",
  description: "Just my journal and a bit of technical writings.",
  language: "en-us",
  theme: "light", // system, dark or light
  siteUrl: "https://rubiq.vercel.app",
  siteRepo: "https://github.com/sabigara/blog",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  email: "lemonburst1958@gmail.com",
  github: "https://github.com/sabigara",
  twitter: "https://twitter.com/_sabigara",
  facebook: "",
  youtube: "",
  linkedin: "",
  locale: "ja-JP",
  analytics: {
    googleAnalyticsId: "G-60SCDRDB1F",
  },
  newsletter: {
    provider: "",
  },
  comment: {
    provider: "",
  },
}

function composeOgImageUrl(articleTitle) {
  return (
    "https://article-og-rubik.vercel.app" +
    `/${encodeURIComponent(articleTitle)}.png?logo=${encodeURIComponent(
      siteMetadataBase.siteUrl + "/" + siteMetadataBase.siteLogo
    )}&service=${encodeURIComponent(siteMetadataBase.title)}`
  )
}

const siteMetadata = {
  ...siteMetadataBase,
  socialBanner: composeOgImageUrl("Rubiq Blog"),
  composeOgImageUrl,
}

module.exports = siteMetadata

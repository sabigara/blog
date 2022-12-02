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
  twitter: "https://twitter.com/MatsuraYuma",
  facebook: "",
  youtube: "",
  linkedin: "",
  locale: "en-US",
  analytics: {
    cloudflareAnalyticsToken: "97727030f84245d7985ffb295d72de53",
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
    "https://article-og-rubik.vercel.app/article" +
    `?text=${encodeURIComponent(articleTitle)}&logo=${encodeURIComponent(
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

const siteMetadataBase = {
  title: "Sabigara.com",
  author: "Matsura Yuma",
  headerTitle: "Sabigara.com",
  description: "Just my journal and a bit of technical writings.",
  language: "ja-jp",
  theme: "light", // system, dark or light
  siteUrl: "https://sabigara.com",
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

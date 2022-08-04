import siteMetadata from "@/data/siteMetadata"
import { PostFrontMatter } from "types/PostFrontMatter"

export function composeOgImageUrl(frontmatter: PostFrontMatter) {
  const { title } = frontmatter
  return (
    siteMetadata.ogImageUrl +
    `/${encodeURIComponent(title)}.png?logo=${encodeURIComponent(
      siteMetadata.siteUrl + "/" + siteMetadata.siteLogo
    )}&service=${encodeURIComponent(siteMetadata.title)}`
  )
}

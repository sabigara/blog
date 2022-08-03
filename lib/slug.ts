export function isZennContents(slug: string) {
  return slug.startsWith("zenn/")
}

export function slugToUrl(slug: string) {
  return isZennContents(slug)
    ? `https://zenn.dev/sabigara/articles/${slug.replace("zenn/", "")}`
    : `/blog/${slug}`
}

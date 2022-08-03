export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string
  fileName?: string
}

export type ZennPostFrontMatter = {
  title: string
  published: boolean
  published_at?: string
  topics: string[]
}

export function isZennPostFrontMatter(frontmatter: any): frontmatter is ZennPostFrontMatter {
  return (
    "title" in frontmatter &&
    "topics" in frontmatter &&
    "published" in frontmatter &&
    "published_at" in frontmatter
  )
}

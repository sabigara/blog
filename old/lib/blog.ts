import { ExtractContentMeta } from "@/lib/contentlayer"
import { getFeedItemsFromSources } from "@/lib/rss"
import { allBlogs, Blog } from "contentlayer/generated"
import { PostListItem } from "types"

async function getAllExternalPostMeta(): Promise<PostListItem[]> {
  const feetItems = await getFeedItemsFromSources(["https://zenn.dev/sabigara/feed"])
  return feetItems.map((item) => ({
    title: item.title,
    date: item.isoDate,
    url: item.link,
    tags: [],
    locale: "ja",
  }))
}

export function blogPostUrl(post: ExtractContentMeta<Blog>, withLocale = false) {
  const base = `/blog/${post.slug}`
  return (withLocale ? `/${post.locale}` : "") + base
}

export function blogPostToListItem(post: Blog): PostListItem {
  const item: PostListItem = {
    date: post.date,
    title: post.title,
    tags: post.tags,
    url: blogPostUrl(post),
    locale: post.locale,
  }
  if (post.summary) {
    item.summary = post.summary
  }
  return item
}

type GetSortedPostListItemsOptions = {
  locale?: string
  withExternal?: boolean
}

export async function getSortedPostListItems({
  locale,
  withExternal = true,
}: GetSortedPostListItemsOptions = {}): Promise<PostListItem[]> {
  let publishedBlogs = [...allBlogs].filter(postIsPublished)
  if (locale) {
    publishedBlogs = publishedBlogs.filter((target) =>
      publishedBlogs.some((post) => post._id !== target._id && post.slug === target.slug)
        ? target.locale === locale
        : true
    )
  }
  const internalItems = publishedBlogs.map(blogPostToListItem)
  const externalItems = await getAllExternalPostMeta()
  return [...internalItems, ...(withExternal ? externalItems : [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function postIsPublished(post: Blog) {
  if (process.env.NODE_ENV === "development") return true
  return "draft" in post && post.draft !== true
}

import { getFeedItemsFromSources } from "@/lib/rss"
import { slugToUrl } from "@/lib/slug"
import { allBlogs, Blog } from "contentlayer/generated"
import { PostListItem } from "types"

async function getAllExternalPostMeta(): Promise<PostListItem[]> {
  const feetItems = await getFeedItemsFromSources(["https://zenn.dev/sabigara/feed"])
  return feetItems.map((item) => ({
    title: item.title,
    date: item.isoDate,
    url: item.link,
    tags: [],
  }))
}

export function blogPostToListItem(post: Blog): PostListItem {
  const item: PostListItem = {
    date: post.date,
    title: post.title,
    tags: post.tags,
    url: slugToUrl(post.slug),
  }
  if (post.summary) {
    item.summary = post.summary
  }
  return item
}

export async function getSortedPostListItems(): Promise<PostListItem[]> {
  const internalItems = [...allBlogs].filter(postIsPublished).map(blogPostToListItem)
  const externalItems = await getAllExternalPostMeta()
  return [...internalItems, ...externalItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function postIsPublished(post: Blog) {
  if (process.env.NODE_ENV === "development") return true
  return "draft" in post && post.draft !== true
}

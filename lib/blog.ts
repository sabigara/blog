import { slugToUrl } from "@/lib/slug"
import { allBlogs, Blog } from "contentlayer/generated"
import Parser from "rss-parser"
import { PostListItem } from "types"

type FeedItem = {
  title: string
  link: string
  contentSnippet?: string
  isoDate: string
  dateMiliSeconds: number
}

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

const parser = new Parser()

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url)
  if (!feed?.items?.length) return []

  // return item which has title and link
  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      }
    })
    .filter(({ title, link, isoDate }) => title && link && isoDate && isValidUrl(link))
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return []
  let feedItems: FeedItem[] = []
  for (const url of sources) {
    const items = await fetchFeedItems(url)
    if (items) feedItems = [...feedItems, ...items]
  }
  return feedItems
}

async function getAllExternalPostMeta(): Promise<PostListItem[]> {
  const feetItems = await getFeedItemsFromSources([
    "https://zenn.dev/sabigara/feed",
    "https://medium.com/@sabigara/feed",
  ])
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
  const internalItems = [...allBlogs].map(blogPostToListItem)
  const externalItems = await getAllExternalPostMeta()
  return [...internalItems, ...externalItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

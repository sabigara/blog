import Parser from "rss-parser"

type FeedItem = {
  title: string
  link: string
  isoDate: string
  thumbnail?: string
}

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

const parser = new Parser({
  customFields: {
    item: ["media:group"],
  },
})

async function fetchFeedItems(url: string): Promise<FeedItem[]> {
  const feed = await parser.parseURL(url)
  if (!feed?.items?.length) return []

  // return item which has title and link
  return feed.items
    .map((item) => {
      return {
        title: item.title,
        contentSnippet: item.contentSnippet?.replace(/\n/g, ""),
        link: item.link,
        isoDate: item.isoDate,
        thumbnail: item["media:group"]?.["media:thumbnail"]?.[0]?.$?.url,
      }
    })
    .filter(({ title, link, isoDate }) => title && link && isoDate && isValidUrl(link))
}

export async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return []
  let feedItems: FeedItem[] = []
  for (const url of sources) {
    const items = await fetchFeedItems(url)
    if (items) feedItems = [...feedItems, ...items]
  }
  return feedItems
}

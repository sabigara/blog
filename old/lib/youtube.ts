import { getFeedItemsFromSources } from "@/lib/rss"

export async function getYoutubeVideos() {
  const feedItems = await getFeedItemsFromSources([
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCpP879CyCvuobBCyyNFtmeg",
  ])
  return feedItems.map((item) => ({
    title: item.title,
    thumbnail: item.thumbnail,
    date: item.isoDate,
    href: item.link,
  }))
}

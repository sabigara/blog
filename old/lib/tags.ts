import kebabCase from "./utils/kebabCase"
import { allBlogs } from "contentlayer/generated"
import { postIsPublished } from "@/lib/blog"

export function getAllTags() {
  const tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  allBlogs.forEach((post) => {
    if (postIsPublished(post)) {
      post.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
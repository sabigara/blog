import { allBlogs } from "contentlayer/generated"

type Content = { _id: string; _raw: unknown; type: unknown; body: unknown }

export type ExtractContentMeta<T extends Content> = Omit<T, "_id" | "_raw" | "type" | "body">

export function extractContentMeta<T extends Content>(content: T): ExtractContentMeta<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, _raw, type, body, ...rest } = content
  return rest as ExtractContentMeta<T>
}

export function getSortedBlogPosts() {
  return [...allBlogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

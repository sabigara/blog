import type { Author, Blog } from "contentlayer/generated"

export type Toc = {
  value: string
  depth: number
  url: string
}[]

export type PostFrontMatter = Blog
export type AuthorFrontMatter = Author
export type PostListItem = {
  title: string
  date: string
  url: string
  tags: string[]
  summary?: string
  locale?: string
}

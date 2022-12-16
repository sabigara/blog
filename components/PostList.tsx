import ProviderTag from "@/components/ProviderTag"
import Tag from "@/components/Tag"
import Link from "@/components/Link"
import formatDate from "@/lib/utils/formatDate"
import React from "react"
import { PostListItem } from "types"

type Props = {
  posts: PostListItem[]
}

export default function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((frontMatter) => {
        const { url, date, title, tags } = frontMatter
        return (
          <li key={url} className="pb-4 pt-2">
            <article className="space-y-2 xl:grid xl:grid-cols-6 xl:items-baseline xl:space-y-0">
              <div className="flex flex-row gap-2 md:flex-col md:items-start">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>
                <ProviderTag href={url} className="w-fit" />
              </div>
              <div className="space-y-3 xl:col-span-5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium leading-8 tracking-tight">
                    <Link href={url} className="align-middle text-gray-900 dark:text-gray-100">
                      {title}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

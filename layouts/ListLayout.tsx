import Link from "@/components/Link"
import Tag from "@/components/Tag"
import { ComponentProps } from "react"
import Pagination from "@/components/Pagination"
import formatDate from "@/lib/utils/formatDate"
import { PostListItem } from "types"
import ProviderTag from "@/components/ProviderTag"
interface Props {
  title: string
  posts: PostListItem[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ title, posts, pagination }: Props) {
  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <ul className="">
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
                      <h3 className="text-lg font-semibold leading-8 tracking-tight">
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
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}

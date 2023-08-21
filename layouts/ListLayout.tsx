import { ComponentProps } from "react"
import Pagination from "@/components/Pagination"
import { PostListItem } from "types"
import PostList from "@/components/PostList"
interface Props {
  title: string
  posts: PostListItem[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ title, posts, pagination }: Props) {
  return (
    <div className="space-y-8 pb-12">
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <PostList posts={posts} />
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}

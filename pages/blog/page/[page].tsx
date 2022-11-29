import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { POSTS_PER_PAGE } from ".."
import { GetStaticPaths, InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const posts = await getSortedPostListItems()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const {
    params: { page },
  } = context
  const pageNumber = parseInt(page as string)
  const posts = await getSortedPostListItems()
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts: posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber),
      pagination,
    },
  }
}

export default function PostPage({
  posts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={posts} pagination={pagination} title="All Posts" />
    </>
  )
}

import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { POSTS_PER_PAGE } from "../../blog"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { extractContentMeta, getSortedBlogPosts } from "@/lib/contentlayer"

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const posts = getSortedBlogPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { page },
  } = context
  const pageNumber = parseInt(page as string)
  const posts = getSortedBlogPosts()
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts: posts.map(extractContentMeta),
      initialDisplayPosts: initialDisplayPosts.map(extractContentMeta),
      pagination,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}

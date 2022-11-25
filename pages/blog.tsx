import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { extractContentMeta, getSortedBlogPosts } from "@/lib/contentlayer"

export const POSTS_PER_PAGE = 10

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedBlogPosts()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts: initialDisplayPosts.map(extractContentMeta),
      posts: posts.map(extractContentMeta),
      pagination,
    },
  }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.title}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}

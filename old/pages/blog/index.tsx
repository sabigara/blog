import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const POSTS_PER_PAGE = 10

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getSortedPostListItems({ locale })
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts: posts.slice(0, POSTS_PER_PAGE),
      pagination,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

export default function Blog({
  posts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.title}`} description={siteMetadata.description} />
      <ListLayout posts={posts} pagination={pagination} title="All Posts" />
    </>
  )
}
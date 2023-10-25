import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { POSTS_PER_PAGE } from ".."
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getStaticPaths: GetStaticPaths<{ page: string }> = async ({ locales }) => {
  async function getPathsForLocale(locale: string) {
    const posts = await getSortedPostListItems({ locale })
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const paths = Array.from({ length: totalPages }, (_, i) => ({
      params: { page: (i + 1).toString() },
      locale,
    }))
    return paths
  }

  return {
    paths: (await Promise.all(locales.map(getPathsForLocale))).flat(),
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const {
    locale,
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
      ...(await serverSideTranslations(locale, ["common"])),
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

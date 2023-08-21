import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"
import PostList from "@/components/PostList"
import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

const MAX_POSTS = 10 as const

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const posts = await getSortedPostListItems({ locale })
  return {
    props: {
      posts: posts.slice(0, MAX_POSTS),
      postTotalCount: posts.length,
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  }
}

export default function Home({
  posts,
  postTotalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("home")
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex flex-col gap-10 pb-12 pt-4">
        <Section title={t("recent-posts")}>
          <PostList posts={posts} />
          {postTotalCount > MAX_POSTS && (
            <Link
              href="/blog"
              className="text-lg font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              {t("all-posts")} →
            </Link>
          )}
        </Section>
      </div>
    </>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="mb-2 border-b pb-1 text-2xl font-bold">{title}</h2>
      {children}
    </div>
  )
}

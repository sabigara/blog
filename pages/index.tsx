import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"
import PostList from "@/components/PostList"
import React from "react"
import { getYoutubeVideos } from "@/lib/youtube"
import VideoCard from "@/components/VideoCard"
import CamomeBanner from "@/components/CamomeBanner"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

const MAX_POSTS = 5 as const
const MAX_VIDEOS = 3 as const

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const posts = await getSortedPostListItems({ locale })
  const videos = await getYoutubeVideos()
  return {
    props: {
      posts: posts.slice(0, MAX_POSTS),
      postTotalCount: posts.length,
      videos: videos.slice(0, MAX_VIDEOS),
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  }
}

export default function Home({
  posts,
  postTotalCount,
  videos,
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
        <Section title={t("recent-videos")}>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {videos.map((video) => (
              <VideoCard {...video} key={video.href} />
            ))}
          </div>
          <Link
            href="https://www.youtube.com/@camome"
            className="mt-5 inline-block text-lg font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All videos"
          >
            {t("all-videos")}
          </Link>
        </Section>
        <CamomeBanner />
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

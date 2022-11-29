import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { InferGetStaticPropsType } from "next"
import { getSortedPostListItems } from "@/lib/blog"
import PostList from "@/components/PostList"
import React from "react"
import { getYoutubeVideos } from "@/lib/youtube"
import VideoCard from "@/components/VideoCard"

const MAX_POSTS = 5 as const
const MAX_VIDEOS = 3 as const

export const getStaticProps = async () => {
  const posts = await getSortedPostListItems()
  const videos = await getYoutubeVideos()
  return {
    props: {
      posts: posts.slice(0, MAX_POSTS),
      postTotalCount: posts.length,
      videos: videos.slice(0, MAX_VIDEOS),
    },
  }
}

export default function Home({
  posts,
  postTotalCount,
  videos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="mt-4 flex flex-col gap-10">
        <Section title="Recent posts">
          <PostList posts={posts} />
          {postTotalCount > MAX_POSTS && (
            <Link
              href="/blog"
              className="text-lg font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All posts →
            </Link>
          )}
        </Section>
        <Section title="Recent videos">
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
            All videos
          </Link>
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

import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { InferGetStaticPropsType } from "next"
import NewsletterForm from "@/components/NewsletterForm"
import ListLayout from "@/layouts/ListLayout"
import { getSortedPostListItems } from "@/lib/blog"

const MAX_DISPLAY = 10

export const getStaticProps = async () => {
  const posts = await getSortedPostListItems()
  return { props: { posts: posts.slice(0, MAX_DISPLAY) } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={posts} title="Latest" />
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== "" && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

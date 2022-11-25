import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { type InferGetStaticPropsType } from "next"
import { allAuthors } from "contentlayer/generated"
import { getToc } from "@/lib/get-toc"
import { getSortedBlogPosts } from "@/lib/contentlayer"

const DEFAULT_LAYOUT = "PostLayout"

export async function getStaticPaths() {
  return {
    paths: getSortedBlogPosts().map((p) => ({
      params: {
        slug: p.slug.split("/"),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join("/")
  const posts = getSortedBlogPosts()
  const postIndex = posts.findIndex((post) => post.slug === slug)
  const post = posts[postIndex]
  const prev = posts[postIndex + 1] || null
  const next = posts[postIndex - 1] || null
  const toc = await getToc(post.body.raw)

  // rss
  if (posts.length > 0) {
    const rss = generateRss(posts)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return {
    props: {
      post,
      toc,
      authorDetails: allAuthors,
      prev,
      next,
    },
  }
}

export default function BlogPage({
  post,
  toc,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {"draft" in post && post.draft !== true ? (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={post.body.code}
          frontMatter={post}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

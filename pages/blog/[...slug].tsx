import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { type InferGetStaticPropsType } from "next"
import { allAuthors } from "contentlayer/generated"
import { getToc } from "@/lib/get-toc"
import { getSortedBlogPosts } from "@/lib/contentlayer"
import { postIsPublished } from "@/lib/blog"

export default function BlogPage({
  post,
  toc,
  authorDetails,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {postIsPublished(post) ? (
        <MDXLayoutRenderer
          layout={post.layout || "PostLayout"}
          toc={toc}
          mdxSource={post.body.code}
          frontMatter={post}
          authorDetails={authorDetails}
          relatedPosts={relatedPosts}
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

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join("/")
  const posts = getSortedBlogPosts()
  const post = posts.find((post) => post.slug === slug)
  const relatedPosts = posts
    .filter(
      (p) =>
        p.tags.some((tag) => post.tags.includes(tag)) &&
        p.language === post.language &&
        p._id !== post._id
    )
    .slice(0, 5)
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
      relatedPosts,
    },
  }
}

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

import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXRenderer } from "@/components/MDXComponents"
import { GetStaticPropsContext, type InferGetStaticPropsType } from "next"
import { allAuthors } from "contentlayer/generated"
import { getToc } from "@/lib/get-toc"
import { extractContentMeta, getSortedBlogPosts } from "@/lib/contentlayer"
import { postIsPublished } from "@/lib/blog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PostLayout from "@/layouts/PostLayout"

export default function BlogPage({
  post,
  toc,
  authorDetails,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {postIsPublished(post) ? (
        <PostLayout
          toc={toc}
          frontMatter={post}
          authorDetails={authorDetails}
          relatedPosts={relatedPosts}
        >
          <MDXRenderer mdxSource={post.body.code} />
        </PostLayout>
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

export const getStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
  const slug = (params.slug as string[]).join("/")
  const posts = getSortedBlogPosts()
  const post =
    posts.find(
      // Fallback to untranslated version if exists
      (post) => post.slug === slug && post.locale === locale
    ) ?? posts.find((post) => post.slug === slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  let relatedPosts = posts
    .filter(
      (p) =>
        p.locale === post.locale &&
        p._id !== post._id &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 5)
  if (relatedPosts.length < 5) {
    relatedPosts = [
      ...relatedPosts,
      ...posts
        .filter(
          (p) =>
            p.locale === post.locale &&
            p._id !== post._id &&
            !relatedPosts.map((rp) => rp._id).includes(p._id)
        )
        .slice(0, 5 - relatedPosts.length),
    ]
  }
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
      authorDetails: allAuthors.filter((author) => author.locale === locale),
      relatedPosts: relatedPosts.map(extractContentMeta),
      ...(await serverSideTranslations(locale, ["common", "blog"])),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getSortedBlogPosts().map((p) => ({
      params: {
        slug: p.slug.split("/"),
      },
      locale: p.locale,
    })),
    // Fallback to untranslated version if exists
    fallback: "blocking",
  }
}

import { TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { blogPostToListItem } from "@/lib/blog"
import { getSortedBlogPosts } from "@/lib/contentlayer"
import generateRss from "@/lib/generate-rss"
import { getAllTags } from "@/lib/tags"
import kebabCase from "@/lib/utils/kebabCase"
import fs from "fs"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import path from "path"

const root = process.cwd()

export async function getStaticPaths() {
  const tags = getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const tag = context.params.tag as string
  const filteredPosts = getSortedBlogPosts().filter(
    (post) => !post.draft && post.tags.map((t) => kebabCase(t)).includes(tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, { page: `tags/${tag}/feed.xml` })
    const rssPath = path.join(root, "public", "tags", tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)
  }

  return {
    props: {
      posts: filteredPosts.map(blogPostToListItem),
      tag,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}

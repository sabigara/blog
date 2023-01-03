import { TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { getSortedPostListItems } from "@/lib/blog"
import { getAllTags } from "@/lib/tags"
import kebabCase from "@/lib/utils/kebabCase"
import { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const tags = getAllTags()

  return {
    paths: locales.flatMap((locale) =>
      Object.keys(tags).map((tag) => ({
        params: {
          tag,
        },
        locale,
      }))
    ),
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const tag = context.params.tag as string
  const filteredPosts = (
    await getSortedPostListItems({ locale: context.locale, withExternal: false })
  ).filter((post) => post.tags.map((t) => kebabCase(t)).includes(tag))

  return {
    props: {
      posts: filteredPosts,
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

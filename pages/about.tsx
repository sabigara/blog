import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { allAuthors } from "contentlayer/generated"
import { InferGetStaticPropsType } from "next"

const DEFAULT_LAYOUT = "AuthorLayout"

export const getStaticProps = async () => {
  return { props: { author: allAuthors[0] } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MDXLayoutRenderer layout={DEFAULT_LAYOUT} mdxSource={author.body.code} frontMatter={author} />
  )
}

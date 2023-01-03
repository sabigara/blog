import { MDXRenderer } from "@/components/MDXComponents"
import AuthorLayout from "@/layouts/AuthorLayout"
import { allAuthors } from "contentlayer/generated"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      author: allAuthors.find((author) => author.locale === locale),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AuthorLayout frontMatter={author}>
      <MDXRenderer mdxSource={author.body.code} />
    </AuthorLayout>
  )
}

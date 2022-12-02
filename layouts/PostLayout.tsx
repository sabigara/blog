import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import { BlogSEO } from "@/components/SEO"
import Image from "@/components/Image"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import React, { ReactNode } from "react"
import { PostFrontMatter, Toc } from "types"
import { AuthorFrontMatter } from "types"
import SocialButtons from "@/components/SocialButtons"
import TOCInline from "@/components/TOCInline"
import formatDate from "@/lib/utils/formatDate"

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  toc?: Toc
  children: ReactNode
}

export default function PostLayout({ frontMatter, authorDetails, toc, children }: Props) {
  const { slug, date, title, tags, draft } = frontMatter
  const url = `${siteMetadata.siteUrl}/blog/${slug}`

  return (
    <>
      <BlogSEO
        {...frontMatter}
        url={url}
        authorDetails={authorDetails}
        images={[siteMetadata.composeOgImageUrl(title)]}
      />
      <article className="relative mx-auto max-w-3xl">
        {draft && (
          <div className="absolute top-4 z-50 inline-block rounded-full border border-gray-200 bg-white px-3 font-medium">
            Draft
          </div>
        )}
        <div>
          <header className="pt-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(new Date(date))}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="relative pb-8 dark:divide-gray-700">
            <dl className="sticky pt-6 pb-10">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              noExternalIcon
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace("https://twitter.com/", "@")}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="border-y pb-6 pt-8">
              {toc && <TOCInline toc={toc} fromHeading={2} toHeading={4} />}
              <div className="prose max-w-none pt-8 pb-8">{children}</div>
            </div>
            <footer className="flex flex-col gap-4 pt-8">
              <FooterItem title="Share">
                <SocialButtons url={url} text={title} className="gap-2" />
              </FooterItem>
              {tags.length > 0 && (
                <FooterItem title="Tags">
                  <div className="mt-2 flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </FooterItem>
              )}
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}

type FooterItemProps = {
  title: string
  children?: React.ReactNode
}

function FooterItem({ title, children }: FooterItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xs tracking-wide text-gray-500 dark:text-gray-400">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

import Head from "next/head"
import { faviconUrl } from "@/lib/site-metadata/faviconUrl"
import { getSiteMetadata, SiteMetadata } from "@/lib/site-metadata/getSiteMetadata"
import { undefinedFieldsToNull } from "@/lib/utils/object"
import { extractDomain } from "@/lib/utils/url"
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const url = ctx.params.url as string

  let siteMetadata: SiteMetadata | null = null
  try {
    siteMetadata = await getSiteMetadata(url)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      siteMetadata: siteMetadata
        ? {
            ogp: undefinedFieldsToNull(siteMetadata.ogp),
            ...undefinedFieldsToNull(siteMetadata),
          }
        : siteMetadata,
    },
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [],
    fallback: true,
  }
}

type Props = {
  siteMetadata: SiteMetadata | null
}

export default function EmbeddedPage({ siteMetadata }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return <div className="h-32 w-full animate-pulse rounded-lg bg-gray-200" />
  }

  if (!siteMetadata) return null

  const domain = extractDomain(siteMetadata.url)

  return (
    <>
      <Head>
        <meta name="robots" content="nofollow, noindex" />
      </Head>
      <a
        href={siteMetadata.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-no-external-icon
        className="grid h-32 w-full grid-cols-6 grid-rows-6 overflow-clip rounded-lg border-[1px] transition-colors hover:bg-slate-50 dark:border-gray-600 dark:hover:bg-gray-800"
      >
        <div
          className="col-span-4 row-span-6 grid items-start justify-center gap-1 overflow-hidden p-4"
          style={{ placeContent: "center normal" }}
        >
          <h1 className="font-bold line-clamp-2">{siteMetadata.title || siteMetadata.ogp.title}</h1>
          <p className="truncate text-sm text-gray-500">
            {siteMetadata.description || siteMetadata.ogp.description}
          </p>
          <p className="flex items-center gap-2 truncate text-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                siteMetadata.url.startsWith("https://rubiq.vercel.app")
                  ? "/static/favicons/favicon-32x32.png"
                  : faviconUrl(siteMetadata.url)
              }
              alt="ファビコン"
              width="16"
              height="16"
            />
            {domain}
          </p>
        </div>
        <div className="col-span-2 row-span-6">
          {siteMetadata.ogp.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={siteMetadata.ogp.image}
              className="ml-auto h-full object-cover"
              alt="ページの画像"
            />
          )}
        </div>
      </a>
    </>
  )
}

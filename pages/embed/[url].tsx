import { getSiteMetadata, SiteMetadata } from "@/lib/site-metadata"
import { undefinedFieldsToNull } from "@/lib/utils/object"
import { extractDomain } from "@/lib/utils/url"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const url = ctx.params.url as string
  const siteMetadata = await getSiteMetadata(url)

  ctx.res.setHeader("X-Frame-Options", "SAMEORIGIN")
  if (process.env.NODE_ENV === "production") {
    ctx.res.setHeader("Cache-Control", `public, max-age=${60 * 60 * 24 * 30}`)
  }

  return {
    props: {
      siteMetadata: {
        ogp: undefinedFieldsToNull(siteMetadata.ogp),
        ...undefinedFieldsToNull(siteMetadata),
      },
    },
  }
}

type Props = {
  siteMetadata: SiteMetadata
}

export default function EmbeddedPage({ siteMetadata }: Props) {
  const domain = extractDomain(siteMetadata.url)
  return (
    <a
      href={siteMetadata.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="grid h-32 w-full grid-cols-6 grid-rows-6 overflow-clip rounded-lg border-[1px] transition-colors hover:bg-slate-50"
    >
      <div
        className="col-span-4 row-span-6 grid grid-rows-3 p-4"
        style={{ placeItems: "center normal" }}
      >
        <h1 className="truncate font-bold">{siteMetadata.title || siteMetadata.ogp.title}</h1>
        <p className="truncate text-sm text-gray-500">
          {siteMetadata.description || siteMetadata.ogp.description}
        </p>
        <p className="flex gap-2 truncate text-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?sz=14&domain_url=${domain}`}
            alt="ファビコン"
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
  )
}

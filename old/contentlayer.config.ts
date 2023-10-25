import { defineDocumentType, makeSource, RawDocumentData } from "contentlayer/source-files"
import { mdxOptions } from "./lib/mdx"

function resolveSlug(raw: RawDocumentData) {
  const [, locale, ...rest] = raw.flattenedPath.split("/")
  return { locale, slug: rest.join("/") }
}

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*+(.md|.mdx)`,
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    avatar: {
      type: "string",
      required: true,
    },
    occupation: {
      type: "string",
    },
    company: {
      type: "string",
    },
    email: {
      type: "string",
    },
    twitter: {
      type: "string",
    },
    github: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => resolveSlug(doc._raw).slug,
    },
    locale: {
      type: "enum",
      options: ["en", "ja"],
      resolve: (doc) => resolveSlug(doc._raw).locale,
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*+(.md|.mdx)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    lastmod: {
      type: "date",
    },
    draft: {
      type: "boolean",
    },
    summary: {
      type: "string",
    },
    images: {
      type: "list",
      of: {
        type: "string",
      },
    },
    authors: {
      type: "list",
      of: {
        type: "string",
      },
    },
    layout: {
      type: "string",
    },
    canonicalUrl: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => resolveSlug(doc._raw).slug,
    },
    locale: {
      type: "enum",
      options: ["en", "ja"],
      resolve: (doc) => resolveSlug(doc._raw).locale,
    },
  },
}))

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Author, Blog],
  mdx: mdxOptions,
})

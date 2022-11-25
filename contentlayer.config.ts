import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { mdxOptions } from "./lib/mdx"

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
    slug: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
  },
}))

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Author, Blog],
  mdx: mdxOptions,
})

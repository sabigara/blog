import type { RawDocumentData } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-files";
import { defineDocumentType } from "contentlayer/source-files";

import { mdxOptions } from "./src/lib/mdx/options";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*+(.md|.mdx)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => resolveBlogSlug(doc._raw),
    },
  },
}));

function resolveBlogSlug(raw: RawDocumentData) {
  return "/" + raw.flattenedPath;
}

export const Work = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: `works/**/*+(.md|.mdx)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    subtitle: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "string",
      required: true,
    },
    coverImg: {
      type: "string",
      required: true,
    },
    url: {
      type: "string",
    },
    role: {
      type: "string",
      required: true,
    },
    achievement: {
      type: "string",
    },
    featured: {
      type: "boolean",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => resolveWorkSlug(doc._raw),
    },
  },
}));

function resolveWorkSlug(raw: RawDocumentData) {
  return "/" + raw.flattenedPath;
}

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post, Work],
  mdx: mdxOptions,
  contentDirExclude: ["social-links/**"],
});

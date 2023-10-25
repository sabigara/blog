import type { RawDocumentData } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-files";
import { defineDocumentType } from "contentlayer/source-files";

import { mdxOptions } from "./src/lib/mdx/options";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*+(.md|.mdx)`,
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
  return raw.flattenedPath;
}

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*+(.md|.mdx)`,
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
      type: "date",
      required: true,
    },
    coverImg: {
      type: "string",
      required: true,
    },
    url: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => resolveProjectSlug(doc._raw),
    },
  },
}));

function resolveProjectSlug(raw: RawDocumentData) {
  return raw.flattenedPath;
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Project],
  mdx: mdxOptions,
});

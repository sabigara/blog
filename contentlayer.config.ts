import type { ComputedFields } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-files";
import { defineDocumentType } from "contentlayer/source-files";

import { mdxOptions } from "./src/lib/mdx/options";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => "/" + doc._raw.flattenedPath,
  },
};

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
    publishedAt: {
      type: "date",
      required: true,
    },
    modifiedAt: {
      type: "date",
    },
  },
  computedFields,
}));

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
    publishedAt: {
      type: "date",
      required: true,
    },
    modifiedAt: {
      type: "date",
    },
    status: {
      type: "enum",
      options: ["active", "archived"],
      default: "active",
      required: true,
    },
    kind: {
      type: "enum",
      options: ["commissioned", "indie"],
      default: "indie",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post, Work],
  mdx: mdxOptions,
  contentDirExclude: ["*.ts"],
});

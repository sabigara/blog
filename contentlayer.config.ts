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
      resolve: (doc) => resolveSlug(doc._raw),
    },
  },
}));

function resolveSlug(raw: RawDocumentData) {
  return raw.flattenedPath;
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: mdxOptions,
});

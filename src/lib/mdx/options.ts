import type { MDXOptions } from "contentlayer/core";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";

import remarkAdmonitions from "../remark/remark-admonitions";
import remarkCodeTitles from "../remark/remark-code-title";
import remarkImgToJsx from "../remark/remark-img-to-jsx";

export const mdxOptions: MDXOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkCodeTitles,
    remarkDirective,
    remarkAdmonitions,
    remarkImgToJsx,
  ],
  rehypePlugins: [
    rehypeExternalLinks,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: {
          "aria-hidden": false,
          "tab-index": false,
          class: "hash-link",
        },
      },
    ],
    [rehypePrismPlus as any, { ignoreMissing: true }],
  ],
};

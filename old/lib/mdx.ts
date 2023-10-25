import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkDirective from "remark-directive"
import remarkCodeTitles from "./remark-code-title"
import remarkAdmonitions from "./remark-admonitions"
import remarkImgToJsx from "./remark-img-to-jsx"
import { MDXOptions } from "contentlayer/core"

export const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkGfm, remarkCodeTitles, remarkDirective, remarkAdmonitions, remarkImgToJsx],
  rehypePlugins: [
    rehypeExternalLinks,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: {
          ["aria-hidden"]: false,
          ["tab-index"]: false,
          ["class"]: "hash-link",
        },
      },
    ],
    [rehypePrismPlus, { ignoreMissing: true }],
  ],
}

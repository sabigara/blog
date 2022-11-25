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
  rehypePlugins: [rehypeExternalLinks, rehypeSlug, [rehypePrismPlus, { ignoreMissing: true }]],
}

import { Parent } from "unist"
import { visit } from "unist-util-visit"
import { load, dump } from "js-yaml"
import { isZennPostFrontMatter } from "types/PostFrontMatter"

export default function remarkZennFrontmatter() {
  return (tree: Parent) => {
    visit(tree, "yaml", (node: Parent) => {
      // @ts-ignore
      const zennFm = load(node.value)
      if (!isZennPostFrontMatter(zennFm)) {
        throw new Error("Invalid frontmatter")
      }
      const localFm = {
        date: zennFm.published_at,
        tags: zennFm.topics,
        title: zennFm.title,
        draft: !zennFm.published,
      }
      // @ts-ignore
      node.value = dump(localFm)
    })
  }
}

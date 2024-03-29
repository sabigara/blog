//@ts-nocheck
import { slug } from "github-slugger";
import { toString as utilToString } from "mdast-util-to-string";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";

export default function remarkTocHeadings(options) {
  return (tree: Parent) =>
    visit(tree, "heading", (node) => {
      const textContent = utilToString(node);
      options.exportRef.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: node.depth,
      });
    });
}

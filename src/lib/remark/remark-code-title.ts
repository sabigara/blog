import type { Parent } from "unist";
import { visit } from "unist-util-visit";

export default function remarkCodeTitles() {
  return (tree: Parent & { lang?: string }) =>
    visit(
      tree,
      "code",
      (
        node: Parent & { lang?: string; meta: string | null },
        index,
        parent: Parent
      ) => {
        if (!index) {
          return;
        }

        const meta = node.meta?.split(" ") ?? [];
        const title = meta
          .find((item) => item.startsWith("title="))
          ?.split("=")[1];

        if (!title) {
          return;
        }

        const className = "remark-code-title";

        const titleNode = {
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: [
            { type: "mdxJsxAttribute", name: "className", value: className },
          ],
          children: [{ type: "text", value: title }],
          data: { _xdmExplicitJsx: true },
        };

        parent.children.splice(index, 0, titleNode);
        node.meta = null; // これがないと無限ループする
      }
    );
}

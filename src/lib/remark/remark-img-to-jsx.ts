import fs from "fs";
import { imageSize } from "image-size";
import type { Literal, Node, Parent } from "unist";
import { visit } from "unist-util-visit";

type ImageNode = Parent & {
  alt: string;
  attributes: (Literal & { name: string })[];
  name: string;
  url: string;
};

export default function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: Node): node is Parent =>
        node.type === "paragraph" &&
        "children" in node &&
        Array.isArray(node.children) &&
        node.children.some((n) => n.type === "image"),
      (node: Parent) => {
        const imageNode = node.children.find(
          (n) => n.type === "image"
        ) as ImageNode;
        const normalizedUrl = imageNode.url.replace(/^\/?public\//, "/");

        let dimensions: { height?: number; width?: number } | null = null;

        // ローカルファイルのみここでサイズを計測する。
        // リモートファイルは`MdxImg` (Server Component)で`fetch`し計測する。
        if (fs.existsSync(`${process.cwd()}/public${normalizedUrl}`)) {
          dimensions = imageSize(`${process.cwd()}/public${normalizedUrl}`);
        }

        // Convert original node to next/image
        imageNode.type = "mdxJsxFlowElement";
        imageNode.name = "Image";
        imageNode.attributes = [
          { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
          { type: "mdxJsxAttribute", name: "src", value: normalizedUrl },
        ];

        if (dimensions?.width) {
          imageNode.attributes.push({
            type: "mdxJsxAttribute",
            name: "height",
            value: dimensions.height,
          });
        }
        if (dimensions?.height) {
          imageNode.attributes.push({
            type: "mdxJsxAttribute",
            name: "width",
            value: dimensions.width,
          });
        }
        // Change node type from p to div to avoid nesting error
        node.type = "div";
        node.children = [imageNode];
      }
    );
  };
}

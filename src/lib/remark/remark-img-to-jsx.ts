import fs from "node:fs";
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
          (n) => n.type === "image",
        ) as ImageNode;
        const url = imageNode.url;

        let dimensions: { height?: number; width?: number } | null = null;

        // リモートのファイルが以下のようなURLにアップロードされていればサイズを取得する。
        // （念のためドメインもチェック）
        // `https://static.sabigara.com/uploads/WGvpEaAz_512x512.webp`
        const dimensionUrlMatch = url.match(
          /https:\/\/static\.sabigara\.com\/uploads\/.*_(\d+)x(\d+)\./,
        );

        // ローカルファイルはここでサイズを計測する。
        if (fs.existsSync(`${process.cwd()}/public${url}`)) {
          dimensions = imageSize(`${process.cwd()}/public${url}`);
        } else if (dimensionUrlMatch) {
          dimensions = {
            width: Number(dimensionUrlMatch[1]),
            height: Number(dimensionUrlMatch[2]),
          };
        }

        // Convert original node to next/image
        imageNode.type = "mdxJsxFlowElement";
        imageNode.name = "Image";
        imageNode.attributes = [
          { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
          { type: "mdxJsxAttribute", name: "src", value: url },
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
        node.children = [imageNode];
      },
    );
  };
}

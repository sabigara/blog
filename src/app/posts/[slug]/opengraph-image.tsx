import { allPosts } from "contentlayer/generated";
import { ImageResponse } from "next/og";

import { createOgCardImageResponse } from "@/lib/image-response/og-card";

export const runtime = "edge";

export const alt = "";
export const size = {
  height: 630,
  width: 1200,
};

export const contentType = "image/png";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Image({ params: { slug } }: Props) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `${post._raw.sourceFileDir}/${slug}`,
  );

  if (!post) {
    // biome-ignore lint/complexity/noUselessFragments: <explanation>
    return new ImageResponse(<></>, { ...size });
  }

  return createOgCardImageResponse({
    size,
    title: post.title,
  });
}

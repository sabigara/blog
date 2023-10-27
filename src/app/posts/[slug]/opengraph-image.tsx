/* eslint-disable sort-keys */

import { allPosts } from "contentlayer/generated";
import fs from "fs/promises";
import { ImageResponse } from "next/og";
import path from "path";

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
  const [notoSansJpBold, avatarData] = await Promise.all([
    fs.readFile(path.resolve("src/fonts/NotoSansJP-Bold.ttf")),
    fs.readFile(path.resolve("public/images/avatar.jpg")),
  ]);

  const post = allPosts.find(
    (post) => post._raw.flattenedPath === post._raw.sourceFileDir + "/" + slug
  );

  if (!post) {
    return new ImageResponse(<></>, { ...size });
  }

  const containerPad = 48;
  const cardPad = 48;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "hsl(220 40% 90%)",
          height: "100%",
          width: "100%",
          padding: containerPad,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: "white",
            padding: cardPad,
            borderRadius: 20,
            gap: 40,
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div
              style={{
                fontSize: 70,
                display: "-webkit-box",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {post.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 18,
            }}
          >
            <img
              alt=""
              height={70}
              src={`data:image/jpeg;base64,${avatarData.toString("base64")}`}
              style={{
                borderRadius: "9999px",
              }}
              width={70}
            />
            <div style={{ fontSize: 44 }}>sabigara.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          data: notoSansJpBold,
          name: "Noto Sans JP",
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

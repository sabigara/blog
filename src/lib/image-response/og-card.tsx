import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

type Params = {
  size: {
    height: number;
    width: number;
  };
  title: string;
};

export async function createOgCardImageResponse({ size, title }: Params) {
  const [notoSansJpBold, avatarData] = await Promise.all([
    fs.readFile(path.resolve("public/fonts/NotoSansJP-Bold.ttf")),
    fs.readFile(path.resolve("public/images/avatar.jpg")),
  ]);

  const containerPad = 48;
  const cardPad = 48;

  return new ImageResponse(
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
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
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
            {title}
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
          <div style={{ fontSize: 44 }}>Sabigara</div>
        </div>
      </div>
    </div>,
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
    },
  );
}

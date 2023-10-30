import { createOgCardImageResponse } from "@/lib/image-response/og-card";

export const alt = "";
export const size = {
  height: 630,
  width: 1200,
};

export const contentType = "image/png";

export default async function Image() {
  return createOgCardImageResponse({
    size,
    title: "Sabigara.com",
  });
}

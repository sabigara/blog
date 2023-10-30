import { imageSize } from "image-size";

import { Image } from "@/components/image";
import { IMG_SIZES } from "@/styles/constants";

type Props = Omit<JSX.IntrinsicElements["img"], "ref">;

/**
 * サイズがわからないリモートファイルは最初の数10バイトをfetchしてサイズを調べる。
 *
 * ChatGPT: In short, here's the minimum number of bytes you typically need
 * to read to determine the dimensions of various common image formats:
 *
 *   JPEG (JPG): Varies, but often the first few kilobytes. Exact number is unpredictable due to variable-length segments.
 *   PNG: 33 bytes.
 *   GIF: 10 bytes.
 *   BMP: 26 bytes.
 *   WebP: Varies, but typically the first few kilobytes, similar to JPEG.
 */
export async function MdxImg({ width, height, alt, src, ...props }: Props) {
  if (!src) {
    throw new Error("MdxImg.src is required");
  }

  let size: UnknownSize = { width, height };

  if (!isSizeKnown(size)) {
    const imgData = await fetchPartialImage(src, 100);
    size = imageSize(imgData);
  }

  const imageProps = {
    src,
    placeholder: "empty",
    sizes: IMG_SIZES,
  } as const;

  if (isSizeKnown(size)) {
    return (
      <Image
        {...props}
        {...imageProps}
        {...toNumericSize(size)}
        alt={alt ?? ""}
      />
    );
  } else {
    return (
      <img
        {...props}
        {...imageProps}
        alt={alt ?? ""}
        style={{
          objectFit: "cover",
        }}
      />
    );
  }
}

type UnknownSize = {
  height?: number | string;
  width?: number | string;
};

type NumericSize = {
  height: number;
  width: number;
};

function isSizeKnown(size: UnknownSize): size is Required<UnknownSize> {
  return (
    typeof size.width === "number" ||
    (typeof size.width === "string" && typeof size.height === "number") ||
    typeof size.height === "string"
  );
}

function toNumericSize(size: UnknownSize): NumericSize {
  return {
    height: Number(size.height),
    width: Number(size.width),
  };
}

async function fetchPartialImage(
  url: string,
  firstBytes: number
): Promise<Buffer> {
  const response = await fetch(url, {
    headers: {
      Range: `bytes=${0}-${firstBytes}`,
    },
  });

  if (response.status !== 206) {
    throw new Error(
      "Server does not support byte range requests or the range specified is invalid."
    );
  }

  return Buffer.from(await response.arrayBuffer());
}

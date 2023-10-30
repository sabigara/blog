import { Image } from "@/components/image";
import { IMG_SIZES } from "@/styles/constants";

type Props = Omit<JSX.IntrinsicElements["img"], "ref">;

export async function MdxImg({ width, height, alt, src, ...props }: Props) {
  if (!src) {
    throw new Error("MdxImg.src is required");
  }

  const size: UnknownSize = { width, height };

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

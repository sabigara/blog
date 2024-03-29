import type { Metadata, ResolvingMetadata } from "next";

import { siteConfig } from "@/content/site-config";

type GenerateMetadata<P> = (
  props: P,
  parent: ResolvingMetadata,
) => Promise<Metadata>;

type Options = {
  /** `generateMetadata`の方が優先されるため、`opengraph-image.tsx`を設定する場合は`true`を渡す必要がある */
  interceptOgImages?: boolean;
};

export function generateMetadataFactory<P>(
  metadata: Metadata | ((props: P) => Promise<Metadata>),
  options: Options = {},
): GenerateMetadata<P> {
  const { interceptOgImages = false } = options;

  return async (props, resolvingParent: ResolvingMetadata) => {
    const base =
      typeof metadata === "function" ? await metadata(props) : metadata;
    const title = base.title ?? undefined;
    const description = base.description ?? undefined;
    const parent = await resolvingParent;

    if (interceptOgImages) {
      // biome-ignore lint/performance/noDelete:
      delete parent.openGraph?.images;
    }

    return {
      metadataBase: new URL(siteConfig.url),
      ...(title && { title }),
      ...(description && { description }),
      ...base,
      openGraph: {
        ...(parent.openGraph ?? {}),
        ...(title && { title }),
        ...(description && { description }),
        ...base.openGraph,
      } as Metadata["openGraph"],
    };
  };
}

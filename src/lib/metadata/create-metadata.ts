import type { Metadata } from "next";

export function createMetadata(base: Metadata): Metadata {
  const title = base.title ?? undefined;
  const description = base.description ?? undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...base.openGraph,
    },
    ...base,
  };
}

import type { Metadata, ResolvingMetadata } from "next";

export async function createMetadata(
  base: Metadata,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;
  const title = base.title ?? undefined;
  const description = base.description ?? undefined;

  return {
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
}

import { Suspense } from "react";

import { Link } from "@/components/link";
import { OgLink } from "@/components/og-link";

type Props = JSX.IntrinsicElements["a"];

export function MdxLink(props: Props) {
  if (!props.href) {
    return props.children;
  }
  return props.children === props.href ? (
    <span className="not-prose h-24 block rounded-lg border overflow-clip hover:border-gray-400">
      {/* OgLink専用のErrorBoundaryが欲しいが試してみたところ上手く動かなかった */}
      <Suspense fallback={<div className="h-full bg-slate-100" />}>
        <OgLink href={props.href} />
      </Suspense>
    </span>
  ) : (
    // @ts-expect-error
    <Link
      {...props}
      external={
        !!props.href &&
        !props.href.startsWith("/") &&
        !props.href.startsWith("#")
      }
    />
  );
}

import type { Work } from "contentlayer/generated";
import type { ElementType } from "react";
import React from "react";

import { Image } from "@/components/image";
import { Link } from "@/components/link";

type Props = {
  as?: ElementType;
  work: Work;
};

export function WorkCard({ as: Component = "h3", work }: Props) {
  return (
    <article className="relative flex flex-col hover:bg-slate-100 p-3 -m-3 rounded-lg">
      <div className="relative aspect-[2/1] rounded-md overflow-clip">
        <Image
          alt={work.title}
          className="object-cover"
          fill
          src={work.coverImg}
        />
      </div>
      <div>
        <Component className="mt-2 font-bold">
          <Link className="clickable-overlay" href={work.slug}>
            {work.title}
          </Link>
        </Component>
        <p className="text-gray-400 text-[0.95em]">{work.subtitle}</p>
      </div>
    </article>
  );
}

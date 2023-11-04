import type { Work } from "contentlayer/generated";
import type { ElementType } from "react";
import React from "react";

import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { IMG_SIZES } from "@/styles/constants";

type Props = {
  as?: ElementType;
  priority?: boolean;
  work: Work;
};

export function WorkCard({ as: Component = "h3", priority, work }: Props) {
  return (
    <article className="relative flex flex-col ring-gray-100 hover:ring-2 p-3 -m-3 rounded-lg">
      <div className="relative aspect-[5/3] rounded-lg overflow-clip bg-slate-100">
        <Image
          alt={work.title}
          className="object-cover"
          fill
          priority={priority}
          sizes={IMG_SIZES}
          src={work.coverImg}
        />
      </div>
      <div>
        <Component className="mt-2 font-bold">
          <Link className="clickable-overlay" href={work.path}>
            {work.title}
          </Link>
        </Component>
        <p className="text-gray-400 text-[0.95em]">{work.subtitle}</p>
      </div>
    </article>
  );
}

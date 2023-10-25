import type { Project } from "contentlayer/generated";
import type { ElementType } from "react";
import React from "react";

import { Image } from "@/components/image";
import { Link } from "@/components/link";

type Props = {
  as?: ElementType;
  project: Project;
};

export function ProjectCard({ as: Component = "h3", project }: Props) {
  return (
    <article className="relative flex flex-col hover:bg-slate-100 -m-3 p-3 rounded-lg w-full">
      <div className="relative flex-1 w-full aspect-[2/1] rounded-md overflow-clip">
        <Image
          alt={project.title}
          className="object-cover"
          fill
          src={project.coverImg}
        />
      </div>
      <div>
        <Component className="mt-2 font-bold">
          <Link className="clickable-overlay" href={project.slug}>
            {project.title}
          </Link>
        </Component>
        <p className="text-gray-400 text-[0.95em]">{project.subtitle}</p>
      </div>
    </article>
  );
}

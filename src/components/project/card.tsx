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
    <article className="relative w-fit flex flex-col hover:bg-slate-100 -m-3 p-3 rounded-md">
      <div className="flex-1">
        <Image
          alt={project.title}
          height={300}
          src={project.coverImg}
          width={500}
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

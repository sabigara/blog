import { allProjects } from "contentlayer/generated";

import { ProjectCard } from "@/components/project/card";

export default function BlogListPage() {
  const projects = allProjects.sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="pt-8 pb-12">
      <h1 className="text-4xl font-bold">Works</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>
    </div>
  );
}

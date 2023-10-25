import { allBlogs, allProjects } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

import { Link } from "@/components/link";
import { ProjectCard } from "@/components/project/card";

const twHeading = "text-4xl font-bold mt-8 mb-4";

export default function Home() {
  const latestPosts = allBlogs
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 5);
  const latestProjects = allProjects
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="">
      <h2 className={twHeading}>Works</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        {latestProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>

      <h2 className={twMerge(twHeading, "mt-12")}>Posts</h2>
      <ul>
        {latestPosts.map((post) => (
          <li key={post._id}>
            <Link href={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

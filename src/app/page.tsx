import { allBlogs, allProjects } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

import { BlogPostItem } from "@/components/blog/post-item";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/components/link";
import { ProjectCard } from "@/components/project/card";

const twHeading = "text-4xl font-bold mt-8 mb-4";
const twViewAll = "mt-6 inline-block underline decoration-from-font";

const PROJECT_LIMIT = 4;
const BLOG_LIMIT = 5;

export default function Home() {
  const projects = allProjects
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, PROJECT_LIMIT);
  const posts = allBlogs
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, BLOG_LIMIT);

  return (
    <div className="pb-12">
      <h2 className={twHeading}>
        Works
        <span className="ml-[1em] text-sm text-gray-400 font-medium">
          {projects.length} of {allProjects.length}
        </span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>
      <Link className={twViewAll} href="/projects">
        View all works <ArrowRightIcon aria-hidden className="inline" />
      </Link>

      <h2 className={twMerge(twHeading, "mt-12")}>
        Posts
        <span className="ml-[1em] text-sm text-gray-400 font-medium">
          {posts.length} of {allBlogs.length}
        </span>
      </h2>
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post._id}>
            <BlogPostItem post={post} />
          </li>
        ))}
      </ul>
      <Link className={twViewAll} href="/blog">
        View all posts <ArrowRightIcon aria-hidden className="inline" />
      </Link>
    </div>
  );
}

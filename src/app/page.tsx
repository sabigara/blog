import { socialLinks } from "content/social-links";
import { allPosts, allProjects } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/components/link";
import { BlogPostItem } from "@/components/post/post-item";
import { ProjectCard } from "@/components/project/card";
import { SocialLinkItem } from "@/components/social-link/social-link-item";

const twHeading = "text-4xl font-bold mt-8 mb-4";
const twViewAll = "mt-6 inline-block underline decoration-from-font";

const PROJECT_LIMIT = 4;
const BLOG_LIMIT = 5;

export default function Home() {
  const projects = allProjects
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, PROJECT_LIMIT);
  const posts = allPosts
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, BLOG_LIMIT);

  return (
    <div className="pb-12">
      <h2 className={twHeading}>Find me</h2>
      <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 md:gap-6 mt-8">
        {socialLinks.map((link) => (
          <li key={link.url}>
            <SocialLinkItem socialLink={link} />
          </li>
        ))}
      </ul>

      <h2 className={twHeading}>
        Works
        <span className="ml-[1em] text-sm text-gray-400 font-medium">
          {projects.length} of {allProjects.length}
        </span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
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
          {posts.length} of {allPosts.length}
        </span>
      </h2>
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post._id}>
            <BlogPostItem post={post} />
          </li>
        ))}
      </ul>
      <Link className={twViewAll} href="/posts">
        View all posts <ArrowRightIcon aria-hidden className="inline" />
      </Link>
    </div>
  );
}

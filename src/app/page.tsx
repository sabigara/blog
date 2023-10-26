import { allPosts, allProjects } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

import { ArrowRightIcon } from "@/components/icons";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { BlogPostItem } from "@/components/post/post-item";
import { ProjectCard } from "@/components/project/card";
import { SocialAccountItem } from "@/components/social-account/social-account-item";
import { socialAccounts } from "@/constants/social-accounts";

const twHeading = "text-4xl font-bold mb-8";
const twViewAll = "mt-6 inline-block underline decoration-from-font";
const twParagraph = "text-gray-600 mt-2 text-[0.94em]";

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
    <div className="pt-8 pb-12 space-y-16">
      <section>
        <h2 className={twHeading}>About</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-4">
          <Image
            alt="Sabigaraのアバター"
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32"
            height={100}
            src="/images/avatar.jpg"
            width={100}
          />
          <div className="">
            <p className="text-2xl mb-4">
              Sabigara
              <span className="text-gray-300 transform scale-y-75 inline-block mx-2">
                |
              </span>
              <span className="text-[0.94em]">松浦悠磨</span>
            </p>
            <p className={twParagraph}>
              フロントエンド開発者
              <span className="text-gray-400 mx-[5px]">/</span>
              趣味ギタリスト<span className="text-gray-400 mx-[5px]">/</span>
              趣味作曲家。
            </p>
            <p className={twParagraph}>
              React/Nextの受託開発や個人開発、OSS活動をしています。デザインも少しできます。ご依頼やお問い合わせは以下のチャンネルから。
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className={twHeading}>
          Available <span className="inline-block -translate-y-1">@</span>
        </h2>
        <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 md:gap-6 mt-8">
          {socialAccounts.map((link) => (
            <li key={link.url}>
              <SocialAccountItem socialLink={link} />
            </li>
          ))}
        </ul>
      </section>

      <section>
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
      </section>

      <section>
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
      </section>
    </div>
  );
}

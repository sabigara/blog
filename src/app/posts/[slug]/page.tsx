import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { TbCalendarEvent as CalendarIcon } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from "@/components/icons";
import { Link } from "@/components/link";
import { PageSharer } from "@/components/page-sharer";
import { Tag } from "@/components/tag";
import { getAdjacentPosts, getPostBySlug, listPosts } from "@/lib/content/post";
import { datetimeFormat } from "@/lib/datetime/format";
import { mdxComponents } from "@/lib/mdx/components";
import { generateMetadataFactory } from "@/lib/metadata/create-metadata";

const twAdjacentPostLink =
  "block h-fit max-w-[14rem] -m-2 p-2 rounded-md text-sm hover:bg-slate-100";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const { next: nextPost, previous: prevPost } = getAdjacentPosts(params.slug);
  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <header className="pt-8 py-12">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500 ">
          <time className="flex items-center gap-x-1">
            <CalendarIcon className="translate-y-[-0.5px]" title="公開日" />
            {datetimeFormat(post.publishedAt)}
          </time>
          {post.modifiedAt && (
            <time className="flex items-center gap-x-1">
              <RefreshIcon title="更新日" />
              {datetimeFormat(post.modifiedAt)}
            </time>
          )}
          {post.status === "draft" && <Tag className="">Draft</Tag>}
        </div>
      </header>
      <article className="prose pb-8">
        <Content components={mdxComponents} />
      </article>
      <aside className="pt-4 pb-8">
        <PageSharer className="" title={post.title} />
        <nav className="grid grid-cols-2 gap-4 mt-4 pt-8 border-t">
          {prevPost ? (
            <Link className={twAdjacentPostLink} href={prevPost?.path}>
              <ArrowLeftIcon className="inline" title="前" /> {prevPost?.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              className={twMerge(twAdjacentPostLink, "justify-self-end")}
              href={nextPost?.path}
            >
              {nextPost.title} <ArrowRightIcon className="inline" title="次" />
            </Link>
          )}
        </nav>
        <Link className="decoration-from-font mt-8 inline-block" href="/posts">
          <ArrowLeftIcon className="inline" />
          All posts
        </Link>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return listPosts().map((post) => ({
    slug: post.slug,
  }));
}

export const generateMetadata = generateMetadataFactory<Props>(
  async ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      return {};
    }
    return {
      title: post.title,
      description: "Sabigaraのブログ記事",
    };
  },
  {
    interceptOgImages: true,
  },
);

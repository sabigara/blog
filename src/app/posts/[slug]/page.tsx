import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { TbCalendarEvent as CalendarIcon } from "react-icons/tb";

import { datetimeFormat } from "@/lib/datetime/format";
import { mdxComponents } from "@/lib/mdx/components";
import { createMetadata } from "@/lib/metadata/create-metadata";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) {
    return notFound();
  }

  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <header className="py-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time className="text-sm text-gray-500 mt-3 flex items-center gap-x-1">
          <CalendarIcon aria-hidden className="translate-y-[-0.5px]" />
          {datetimeFormat(post.date)}
        </time>
      </header>
      <article className="prose pb-12">
        <Content components={mdxComponents} />
      </article>
      <aside className="py-8 border-t"></aside>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
  });
}

function getPost(slug: string) {
  return allPosts.find(
    (post) => post._raw.flattenedPath === post._raw.sourceFileDir + "/" + slug
  );
}

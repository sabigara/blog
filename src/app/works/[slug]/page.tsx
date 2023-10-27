import { allWorks } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { mdxComponents } from "@/lib/mdx/components";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { IMG_SIZES } from "@/styles/constants";

type Props = {
  params: {
    slug: string;
  };
};

export default function WorkPage({ params }: Props) {
  const works = getWork(params.slug);
  if (!works) {
    return notFound();
  }

  const hostname = works.url ? new URL(works.url).hostname : null;

  const Content = getMDXComponent(works.body.code);

  return (
    <>
      <header className="py-8">
        <div className="relative w-full aspect-[2/1]">
          <Image
            alt={works.title}
            className="object-cover"
            fill
            sizes={IMG_SIZES}
            src={works.coverImg}
          />
        </div>
        <h1 className="text-5xl font-bold mt-4">{works.title}</h1>
        <p className="text-lg text-gray-400 mt-2">{works.subtitle}</p>
        {works.url && hostname && (
          <Link
            className="mt-4 border text-sm rounded-md px-2 inline-block leading-7 hover:border-gray-300"
            external
            externalClassName="translate-y-[-1px] mr-0"
            href={works.url}
          >
            <span className="font-mono">https://{hostname}</span>
          </Link>
        )}
      </header>
      <article className="prose pb-12">
        <Content components={mdxComponents} />
      </article>
      <aside className="py-8 border-t">
        <Link href="/">戻る</Link>
      </aside>
    </>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const work = getWork(params.slug);
  if (!work) {
    return {};
  }

  return createMetadata({
    title: work.title,
    description: work.subtitle,
  });
}

function getWork(slug: string) {
  return allWorks.find(
    (work) => work._raw.flattenedPath === work._raw.sourceFileDir + "/" + slug
  );
}

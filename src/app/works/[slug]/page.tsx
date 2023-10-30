import { allWorks } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import { DataList } from "@/components/data-list";
import { ArrowLeftIcon } from "@/components/icons";
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
  const link = works.url ? (
    <Link
      className="hover:underline"
      external
      externalClassName="translate-y-[-1px] mr-0"
      href={works.url}
      key="url"
    >
      https://{hostname}
    </Link>
  ) : null;

  const Content = getMDXComponent(works.body.code);

  return (
    <>
      <header className="py-8">
        <div className="relative w-full aspect-[5/3]">
          <Image
            alt={works.title}
            className="object-cover"
            fill
            priority
            sizes={IMG_SIZES}
            src={works.coverImg}
          />
        </div>
        <h1 className="text-5xl font-bold mt-8">{works.title}</h1>
        <p className="text-lg text-gray-400 leading-tight mt-4">
          {works.subtitle}
        </p>
        {works.status === "archived" && (
          <p className="text-sm text-gray-600 font-medium rounded-full bg-slate-200 leading-relaxed inline-flex px-2 mt-4">
            Archived
          </p>
        )}
        <DataList
          classNames={{ list: "mt-8", item: "" }}
          data={[
            { term: "制作時期", data: works.date },
            { term: "役割", data: works.role },
            { term: "実績", data: works.achievement },
            { term: "URL", data: link || "N/A" },
          ]}
        />
      </header>
      <article className="prose pb-12">
        <Content components={mdxComponents} />
      </article>
      <aside className="py-8 border-t">
        <Link className="underline decoration-from-font " href="/works">
          <ArrowLeftIcon className="inline" />
          All works
        </Link>
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
  return allWorks.find((work) => work.slug === slug);
}

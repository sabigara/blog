import { allWorks } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

import { DataList } from "@/components/data-list";
import { ArrowLeftIcon } from "@/components/icons";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { Tag } from "@/components/tag";
import { mdxComponents } from "@/lib/mdx/components";
import { generateMetadataFactory } from "@/lib/metadata/create-metadata";
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
      className="hover:underline text-blue-600"
      external
      externalClassName="translate-y-[-1px] mr-0 text-blue-600"
      href={works.url}
      key="url"
    >
      https://{hostname}
    </Link>
  ) : null;

  const Content = getMDXComponent(works.body.code);

  return (
    <>
      <header className="py-8 border-b">
        <div className="relative w-full aspect-[5/3] rounded-2xl overflow-clip bg-slate-100">
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
        {works.status === "archived" && <Tag className="mt-3">Archived</Tag>}
        <DataList
          classNames={{ list: "mt-8", item: "" }}
          data={[
            { term: "制作時期", data: works.date },
            {
              term: "種別",
              data: works.kind === "commissioned" ? "受託開発" : "個人開発",
            },
            { term: "役割", data: works.role },
            { term: "実績", data: works.achievement },
            { term: "URL", data: link || "N/A" },
          ]}
        />
      </header>
      <article className="mt-8 prose pb-12">
        <Content components={mdxComponents} />
      </article>
      <aside className="py-8 border-t">
        <Link className="decoration-from-font " href="/works">
          <ArrowLeftIcon className="inline" />
          All works
        </Link>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return allWorks.map((work) => ({
    slug: work.slug,
  }));
}

export const generateMetadata = generateMetadataFactory<Props>(
  async ({ params }) => {
    const work = getWork(params.slug);
    if (!work) {
      return {};
    }
    return {
      title: work.title,
      description: work.subtitle,
      openGraph: {
        images: [work.coverImg],
      },
    };
  },
);

function getWork(slug: string) {
  return allWorks.find((work) => work.slug === slug);
}

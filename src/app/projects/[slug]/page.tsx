import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { mdxComponents } from "@/lib/mdx/components";
import { IMG_SIZES } from "@/styles/constants";

type Props = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: Props) {
  const project = allProjects.find(
    (project) =>
      project._raw.flattenedPath ===
      project._raw.sourceFileDir + "/" + params.slug
  );

  if (!project) {
    return notFound();
  }

  const Content = getMDXComponent(project.body.code);

  return (
    <>
      <header className="py-8">
        <div className="relative w-full aspect-[2/1]">
          <Image
            alt={project.title}
            className="object-contain"
            fill
            sizes={IMG_SIZES}
            src={project.coverImg}
          />
        </div>
        <h1 className="text-5xl font-bold mt-4">{project.title}</h1>
        <p className="text-lg text-gray-400 mt-2">{project.subtitle}</p>
        {project.url && (
          <Link
            className="mt-4 border rounded-md px-2 inline-block leading-7 hover:border-gray-300"
            external
            externalClassName="translate-y-[-1px] mr-0"
            href={project.url}
          >
            Visit
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

import { allWorks } from "contentlayer/generated";

import { WorkCard } from "@/components/work/card";

export default function WorkListPage() {
  const works = allWorks.sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="pt-8 pb-12">
      <h1 className="text-4xl font-bold">Works</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {works.map((work) => (
          <WorkCard key={work._id} work={work} />
        ))}
      </ul>
    </div>
  );
}

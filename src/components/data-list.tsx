import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  classNames?: {
    item?: string;
    list?: string;
  };
  data: {
    data: ReactNode;
    term: string;
  }[];
};

export function DataList({ data, classNames }: Props) {
  return (
    <dl className={twMerge("flex flex-wrap gap-x-8 gap-y-4", classNames?.list)}>
      {data.map(({ term, data }) => {
        if (!data) {
          return null;
        }
        return (
          <div
            className={twMerge(
              "space-y-2 text-base md:text-lg",
              classNames?.item
            )}
            key={term}
          >
            <dt className="text-gray-300">{term.toUpperCase()}</dt>
            <dd className="">{data}</dd>
          </div>
        );
      })}
    </dl>
  );
}

import { allBlogs } from "contentlayer/generated";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { Link } from "@/components/link";

type Props = {
  buildUrl: (page: number) => string;
  page: number;
  perPage: number;
};

export function Paginator({ buildUrl, page, perPage }: Props) {
  const hasPreviousPage = page > 1;
  const hasNextPage = allBlogs.length > perPage * page;

  const twLink = "";
  const twIcon = "inline";

  const linkProps = {
    className: twLink,
  } as const;

  const iconProps = {
    className: twIcon,
    "aria-hidden": true,
  } as const;

  return (
    <div className="flex justify-between mt-12">
      {hasPreviousPage ? (
        <Link {...linkProps} href={buildUrl(page - 1)}>
          <ArrowLeftIcon {...iconProps} /> Previous
        </Link>
      ) : (
        <div />
      )}
      {hasNextPage && (
        <Link {...linkProps} href={buildUrl(page + 1)}>
          Next
          <ArrowRightIcon {...iconProps} />
        </Link>
      )}
    </div>
  );
}

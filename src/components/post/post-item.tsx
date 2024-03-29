import type { Post } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

import { CalendarIcon } from "@/components/icons";
import { Link } from "@/components/link";
import { Tag } from "@/components/tag";
import { datetimeFormat } from "@/lib/datetime/format";

type Props = {
  className?: string;
  post: Post;
};

export function BlogPostItem({ className, post }: Props) {
  return (
    <article
      className={twMerge(
        "flex flex-col space-y-[2px] hover:bg-slate-100 -m-2 p-2 rounded-md relative",
        className,
      )}
    >
      <Link className="clickable-overlay" href={post.path}>
        {post.title}
      </Link>
      <div className="flex items-center gap-x-2">
        <time
          className="text-sm text-gray-400 flex items-center gap-x-1"
          dateTime={post.publishedAt}
        >
          <CalendarIcon aria-hidden className="translate-y-[-0.5px]" />
          {datetimeFormat(post.publishedAt)}
        </time>
        {post.status === "draft" && (
          <Tag className="text-xs font-semibold py-[2px]">Draft</Tag>
        )}
      </div>
    </article>
  );
}

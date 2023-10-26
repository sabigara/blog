import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import { useMemo } from "react";

import { BlogPostItem } from "@/components/post/post-item";

export default function BlogListPage() {
  const posts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  const items = useMemo(() => {
    const items: Item[] = [];
    let prevYear = -1;
    let prevSeason: Season | null = null;
    for (const post of posts) {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const season = dateToSeason(date);
      if (year !== prevYear) {
        items.push({ kind: "year", value: year });
        prevYear = year;
      }
      if (season !== prevSeason) {
        items.push({ kind: "season", value: season });
        prevSeason = season;
      }
      items.push({ kind: "post", value: post });
    }
    return items;
  }, [posts]);

  const renderItem = (item: Item) => {
    switch (item.kind) {
      case "post":
        return (
          <BlogPostItem
            className="my-1"
            key={item.value._id}
            post={item.value as Post}
          />
        );
      case "season":
        return <h2 className="text-2xl font-bold my-4">{item.value}</h2>;
      case "year":
        return (
          <h3 className="text-3xl font-bold my-8" key={item.value}>
            {item.value}
          </h3>
        );
    }
  };

  return (
    <div className="pt-8 pb-12">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      {items.map(renderItem)}
    </div>
  );
}

type Season = ReturnType<typeof dateToSeason>;
type Item =
  | {
      kind: "post";
      value: Post;
    }
  | {
      kind: "season";
      value: Season;
    }
  | {
      kind: "year";
      value: number;
    };

function dateToSeason(date: Date) {
  const month = date.getMonth() + 1;
  if (month === 12 || (1 <= month && month <= 2)) {
    return "❄️";
  } else if (3 <= month && month <= 5) {
    return "🌸";
  } else if (6 <= month && month <= 8) {
    return "🌻";
  } else if (9 <= month && month <= 11) {
    return "🍁";
  } else {
    throw new Error("Should not reach here.");
  }
}

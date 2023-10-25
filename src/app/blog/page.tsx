import type { Blog } from "contentlayer/generated";
import { allBlogs } from "contentlayer/generated";

import { BlogPostItem } from "@/components/blog/post-item";

export default function BlogListPage() {
  const posts = allBlogs.sort((a, b) => (a.date > b.date ? -1 : 1));
  const postsByYear = (posts: Blog[]) =>
    posts.reduce(
      (acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      },
      {} as Record<number, typeof posts>
    );

  const postsBySeason = (posts: Blog[]) =>
    posts.reduce(
      (acc, post) => {
        const date = new Date(post.date);
        const season = dateToSeason(date);
        if (!acc[season]) {
          acc[season] = [];
        }
        acc[season].push(post);
        return acc;
      },
      { "❄️": [], "🍁": [], "🌻": [], "🌸": [] } as Record<
        ReturnType<typeof dateToSeason>,
        typeof posts
      >
    );

  return (
    <div className="pt-8 pb-12">
      <h1 className="text-4xl font-bold">Posts</h1>
      {Object.entries(postsByYear(posts))
        .reverse()
        .map(([year, posts]) => (
          <div className="mt-8" key={year}>
            <h2 className="text-3xl font-bold mb-8">{year}</h2>
            {Object.entries(postsBySeason(posts)).map(([season, posts]) => (
              <div className="mt-4" key={season}>
                <h3 className="text-xl font-bold">{season}</h3>
                <ul className="mt-4 space-y-1">
                  {posts.map((post) => (
                    <li key={post._id}>
                      <BlogPostItem post={post} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

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

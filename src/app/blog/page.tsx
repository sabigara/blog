import { allBlogs } from "contentlayer/generated";

import { BlogPostItem } from "@/components/blog/post-item";

export default function BlogListPage() {
  const posts = allBlogs.sort((a, b) => (a.date > b.date ? -1 : 1));
  const postsByYear = posts.reduce(
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

  return (
    <div className="pb-12">
      {Object.entries(postsByYear)
        .reverse()
        .map(([year, posts]) => (
          <div className="mt-8" key={year}>
            <h2 className="text-3xl font-bold">{year}</h2>
            <ul className="mt-4 space-y-1">
              {posts.map((post) => (
                <li key={post._id}>
                  <BlogPostItem post={post} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      <div className="text-gray-300 mt-6">EOF</div>
    </div>
  );
}

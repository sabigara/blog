import { allBlogs } from "contentlayer/generated";

import { Link } from "@/components/link";

export default function Home() {
  const latestPosts = allBlogs
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 5);
  return (
    <div className="py-8">
      <ul>
        {latestPosts.map((post) => (
          <li key={post._id}>
            <Link href={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

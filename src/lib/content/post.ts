import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";

export function listPosts({ limit }: { limit?: number } = {}) {
  const sortedPosts = [...allPosts]
    .filter((p) =>
      process.env.NODE_ENV === "development" ? true : p.status === "published"
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  return sortedPosts.slice(0, limit);
}

export function getPostBySlug(slug: string): Post | null {
  return allPosts.find((post) => post.slug === slug) ?? null;
}

export function getAdjacentPosts(slug: string) {
  const posts = listPosts();
  const post = getPostBySlug(slug);
  if (!post) {
    throw new Error(`Cannot find post with slug "${slug}"`);
  }
  const index = posts.findIndex((p) => p._id === post._id);
  return {
    previous: posts[index + 1] || null,
    next: posts[index - 1] || null,
  };
}

import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";

export function listPosts({ limit }: { limit?: number } = {}) {
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedPosts.slice(0, limit);
}

export function getPostBySlug(slug: string): Post | null {
  return (
    allPosts.find(
      (post) => post._raw.flattenedPath === post._raw.sourceFileDir + "/" + slug
    ) ?? null
  );
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

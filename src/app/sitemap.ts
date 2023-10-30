import { allPosts, allWorks } from "contentlayer/generated";
import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;

  const blogPages = allPosts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.modifiedAt ?? post.publishedAt,
  }));
  const workPages = allWorks.map((work) => ({
    url: `${siteUrl}/${work.path}`,
    lastModified: work.modifiedAt ?? work.publishedAt,
  }));

  const sections = ["", "posts", "works"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...sections, ...blogPages, ...workPages];
}

import { JSDOM } from "jsdom";

import { extractAsin } from "@/lib/amazon/extract-asin";
import { fetchAmazonItem } from "@/lib/amazon/proxy";

export type Ogp = {
  description?: string;
  image?: string;
  title?: string;
  type?: string;
  url?: string;
};

export type SiteMetadata = {
  description?: string;
  ogp?: Ogp;
  title?: string;
  url?: string;
};

export async function fetchSiteMetadata(url: string): Promise<SiteMetadata> {
  const resp = await fetch(decodeURIComponent(url));
  if (!resp.ok) {
    throw new Error(
      `Failed to fetch ${url}. Status: ${
        resp.status
      }. Body: ${await resp.text()}`
    );
  }

  // if amazon url
  if (url.startsWith("https://www.amazon.")) {
    return fetchMetadataByPaApi(url);
  }

  const htmlStr = await resp.text();
  const dom = new JSDOM(htmlStr);
  const meta = dom.window.document.querySelectorAll("head > meta");

  const title = dom.window.document.querySelector("title")?.textContent ?? "";

  const description =
    dom.window.document
      .querySelector("meta[name=description]")
      ?.getAttribute("content") ?? "";

  const ogp = Array.from(meta)
    .filter(
      (element) =>
        element.hasAttribute("property") &&
        element.getAttribute("property")?.startsWith("og:")
    )
    .reduce((acc, ogp) => {
      const property = ogp.getAttribute("property")?.trim().replace("og:", "");
      const content = ogp.getAttribute("content");
      if (!property) {
        return acc;
      }
      return {
        ...acc,
        [property]: content,
      };
    }, {} as Ogp);

  const metadata = {
    ogp,
    title,
    description,
    url,
  };
  return metadata;
}

async function fetchMetadataByPaApi(url: string): Promise<SiteMetadata> {
  const asin = extractAsin(url);

  if (!asin) {
    return {};
  }

  const item = await fetchAmazonItem({ asin });

  return {
    ogp: {
      title: item.title,
      image: item.image.url,
      url: item.url,
    },
    title: item.title,
    url: item.url,
  };
}

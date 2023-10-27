import { JSDOM } from "jsdom";

export type Ogp = {
  description?: string;
  image?: string;
  site_name: string;
  title?: string;
  type?: string;
  url?: string;
};

export type SiteMetadata = {
  description?: string;
  ogp: Ogp;
  title?: string;
  url: string;
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

  if (url.startsWith("https://www.amazon.")) {
    const img = dom.window.document.getElementById("landingImage");
    const imgSrc = img?.getAttribute("src");
    if (imgSrc) {
      ogp.image = imgSrc;
    }
  }

  const metadata = {
    ogp,
    title,
    description,
    url,
  };
  return metadata;
}

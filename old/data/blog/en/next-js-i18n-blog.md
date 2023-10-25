---
title: "Internationalizing your Next.js blog posts"
date: "2023-01-09"
tags: ["next.js", "i18n"]
draft: false
---

As you can see from the right side of the header on this blog, I've made it possible to publish content in multiple languages.

Using [`next-18next`](https://github.com/i18next/next-i18next) made it relatively easy to implement, but I struggled a bit with how to specify the appropriate URL (`/ja/blog/<slug>`) from the local Markdown file directory structure.

## Markdown file directory structure

Originally, the language-specific directory structure was `/blog/en/<slug>.md` and the corresponding URL reflected that, so I decided to reuse that. However, since I'm using [Next.js's Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing), the URL will come with the locale first, like `/en/blog/<slug>`.

## Specification

- Place Markdown files in each language directory `/(en|ja)`.
- Use the file path as the slug (except for the language).
- Markdown files with matching file paths in different language directories are treated as different language versions of the same article.
- For combinations of articles and languages where a translation does not exist, display a version in a different language as a fallback.
- Generate all articles statically in all languages.

## `getStaticPaths`

All blog article pages are generated at `/pages/blog/[...slug].tsx`.

`getStaticPaths` accepts all `locales` as a parameter, so I use this to cover all combinations of `locale + slug`.

```tsx:/pages/blog/[...slug].tsx
type Post = {
	slug: string;
	locale: "en" | "ja";
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  return {
    paths: locales.flatMap((locale) =>
      getBlogPosts().map((p) => ({
        params: {
          slug: p.slug.split("/"),
        },
        locale,
      }))
    ),
    fallback: false,
  }
}
```

:::info
This `p.slug` uses the file path with the initial `/(en|ja)` removed.
:::

To statically generate only articles with translations, do the following:

```tsx
export async function getStaticPaths() {
  return {
    paths: getBlogPosts().map((p) => ({
      params: {
        slug: p.slug.split("/"),
      },
      locale: p.locale,
    })),
    fallback: "blocking",
  }
}
```

## `getStaticProps`

`getStaticProps` accepts `locale` and `slug`, so I use those to retrieve the data. If there is no translation for that language, it displays in the original language. However, **it does not redirect to a different locale**, so the language of the content (article and other elements like the footer text) may be different from the user's settings. I think this is generally desired behavior.

```tsx:/pages/blog/[...slug].tsx
export const getStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
  const slug = (params.slug as string[]).join("/")
  const posts = getBlogPosts()
  const post =
    posts.find(
      // Fallback to untranslated version if exists
      (post) => post.slug === slug && post.locale === locale
    ) ?? posts.find((post) => post.slug === slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale, ["common", "blog"])),
    },
  }
}
```

## TODO

- Structuring files with a naming convention like `/<slug>.en.md` seems much better compared to per-language directories. This isn't a major change, so I'd like to do it at some point.
- When an article is displayed in a language other than the user's preference, I'd like to provide a link to the other language version.
- It seems that it's necessary for SEO to use the `<link rel="alternate" hreflang="lang_code" href="url_of_page" />` tag to tell Google about the links to different language versions.

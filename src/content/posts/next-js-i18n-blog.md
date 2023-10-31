---
title: "Next.jsで複数言語対応のブログ記事を書く"
publishedAt: "2023-01-09"
status: "published"
---

このブログのヘッダーの一番右を見てもらえばわかるように、複数言語でコンテンツを公開できるようにしてみた。

[`next-18next`](https://github.com/i18next/next-i18next) を使えば基本的には特にハマることもなく実装できたが、ローカルのマークダウンファイルのディレクトリ構造から適切なURL (`/ja/blog/<slug>`)を指定する方法にちょっと悩んだ。

## マークダウンファイルのディレクトリ構造

もともと言語ごとに `/blog/en/<slug>.md` というディレクトリ構造とそれを反映したURLになっていたのでそれを流用することにした。ただし[Next.jsのInternationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing) を使用するので、URLは `/en/blog/<slug>` のようにロケールが先に来るようになる。

## 仕様

- `/(en|ja)` の各言語ディレクトリごとにマークダウンファイルを配置する。
- ファイルパスをslugとして使用する。
- 各言語ディレクトリ間で一致するファイルパスを持つマークダウンファイルは同じ記事の別言語バージョンとして扱う。
- 翻訳が存在しない記事と言語の組み合わせでは、フォールバックとして別の言語のバージョンを表示する。
- 全ての記事を全ての言語で静的に生成する。

## `getStaticPaths`

ブログ記事のページはすべて `/pages/blog/[...slug].tsx` で生成する。

`getStaticPaths` には引数として全ての `locales` が渡されるので、これを使って全ての `locale + slug` の組み合わせを網羅する。

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
この `p.slug` はファイルパスから先頭の `/(en|ja)` を削除したものを使用している。
:::

もし翻訳が存在する記事のみを静的生成したい場合は次のようにする。

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
  };
}
```

## `getStaticProps`

`getStaticProps` には `locale` と `slug` が渡されるので、それを使ってデータを取得する。もしその言語への翻訳がない場合は元の言語で表示する。その際に**別のロケールにリダイレクトされるわけではない**ので、記事の内容とその他のコンテンツ（フッターのテキストなど）で言語が不一致になる。これは基本的には望ましい挙動だと思う。

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

- もともとのディレクトリ構造を流用したので言語ごとのディレクトリに分かれてしまったが、 `/<slug>.en.md` のようなファイル名にした方が管理しやすい気がしている。これも大した変更ではないのでそのうちやっておきたい。
- ユーザーの設定と違う言語で記事が表示されている際に別言語へのリンクを知らせたい。
- `<link rel="alternate" hreflang="lang_code" href="url_of_page" />` というタグで別言語バージョンへのリンクをGoogleに教えるのもSEO的には必要らしい。

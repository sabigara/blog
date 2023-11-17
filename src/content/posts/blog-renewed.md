---
title: Next.jsとTailwindでブログを作り直した
publishedAt: "2022-08-04"
status: "published"
---

:::info
現在はこの記事とは異なる構成で構築されています。
:::

はてなブログや別の自作ブログでも一瞬だけ書いていた時期があるが、今回作り直すことにした。

しかし、なぜ作るのかという問い以前に、そもそもなぜ書くのかが問題になる。

## なぜ書くのか

ひとことで言うと、インターネット空間でのプレゼンスを高めたいからだ。

なぜ高めたいかといえば、自分の作るものを多くの人に届けたいからだ。

「ネット上のプレゼンス」というと近頃はSNSのイメージが強い。なにか言えば大量にいいねされて拡散されるような人が強いとされている。

プロダクトを広めるにはそれも良いのだが、いかんせん僕はSNSでの発信が苦手だ。Twitter上でウケを狙うのがひどく気恥ずかしいし、わざわざ人と絡もうとも思えない。そもそも、僕のタイムラインは静かなものだ。超有名人はフォローしないし、フォローしている人のリツイートはすべてミュートしているから、数千いいねされているようなつぶやきがタイムラインに現れることすら稀だ。それに、ちょっと気に入らない人はすぐにアンフォローしてしまう。

要するに、バズるようなツイートは見るのも書くのも嫌だということだ。

逆に、ブログを書くことは（大変であっても）嫌いではないし、苦手でもなさそうだ。昔運営していた作曲・DTM系のブログは半年で6万pv/月くらいになったから、書けば誰かが読んでくれるという自己効力感は得られた。

ひるがえって、ここ1年で作ったサービスの流入はすべて合わせても1000pv/月程度しかない。Twitterでリリースを告知してもほとんど反応はなく、自分の影響力のなさをいつも痛感する。

もちろんプロダクト自体の質・アイデアが重要なのは言うまでもない。しかし誰にも届かなければ意味がないのも当たり前だ。これが、また書こうと思った理由だ。

## 技術

SEO関連のあれやこれやの実装の手間を考えると、たかがブログといえどゼロから作る気にはならなかったので、慣れた技術スタックのテンプレートを探した。

https://github.com/timlrx/tailwind-nextjs-starter-blog

見つけたのがこのリポジトリで、概要は以下のようになっている。

- Next.js
- Tailwind
- ローカルファイルにMarkdown, MDXで書く
- remark, rehypeで変換
- OGPやサイトマップなどのSEO対策ずみ

Markdown内にURLを貼るだけで画像のサイズを測って `next/image` に投げてくれるような便利機能もある。

### Tailwindについて

Tailwindはかなり好き嫌いが分かれると思う。僕も最初は良いと思ったが、書いているうちにちょっと微妙だなの感を強く持つようになった。

ネイティブで対応していないCSSプロパティもたくさんあるし、 `className` が無限に横に伸びてしまうのも微妙だ。Tailwindの立ち位置をどう捉えるべきなのか自信がないが、生でカスタマイズせずに、気軽に使えるようなライブラリではないと僕は考えている。

ただ、以前 [muu](https://muu.app) というサービスを作るときに使ったので、少なくともブログを作る分には問題はないかなと思い採用した。

### リッチな埋め込み外部リンクを実装

https://tailwindcss.com

こういう埋め込みカードはサポートされていないので自分で実装した。

実はこのカードはiframe内に表示されている。

```typescript
// EmbeddedLink.tsx
return (
  <>
    <iframe
      src={`/embed/${encodeURIComponent(href)}`}
      title={`${href}への埋め込みリンク`}
      loading="lazy"
      className="h-32 w-full"
    />
    <a target="_blank" rel="noopener noreferrer" href={href} className="hidden">
      {children}
    </a>
  </>
)
```

```typescript
// pages/embed/[url].tsx
export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const url = ctx.params.url as string;
  const siteMetadata = await getSiteMetadata(url);

  ctx.res.setHeader("X-Frame-Options", "SAMEORIGIN");
  ctx.res.setHeader("Cache-Control", `public, max-age=${60 * 60 * 24 * 30}`);

  return {
    props: {
      siteMetadata,
    },
  };
}
```

iframeから同じNext.jsの `pages/embed/[url].tsx` というSSRページを表示している。 `getServerSideProps` で外部サイトの `meta` 要素を取得して、UIをレンダリングして返している。こうすればキャッシュが効くし、ビルド毎にフェッチしたりそれを防ぐために永続化したりしなくてもいい。

といってもこの方法は自分で考えたわけではなく、[Zenn](https://zenn.dev)で（おそらく）採用されている方法だ。僕のようにURLを投げているわけではないから細かいところは違うかもしれない。

(デザインまでほぼ同じなのはよくないので、独自性を出そうとは思っている。)

### Zennとの連携

記事のリストには、以下の画像のようにZennの投稿へのリンクも表示するようにした。

![](/images/posts-renewd.png)

Zennの記事もGitHubで管理しているので、API経由で自由にフェッチできる。ビルド前にそれらのファイルを記事用のディレクトリに書き出しておくことで、あまり苦労せずに接続することができた。

このブログに表示しない理由は、ZennはCanonical URLに対応しておらず、SEO的によろしくないからだ。

## まとめ

ローカルでMarkdownを書くと画像の挿入が手間だったり、まだ改善したい点は多いが、とりあえず形になったのでよかった。

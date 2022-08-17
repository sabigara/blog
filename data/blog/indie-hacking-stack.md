---
title: "無料で高速にWeb系個人開発するための技術スタック2022（主観）"
date: "2022-08-17"
tags: ["個人開発", "nextjs"]
draft: false
summary:
images: []
layout: PostLayout
canonicalUrl:
---

個人開発でWebサービスやアプリを10個以上ふらふらと作ってきたが、最近は自分にハマる技術スタックが固まってきたように思うので紹介したい。

選定の基準はタイトルにもあるように以下の3つだ。

1. 無料
2. 速く実装できる
3. Web

## フレームワーク

### Next.js + Vercel

個人的にはReactが好きなのでNextを挙げておくが、Vueでもなんでも好きなのを使えばいい。

ただし、**生のReactくらい低レベルのフレームワークを使うのはオススメしない**。

サービスの要件を生のReactで満たせたとしても、拡張性やパフォーマンス、SEOなどを鑑みると最初からNextを使っておくに越したことはない。

「サーバーサイドレンダリングするほどでもないかな」みたいな意見をたまに見る（気がする）が、そもそも**SSRがハイコストみたいな考え方が古い**気がする。Nextであれなんであれ、SSRはデファクトスタンダード化しているので、そこに妙な抵抗感を覚える必要はない。

サーバーレス関数上で走るAPIを一瞬で定義できるのも魅力的だ。簡単なCRUD処理であればわざわざバックエンドサーバーを用意する必要がないため、大幅な時間・コストの削減につながる。

Nextの場合、インフラは[Vercel](https://vercel.com)が一番手っ取り早く、サービスがかなり大きく成長しない限りは無料で使える。(ただし商用サービスは$20/moのProプランの契約が必要)

もちろん、Ruby on RailsやDjangoなんかも選択肢としては全く問題ないと思う。Next + VercelのAPIはすべてサーバーレス関数であり、無料プランだと最大10秒までしか実行できない。しかもバッチ処理なんかも書けない。この辺の制限は初めから認識しておくべきだ。

ただRailsのようなフルスタックフレームワークを無料でデプロイできるサービスは少ない。Vercelのすごいところは、基本的には無料かつ無制限にプロジェクトを作り続けられるところだ。「なんでもできる」とは口が裂けても言えないが、かなり遊べるのは事実だ。

## スタイリング (CSS, CSS-in-JS), UIフレームワークなど

Reactの場合、CSSを書く方法は無限に存在する。

- [CSS Modules](https://github.com/css-modules/css-modules)
- [Styled Components](https://styled-components.com)
- [Emotion](https://emotion.sh/docs/introduction)
- [Tailwind](https://tailwindcss.com)

上記のライブラリは低レイヤーというか、CSSをどこに書いてどうやってバンドルするかを制御するためのものだ。

今回の記事では「高速に」書くことを趣旨としているので、もっと便利なフレームワークを積極的に使っていきたい。

### Chakra UI

これも完全に好みだとは思うが、個人的には[Chakra UI](https://chakra-ui.com)がオススメだ。

書き味は以下の公式デモを見てもらえばわかると思う。

```typescript
import React from "react"
import { Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react"
import { MdStar } from "react-icons/md"

export default function Example() {
  return (
    <Center h="100vh">
      <Box p="5" maxW="320px" borderWidth="1px">
        <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text ml={2} textTransform="uppercase" fontSize="sm" fontWeight="bold" color="pink.800">
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Box as={MdStar} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
    </Center>
  )
}
```

![Chakraのデモ](/static/images/blog/chakra-demo.png)

「Tailwindっぽい」と感じた人も多いと思う。スタイリングとマークアップが渾然一体になっている点は全く同じだ。

個人的には（Reactを書く上で）cssとhtmlを分離する理由は（たぶん）全くないと思っている。理由は以下のとおり。

- コンポーネント化によって再利用できる
- そもそもスタイリングとマークアップは一定程度結合しており、それが分離している（あるいはするべき）というのは建前でしかない
- ファイルが分割されていると行き来がめんどくさい

異論はあると思うが、cssとhtmlを一緒くたに書くのは、少なくとも「高速に」開発していくうえでは利点が多いのは事実だ。

じゃあTailwindはどうなのかという話だが、先述のようにこれはChakraより一段レイヤーの低いライブラリであり、例えば `Button` とか `Menu` のようなコンポーネントは提供していない。

逆に、Chakraには `Alert` や `Tag` , `Breadcrumb` のようなハイレベルコンポーネントまで含まれている。**一見単純そうなコンポーネントであっても、アクセシビリティまで考慮すると実装コストは跳ね上がる**ため、こうしたフレームワークは積極的に使っていくべきだ。

ただ、そうした便利コンポーネントに限ってカスタマイズが難しいというのがよくある話だ。しかしChakraはかなりカスタマイズ性が高いため、僕の経験では困ったことはあまりない。

このカスタマイズ性を担保しているのは以下のようなコンポジションだと思う。

```typescript
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"

;<Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing...</AccordionPanel>
  </AccordionItem>
</Accordion>
```

この例からわかるとおり、複雑なコンポーネントを使うときは、ユーザー自身でパーツを組み合わせるのがChakraのやり方だ。若干冗長になりがちではあるが、APIが開かれているためアクセスしやすい。

Chakra以外にも[MUI](https://mui.com/)なども候補になると思うが、ちゃんと使ったことがないのでなんとも言えない。

## データベース

Vercelのおかげでフロント・バックエンドが無料で運用できたので、データベースもタダがいい。

### (Supabase or Planet Scale) + Prisma

RDBMSを使いたい場合、現実的な選択肢は[Supabase](https://supabase.com)か[PlanetScale](https://planetscale.com)の無料プランだと思う。

Supabaseは2つ、PlanetScaleは1つのプロジェクトを無料で運用できる。

[Prisma](https://www.prisma.io)はTypeScript向けのORMで、マイグレーションもやってくれる。複雑なリレーションを含んだクエリも、かなりの程度まで型安全に定義できる優秀なライブラリだ。

Nextで使う場合は、`getServerSideProps`, `getStaticProps` やAPIなどのバックエンドから呼び出す必要がある。

「高速」な開発なら、後述のFirestoreの方がフロントから直接DBにアクセスできるから便利なのでは、という意見もあると思うが、個人的にはあまり同意できない。そのあたりは後でもう一度触れたい。

### Firestore

いまさら紹介するまでもないくらい有名なサービスなので、いまさら深くは紹介しない。

かなり単純なサービスであればFirestoreでも問題ないが、個人的には辛さを感じることが多く、基本的にはRDBMSの方が好きだ。しかし無料でほとんど無制限にプロジェクトを作れるのはありがたい。

## 認証

### Firebase Auth

最速で認証機能を実装するには最適だと思うが、APIに投げるtokenやログイン状態の管理などはわりと自力で実装する必要がある。

Firestoreを使う場合はSecurity Rulesとの兼ね合いでこれを使うしかない。

### [NextAuth](https://next-auth.js.org)

各ソーシャルプロバイダーとの接続やセッション管理などを全面的にサポートしてくれるライブラリ。

Firestoreを使わないのであればこちらがオススメ。

## 実装戦略

### クライアントサイドフェッチを避ける

ReactというとネイティブアプリのようにAPIサーバーからJSONをfetchしてきて・・・というイメージが強いかもしれないが、Nextの場合は `getServerSideProps` と `getStaticProps` という関数を定義することによって、面倒な通信処理をフレームワーク側に任せることができる。

```typescript
export async function getServerSideProps(): Promise<GetStaticPropsResult<Props>> {
  const articles = await prisma.article.findMany({
    where: {
      authorId: "me",
    },
  })
  return {
    props: {
      articles,
    },
  }
}
```

**すべてのケースをこれでカバーできるわけではないし、パフォーマンス面で劣る場合も多いが、使えるときは使うべきだ**。フロントエンドで管理している状態の数は可能な限り減らしたほうが楽だ。最適化を初めから追い求めないほうがいい。

個人的にFirestoreが（サーバーサイドでDBにアクセスする実装に対し）それほど便利と思えないのも、Nextにはこういう逃げ道があるからかもしれない。小さなサービスをサッと構築する分にはこれくらいシンプルな方がいい。

クライアントサイドフェッチをする場合は、[React Query](https://tanstack.com/query/v4)や[SWR](https://swr.vercel.app/ja)などのライブラリを使おう。自力で `useEffect` などを使って実装すると無限ループなどで痛い目を見る可能性がある。（すぐ気づかないとfirestoreなどで高額請求がくる可能性もある）

## SEO

個人開発ではSEOなどはおろそかにしがちだが、ここでは最低限のチェックポイントは挙げておきたい。

Twitterでバズるつもりの人は読み飛ばしてください。

### metaタグなど

ブラウザのタブに表示される `<title />` や、検索エンジンの概要に表示される `<meta name="description" />` などはちゃんと設定しておこう。

[Next SEO](https://github.com/garmeeh/next-seo)が一番ポピュラーなライブラリ。全ページで共有されるデフォルト値を設定しておき、各ページでオーバーライドするのが便利なやり方だ。

### OGP画像

![ツイヨミ OGP画像](/static/images/blog/twiyomi-ogp.png)

1200x630サイズの画像を以下のように設定しておくと、Twitterなどで目立たせることができる。

```html
<meta name="twitter:card" content="summary_large_image" />
<meta property="og:image" content="https://twiyomi.vercel.app/og-image.png" />
```

質問箱やマシュマロなどのOGP画像は質問ごとに動的に生成されており、SNS上でシェアされやすいようにしている。また、Zennやはてなブログなどの記事タイトルを画像化している例も多い。似たようなことをやりたい場合は、Vercelがメンテナンスしている以下のテンプレートをカスタマイズしていくのがオススメだ。

https://github.com/vercel/og-image

このブログでも動的にカードを生成している。ページ下部のツイートボタンを押して確認してみてほしい。（できればツイートもしてほしい）

### Analytics

無料となると、やはりGoogle Analyticsが筆頭に挙がる。

ただ、個人的にGAは使いにくいというか、高機能すぎて却って知りたい情報がパッと見つからない感がある。

[Plausible Analytics](https://plausible.io/)は情報がかなりコンパクトにまとまっていて見やすい。またcookiesを使っていないため、プライバシー規制に厳しい欧米向けのサイトには最適らしい。

ただ月額9ドルかかるため、無料という条件からは外れる。安いサーバーにセルフホストすることでコストを抑えるのもアリかもしれない。

### favicon

faviconについては誰も考えたくないと思う。

僕もそうなので、2022年はとりあえず以下の記事を鵜呑みにすることにしている。いまのところ問題ないと思っている。

https://coliss.com/articles/build-websites/operation/work/how-to-favicon.html

### Google Search Console

https://search.google.com/search-console/about

Search Consoleにはかならず登録しておこう。これを怠るとGoogleから永遠に認知してもらえない可能性もある。

もしSNSやZennなどでまったく反響がなくても、意外と検索から訪れてくれる人はいるものだ。一過性のバズを夢見るよりも地道なSEOを続けたほうが最終的には良いかもしれない。

## まとめ

がんばりましょう。

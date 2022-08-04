---
title: Twitter上のマンガスレッドを一気読みできる「ツイヨミ」をリリース
date: "2022-08-04"
tags: ["個人開発", "twitter"]
draft: false
summary:
images: []
layout: PostLayout
canonicalUrl:
---

https://twiyomi.vercel.app

数日前に上記のサービスをリリースした。

ツイートのURLを入力するだけで、Twitterスレッドに貼られている画像をWebマンガのように読むことができる。

![スクリーンショット1](/static/images/blog/Screenshot%202022-08-04%2016.46.36.png)

![スクリーンショット2](/static/images/blog/Screenshot%202022-08-04%2016.45.36.png)

## 作った理由

自分が使いたかったから、**ではない。**

マンガのスレッドがバズっているのをしょっちゅう見るので、需要がありそうだと思ったからだ。しかも実装は楽そうだ。実際、開発は4日くらいで終わった。

## 類似サービス

以下のようなサービスはすでに存在しているが、それほど競合しているとは思わない。

### ツイコミ(仮)

https://twicomi.com

Twitter上のコンテンツを外部のサイトに表示するのは規約上問題ないはずだが、ツイコミ（名前が似すぎたか？）は「無断転載」だとかなり叩かれたらしい。

このサイトは「自分が読みたいスレッドを読む」というよりは「このサイトのコンテンツを読む」のが趣旨らしく、ユーザーが任意のツイートを変換することはできないらしい。

### すまとめ

https://sumatome.com

こちらは今回作ったサービスに似ているが、やはり一度変換したあとはコンテンツとして保存される仕組みだ。

## 技術的な話

### フレームワーク・インフラ・ライブラリなど

- Next.js
- Vercel
- Chakra UI
- PlanetScale
- Prisma

特におもしろみのない、みんな大好きなモノしか使っていない。はじめの3つは自分のなかでは完全にスタンダードと化している。特にNextとVercelはいうことはない。

Chakraは個人的に一番気に入っているUIフレームワークだ。Tailwindが `class` 属性に書き連ねていくのに対して、ChakraはReact Propsに書く。体験としては似ているのだが、Tailwindのように横にズラズラと伸びていくこともないし、対応していないCSSプロパティに悩まされることもほぼない。

DBについては後述する。

### Twitter API

Twitter APIについてはZennでも書いたが、こちらにも軽くコードを載せておく。

https://zenn.dev/sabigara/articles/524d05f1d2a637

```typescript
export async function getThreadRecursive(statusId: string, results: TweetV2[] = []) {
  const tweet = await twitter.singleTweet(statusId, {
    expansions: "referenced_tweets.id",
  })
  const previous = tweet.data.referenced_tweets?.find((t) => t.type === "replied_to")

  results.push(tweet.data)

  if (previous) {
    await getThreadRecursive(previous.id, results)
  }

  return results
}
```

Search APIは直近7日以内のツイートしか対応していないので、上記のように再帰的にリプライ先をたどっていくしかない。当然、リクエスト数が増える点がネックになる。

公式ドキュメントによると、**アプリ単位の割り当てが900リクエスト/15分 + 認証ユーザー単位の割り当ても同量**が設定されている。アクセスが増えてくればアプリ側の割り当てだけではキツくなりそうなので、認証を必須にする必要があるだろう。

### データベースについて

すでに取得したデータを何度もTwitter APIから引っ張ってくるのは無駄なので、どこかにキャッシュする必要がある。

今回は[PlanetScale](https://planetscale.com)にPrismaで接続することにした。PrismaはともかくPlanetScaleは確実にオーバーキルだが、試してみたかったので採用した。もちろん無料プランだ。

ただ今回の実装はあまりに単純すぎるので、PlanetScale特有のマイグレーション機能は一回使うだけで終わってしまった。どんなホスティングサービスでも大差ない程度の労力だ。「便利そうだけど実際のところどうなんだろう？」という疑問は全く解消されなかった。

Prismaは各所でさんざん称賛されている通りに素晴らしいORMだ。ただ `Datetime` カラムの返り値が `Date` オブジェクトなのでシリアライズは自力でやる必要がある。あまりちゃんと調べていないが、コンバーター用のAPIは用意されていると助かるなと思った。

## 公開した反応

Twitterでスクリーンレコーディング付きで公開してみたが、いいねが2件ついただけだ。リンクをクリックしてくれたのも2人だけ。

ちょっと残念だが、Twitterでの伸びなさに関しては自分に影響力がなさすぎるのも原因だと思う。つまり、これをもってこのサービスのアイデア自体が悪いと判断するべきではないということだ。

がんばってSNSアカウントを運用してプレゼンスを高める、なんていうのが自分には向いていないので、こうして記事を書いている。インターネット空間に多少なりとも露出していくのは長期的に利益になるだろうという目論見だ。

https://twiyomi.vercel.app
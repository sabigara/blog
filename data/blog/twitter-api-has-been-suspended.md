---
title: Twitter APIへのアクセスをいきなり遮断された
date: "2022-08-09"
tags: ["個人開発", "twitter"]
draft: false
layout: PostLayout
---

ある日、Twitter Developer Platformからこんなメールが届いた。

<blockquote>
Hello,

We are writing to let you know about a bug we discovered and fixed where your Twitter Developer account temporarily had access above your approved level. Your Essential account now includes the correct access.

What happened
Recently, you were approved for Essential access for your Twitter Developer account. Prior to the fix, your account included access above the approved 500k Tweets/month included in Essential.

We’ve updated your account so that it now reflects 500k Tweets/month. See an overview of access levels to the Twitter API here.

We’re excited to welcome you to the platform and see what you build.

Sincerely,
The Twitter Developer Platform team

</blockquote>

日本語で要約すると「あなたはTwitter APIのEssentialプランに登録したけど、こちら側のバグのせいでもっと上のプランが使えるようになっていたから直したよ」ということ。

その数日前に[Twitter APIを使った新しいサービス](https://twiyomi.vercel.app)を公開していたので、ああそれのことね、くらいにしか思っていなかった。

しかし、**翌日にサービスを使ってみるとTwitter APIからエラーが返ってきている**。具体的には「**そのトークンではTwitter API v2にはアクセスできません**」というものだ。

Twitter APIのダッシュボードを開いてみると、`Project` の `Production` 環境に登録されていた `App` が、 `Standalone Apps` (v1専用)に移動されていた。(v2 APIでは1つの `Project` に対して複数環境を作り、独自のAPIキーを発行できる)

![developer portal](/static/images/blog/twitter-dev-portal.png)

[プラン表](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api)によると、Essentialプランは「1 App per Project」だから、僕は現在Essentialだということになる。

|                                                                                 | Essential                                                                        | Elevated                                                |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Getting access                                                                  | [Sign up](https://developer.twitter.com/en/portal/petition/essential/basic-info) | Apply for additional access within the developer portal |
| Price                                                                           | Free                                                                             | Free                                                    |
| Access to Twitter API v2                                                        | ✔️                                                                               | ✔️                                                      |
| Access to [standard v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) | ✔️ (Limited access - only media endpoints)                                       | ✔️                                                      |
| [Project](https://developer.twitter.com/en/docs/projects) limits                | 1 Project                                                                        | 1 Project                                               |
| [App](https://developer.twitter.com/en/docs/apps) limits                        | **1 App per Project**                                                            | **3 Apps per Project**                                  |

しかし僕はElevatedアクセスを申請して受理されていたはずで、実際ダッシュボードにも以下のように表示されている。つまり、**僕は自分でElevatedアクセスを申請してProduction Appをv2 Projectに移行することができない**。

![Elevatedアクセスを持っている](/static/images/blog/twitter-api-elevated.png)

ただ、おかしいのはTwitter開発者プログラムに登録した時点ですでに1つのProjectに対して3つのAppを作れていた気がすることだ。Twitterからのメールはたぶんそのことを言っているだと思う。

## Twitterサポートに連絡したがまだ返事はこない

僕がなにか見落としているだけで、Elevateする方法があるのかもしれないがよくわからない。

サポートからの返答はまだない。

というかTwitter側の不手際なら、すでにプロダクション環境にあるアプリを問答無用で無効化するのはちょっと勘弁してほしい・・・。

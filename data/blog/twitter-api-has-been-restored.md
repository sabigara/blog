---
title: Twitter APIへのアクセスが回復した
date: "2022-08-16"
tags: ["個人開発", "twitter"]
draft: false
summary:
images: []
layout: PostLayout
canonicalUrl:
---

https://rubiq.vercel.app/blog/twitter-api-has-been-suspended

この前こんな記事を書いたが、少し前に確認したら復旧していた。

![APIの権限がelevatedにもどった](/static/images/blog/twitter-api-access.png)

ただし、プロジェクトから強制的に排除されたAppはそのまま `Standalone App` にいるし、全部直してくれるわけではないらしい。

しかも「直した」という連絡が届いたわけでもない。自分でダッシュボードを確認しにいったら直っていただけだ。

僕のプロジェクトはリリース直後だしほとんど使われていないから問題ない（なくはない）けど、これが大規模なサービスで起こっていたら悲惨だとは思う。
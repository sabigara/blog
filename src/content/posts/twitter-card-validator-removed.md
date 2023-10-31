---
title: "「Twitter Card Validator」がOGP画像を表示してくれない件"
publishedAt: "2022-08-05"
status: "published"
---

新サービス公開の際にOGP画像を作ったのでTwitter公式の「Card Validator」で確認しようとしたら、ログは `Card loaded successfully` と言っているのに、本来画像が表示されるべき箇所に `Unable to render Card preview` と出る。

不具合っぽいし数日で治るかなと思ったが、２週間経っても修正されない。おかしいと思ってよく調べてみると、プレビュー機能はすでに公開停止されているらしい。

[Twitter Developers Forum](https://twittercommunity.com/t/card-validator-preview-removal/175006)

> We’ve recently removed the preview functionality from the Card Validator. Previews are still available in the Tweet Composer and the Card Validator remains accessible for other debugging purposes

> If the Card Validator shows that it is unable to render your card, this may not mean that the card is not functional. We encourage you to use the Tweet Composer in the Twitter client itself

要するに表示を確認したいときはTwitterアプリで実際にURLを入力してねということらしい。

開発時にキャッシュされて困るならbit.lyを使ってくれと言っている。

https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards

解せないのは、機能を停止したのならなぜツール本体にも注意書きしないのかということだ。なにも難しいことではないと思うのだが・・・

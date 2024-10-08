---
title: "Product Huntのデイリー2位を動画エディタで獲得したけど半年で閉鎖した"
publishedAt: "2022-11-24"
status: "published"
---

(この[記事はMediumに投稿した英語版](https://medium.com/@sabigara/i-got-2-on-product-hunt-by-a-video-editor-and-closed-it-in-6-months-9a277d5027a8)の翻訳です)

約10ヶ月前に、Reaktrという動画エディタのSaaSを公開しました。

これを[Product Huntに投稿](https://www.producthunt.com/products/reaktr#reaktr)するとたくさんのUpvoteとポジティブな感想が集まり、最後には２位になりました。

![ReaktrがProduct Huntで2位を獲得](/images/posts/reaktr-ph.png)

そう言うと、多くの人には大成功に聞こえると思います。大量のユーザー流入があるだろうし、有料化すればビジネスになると思うかもしれません。

しかしそんなに甘くはありません。実際、このサービスはうまく行かずにクローズされることになりました。

## どんなサービス？

ひとことで言えば、Reaktrは**Windows Media Playerなどに実装されている「ビジュアライザー」のような動画を、音楽をアップロードするだけで作成できるサービス**です。

実際に見てもらったほうが速いでしょう:

https://www.youtube.com/watch?v=KDIh-cN0WXU

これは最初のリリースからかなり開発が進んでいるので多機能ですが、最初はもっとシンプルでした。

### 技術スタック

- Next.js
- Chakra UI
- React Three Fiber
- Firebase
- WebCodecs
- AWS Elemental MediaConvert

基本的には**動画編集からエンコードまで全てをブラウザ上で行っています**。ただブラウザ上でMP4に変換する方法が見つからなかったため、最後だけAWSのサービスを使用してWebMからトランスコードしています。

プロジェクトはFirestoreに自動保存され、書き出した動画はS3からダウンロードできます。

## Product Huntで2位を獲得するとどうなる？

### アクセス数は増えるが・・・

**初日で約700人のアクセスがあり、その後は1日ごとに半減**していきました。

感想としては、思ったより少なかったです。別に有料プランがあったわけでもないので機会損失とは思わないですが、もっと爆発的なトラフィックが来るかと身構えていたので拍子抜けしました。

### メディアに掲載される

[Gigazine](https://gigazine.net/news/20220219-reaktr-audio-reactive-video/)という日本の大手サイトや、他にもフランスやトルコのそれなりに大きなメディアに取り上げられました。また、個人のブログやニュースレターからのトラフィックもありました。

といっても、これらのメディアからの流入も大きなものではないし、時間が経てばほとんど消えてしまいました。

Product Huntでの公開から2ヶ月も経つと、一日の来訪者数はせいぜい20から30人程度に落ち着きました。

### TwitterのDMやメールでのコンタクトがいくつか来る

スタートアップからのリクルートや、「同じようなサービスを一緒に作ってほしい」というような問い合わせはいくつか来ました。

といってもすごく魅力的なオファーはありませんでした。例えば、巨額の投資の申し出や買収提案、有名企業からのリクルートなどはありません。

スパム的なメッセージは一時的に増えるので不快です。通知が鳴るとなにかいい連絡かと期待してしまうので、余計に気分が滅入ります。

### その他

- Twitterのフォロワーが20人くらい増えた
- 有名サイトからのリンクによってドメインが強化された
- プロフィールに「Product Huntで2位を獲った」と書けるようになった

## 収益は？

みなさんが気になると思うのはやっぱり収益です。

Reaktrは最初は無料サービスとしてリリースしましたが、約3ヶ月後に有料プランを実装しました。月額$4または$9でエクスポート上限を増やせるようにしました。

5月に有料プランを実装してから今月サービスをクローズするまでの半年の合計は **約$74** でした。しかし、私自身が契約している分を除くと **$50** になります。

![Stripeの収益ダッシュボード](/images/posts/reaktr-stripe.png)

**有料ユーザーの合計は6人**でした。Reaktrの機能に満足されない方はすぐに退会してしまいましたが、長く（といっても数ヶ月ですが）購読してくれる人もいました。ちなみに無料ユーザーも含めると合計で518人がサインアップしてくれました。

## なぜクローズするのか？

ReaktrのDiscordコミュニティからの報告やSentryで確認できるエラーによると、動画をエクスポートできない不具合がそれなりの頻度で発生していることがわかっていました。

それだけなら修正すればいいのですが、問題は **それらの不具合が開発者（私）のマシン上では一切再現できない** ことでした。バグというものは（仮に原因がわからなくても）再現することさえできれば立ち向かいようがあります。しかし、**Reaktrは私の所有する全てのマシン（Windowsが2台とMacが1台）上では完璧に動いてしまう**のです。

この不安定さの理由はハッキリとしていませんが、おそらくは[WebCodecs](https://github.com/w3c/webcodecs)に起因しています。Reaktrはブラウザ上でHTML Canvasをコマ撮りしてエンコードするためにこのAPIを使っています。まだ新しい機能なので不安定なのではないかと考えていますが、私の実装ミスかもしれません。

ブラウザ上でエンコードしているのは、主にサーバー・ネットワークにかかるコストを下げたいからです。競合サービスの値段が高いのはこれが原因の一つではないかと思います。Reaktrはブラウザすなわちユーザーの端末のマシンパワーを使うのでコストがほとんどかかりません。しかしそれとトレードオフで安定性に欠けていたと言えます。

[ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)を使う方法もありますが、私の環境では非常に遅くて使えなさそうでした。また、ffmpegのライセンスが複雑でわかりにくいので法的な懸念もありました。

全てのユーザーが致命的なバグを経験するわけではないのでクローズするべきかは悩みましたが、有料プランを提供するうえで要求される品質を下回っており、改善の見込みがないと判断しました。

## まとめ

新しい技術は魅力的に見えますが、多くの難しさも抱えています。Web上の情報が限られているため実装に苦労しましたし、安定性を担保するのも難しいです（WebCodecsやChromeの実装が間違っていると言いたいのではありません）。

Reaktrのアイデア自体は悪くないと今でも思っていますし、マーケティングやプランを見直すことで収益を増やすことは可能なはずです。技術的な問題に遮られてしまい、約半年を無駄にしてしまうのは残念です。

もちろん解決策はあると思いますが、正直にいうと少し疲れてしまいました。資金もあまりないし、今から根本的なところを作り直すことを考えるとうんざりします。誰か助けてくれる人がいれば連絡をください。

## 次のプロジェクト

![Image of Saazy](/images/posts/saazy.png)

つい先日、[マーケティング用のNext.jsテンプレート](https://camome.sabigara.com)をリリースしました。これも[Product Huntに投稿](https://www.producthunt.com/posts/saazy-template)しましたが、47位に終わりました。このプロジェクトが上位を獲れるとは思っていなかったので気にしていませんが。

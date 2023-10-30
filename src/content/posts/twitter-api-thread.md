---
title: "Twitter API v2 でスレッド内のツイート一覧を取得する"
publishedAt: "2022-08-05"
---

https://twiyomi.vercel.app

上記アプリの機能として、Twitterのスレッド内のツイートをまとめて取得する要件があった。

要件は以下の通り。

1. ユーザーがスレッド内の任意のツイートURLを入力する
2. アプリが対象スレッドのツイート（リプライを除く）をすべて表示する

簡単そうだが、意外とめんどくさかったので方法をメモしておく。

## 試行1: `conversation_id`

### 方法

API docsやフォーラムの投稿によると、リプライによるツイートのグループは `conversation_id` によって管理されていることがわかる。

https://developer.twitter.com/en/docs/twitter-api/conversation-id

[Twitter Community](https://twittercommunity.com/t/twitter-api-v2-get-thread-tweets/152179)

今回のアプリの場合は、あくまで**スレッドの投稿者のツイートのみが対象**であり、他ユーザーのリプライなどは除く必要があった。

一応は以下のようなコードで要件は達成できる。（[`node-twitter-api-v2`](https://github.com/PLhery/node-twitter-api-v2) を使用）

```typescript
async function getThreadTweets(statusId: string) {
  const tweetRes = await twitter.singleTweet(statusId, {
    "tweet.fields": "author_id,conversation_id",
  });
  const searchRes = await twitter.search(
    `conversation_id:${tweetRes.data.conversation_id} from:${tweetRes.data.author_id} to:${tweetRes.data.author_id}`
  );
}
```

`fron:<author_id> to:<author_id>` をクエリ条件に加えることで、他ユーザーのリプライを除いて、投稿者自身のツイートのみを抽出できる。

### 問題点

APIに2回リクエストを投げるだけで実現できるので簡単に見えるが、実は落とし穴がある。

**Search APIは直近7日間のツイートしか取得できない**。この制限を乗り越えるには [Academic Research access](https://developer.twitter.com/en/products/twitter-api/academic-research) 権限が必要。今回のアプリは学術研究ではないのであきらめるしかない。

## 試行2: `referenced_tweets`

### 方法

[API docs](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id)によると各ツイートは `referenced_tweets` を持っている。

> A list of Tweets this Tweet refers to. For example, if the parent Tweet is a Retweet, a Retweet with comment (also known as Quoted Tweet) or a Reply, it will include the related Tweet referenced to by its parent.

そのツイートがリプライしているツイートを取得できるのであれば、 スレッドの最後からどんどん遡っていけば、全ツイートをたどれそうだ。

```typescript
export async function getThreadRecursive(
  statusId: string,
  results: TweetV2[] = []
) {
  const tweet = await twitter.singleTweet(statusId, {
    expansions: "referenced_tweets.id",
  });
  const previous = tweet.data.referenced_tweets?.find(
    (t) => t.type === "replied_to"
  );

  results.push(tweet.data);

  if (previous) {
    await getThreadRecursive(previous.id, results);
  }

  return results;
}
```

`regerenced_tweets.type` は `retweeted` , `quoted` , `replied_to` のいずれかなので、一応検証している。

リプライ先が本当に正しいのか、つまりスレッドの本流なのかは検証していないので、ここではユーザーの入力を信じるしかない。

### 問題点

- API リクエスト回数は試行1よりも格段に増える。
- 要件には「ユーザーがスレッド内の**任意の**ツイート URL を入力する」とあるが、この方法では**最後の**ツイートを入力しないと途中からになってしまう。
- もしかしたらスレッドが想定外の構造になっている場合があり、うまく遡れないかもしれない。

## まとめ

Academic Research accessがない以上、とりあえず試行２の方法を使うしかなさそう。

他に良いやり方があればぜひ教えてください。

## 宣伝

https://twiyomi.vercel.app

この記事の方法を使用して作ったサービスです。

スレッド形式で投稿されたマンガを見開きでイッキに読めるようにしました。よければ使ってみてください。

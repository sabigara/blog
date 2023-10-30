---
title: "select要素のアイコンを変更する方法"
publishedAt: "2023-01-16"
---

`select` 要素の見た目をCSSで変更する際、`appearance: none` でブラウザデフォルトのスタイルを削除してオリジナルのアイコン（矢印）を表示しようとしたが、そこまで自由度が高くないことがわかった。

カスタムアイコンの実装方法としてまず考えられるのは次の2通りだと思う:

- `select` 要素の隣に `svg` などを置く。
- `select::after` などの疑似要素を使う。

僕の場合、今回はあくまでも `select` を単独で使いたかったので前者は除外した。となると疑似要素だが、これはうまくいかなかったため、結局は3つ目の手段を使うことにした。

## 問題点: selectには疑似要素を設定できない

https://stackoverflow.com/questions/3532649/problem-with-select-and-after-with-css-in-webkit

上記のStackOverflowの回答にもあるように、 **`select::after` を指定してもブラウザに無視される。** Webkitで、ということだがFirefoxで試しても同様だった。

## 対応策: `background-image`

結局 `background-image` を設定することで対応した。

```css
select {
  background-image: url("data:image/svg+xml;base64,<base64-encoded-svg ... >");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1em 1em;
}
```

これだと**アイコンの色をCSSから変更できない**のであまりうれしくない。 `background-color` を変えればもちろん背景色に適用されてしまう。ダークテーマなどに対応する場合に問題になる場合があるかもしれないが、とりあえずは決め打ちにした。必要になればメディアクエリでアイコンを指定することもできるとはいえ、利便性は下がる。（[GitHubのPrimer CSSも同じようにbackground-imageにsvgをハードコーディングしている](https://github.com/primer/css/blob/5a612e6b73a7cfce1cd77684c4a03162285b92bb/src/forms/form-select.scss#L11)）

ちなみにアイコン単体であれば [`mask-image`](https://developer.mozilla.org/ja/docs/Web/CSS/mask-image) を使うことでURL指定されたアイコンの色を変え（ているように見せ）ることができるが、おそらく今回の用途には使えない。

## まとめ

[Open UIのSelect](https://open-ui.org/components/select) に期待したい。

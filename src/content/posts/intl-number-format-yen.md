---
title: Intl.NumberFormatの円記号がSafariだけ半角になる問題
publishedAt: "2022-08-22"
status: "published"
---

[`Intl.NumberFormat`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) を使うと、ライブラリを追加することなしに、数値をローカライズされたフォーマットに変換できる。

```typescript
function formatPrice(price: number): string {
  const intl = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
  return intl.format(price);
}

formatPrice(1000);
// -> ￥1,000
```

これは[ECMA Scriptに標準化](https://tc39.es/ecma402/#numberformat-objects)されており、またすでに各ランタイムで実装されているため、特に環境を気にせず使えるようになっている。

・・・はずだが、この機能を使っているページが、なぜかSafariで閲覧したときだけ[Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)を吐いてしまう問題にぶつかった。

```
Text content did not match. Server: "￥4,180" Client: "¥4,180"
```

最初何が違うのかわからなかったが、よく見ると円記号が全角か半角かの違いがある。Chromeで問題ないということは、SSRしているNode環境とChromeは全角で一致しているということだ。

検証してみると、主要ランタイムではSafariのみ半角を出力することがわかった。

| Chrome | Firefox | Safari | Node |
| ------ | ------- | ------ | ---- |
| 全角   | 全角    | 半角   | 全角 |

## 解決方法

半角の円記号を全角に `replace` すればOK。

```diff
function formatPrice(price: number): string {
  const intl = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  })
-  return intl.format(price)
+  return intl.format(price).replace(/^¥/, "￥");
}
```

`Intl.NumberFormat()` に渡すオプションで指定できないか調べてみたが、できなさそうに見えた。

Hydrationのエラーが出なければ見過ごしてしまいそうな差異だが、場合によってはそれほど小さくない問題を引き起こしそうな気もする。なんであれ、この辺の実装は統一してほしい。

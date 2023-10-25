---
title: "CSSで半透明な背景色を透けなくする"
date: "2023-01-30"
tags: ["design", "css"]
draft: false
---

ダークモード向けのCSSを書いていて気づいたが、一般的なカラーパレット（例えば[Tailwind](https://tailwindcss.com/docs/customizing-colors)）だと、一番黒に近い色を使っても微妙に目立ちすぎてしまう。

既存のフレームワークなどではどうやって対処しているのかと調べてみたが、例えば[Tailwind](https://tailwindcss.com/)のヘッダー右のタグのような微妙な背景色は `rgba(56, 189, 248, 0.1)` のようにアルファチャンネルを付加して半透明にしてあるし、他にも [Mantine](https://mantine.dev/core/button/#variants) の `light` バリアントの背景色も同じように半透明だった。

![Tailwind、ダークモード、薄い背景色のタグ](public/static/images/blog/tailwind-tag.png)

[MUI Joy](https://mui.com/joy-ui/react-button/) の `soft` バリアントはシェードの一番暗い色を使用している。シンプルなのはいいのだが、これはちょっと暗すぎるようにも見える。

![MUI Joyのボタン、softバリアント](public/static/images/blog/mui-joy-button.png)

半透明にすることでいい感じにはなったので、この方法を採用することにした。しかし問題点としては**要素同士を重ねると透けてしまう**（当たり前すぎるのだが）。

![複数のAvatarコンポーネントが重ねっていて、背景が透けている](public/static/images/blog/alpha-avatar-group.png)

## 解決方法

### `linear-gradient` を使う

ダークモードであれば背景色の黒を `--background` に設定し、その上にソリッドな塗りつぶしとして `linear-gradient` を適用することで想定通りの効果を生むことができた。

```scss
// foregroundは半透明
.avatar {
  background: var(--background) linear-gradient(var(--foreground) 0 100%);
}
```

### chroma.jsを使う

[chroma.jsの `mix`](https://gka.github.io/chroma.js/#chroma-mix) 関数を使うことで、上記のようなハックをせずに色を作れる。ただ次のコード例の結果は「 `background` に 透明度 0.2の `foreground` を乗せる」処理の結果とはちょっと違うように見えるが、細かいことは気にしないことにする。別の関数やオプションを使うべきなのかもしれない。

```ts
// foregroundは半透明でない
chroma.mix(background, foreground, 0.2).hex()
```

### Sassを使う

検証はしていないが、多分Sassの関数などでも実現できると思う。今回のプロジェクトではJavaScriptでCSS変数を生成しているのでSassは対象外だった。

## 結論

ランタイムで `--foreground` を切り替える必要があるなら前者を使うしかない（CSSオンリーなら）が、基本的には後者で作ってしまったほうが取り回しやすいと思う。

というより、そもそもデザインシステム内の中核を占めるような色（Mantineの `light` の背景色など）として使用されるなら、それは基本のカラーパレットに中に定義されているべきだとは思う。なぜライトテーマでは `color.primary.0` で済ませられるものがダークテーマではカバーされないのだろうか？

そもそも今回の例のような微妙な色彩をシェードでカバーしようというのが無理なのかもしれない。[Material Design 3](https://m3.material.io/)ではSurfaceやStateを半透明なオーバーレイとして定義していて、これは現実的な解決策にも見える。

https://m3.material.io/styles/color/the-color-system/color-roles#color-system-color-roles-27

これは例えばボタンにマウスホバーしたときの色を `button-bg-hover` などと逐一定義するのが正しいのか？という問に対するひとつの答えだと思う。本当に求められているのは「ホバー時に背景色をこの色にする」ではなく「背景色を○○%暗くする」のような関数的な挙動であって、つまり背景色を変えたらホバー時に適用される色も勝手に変わってほしいのだ。

となると前者のオプションもそれなりに理にかなっているというか、むしろ望ましいようにも思えてくる・・・。

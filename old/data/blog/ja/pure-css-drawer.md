---
title: "CSSのみ（JavaScriptなし）でハンバーガーメニューを実装する"
date: "2022-09-01"
tags: ["indiehacking", "css", "ui"]
draft: false
layout: PostLayout
---

最近開発しているプロジェクトで、JavaScriptを使わずにハンバーガーメニューを実装したい場面があった。いろいろ試してみたところ、最低限は実現できたのでここにメモしておく。

ただし、hackyというか無理矢理感があったり、アクセシビリティを担保するのが難しかったりするので、JavaScriptを使えるなら使ったほうがいい。このあたりの問題点は後述する。

:::info
[5 UI components you can build without JavaScript](/blog/pure-css-components?__locale=en)（英語）も参照してほしい。
:::

## CodeSandbox

<iframe src="https://codesandbox.io/embed/pure-css-drawer-96bqxy?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FHeader.tsx&theme=dark"
     title="Pure CSS Drawer"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     width="100%"
     height="500"
   ></iframe>

## 仕様

### スクリーンの幅に余裕がある場合

ハンバーガーメニューではなく、下図のように普通のナビゲーションとして表示する。

![ナビゲーションが表示されている](/static/images/blog/drawer-disabled.png)

### スクリーンの幅が一定以上狭い場合

ナビゲーションを非表示にして、ハンバーガーメニューを開くためのボタンを表示する。

![ハンバーガーメニューを開くボタンが表示されている](/static/images/blog/drawer-enabled.png)

クリックしたら右から滑ってくる。

![ハンバーガーメニューが開いている](/static/images/blog/drawer-open.png)

### 閉じるボタンで閉じる

当然閉じてほしい。

### オーバーレイのクリックで閉じる

できればメニューの範囲外、すなわち黒の半透明のオーバーレイをクリックしたときも閉じてほしい。

## htmlの構造

「JavaScriptを使わない」とか言っておきながらいきなりReactのコードを出してしまうが、Nextのエクスポート機能でhtml + cssに書き出すことを前提としている。stateを使用していないのでただのhtmlと同等と考えてもらいたい。

```typescript
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <input type="checkbox" id="drawer" className={styles.input} />
      <label htmlFor="drawer" className={styles.drawerButton} role="button" />
      <label htmlFor="drawer" className={styles.overlay} role="button" />
      <nav className={styles.nav}>
        <ul className={styles.navLinkList}>
          <li>
            <a href="#" className={styles.navLink}>
              Product
            </a>
          </li>
          // more links
        </ul>
      </nav>
    </header>
  )
}
```

`header` と `nav` を組み合わせたごくありきたりなヘッダーだが、不自然な `input` と `label` が挟まっている。JavaScriptが使えないため、今回は `input[type="checkbox"]` をメニューの開閉のスイッチとして利用する。 `label` の `htmlFor` をチェックボックスに向けることで、これらの要素の操作でON/OFFを切り替えることができる。

## メディアクエリ

スクリーン幅によって挙動を変えるためのメディアクエリを `@mixin` として定義しておく。

```scss
$breakpoints: (
  "sm": 576px,
  "md": 768px,
  "lg": 992px,
  "xl": 1200px,
);

@mixin mq($size) {
  @media screen and (max-width: #{map-get($breakpoints, $size)}) {
    @content;
  }
}
```

## ナビゲーションを非表示にする

`translate: 100%` でスクリーン右側の非表示領域にピッタリつけておく。

```scss
.nav {
  display: flex;
  column-gap: var(--space-2);
  place-self: center;
  transition-duration: var(--transition-duration-slow);
  transition-property: translate;

  @include mq("md") {
    position: absolute;
    flex-direction: column;
    align-items: flex-end;
    row-gap: var(--space-8);
    top: 0;
    right: 0;
    height: 100vh;
    min-width: 16rem;
    max-width: 100vw;
    padding-top: var(--space-20);
    padding-right: var(--space-2);
    translate: 100%;
    background-color: white;
    z-index: 999;
  }
}
```

## `input` と `label` を重ねて表示

「`label` をクリックすることでチェックボックスをON/OFFできる」と書いたが、実はこれにはアクセシビリティ上の問題がある。

**`label` はタブでフォーカスできるのだが、スペースを押しても `input` の値は変更できない**（Mac, Chromeで検証）。詳しくは以下の記事を参照してほしい。

https://qiita.com/Garyuten/items/b87b7d91279c0bded576

しょうがないので、以下のように `input` と `label` の位置を重ね合わせることで対応した。これはこれで何か別の問題がありそうにも思える。

```scss
@mixin drawerButtonShape {
  display: none;

  @include mq("md") {
    display: grid;
    place-items: center;
    position: absolute;
    top: 50%;
    right: var(--space-4);
    transform: translateY(-50%);
    width: var(--sizes-10);
    height: var(--sizes-10);
    border-radius: var(--radii-md);
    z-index: 9999;
  }
}

.input {
  @include drawerButtonShape();
  appearance: none; // ブラウザのスタイリングを除去
}

// label
.drawerButton {
  @include drawerButtonShape();
}
```

## `input:checked` にスタイルを当てる

後は以下のように、メニューが開いたときのスタイルを `:checked` 擬似クラスに記述すれば完成する。

```scss
.input {
  @include mq("md") {
    &:checked {
      // メニューをスライド
      & ~ .nav {
        translate: 0;
      }
      // 閉じるアイコンに変更
      & ~ .drawerButton {
        background-image: url("/url/to/close/icon.svg");
      }
      // オーバーレイを表示
      & ~ .overlay {
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
    }
  }
}
```

## 課題

### メニューが非表示のときもタブでフォーカスされてしまう

この実装ではメニューをスクリーンの範囲外に隠しているだけなので、タブを押せばメニュー内のリンクなどにフォーカスが当たってしまう。

これは `display: none` にすることで避けられるが、そうすると（この実装では）スライドのアニメーションが上手く動かない。

### そのフォーカス・スクロールなどの諸問題

ハンバーガーメニューは一種のモーダルなので、他のモーダル系UIと同様に諸々の問題を抱えている。

https://ics.media/entry/220620/

このあたりはJavaScriptを使わなければ解決できなさそうなので、今回は諦めるしかない。

## まとめ

アクセシビリティも含めて完璧とはいかなかったが、cssだけでもそれっぽいUIを作ることができて楽しかった。

使えるならまともなモーダル系ライブラリを使いましょう。

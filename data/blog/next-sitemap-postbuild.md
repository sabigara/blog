---
title: "next-sitemapがビルドしてくれないと思ったらpnpmが原因だった"
date: "2022-08-19"
tags: ["個人開発", "nextjs"]
draft: false
layout: PostLayout
---

https://github.com/iamvishnusankar/next-sitemap

個人開発サービスのsitemapを生成しようとして `next-sitemap` を導入したが、READMEに書いてあるとおりに設定しても動かなかった。

ビルドログを見ていても `postbuild` が完全に無視されているらしかった。

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
}

export default config
```

```json
// package.json
{
  "build": "next build",
  "postbuild": "next-sitemap"
}
```

## 問題点

### `pnpm` が `postbuild` を実行しない

そもそも `postbuild` を（非明示的に）実行しているのは誰だろうか、と思ってVercelのドキュメントを検索したがそんな用語は見当たらない。

となるとパッケージマネージャーかなと思って調べるとやっぱり `pnpm` が問題だった。

https://github.com/pnpm/pnpm/issues/2891

単純に `next build` の後に実行するだけでいい。

```json
{
  "build": "next build && next-sitemap"
}
```

### `next-sitemap.config.js` をesmで読めない

もう一つ問題があった。

https://github.com/iamvishnusankar/next-sitemap/issues/404

issueにも上がっているが、このconfigをesmで読むには `package.json` を `type: "module"` にしないといけないらしい。

ただ何か問題が起こりそうなので、これだけのために設定を変更したくない。むしろconfigの方をCommonJSにしたかったのでそうした。

```javascript
export default config
```

```javascript
module.exports = config
```

---
title: "GitHub Actions上でpnpmをキャッシュする"
date: "2023-01-23"
tags: ["pnpm"]
draft: false
---

GitHub Actionsで実行する `pnpm install` の時間を短縮するためにキャッシュしようとしたが、公式情報でも複数の方法が掲載されているので少し迷った。

## pnpm GitHub Action

pnpm公式のActionには複雑なWorkflowファイルが書いてある。

https://github.com/pnpm/action-setup#use-cache-to-reduce-installation-time

```yml
- name: Get pnpm store directory
  id: pnpm-cache
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
- uses: actions/cache@v3
  name: Setup pnpm cache
  with:
    path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-
```

## pnpm 本体 & setup-node

しかしpnpm本体や setup-node のドキュメントにはもっとシンプルな設定が載っている。

https://pnpm.io/continuous-integration#github-actions

https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data

```yml
- uses: pnpm/action-setup@v2
  with:
  version: 7
- name: Use Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v3
  with:
    node-version: ${{ matrix.node-version }}
    cache: "pnpm"
- name: Install dependencies
  run: pnpm install
```

## 結論

pnpm 本体 & setup-node のドキュメントに載っている設定で正常にキャッシュされているようなのでこちらを使えばいいと思う。

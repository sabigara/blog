---
title: "How to support admonition (or callout) in Markdown"
date: "2022-11-28"
tags: []
draft: false
layout: PostLayout
---

Sometimes you may want to emphasize that command is destructive or note additional information in your blog or docs like this:

:::info
This is a info `Admonition`. Markdown syntax _is_ **supported**.
:::

:::danger
This is a danger `Admonition`. Markdown syntax _is_ **supported**.
:::

But this is not included in standard Markdown or GitHub Flavored Markdown. In this post, I will show you how to support this feature and notation with `remark` plugins.

:::warn
I assume you've already set up a static site generator that supports MDX by unified pipeline.
:::

## Remark plugins

### Support notation

We'd like to add this custom notation for admonition:

```
:::info
Laboris dolore aliquip laboris irure.
:::
```

Fortunately, we don't have to write any code as there is [remark-directive](https://github.com/remarkjs/remark-directive) that does exactly what we need.

```bash
yarn add remark-directive
```

And add it to your own `unified` pipeline.

```ts
import remarkDirective from "remark-directive"
import remarkAdmonition from "./remarkAdmonitions" // We'll implement this next

const remarkPlugins = [remarkDirective, remarkAdmonition]
```

### Convert to `mdxJsxFlowElement`

But `remark-directive` doesn't do everything we need for displaying admonitions. To convert the block into an MDX component, define the following plugin:

```ts
import { visit } from "unist-util-visit"

export default function remarkAdmonition() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (!["info", "warn", "danger"].includes(node.name)) return
        // Store node.name before overwritten with "Alert".
        const status = node.name

        const data = node.data || (node.data = {})
        const tagName = node.type === "textDirective" ? "span" : "div"

        node.type = "mdxJsxFlowElement"
        node.name = "Admonition"
        node.attributes = [{ type: "mdxJsxAttribute", name: "status", value: status }]
      }
    })
  }
}
```

:::info
Note that the node's name is `Admonition`. We'll have to add a custom MDX component that has the same name.
:::

## React component and styles

Then we need a React component that accepts the `status` property. This value comes from any of `:::info`, `:::warn` or `:::danger`.

```tsx
import { HiInformationCircle, HiExclamationTriangle } from "react-icons/hi2"
import clsx from "clsx"
import React from "react"

import styles from "./styles.module.scss"

type SvgComponent = React.ComponentType<React.ComponentProps<"svg">>
type Status = "info" | "danger" | "warn"

type Props = {
  status?: Status
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

const statusIconMap: { [S in Status]: SvgComponent } = {
  info: HiInformationCircle,
  danger: HiExclamationTriangle,
  warn: HiExclamationTriangle,
}

export default function Message({ status = "info", children, className }: Props) {
  const Icon = statusIconMap[status]
  const statusClass = styles[`--${status}`]
  return (
    <aside className={clsx(styles.Block, statusClass, className)}>
      <div>
        <Icon className={clsx(styles.icon, statusClass)} />
      </div>
      <div className={styles.text}>
        {children && <div className={styles.message}>{children}</div>}
      </div>
    </aside>
  )
}
```

```scss
$infoColor: #3182ce;
$warnColor: #e6a700;
$dangerColor: #e53e3e;

.Block {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  padding: 1rem;
  @apply rounded-lg border border-l-4 border-gray-200 bg-white;

  &.--info {
    border-left-color: $infoColor;
  }
  &.--warn {
    border-left-color: $warnColor;
  }
  &.--danger {
    border-left-color: $dangerColor;
  }
}

.text {
  display: grid;
  row-gap: 0.25rem;
}

.title {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  font-weight: var(--camome-font-weight-bold);
  font-size: var(--camome-font-size-lg);

  &.--info {
    color: $infoColor;
  }
  &.--warn {
    color: $warnColor;
  }
  &.--danger {
    color: $dangerColor;
  }
}

.message {
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
}

.icon {
  width: 1.75rem;
  height: 1.75rem;

  &.--info {
    color: $infoColor;
  }
  &.--warn {
    color: $warnColor;
  }
  &.--danger {
    color: $dangerColor;
  }
}
```

## Pass it as a custom component

Now, register it as a custom component otherwise MDX complains that you've forgotten to import it!

```tsx
import { MDXProvider } from "@mdx-js/react"
import Admonition from "@/components/Admonition"

const components = {
  Admonition,
}

export default function Post(props) {
  return (
    <MDXProvider components={components}>
      <main {...props} />
    </MDXProvider>
  )
}
```

:::warn
Exact code could be different if you're using [mdx-bundler](https://github.com/kentcdodds/mdx-bundler), [Contentlayer](https://www.contentlayer.dev/), or anything else. But there should be a similar API for adding components.
:::

## That's all

You can add another type like `:::note` or anything, and style the component as you want.

Thank you for reading!

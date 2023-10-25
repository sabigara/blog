---
title: "How to change the marker of select"
date: "2023-01-16"
tags: ["html"]
draft: false
---

The appearance of the `select` element cannot be changed with CSS's `appearance: none` to show the custom icon (arrow) and remove the browser's default styles. Two common methods for implementing custom icons are:

- placing an `svg` element next to the `select` element
- using a pseudo-element such as `select::after`.

In this case, the first method was not an option because I wanted to use `select` element alone. After some experiments, it turned out that the pseudo-element method does not work so I switched to a third method.

## Problem: Unable to set pseudo-elements on select

https://stackoverflow.com/questions/3532649/problem-with-select-and-after-with-css-in-webkit

As stated in the above StackOverflow answer, specifying `select::after` is ignored by the browser. It is said to only work on Webkit, but even on Firefox it doesn't work.

## Solution: Use `background-image`

```css
select {
  background-image: url("data:image/svg+xml;base64,<base64-encoded-svg ... >");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1em 1em;
}
```

Setting an SVG to `background-image` just works. However, this does not allow changing the color of the icon through CSS, which is not ideal. `background-color` is, of course, applied to the background of the whole select element. This inability could be a problem when trying to support dark themes, but I chose this solution. [Primer CSS is also Hardcoding an SVG in the `background-image`](https://github.com/primer/css/blob/5a612e6b73a7cfce1cd77684c4a03162285b92bb/src/forms/form-select.scss#L11).

By the way, while `mask-image` can be used to change the color of a specified icon, it is likely not applicable for this specific use case.

## Conclusion

I hope something like [Open UI's Select component](https://open-ui.org/components/select/) will be available in the future.

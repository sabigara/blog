---
title: "Implement FormControl to ensure form accessibility in React"
date: "2022-12-23"
tags: ["react", "accessibility"]
draft: false
---

Forms are an important part of website and app development. They are critical elements in terms of UX and accessibility because they are the parts that users actually interact with. Poorly designed forms are not only annoying for everyone, but if they are not properly marked up, they may also hinder the use of [assistive technologies](https://www.atia.org/home/at-resources/what-is-at/).

However, the implementation of a user-friendly form is complex, and if it includes validation by JavaScript, it can be burdensome for developers. In this article, I would like to introduce the implementation of a React component called `FormControl` that help us appropriately markup the form fields.

:::info
The implementation in this article is largely based on [MUI - FormControl](https://github.com/mui/material-ui/blob/648e121e65d03beac54e6ccae3ea34fa3159e206/packages/mui-joy/src/FormControl/FormControl.tsx#L63).
:::

## Usage

If you want to use all options:

```tsx
return (
  <FormControl labelText="Name" helperText="Tell us your name" error="Something is wrong">
    <TextInput required placeholder="John Doe" />
  </FormControl>
)
```

The following is the output HTML. The `id` is automatically published within the component and is properly linked to the `label` element. In addition, aria attributes such as `aria-describedby` are also assigned.

```html
<div class="FormControl">
  <label for=":r1:" id=":r1:--label">Name</label>
  <div id=":r1:--helper-text">Tell us your name</div>
  <input
    id=":r1:"
    aria-describedby=":r1:--helper-text :r1:--error-text"
    aria-invalid="true"
    placeholder="John Doe"
  />
  <div id=":r1:--error-text">Something is wrong</div>
</div>
```

Here is a style example. We will not touch on CSS much in this article, but you can pass the `error` prop to add a class name, or use the `&:has([required])` selector to display an asterisk for required items as a pseudo-element.

![Erroneous text field labeled "Name", described "Tell us your name" and "Something is wrong"](/static/images/blog/form-control.png)

:::warn
Firefox doesn't support `:has()` yet.
:::

## Implementation method

### Approach

As a premise, it is required that the user input component can be flexibly passed to the `TextInput` part mentioned above. Not all form fields are `input`, so it should be loosely coupled.

This time, we will use the `Context` of React as an interface. `FormControl` will add appropriate markup to the user input element received as children, wrap it with `Context.Provider`, and pass data such as the automatically generated `id`. This allows the child element to consume the data by calling `useContext`.

### Define Context

Let's define `FormControlContextValue` as follows:

```tsx
import React from "react"

export type FormControlContextValue = {
  id: string | undefined
  labelId: string | undefined
  helperTextId: string | undefined
  errorTextId: string | undefined
  isError: boolean | string
}

export const FormControlContext = React.createContext<FormControlContextValue>({
  id: undefined,
  labelId: undefined,
  helperTextId: undefined,
  errorTextId: undefined,
  isError: false,
})

export function useFormControlContext() {
  return React.useContext(FormControlContext)
}
```

### Implement FormControl

We generate a single `id` to pass to the input element using [`React.useId`](https://beta.reactjs.org/apis/react/useId) and add a suffix to other IDs. Other than being surrounded by `FormControlContext.Provider`, nothing is special.

```tsx
import React from "react"

import { FormControlContext } from "./FormControlContext"

export type FormControlProps = {
  labelText: string
  helperText?: string
  error?: boolean | string
  children: React.ReactNode
}

export function FormControl({
  labelText,
  helperText: helperText,
  error = false,
  children,
}: FormControlProps) {
  const id = React.useId()
  const labelId = `${id}--label`
  const helperTextId = `${id}--helper-text`
  const errorTextId = `${id}--error-text`
  const ctxValue = {
    id,
    labelId,
    helperTextId,
    errorTextId,
    isError: !!error,
  }

  return (
    <FormControlContext.Provider value={ctxValue}>
      <div>
        <label htmlFor={id} id={labelId}>
          {labelText}
        </label>
        {helperText && <span id={helperText}>{helperText}</span>}
        {children}
        {typeof error === "string" && <span id={errorTextId}>{error}</span>}
      </div>
    </FormControlContext.Provider>
  )
}
```

### Implement Input

We will first implement the generic `Input` component, rather than the `TextInput` component in the first example. By calling `useFormControlContext()`, you can use the values provided by the enclosing `FormControl`.

- [`aria-describedby` can specify multiple IDs separated by spaces](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby#benefits_and_drawbacks), so we pass both supplementary explanatory text and error messages.
- `isError` passed to `aria-invalid` becomes `true` when `error` is specified with a truthy value (true or a non-empty string). You can style erroneous state with CSS selectors like `input[aria-invalid="true"]`.

```tsx
import React from "react"

import { useFormControlContext } from "../FormControl/useFormControlContext"

type Props = JSX.IntrinsicElements["input"]

export const Input = React.forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const { id, helperTextId, errorTextId, isError } = useFormControlContext()
  return (
    <input
      id={id}
      aria-describedby={[helperTextId || "", errorTextId || ""].join(" ")}
      aria-invalid={isError}
      ref={forwardedRef}
      {...props}
    />
  )
})

Input.displayName = "Input"
```

:::warn
In this implementation, extra spaces are added to `aria-describedby`, so it may be better to do some filtering.
:::

### Extend Input

You can use the `Input` component as is, or create extended components such as `TextInput` or `Checkbox` by specifying the `type`. It should be easy to integrate with external libraries by passing them `id`.

## Other considerations

### What if nested?

Since [`useContext` refers to the value of the nearest Provider](https://beta.reactjs.org/apis/react/useContext#usage), there is no problem even if `FormControl` is nested. Therefore, it can be used as follows.

```tsx
export function RadioGroup({ children }: RadioGroupProps) {
  const { labelId } = useFormControlContext()
  return (
    <div role="radiogroup" aria-labeledby={labelId}>
      {children}
    </div>
  )
}
```

```tsx
return (
  <FormControl labelText="PPAP">
    <RadioGroup>
      <FormControl labelText="Pen">
        <Input type="radio" name="ppap" value="pen" />
      </FormControl>
      <FormControl labelText="Pineapple">
        <Input type="radio" name="ppap" value="pineapple" />
      </FormControl>
      <FormControl labelText="Apple">
        <Input type="radio" name="ppap" value="apple" />
      </FormControl>
    </RadioGroup>
  </FormControl>
)
```

### Is it bad idea to enclose `input` by `label`?

Although it is certainly convenient to eliminate the management of IDs by putting `input` inside `label`, I think it is better to link with `htmlFor` if you want to support `aria-describedby` and behavior when nested. If those are not needed, it is also fine to simply surround it.

### What are the other implementation methods besides Context?

It may be convenient to also support render props.

```tsx
export type FormControlProps = {
  {...},
  children:
    | React.ReactNode
    | ((props: FormControlContextValue) => React.ReactNode);
};

function FormControl() {
  {...}
  return (
    {...}
    {typeof children === "function" ? children(ctxValue) : children}
    {...}
  )
}

function Component() {
  return (
    <FormControl labelText={labelText}>
      {({ id, helperTextId }) => (
        <input id={id} aria-describedby={helperTextId} />
      )}
    </FormControl>
  )
}
```

## TODO

I think the `FormControl` implementation we did this time can solve most markup problems, but there are still things left to do such as styling and validation.

### Styling

Not all labels and supplementary text will be displayed in the same place or appearance. For example, you should probably place radio buttons horizontally with the label. The appearance of `FormControl` should be able to be flexibly set from the outside.

### Validation

Since `FormControl` does not do anything more than helping markup, I think it is quite compatible with [React Hook Form](https://react-hook-form.com/). If you want to add client-side behavior, it is probably easier to separate responsibilities by overlaying it as a higher layer (rather than modifying `FormControl`).

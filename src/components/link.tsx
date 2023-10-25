import type { LinkProps as NextLinkProps } from "next/link";
import { default as NextLink } from "next/link";
import { forwardRef } from "react";

type Props<T extends string> = NextLinkProps<T> &
  Omit<JSX.IntrinsicElements["a"], "href" | "ref">;

//  forwardRef にジェネリックコンポーネントを渡すことができないので型アサーションを行う
export const Link = forwardRef<HTMLAnchorElement, Props<string>>(
  ({ href, ...props }, ref) => {
    return <NextLink href={href} ref={ref} {...props} />;
  }
) as (<T extends string>(props: Props<T>) => JSX.Element) & {
  displayName: string;
};

Link.displayName = "Link";

import type { LinkProps as NextLinkProps } from "next/link";
import { default as NextLink } from "next/link";
import { forwardRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

type Props<T extends string> = NextLinkProps<T> &
  Omit<JSX.IntrinsicElements["a"], "href" | "ref"> & {
    external?: boolean;
    externalClassName?: string;
  };

//  forwardRef にジェネリックコンポーネントを渡すことができないので型アサーションを行う
export const Link = forwardRef<HTMLAnchorElement, Props<string>>(
  ({ href, children, external = false, externalClassName, ...props }, ref) => {
    const externalProps = {
      target: "_blank",
      rel: "noopener noreferrer",
    } as const;
    return (
      <NextLink
        href={href}
        ref={ref}
        {...(external ? externalProps : {})}
        {...props}
      >
        {children}
        {external && (
          <FiArrowUpRight
            className={twMerge(
              "text-gray-400 inline mx-[0.1em]",
              externalClassName,
            )}
            size="1.3em"
            strokeWidth={1.75}
          />
        )}
      </NextLink>
    );
  },
) as (<T extends string>(props: Props<T>) => JSX.Element) & {
  displayName: string;
};

Link.displayName = "Link";

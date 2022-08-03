/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from "clsx"
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"

export default function ArticleLink({
  href,
  children,
  className,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  if (children !== href) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className={clsx("no-underline transition-colors", className)}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <iframe
        src={`/embed/${encodeURIComponent(href)}`}
        title={`${href}への埋め込みリンク`}
        className="h-32 w-full"
      />
      <a target="_blank" rel="noopener noreferrer" href={href} className="hidden">
        {children}
      </a>
    </>
  )
}

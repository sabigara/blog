/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

type Props = {
  noExternalIcon?: boolean
}

const CustomLink = ({
  href,
  noExternalIcon = false,
  className,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & Props) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className={clsx('no-underline transition-colors', className)} {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      data-no-external-icon={noExternalIcon}
      className={clsx('no-underline transition-colors', className)}
      {...rest}
    />
  )
}

export default CustomLink

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

type Props = {
  noExternalIcon?: boolean
}

const CustomLink = ({
  href,
  noExternalIcon = false,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & Props) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
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
      className="no-underline"
      {...rest}
    />
  )
}

export default CustomLink

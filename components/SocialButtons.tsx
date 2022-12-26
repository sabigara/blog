import { FaTwitter, FaFacebook } from "react-icons/fa"
import { SiHatenabookmark } from "react-icons/si"
import React from "react"
import siteMetadata from "@/data/siteMetadata"
import clsx from "clsx"
import { IconBaseProps } from "react-icons"

type Props = {
  url?: string
  text?: string
  className?: string
}

export default function SocialButtons({ url = siteMetadata.siteUrl, text = "", className }: Props) {
  return (
    <aside className={clsx("flex", className)}>
      <ShareButton
        Icon={FaTwitter}
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        aria-label="Twitterでシェア"
      />
      <ShareButton
        Icon={SiHatenabookmark}
        href={`https://b.hatena.ne.jp/entry/panel/?url=${url}`}
        aria-label="はてブでシェア"
      />
      <ShareButton
        Icon={FaFacebook}
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        aria-label="Facebookでシェア"
      />
    </aside>
  )
}

type ButtonProps = {
  Icon: (props: IconBaseProps) => React.ReactElement
  href: string
}

function ShareButton({ Icon, href }: ButtonProps) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="rounded-ful group grid h-8 w-8 place-content-center"
      data-no-external-icon
    >
      <Icon className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-800" />
    </a>
  )
}

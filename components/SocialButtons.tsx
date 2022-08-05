import { FaTwitter, FaFacebook } from "react-icons/fa"
import { SiHatenabookmark } from "react-icons/si"
import React from "react"
import siteMetadata from "@/data/siteMetadata"
import clsx from "clsx"
import { IconBaseProps } from "react-icons"

type Props = {
  url?: string
  className?: string
}

export default function SocialButtons({ url = siteMetadata.siteUrl, className }: Props) {
  return (
    <aside className={clsx("flex", className)}>
      <ShareButton
        Icon={FaTwitter}
        href={`https://twitter.com/intent/tweet?url=${url}`}
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
      className="group grid h-12 w-12 place-content-center rounded-full transition-colors duration-300 hover:bg-primary-100"
      data-no-external-icon
    >
      <Icon className="h-6 w-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-800" />
    </a>
  )
}

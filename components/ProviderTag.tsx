import clsx from "clsx"

interface Props {
  href: string
  className?: string
}

const ProviderTag = ({ href, className }: Props) => {
  const isRelative = href.startsWith("/")
  const src = isRelative
    ? "/static/favicons/favicon-32x32.png"
    : `https://www.google.com/s2/favicons?sz=32&domain_url=${href}`
  return (
    <div
      className={clsx([
        "flex items-center gap-2 text-xs font-semibold text-gray-800 transition-colors ",
        className,
      ])}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="ファビコン" width="16" height="16" className="inline" />
      <span>{isRelative ? "rubiq.vercel.app" : new URL(href).hostname}</span>
    </div>
  )
}

export default ProviderTag

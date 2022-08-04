import { faviconUrl } from "@/lib/site-metadata/faviconUrl"
import clsx from "clsx"

interface Props {
  provider: "zenn.dev" | "rubiq.vercel.app"
  className?: string
}

const ProviderTag = ({ provider, className }: Props) => {
  const url = `https://${provider}`
  return (
    <div
      className={clsx([
        "flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors ",
        className,
      ])}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={faviconUrl(url)} alt="ファビコン" width="16" height="16" className="inline" />
      <span>{provider}</span>
    </div>
  )
}

export default ProviderTag

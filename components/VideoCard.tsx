import React from "react"
import Image from "next/image"
import Link from "@/components/Link"

type Props = {
  title: string
  href: string
  thumbnail: string
}

export default function VideoCard({ title, href, thumbnail }: Props) {
  return (
    <div>
      <a href={href} className="relative block aspect-video overflow-hidden rounded-md">
        <Image
          src={thumbnail}
          alt={`Thumbnail of video: ${title}`}
          layout="fill"
          className="object-cover"
        />
      </a>
      <Link href={href} className="mt-2 block text-sm font-medium leading-5 text-primary-600">
        {title}
      </Link>
    </div>
  )
}

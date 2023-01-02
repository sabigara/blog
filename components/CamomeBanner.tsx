import Image from "@/components/Image"
import Link from "@/components/Link"
import CamomePng from "@/public/static/images/camome.png"

const href = "https://camome.net" as const

export default function CamomeBanner() {
  return (
    <aside className="mx-auto grid max-w-2xl grid-cols-1 gap-4 rounded-lg border border-gray-100 p-2 shadow-md sm:grid-cols-[30%,_1fr]">
      <a href={href} target="_blank" rel="noreferrer">
        <Image
          src={CamomePng}
          alt="Logo of Camome UI above the grid of components"
          className="rounded-md border-blue-500"
        />
      </a>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">Get beautiful UI kits from Camome</h3>
        <p className="text-gray-400">Versatile UI templates and components made by me.</p>
        <Link
          href={href}
          className="mt-3 inline-flex h-8 w-fit items-center rounded-md bg-blue-50  px-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100 hover:no-underline"
        >
          See UI kits
        </Link>
      </div>
    </aside>
  )
}

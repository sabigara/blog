import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 bg-slate-100 py-2 text-gray-500">
      <div>
        <Link href="/privacy" className="text-xs hover:text-gray-900 hover:underline">
          Privacy policy
        </Link>
      </div>
      <small className="text-xs">
        Copyright © {new Date().getFullYear()} Matsura Yuma. All rights reserved.
      </small>
    </footer>
  )
}

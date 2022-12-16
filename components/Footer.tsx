export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 bg-gray-100 py-2 text-gray-500">
      <small className="text-xs">
        Copyright © {new Date().getFullYear()} Matsura Yuma. All rights reserved.
      </small>
    </footer>
  )
}

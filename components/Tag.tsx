import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"
import clsx from "clsx"

interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className={clsx(
        className,
        "mr-3 rounded-full border border-primary-100 bg-primary-50 px-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-100 dark:border-primary-500 dark:bg-primary-500 dark:text-gray-200 dark:hover:bg-primary-400"
      )}
    >
      {text.split(" ").join("-")}
    </Link>
  )
}

export default Tag

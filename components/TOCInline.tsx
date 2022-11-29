import clsx from "clsx"
import { Toc } from "types"
import styles from "./TOCInline.module.scss"

interface TOCInlineProps {
  toc: Toc
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  exclude = "",
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp("^(" + exclude.join("|") + ")$", "i")
    : new RegExp("^(" + exclude + ")$", "i")

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul className="m-0 flex flex-col gap-[0.2rem]">
      {filteredToc.map((heading) => (
        <li key={heading.value} className={`${heading.depth >= indentDepth && "ml-5"}`}>
          <a href={heading.url} className="text-sm text-gray-600 hover:text-black hover:underline">
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <details open className="select-none overflow-hidden rounded-lg border border-gray-200">
      <summary
        className={clsx(
          styles.summary,
          "bg-gray-100 py-2 px-3 font-bold transition-colors hover:cursor-pointer"
        )}
      >
        Table of contents
      </summary>
      <aside className="border-t p-4">{tocList}</aside>
    </details>
  )
}

export default TOCInline

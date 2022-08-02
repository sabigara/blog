import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 rounded-full border border-primary-100 bg-primary-50 px-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100 dark:border-primary-500 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag

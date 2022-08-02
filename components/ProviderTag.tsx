import clsx from 'clsx'

interface Props {
  text: string
  provider: 'zenn' | 'blog'
  className?: string
}

const ProviderTag = ({ text, provider, className }: Props) => {
  return (
    <div
      className={clsx([
        'mr-3 inline rounded-md border  px-3 py-1 text-sm font-semibold text-white transition-colors ',
        provider === 'zenn' ? 'border-blue-400 bg-blue-500' : 'border-orange-400 bg-orange-500',
        className,
      ])}
    >
      {text.split(' ').join('-')}
    </div>
  )
}

export default ProviderTag

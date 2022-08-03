import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  flex flex-col overflow-hidden rounded-xl border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`} noExternalIcon>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-200">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} noExternalIcon>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="w-fit text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Visit
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card

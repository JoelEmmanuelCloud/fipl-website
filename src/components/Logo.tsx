import Link from 'next/link'
import Image from 'next/image'

interface Props {
  width?: number
  height?: number
  className?: string
  invert?: boolean
}

export function Logo({ width = 80, height = 37, className = '', invert = false }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center select-none group ${className}`}
      aria-label="FIPL — First Independent Power Limited"
    >
      <Image
        src="/images/sustainability/logoimage.png"
        alt="FIPL"
        width={80}
        height={37}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          opacity: 1,
          transform: 'rotate(0deg)',
          filter: invert ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter 0.3s',
        }}
        className="group-hover:opacity-80 transition-opacity"
        priority
      />
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'

interface Props {
  height?: number
  className?: string
  invert?: boolean
}

export function Logo({ height = 40, className = '', invert = false }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center select-none group ${className}`}
      aria-label="FIPL — First Independent Power Limited"
    >
      <Image
        src="/images/sustainability/logoimage.png"
        alt="FIPL"
        width={104}
        height={48}
        style={{
          height: `${height}px`,
          width: 'auto',
          filter: invert ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter 0.3s',
        }}
        className="group-hover:opacity-80 transition-opacity"
        priority
      />
    </Link>
  )
}

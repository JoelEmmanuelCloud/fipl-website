'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function SectionImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 p-4">
        <svg
          viewBox="0 0 56 56"
          className="w-12 h-12 opacity-30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="52" height="52" rx="6" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M2 38 L16 26 L26 34 L36 24 L54 38"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-medium text-center leading-snug max-w-[160px] opacity-50">
          {alt}
        </span>
      </div>

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

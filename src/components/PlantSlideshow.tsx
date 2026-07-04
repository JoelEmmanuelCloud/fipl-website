'use client'

import { useEffect, useState } from 'react'

interface PlantSlideshowProps {
  images: readonly string[]
  imageLeft: boolean
}

export function PlantSlideshow({ images, imageLeft }: PlantSlideshowProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1s ease' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${src}')`,
              clipPath: imageLeft
                ? 'polygon(0 0, 90% 0, 78% 50%, 0 50%)'
                : 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${src}')`,
              clipPath: imageLeft
                ? 'polygon(0 50%, 89% 50%, 78% 100%, 0 100%)'
                : 'polygon(11% 50%, 100% 50%, 100% 100%, 22% 100%)',
            }}
          />
        </div>
      ))}
      {images.length > 1 && (
        <div
          className={`absolute bottom-3 z-[2] flex items-center gap-1.5 ${imageLeft ? 'left-4' : 'right-4'}`}
        >
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrent(i)
              }}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '14px',
                background: i === current ? '#DB1B0C' : 'rgba(255,255,255,0.6)',
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

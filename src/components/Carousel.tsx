'use client'

import { useState, useEffect, useCallback } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
}

export function Carousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), 5000)
    return () => clearInterval(id)
  }, [current, goTo])

  return (
    <div>
      <div className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden">
        <span className="absolute top-4 left-6 text-[80px] text-primary/10 font-serif leading-none select-none">
          &ldquo;
        </span>
        <p className="text-[15px] text-gray-600 leading-relaxed italic mb-6">
          &ldquo;{testimonials[current].quote}&rdquo;
        </p>
        <div>
          <div className="font-bold text-gray-800">{testimonials[current].name}</div>
          <div className="text-sm text-gray-400">{testimonials[current].role}</div>
        </div>
      </div>

      {total > 1 && (
        <div className="bg-white rounded-2xl px-8 py-5 shadow-md mt-3 opacity-50">
          <div className="font-bold text-sm text-gray-700">{testimonials[(current + 1) % total].name}</div>
          <div className="text-xs text-gray-400">{testimonials[(current + 1) % total].role}</div>
        </div>
      )}

      <div className="flex gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  )
}

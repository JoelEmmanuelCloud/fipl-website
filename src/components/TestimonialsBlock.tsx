'use client'

import { useState, useEffect, useCallback } from 'react'
import { Reveal } from '@/components/Reveal'

interface Testimonial {
  quote: string
  name: string
  role: string
}


export function TestimonialsBlock({ testimonials, heading = 'What Our Employees\nSay About Us.' }: { testimonials: Testimonial[]; heading?: string }) {
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
    <section className="py-12 md:py-16 lg:py-20 bg-[#f8f8f8]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal variant="left">
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-4">Testimonials <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" /></svg></span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-6">
                {heading.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <div className="flex gap-4 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-4 h-4 rounded-full transition-colors ${i === current ? 'bg-[#DB1B0C]' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden">
                <span className="absolute top-4 left-6 text-[80px] text-[#DB1B0C]/10 font-serif leading-none select-none">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

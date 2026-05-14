'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Accordion } from '@/components/Accordion'

interface FaqItem {
  question: string
  answer: React.ReactNode
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="pt-2 md:pt-4 pb-40 bolt-watermark-left"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="max-w-[1280px] mx-auto px-24">
        <div
          className="bg-[#EFEFEF] rounded-2xl px-5 md:px-6 pt-20 md:pt-24 pb-5 md:pb-6"
          style={{ height: '340px' }}
        >
          <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[320px_480px] gap-6 lg:gap-10 items-start justify-center">

            {/* left — slides in from the left */}
            <div
              style={{
                transform: visible ? 'translateX(0)' : 'translateX(-60px)',
                opacity: visible ? 1 : 0,
                transition: 'transform 0.7s ease, opacity 0.7s ease',
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                FAQ{' '}
                <svg viewBox="0 0 24 24" width="10" height="10" fill="#E03027" style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
                  <path d="M13 2L4.5 13.5H11L10 22l9.5-11.5H13L14 2z" />
                </svg>
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-3">
                Do You Have<br />Questions?
              </h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Have questions about who we are, what we do, or how we operate? Our Frequently
                Asked Questions provide clear answers to help you better understand FIPL&apos;s
                services, processes, and commitment to powering progress.
              </p>
            </div>

            {/* right — slides in from the right */}
            <div
              style={{
                transform: visible ? 'translateX(0)' : 'translateX(60px)',
                opacity: visible ? 1 : 0,
                transition: 'transform 0.7s ease 0.15s, opacity 0.7s ease 0.15s',
              }}
            >
              <Accordion items={items} variant="red" defaultOpen={null} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

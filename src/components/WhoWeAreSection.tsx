'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { HomeContent } from '@/lib/database.types'

interface Props {
  content: HomeContent['whoWeAre']
}

export function WhoWeAreSection({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const headingLines = content.heading.split('\n')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-[var(--fipl-bg)] pt-4 pb-16 md:pb-24 bolt-watermark overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div
            className="relative"
            style={{
              paddingTop: '18px',
              paddingLeft: '18px',
              transform: visible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease',
            }}
          >
            <div
              className="absolute top-0 left-0 rounded-xl"
              style={{
                width: '88%',
                height: '88%',
                border: '2px solid #F47820',
                backgroundColor: 'transparent',
              }}
            />
            <div className="relative h-[300px] md:h-[340px] lg:h-[380px] rounded-xl overflow-hidden">
              <Image
                src={content.image}
                alt="FIPL workers inside a power plant"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </div>

          <div
            style={{
              transform: visible ? 'translateX(0)' : 'translateX(80px)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
              {content.eyebrow}
            </p>
            <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[var(--fipl-heading)] leading-snug mb-3">
              {headingLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
            <p
              className="mb-3"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '22px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: 'var(--fipl-body)',
              }}
            >
              {content.body1}
            </p>
            <p
              className="mb-3"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: 'var(--fipl-body)',
              }}
            >
              {content.body2}
            </p>
            <p
              className="mb-5"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: 'var(--fipl-body)',
              }}
            >
              {content.body3}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-[12px] px-4 py-2 rounded-md transition-colors"
            >
              {content.ctaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

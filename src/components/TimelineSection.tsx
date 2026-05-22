'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/Reveal'

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const milestones = [
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Received our first major award, marking a reputation for excellence in tailored business solutions.',
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity.',
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all facilities.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Launched comprehensive digital transformation initiatives across all FIPL facilities.',
  },
]

const LINE_TRANSITION = 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)'

function TimelineLine({ mobile = false }: { mobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const inner = (
    <div
      ref={ref}
      className="w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #F47820, #DB1B0C)',
        transformOrigin: 'top center',
        transform: drawn ? 'scaleY(1)' : 'scaleY(0)',
        transition: LINE_TRANSITION,
      }}
    />
  )

  if (mobile) {
    return (
      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 overflow-hidden">
        {inner}
      </div>
    )
  }

  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] overflow-hidden">
      {inner}
    </div>
  )
}

function MilestoneCard({ item }: { item: typeof milestones[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [displayYear, setDisplayYear] = useState(item.year)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const target = parseInt(item.year, 10)
    const startValue = target - 28

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 700
          const startTime = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayYear(String(Math.round(startValue + (target - startValue) * eased)))
            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setDisplayYear(item.year)
            }
          }

          requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [item.year])

  return (
    <div
      ref={cardRef}
      style={{ border: '1.6px solid #DB1B0C', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}
      className="transition-shadow duration-300 hover:shadow-lg"
    >
      <div style={{ background: 'white', padding: '14px 20px 12px' }}>
        <span style={{
          color: '#DB1B0C',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          fontVariantNumeric: 'tabular-nums',
          display: 'inline-block',
          minWidth: '4ch',
        }}>
          {displayYear}
        </span>
      </div>
      <div style={{ background: '#DB1B0C', padding: '16px 20px 20px', textAlign: 'center' }}>
        <div style={{ color: 'white', fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
          {item.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12.5, lineHeight: 1.6 }}>
          {item.desc}
        </div>
      </div>
    </div>
  )
}

export function TimelineSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DB1B0C] mb-3">
              Our Journey <BoltIcon />
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              A Legacy of Power &amp; Progress
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              From our founding to today, FIPL has consistently evolved to meet Nigeria&apos;s growing energy
              needs while maintaining our commitment to excellence and innovation.
            </p>
          </div>
        </Reveal>

        <div className="relative hidden md:block">
          <TimelineLine />
          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <Reveal key={item.year} variant={isLeft ? 'left' : 'right'} delay={i * 0.08}>
                <div className="grid grid-cols-[1fr_48px_1fr] items-center py-5">
                  <div className="pr-10">
                    {isLeft && <MilestoneCard item={item} />}
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      className="relative z-10 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                      style={{ border: '2.5px solid #DB1B0C' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#DB1B0C]" />
                    </div>
                  </div>
                  <div className="pl-10">
                    {!isLeft && <MilestoneCard item={item} />}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="relative md:hidden">
          <TimelineLine mobile />
          <div className="space-y-6">
            {milestones.map((item, i) => (
              <Reveal key={item.year} variant="right" delay={i * 0.06}>
                <div className="flex gap-5 items-start">
                  <div
                    className="shrink-0 relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center mt-2"
                    style={{ border: '2.5px solid #DB1B0C' }}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#DB1B0C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <MilestoneCard item={item} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

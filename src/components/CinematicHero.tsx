'use client'

import { Fragment, useEffect, useState, ReactNode } from 'react'

export function HeroWords({
  text,
  startIdx = 0,
  ready,
  className = '',
}: {
  text: string
  startIdx?: number
  ready: boolean
  className?: string
}) {
  const words = text.split(' ')
  return (
    <span style={{ display: 'block' }} className={className}>
      {words.map((w, i) => (
        <Fragment key={w + i}>
          <span className="hero-word-wrap">
            <span
              className={`hero-word ${ready ? 'hero-word-animate' : ''}`}
              style={{ animationDelay: `${(startIdx + i) * 0.14}s` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}

interface CinematicHeroProps {
  image: string
  renderContent: (ready: boolean) => ReactNode
  minHeight?: string
  contentAlign?: 'center' | 'start' | 'end'
  overlay?: string
}

const DEFAULT_OVERLAY =
  'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.72) 100%)'

export function CinematicHero({
  image,
  renderContent,
  minHeight = 'min-h-[360px] md:min-h-[460px] lg:min-h-[520px]',
  contentAlign = 'center',
  overlay,
}: CinematicHeroProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  const alignClass =
    contentAlign === 'end' ? 'items-end' : contentAlign === 'start' ? 'items-start' : 'items-center'

  return (
    <section className={`relative overflow-hidden ${minHeight}`}>
      <div
        className="absolute inset-0 hero-kb"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.68) contrast(1.08) saturate(0.78)',
        }}
      />
      <div className="absolute inset-0 z-[2]" style={{ background: overlay ?? DEFAULT_OVERLAY }} />
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-black z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-black z-[3]" />
      <div className={`relative z-[4] flex ${minHeight} ${alignClass}`}>
        {renderContent(ready)}
      </div>
    </section>
  )
}

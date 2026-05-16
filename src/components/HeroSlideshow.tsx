'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { isSplashDone, SPLASH_EVENT } from '@/lib/splashState'

const DURATION = 7000

interface Slide {
  type: 'video' | 'image'
  src: string
  poster?: string
  line1: string[]
  line2: string[]
}

const SLIDES: Slide[] = [
  {
    type: 'video',
    src: '/videos/hero.mp4',
    poster: '/images/home/backgroundimage.png',
    line1: ['Committed', 'to'],
    line2: ['Efficient', 'Power', 'Generation'],
  },
  {
    type: 'image',
    src: '/images/hero/FIPL6305.jpg',
    line1: ['Engineering'],
    line2: ["Nigeria's", 'Energy', 'Future'],
  },
  {
    type: 'image',
    src: '/images/hero/FIPL6318.jpg',
    line1: ['Our', 'People'],
    line2: ['Power', 'the', 'Nation'],
  },
]

// ── Text block — remounts on every slide change so animations replay ──
function SlideText({ slide }: { slide: Slide }) {
  const allLen = slide.line1.length + slide.line2.length

  const word = (text: string, idx: number) => (
    <span className="hero-word-wrap">
      <span
        className="hero-word hero-word-animate"
        style={{ animationDelay: `${idx * 0.14}s` }}
      >
        {text}
      </span>
    </span>
  )

  return (
    <div>
      <h1
        className="text-white text-center"
        style={{
          fontFamily: 'Arial',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 44px)',
          lineHeight: 1.25,
        }}
      >
        <span style={{ display: 'block' }}>
          {slide.line1.map((w, i) => (
            <Fragment key={w + i}>
              {word(w, i)}
              {i < slide.line1.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
        <span style={{ display: 'block' }}>
          {slide.line2.map((w, i) => (
            <Fragment key={w + i}>
              {word(w, slide.line1.length + i)}
              {i < slide.line2.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      </h1>

      {/* Scan line re-animates from mount every slide */}
      <div key={allLen} className="hero-scan-line" />
    </div>
  )
}

// ── Main slideshow ──
export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [textReady, setTextReady] = useState(false)
  const [textKey, setTextKey] = useState(0)
  const [progKey, setProgKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // Wait for splash before showing first text
  useEffect(() => {
    if (isSplashDone()) {
      const t = setTimeout(() => setTextReady(true), 200)
      return () => clearTimeout(t)
    }
    const handler = () => setTextReady(true)
    window.addEventListener(SPLASH_EVENT, handler)
    return () => window.removeEventListener(SPLASH_EVENT, handler)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!textReady) return
    timerRef.current = setTimeout(() => advance(), DURATION)
    return () => clearTimeout(timerRef.current)
  }, [current, textReady])

  const advance = (idx?: number) => {
    clearTimeout(timerRef.current)
    setCurrent(idx !== undefined ? idx : (c) => (c + 1) % SLIDES.length)
    setTextKey((k) => k + 1)
    setProgKey((k) => k + 1)
  }

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s ease',
            zIndex: i === current ? 1 : 0,
          }}
        >
          {slide.type === 'video' ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay muted loop playsInline
              poster={slide.poster}
              style={{ filter: 'brightness(0.78) contrast(1.08) saturate(0.75)' }}
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 hero-kb"
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.68) contrast(1.08) saturate(0.78)',
              }}
            />
          )}
        </div>
      ))}

      {/* ── Cinematic overlay — dark top & bottom, open middle ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ── Letterbox bars ── */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-black z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-black z-[3]" />

      {/* ── Slide progress bar (inside bottom bar) ── */}
      {textReady && (
        <div
          key={progKey}
          className="absolute bottom-0 left-0 h-[6px] z-[4] hero-slide-progress"
        />
      )}

      {/* ── Text ── */}
      {textReady && (
        <div className="absolute inset-0 z-[5] flex items-end justify-center text-center px-4 pb-[260px] md:pb-[280px] lg:pb-[320px]">
          <SlideText key={textKey} slide={SLIDES[current]} />
        </div>
      )}

      {/* ── Navigation dots ── */}
      <div className="absolute bottom-5 left-0 right-0 z-[5] flex justify-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-400 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#F47820' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

    </div>
  )
}

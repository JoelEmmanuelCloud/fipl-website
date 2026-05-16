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

// ── Chevron arrow SVG ──
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

// ── Text block — remounts each slide change so animation replays ──
function SlideText({ slide }: { slide: Slide }) {
  const word = (text: string, idx: number) => (
    <span className="hero-word-wrap">
      <span className="hero-word hero-word-animate" style={{ animationDelay: `${idx * 0.14}s` }}>
        {text}
      </span>
    </span>
  )
  const allLen = slide.line1.length + slide.line2.length

  return (
    <div>
      <h1
        className="text-white text-center"
        style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.25 }}
      >
        <span style={{ display: 'block' }}>
          {slide.line1.map((w, i) => (
            <Fragment key={w + i}>
              {word(w, i)}{i < slide.line1.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
        <span style={{ display: 'block' }}>
          {slide.line2.map((w, i) => (
            <Fragment key={w + i}>
              {word(w, slide.line1.length + i)}{i < slide.line2.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      </h1>
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

  useEffect(() => {
    if (isSplashDone()) {
      const t = setTimeout(() => setTextReady(true), 200)
      return () => clearTimeout(t)
    }
    const handler = () => setTextReady(true)
    window.addEventListener(SPLASH_EVENT, handler)
    return () => window.removeEventListener(SPLASH_EVENT, handler)
  }, [])

  useEffect(() => {
    if (!textReady) return
    timerRef.current = setTimeout(() => goTo((current + 1) % SLIDES.length), DURATION)
    return () => clearTimeout(timerRef.current)
  }, [current, textReady])

  const goTo = (idx: number) => {
    clearTimeout(timerRef.current)
    setCurrent(idx)
    setTextKey((k) => k + 1)
    setProgKey((k) => k + 1)
  }

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((current + 1) % SLIDES.length)

  const arrowCls =
    'absolute top-1/2 -translate-y-1/2 z-[6] flex items-center justify-center ' +
    'w-10 h-10 rounded-full text-white transition-all duration-200 ' +
    'bg-white/10 border border-white/20 backdrop-blur-sm ' +
    'hover:bg-white/25 hover:scale-110 active:scale-95'

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: 1 }}
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

      {/* ── Cinematic overlay ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ── Letterbox bars ── */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-black z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-black z-[3]" />

      {/* ── Prev arrow ── */}
      <button className={`${arrowCls} left-5`} onClick={prev} aria-label="Previous slide">
        <ChevronLeft />
      </button>

      {/* ── Next arrow ── */}
      <button className={`${arrowCls} right-5`} onClick={next} aria-label="Next slide">
        <ChevronRight />
      </button>

      {/* ── Text ── */}
      {textReady && (
        <div className="absolute inset-0 z-[5] flex items-end justify-center text-center px-4 pb-[280px] md:pb-[300px] lg:pb-[340px]">
          <SlideText key={textKey} slide={SLIDES[current]} />
        </div>
      )}

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-4 left-0 right-0 z-[5] flex items-center justify-between px-6">

        {/* Slide counter */}
        <span
          className="text-white/70 tabular-nums select-none"
          style={{ fontFamily: 'Arial', fontSize: '12px', letterSpacing: '0.12em' }}
        >
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>

        {/* Progress lines — one per slide */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? '52px' : '20px', background: 'rgba(255,255,255,0.25)' }}
            >
              {/* Completed slides — fully filled */}
              {i < current && (
                <span className="absolute inset-0 bg-white" />
              )}
              {/* Active slide — fills over DURATION */}
              {i === current && textReady && (
                <span
                  key={progKey}
                  className="absolute inset-y-0 left-0 bg-white hero-slide-progress-line"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right spacer (keeps counter/lines layout balanced) */}
        <span className="w-[40px]" />
      </div>

    </div>
  )
}

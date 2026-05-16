'use client'

import { useEffect, useState } from 'react'
import { isSplashDone, SPLASH_EVENT } from '@/lib/splashState'

const LINE1 = ['Committed', 'to']
const LINE2 = ['Efficient', 'Power', 'Generation']

export function HeroHeadline() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // SPA navigation back to home — splash already completed this session
    if (isSplashDone()) {
      const t = setTimeout(() => setReady(true), 200)
      return () => clearTimeout(t)
    }

    // First load — wait for splash curtain to finish
    const handler = () => setReady(true)
    window.addEventListener(SPLASH_EVENT, handler)
    return () => window.removeEventListener(SPLASH_EVENT, handler)
  }, [])

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
        {/* Line 1 */}
        <span style={{ display: 'block' }}>
          {LINE1.map((word, i) => (
            <span key={word} className="hero-word-wrap">
              <span
                className={`hero-word${ready ? ' hero-word-animate' : ''}`}
                style={{ animationDelay: ready ? `${i * 0.14}s` : undefined }}
              >
                {word}
              </span>
              {' '}
            </span>
          ))}
        </span>

        {/* Line 2 */}
        <span style={{ display: 'block' }}>
          {LINE2.map((word, i) => (
            <span key={word} className="hero-word-wrap">
              <span
                className={`hero-word${ready ? ' hero-word-animate' : ''}`}
                style={{ animationDelay: ready ? `${(LINE1.length + i) * 0.14}s` : undefined }}
              >
                {word}
              </span>
              {i < LINE2.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      </h1>

      {ready && <div className="hero-scan-line" />}
    </div>
  )
}


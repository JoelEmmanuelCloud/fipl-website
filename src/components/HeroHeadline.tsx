'use client'

import { Fragment, useEffect, useState } from 'react'
import { isSplashDone, SPLASH_EVENT } from '@/lib/splashState'

const LINE1 = ['Committed', 'to']
const LINE2 = ['Efficient', 'Power', 'Generation']

export function HeroHeadline() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isSplashDone()) {
      const t = setTimeout(() => setReady(true), 200)
      return () => clearTimeout(t)
    }
    const handler = () => setReady(true)
    window.addEventListener(SPLASH_EVENT, handler)
    return () => window.removeEventListener(SPLASH_EVENT, handler)
  }, [])

  const wordSpan = (word: string, delay: number) => (
    <span className="hero-word-wrap">
      <span
        className={`hero-word${ready ? ' hero-word-animate' : ''}`}
        style={{ animationDelay: ready ? `${delay}s` : undefined }}
      >
        {word}
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
          {LINE1.map((word, i) => (
            <Fragment key={word}>
              {wordSpan(word, i * 0.14)}
              {i < LINE1.length - 1 && ' '}
            </Fragment>
          ))}
        </span>

        <span style={{ display: 'block' }}>
          {LINE2.map((word, i) => (
            <Fragment key={word}>
              {wordSpan(word, (LINE1.length + i) * 0.14)}
              {i < LINE2.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      </h1>

      {ready && <div className="hero-scan-line" />}
    </div>
  )
}

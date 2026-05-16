'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SplashScreen() {
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLifting(true), 3900)
    const t2 = setTimeout(() => setDone(true), 4700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (done) return null

  return (
    <div
      className="splash-root"
      style={{
        transform: lifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: lifting ? 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      <div className="splash-bolt-wrap" aria-hidden="true">
        <svg viewBox="0 0 200 320" className="splash-bolt">
          <path d="M130 10 L50 160 H110 L30 310 L190 140 H120 Z" fill="#F47820" />
        </svg>
      </div>

      <div className="splash-story">
        <p className="splash-line splash-line-1">
          Darkness is not<br />Nigeria&apos;s story.
        </p>
        <p className="splash-line splash-line-2">
          For over 25 years, we&apos;ve kept the lights on.
        </p>
        <p className="splash-line splash-line-3">
          541 megawatts &nbsp;·&nbsp; Delivered daily
        </p>

        <div className="splash-separator" aria-hidden="true" />

        <div className="splash-logo-wrap">
          <Image
            src="/images/sustainability/logoimage.png"
            alt="First Independent Power Limited"
            width={148}
            height={68}
            priority
          />
        </div>
      </div>

      <div className="splash-bar-track" aria-hidden="true">
        <div className="splash-bar-fill" />
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SplashScreen() {
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('splashSeen')) {
      setDone(true)
      return
    }
    const t1 = setTimeout(() => setLifting(true), 2900)
    const t2 = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem('splashSeen', '1')
    }, 3700)
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
      <div className="splash-bolt-wrap">
        <svg viewBox="0 0 200 320" className="splash-bolt" aria-hidden="true">
          <path d="M130 10 L50 160 H110 L30 310 L190 140 H120 Z" fill="#F47820" />
        </svg>
      </div>

      <div className="splash-rings" aria-hidden="true">
        <span className="splash-ring splash-ring-1" />
        <span className="splash-ring splash-ring-2" />
        <span className="splash-ring splash-ring-3" />
      </div>

      <div className="splash-content">
        <div className="splash-logo">
          <Image
            src="/images/sustainability/logoimage.png"
            alt="First Independent Power Limited"
            width={160}
            height={74}
            priority
          />
        </div>

        <div className="splash-divider" aria-hidden="true" />

        <p className="splash-tagline">Powering Nigeria&apos;s Future</p>
      </div>

      <div className="splash-bar-track" aria-hidden="true">
        <div className="splash-bar-fill" />
      </div>
    </div>
  )
}

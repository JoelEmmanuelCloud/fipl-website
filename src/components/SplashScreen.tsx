'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SplashScreen() {
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLifting(true), 3900)
    const t2 = setTimeout(() => setDone(true), 4800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (done) return null

  return (
    <div
      className="splash-root"
      style={{
        transform: lifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: lifting ? 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      <div className="splash-glow" aria-hidden="true" />

      <div className="splash-stage">
        <p className="splash-word splash-w1">RELIABLE.</p>
        <p className="splash-word splash-w2">SUSTAINABLE.</p>
        <p className="splash-word splash-w3">POWERFUL.</p>

        <div className="splash-brand-reveal">
          <div className="splash-brand-line" aria-hidden="true" />
          <div className="splash-brand-logo">
            <Image
              src="/images/sustainability/logoimage.png"
              alt="First Independent Power Limited"
              width={144}
              height={66}
              priority
            />
          </div>
          <p className="splash-brand-name">First Independent Power Limited</p>
        </div>
      </div>

      <div className="splash-bar-track" aria-hidden="true">
        <div className="splash-bar-fill" />
      </div>
    </div>
  )
}

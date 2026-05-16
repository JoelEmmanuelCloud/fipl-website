'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SplashGlobe } from '@/components/SplashGlobe'

export function SplashScreen() {
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLifting(true), 4500)
    const t2 = setTimeout(() => setDone(true), 5400)
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
      <div className="splash-globe-wrap" aria-hidden="true">
        <SplashGlobe />
      </div>

      <div className="splash-stage">

        {/* ── Cycling phase: small "WE ARE" label + three words ── */}
        <p className="splash-we-are-small">WE ARE</p>
        <div className="splash-word-slot">
          <p className="splash-word splash-w1">RELIABLE.</p>
          <p className="splash-word splash-w2">SUSTAINABLE.</p>
          <p className="splash-word splash-w3">POWERFUL.</p>
        </div>

        {/* ── Finale: big "WE ARE" + logo ── */}
        <div className="splash-finale">
          <p className="splash-we-are-big">WE ARE</p>
          <div className="splash-finale-bar" aria-hidden="true" />
          <div className="splash-finale-logo">
            <Image
              src="/images/sustainability/logoimage.png"
              alt="First Independent Power Limited"
              width={150}
              height={69}
              priority
            />
          </div>
          <p className="splash-finale-name">First Independent Power Limited</p>
        </div>

      </div>

      <div className="splash-bar-track" aria-hidden="true">
        <div className="splash-bar-fill" />
      </div>
    </div>
  )
}

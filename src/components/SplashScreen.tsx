'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const LAT_Y = [100, 200, 300, 400, 500]
const LON_X = Array.from({ length: 21 }, (_, i) => i * 60)

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
        <div className="splash-globe">
          <svg width="1200" height="600" className="splash-globe-svg" aria-hidden="true">
            {LAT_Y.map((y) => (
              <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="white" strokeWidth="0.5" opacity="0.5" />
            ))}
            {LON_X.map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="600" stroke="white" strokeWidth="0.5" opacity="0.5" />
            ))}
          </svg>
        </div>
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

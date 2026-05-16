'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const GLOBE_W = 1200
const GLOBE_H = 600
const LAT_Y = [100, 200, 300, 400, 500]
const LON_X = Array.from({ length: 21 }, (_, i) => i * 60)

export function SplashScreen() {
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLifting(true), 4300)
    const t2 = setTimeout(() => setDone(true), 5200)
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
          <svg
            width={GLOBE_W}
            height={GLOBE_H}
            className="splash-globe-svg"
            aria-hidden="true"
          >
            {LAT_Y.map((y) => (
              <line
                key={`lat-${y}`}
                x1="0" y1={y} x2={GLOBE_W} y2={y}
                stroke="white" strokeWidth="0.5" opacity="0.5"
              />
            ))}
            {LON_X.map((x) => (
              <line
                key={`lon-${x}`}
                x1={x} y1="0" x2={x} y2={GLOBE_H}
                stroke="white" strokeWidth="0.5" opacity="0.5"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="splash-stage">
        <p className="splash-we-are">WE ARE</p>

        <div className="splash-word-slot">
          <p className="splash-word splash-w1">RELIABLE.</p>
          <p className="splash-word splash-w2">SUSTAINABLE.</p>
          <p className="splash-word splash-w3">POWERFUL.</p>
        </div>

        <div className="splash-brand">
          <div className="splash-brand-bar" aria-hidden="true" />
          <div className="splash-brand-logo">
            <Image
              src="/images/sustainability/logoimage.png"
              alt="First Independent Power Limited"
              width={150}
              height={69}
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

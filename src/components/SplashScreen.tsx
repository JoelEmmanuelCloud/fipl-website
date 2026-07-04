'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { SplashGlobe } from '@/components/SplashGlobe'
import { markSplashDone, SPLASH_EVENT } from '@/lib/splashState'

export function SplashScreen() {
  const [textReady, setTextReady] = useState(false)
  const [lifting, setLifting] = useState(false)
  const [done, setDone] = useState(false)

  const handleGlobeReady = useCallback(() => {
    setTextReady(true)
  }, [])

  useEffect(() => {
    if (!textReady) return
    const t1 = setTimeout(() => setLifting(true), 4600)
    const t2 = setTimeout(() => {
      setDone(true)
      markSplashDone()
      window.dispatchEvent(new CustomEvent(SPLASH_EVENT))
    }, 4950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [textReady])

  if (done) return null

  return (
    <div
      className="splash-root"
      style={{
        transform: lifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: lifting ? 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      <div className="splash-globe-wrap" aria-hidden="true">
        <SplashGlobe onReady={handleGlobeReady} />
      </div>

      {textReady && (
        <>
          <div className="splash-stage">
            <p className="splash-we-constant">We</p>
            <div className="splash-word-slot">
              <p className="splash-word splash-w1">
                are a people of <span className="splash-accent">Value</span>
              </p>
              <p className="splash-word splash-w2">
                <span className="splash-accent">value</span> people
              </p>
              <p className="splash-word splash-w3">
                add <span className="splash-accent">value</span> to people
              </p>
            </div>

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
        </>
      )}
    </div>
  )
}

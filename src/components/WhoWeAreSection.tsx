'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IMAGES } from '@/lib/images'

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-white pt-4 pb-16 md:pb-24 bolt-watermark overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div
            className="relative"
            style={{
              paddingTop: '18px',
              paddingLeft: '18px',
              transform: visible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease',
            }}
          >
            <div
              className="absolute top-0 left-0 rounded-xl"
              style={{
                width: '88%',
                height: '88%',
                border: '2px solid #F47820',
                backgroundColor: 'transparent',
              }}
            />
            <div className="relative h-[300px] md:h-[340px] lg:h-[380px] rounded-xl overflow-hidden">
              <Image
                src={IMAGES.home.whoWeAre}
                alt="FIPL workers inside a power plant"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </div>

          <div
            style={{
              transform: visible ? 'translateX(0)' : 'translateX(80px)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
              Who We Are ⚡
            </p>
            <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-gray-900 leading-snug mb-3">
              A Trusted Energy Partner
              <br />
              Shaping Nigeria&apos;s Future.
            </h2>
            <p
              className="mb-3"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '22px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#6b7280',
              }}
            >
              First Independent Power Limited (FIPL) is a leader in responsible and sustainable
              power generation in Nigeria. Strategically located in Rivers State, we operate four
              cutting-edge gas turbine power plants in Trans-Amadi Port-Harcourt, Afam, Omoku, and
              Eleme, with a combined capacity of 541MW.
            </p>
            <p
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: '#6b7280',
                marginBottom: '8px',
              }}
            >
              FIPL operates four world-class thermal power plants Such as:
            </p>
            <div
              className="grid grid-cols-2 gap-x-6 sm:gap-x-12 lg:gap-x-24 gap-y-1 mb-5"
              style={{ width: 'fit-content' }}
            >
              {['Afam Plant', 'Omoku Plant', 'Trans-Amadi Plant', 'Eleme Plant'].map((plant) => (
                <div key={plant} className="flex items-center gap-1.5">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '16px',
                      height: '16px',
                      borderRadius: '0 8px 8px 0',
                      backgroundColor: '#E03027',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4 7L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[12px] text-gray-700 font-bold">{plant}</span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-[12px] px-4 py-2 rounded-md transition-colors"
            >
              Learn More About Us ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

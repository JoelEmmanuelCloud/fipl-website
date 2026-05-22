'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/Reveal'

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const milestones = [
  { year: '1998', title: 'Company Founded', desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape." },
  { year: '2001', title: 'Omoku Power Plant', desc: 'Commissioned the Omoku Power Plant with 150MW installed capacity, delivering reliable power to Rivers State.' },
  { year: '2005', title: 'Afam Power Plant', desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity to 180MW.' },
  { year: '2010', title: 'Trans Amadi Expansion', desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.' },
  { year: '2015', title: 'Eleme Integration', desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.' },
  { year: '2020', title: 'Sustainability Initiatives', desc: 'Launched comprehensive environmental and sustainability programs across all four facilities.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Advancing digital systems and smart grid integration across all power generation facilities.' },
]

const CW = 1280
const CH = 1000
const CARD_W = 220

const SNAKE = `M 170 320 C 170 230 360 210 540 210 L 860 210 C 1060 210 1120 280 1120 450 C 1120 620 1000 640 840 640 L 380 640 C 190 640 160 690 160 840 C 160 960 280 980 420 980 L 1000 980`

const LAYOUT = [
  { i: 0, nx: 170,  ny: 320,  cx: 10,   cy: 340,  large: true,  sx2: -1,   sy2: -1   },
  { i: 1, nx: 460,  ny: 210,  cx: 350,  cy: 10,   large: false, sx2: 460,  sy2: 195  },
  { i: 2, nx: 800,  ny: 210,  cx: 690,  cy: 10,   large: false, sx2: 800,  sy2: 195  },
  { i: 3, nx: 1120, ny: 450,  cx: 870,  cy: 340,  large: false, sx2: 1090, sy2: 450  },
  { i: 4, nx: 840,  ny: 640,  cx: 730,  cy: 660,  large: false, sx2: 840,  sy2: 660  },
  { i: 5, nx: 400,  ny: 640,  cx: 290,  cy: 660,  large: false, sx2: 400,  sy2: 660  },
  { i: 6, nx: 720,  ny: 980,  cx: 600,  cy: 760,  large: false, sx2: 720,  sy2: 945  },
]

function SnakeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pathLenRef = useRef(3400)
  const [offset, setOffset] = useState(3400)
  const [progress, setProgress] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      pathLenRef.current = len
      setOffset(len)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const len = pathLenRef.current
        const start = performance.now()
        const dur = 2800
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - t, 2)
          const p = eased
          setOffset(len * (1 - p))
          setProgress(p)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ width: CW, height: CH }}>
      <svg
        width={CW}
        height={CH}
        viewBox={`0 0 ${CW} ${CH}`}
        fill="none"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="snakeGrad" x1="0" y1="0" x2={CW} y2={CH} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97300" />
            <stop offset="100%" stopColor="#DB1B0C" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={SNAKE}
          stroke="url(#snakeGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLenRef.current}
          strokeDashoffset={offset}
        />

        {LAYOUT.map((n) =>
          n.sx2 >= 0 ? (
            <line
              key={`stem-${n.i}`}
              x1={n.nx} y1={n.ny}
              x2={n.sx2} y2={n.sy2}
              stroke="#DB1B0C"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity={progress > (n.i + 0.6) / 7 ? 1 : 0}
              style={{ transition: 'opacity 0.35s ease' }}
            />
          ) : null
        )}

        <circle
          cx={170} cy={320} r={36}
          fill="white"
          stroke="url(#snakeGrad)"
          strokeWidth="8"
          opacity={progress > 0.06 ? 1 : 0}
          style={{ transition: 'opacity 0.4s ease' }}
        />
        <circle
          cx={170} cy={320} r={12}
          fill="#DB1B0C"
          opacity={progress > 0.06 ? 1 : 0}
          style={{ transition: 'opacity 0.4s ease' }}
        />

        {LAYOUT.slice(1).map((n) => {
          const show = progress > (n.i + 0.4) / 7
          return (
            <g key={`node-${n.i}`} opacity={show ? 1 : 0} style={{ transition: 'opacity 0.35s ease' }}>
              <circle cx={n.nx} cy={n.ny} r={18} fill="white" stroke="#DB1B0C" strokeWidth="3.5" />
              <circle cx={n.nx} cy={n.ny} r={7} fill="#DB1B0C" />
            </g>
          )
        })}
      </svg>

      {LAYOUT.map((n) => {
        const m = milestones[n.i]
        const show = progress > (n.i + 0.5) / 7
        return (
          <div
            key={m.year}
            className="absolute"
            style={{
              left: n.cx,
              top: n.cy,
              width: CARD_W,
              border: '1.6px solid #DB1B0C',
              overflow: 'hidden',
              opacity: show ? 1 : 0,
              transform: `translateY(${show ? 0 : 10}px)`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <div style={{ background: 'white', padding: '12px 16px 10px' }}>
              <span style={{ color: '#DB1B0C', fontSize: 20, fontWeight: 700, display: 'block' }}>
                {m.year}
              </span>
            </div>
            <div style={{ background: '#DB1B0C', padding: '12px 16px 16px', textAlign: 'center' }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 8, lineHeight: 1.35 }}>
                {m.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 11.5, lineHeight: 1.6 }}>
                {m.desc}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TimelineSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DB1B0C] mb-3">
              Our Journey <BoltIcon />
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              A Legacy of Power &amp; Progress
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              From our founding to today, FIPL has consistently evolved to meet Nigeria&apos;s growing energy
              needs while maintaining our commitment to excellence and innovation.
            </p>
          </div>
        </Reveal>

        <div className="hidden lg:block overflow-x-auto">
          <SnakeTimeline />
        </div>

        <div className="lg:hidden relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #D97300, #DB1B0C)' }}
          />
          <div className="space-y-6 pl-14">
            {milestones.map((m, i) => (
              <Reveal key={m.year} variant="right" delay={i * 0.06}>
                <div
                  className="relative"
                  style={{ border: '1.6px solid #DB1B0C', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}
                >
                  <div
                    className="absolute -left-10 top-4 w-5 h-5 rounded-full bg-white flex items-center justify-center z-10"
                    style={{ border: '3px solid #DB1B0C' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#DB1B0C]" />
                  </div>
                  <div style={{ background: 'white', padding: '12px 16px 10px' }}>
                    <span style={{ color: '#DB1B0C', fontSize: 18, fontWeight: 700 }}>{m.year}</span>
                  </div>
                  <div style={{ background: '#DB1B0C', padding: '12px 16px 16px' }}>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{m.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

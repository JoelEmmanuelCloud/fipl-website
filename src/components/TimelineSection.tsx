'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { Power, Factory, TowerControl, Cpu, Leaf, Flame, GaugeCircle, Zap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

type Direction = 'top' | 'bottom' | 'left' | 'top-left'

interface Milestone {
  year: string
  title: string
  desc: string
  cardLeft: string
  cardTop: string
  dotLeft: string
  dotTop: string
  direction: Direction
  icon: ReactNode
}

const milestones: Milestone[] = [
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
    cardLeft: '6%', cardTop: '73%',
    dotLeft: '4.5%', dotTop: '56%',
    direction: 'left',
    icon: <Power className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Commissioned the Omoku Power Plant with 150MW installed capacity, delivering reliable power to Rivers State.',
    cardLeft: '36%', cardTop: '63%',
    dotLeft: '33%', dotTop: '50%',
    direction: 'bottom',
    icon: <Factory className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity to 180MW.',
    cardLeft: '20%', cardTop: '4%',
    dotLeft: '52%', dotTop: '18%',
    direction: 'top-left',
    icon: <TowerControl className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
    cardLeft: '66%', cardTop: '4%',
    dotLeft: '66%', dotTop: '18%',
    direction: 'top',
    icon: <GaugeCircle className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
    cardLeft: '56%', cardTop: '74%',
    dotLeft: '74%', dotTop: '63%',
    direction: 'left',
    icon: <Flame className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all four facilities.',
    cardLeft: '85%', cardTop: '68%',
    dotLeft: '86%', dotTop: '49%',
    direction: 'bottom',
    icon: <Cpu className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Advancing digital systems and smart grid integration across all power generation facilities.',
    cardLeft: '83%', cardTop: '10%',
    dotLeft: '93%', dotTop: '45%',
    direction: 'top',
    icon: <Leaf className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.5} />,
  },
]

const CH = 900
const SCALE = 0.72

const SVG_PATH = `M120 120 L120 620 Q120 700 200 700 L260 700 Q330 700 330 620 L330 500 Q330 420 410 420 L520 420 Q600 420 600 330 L600 210 Q600 140 670 140 L860 140 Q940 140 940 220 L940 510 Q940 610 1040 610 L1120 610 Q1200 610 1200 530 L1200 310 Q1200 220 1280 220 L1310 220`

function ZigZagTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pathLenRef = useRef(3000)
  const [offset, setOffset] = useState(3000)
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
          setOffset(len * (1 - eased))
          setProgress(eased)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: CH }}>
      <div className="absolute left-8 top-0 h-full w-24 bg-orange-100/40 skew-x-[-12deg] pointer-events-none" />

      <svg
        viewBox="0 0 1400 900"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="zigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DB1B0C" />
            <stop offset="100%" stopColor="#D97300" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={SVG_PATH}
          stroke="url(#zigGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={pathLenRef.current}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-lg"
        style={{
          left: 70, top: 70, width: 96, height: 96,
          border: '6px solid #D97300',
          opacity: progress > 0.02 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{ color: '#D97300', fontWeight: 900, fontSize: 26, fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>FIPL</span>
      </div>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-lg"
        style={{
          left: 75, top: 300, width: 80, height: 80,
          border: '6px solid #D97300',
          opacity: progress > 0.06 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '5px solid #DB1B0C', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 4, height: 16, background: '#DB1B0C', top: -10, borderRadius: 2 }} />
        </div>
      </div>

      {milestones.map((m, idx) => {
        const nodeShow = progress > (idx + 1.2) / 8
        return (
          <div
            key={`node-${m.year}`}
            className="absolute z-30 flex items-center justify-center rounded-full bg-white shadow-lg"
            style={{
              left: m.dotLeft, top: m.dotTop,
              width: 80, height: 80,
              border: '6px solid #D97300',
              opacity: nodeShow ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          >
            {m.icon}
          </div>
        )
      })}

      {milestones.map((m, idx) => {
        const cardShow = progress > (idx + 0.8) / 8
        return (
          <div
            key={`card-${m.year}`}
            className="absolute z-20"
            style={{
              left: m.cardLeft, top: m.cardTop,
              opacity: cardShow ? 1 : 0,
              transform: `translateY(${cardShow ? 0 : 10}px)`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <div
              className="w-[250px] overflow-hidden shadow-xl"
              style={{ border: '1.5px solid #DB1B0C', fontFamily: 'Arial, sans-serif' }}
            >
              <div style={{ background: 'white', padding: '10px 16px 8px' }}>
                <span style={{ color: '#DB1B0C', fontSize: 22, fontWeight: 700 }}>{m.year}</span>
              </div>
              <div style={{ background: '#DB1B0C', padding: '14px 16px 18px' }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 8, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.7 }}>{m.desc}</div>
              </div>
            </div>

            {m.direction === 'bottom' && (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 top-[-120px] h-[120px] w-[2px] bg-[#DB1B0C]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-[-126px] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'top' && (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-120px] h-[120px] w-[2px] bg-[#DB1B0C]" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-126px] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'left' && (
              <>
                <div className="absolute right-[-95px] top-1/2 -translate-y-1/2 w-[95px] h-[2px] bg-[#DB1B0C]" />
                <div className="absolute right-[-107px] top-[calc(50%-6px)] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'top-left' && (
              <>
                <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[140px] h-[2px] bg-[#DB1B0C]" />
                <div className="absolute right-[-152px] top-[calc(50%-6px)] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
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
              Our Journey <Zap size={14} />
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

        <div className="hidden lg:block overflow-hidden" style={{ height: Math.round(CH * SCALE) }}>
          <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left', width: '100%', height: CH }}>
            <ZigZagTimeline />
          </div>
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

'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { Power, Factory, TowerControl, Cpu, Leaf, Flame, GaugeCircle, Zap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

type Direction = 'top' | 'bottom' | 'left' | 'right'

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
    cardLeft: '6%', cardTop: '72%',
    dotLeft: '7%', dotTop: '50%',
    direction: 'top',
    icon: <Power className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Commissioned the Omoku Power Plant with 150MW installed capacity, delivering reliable power to Rivers State.',
    cardLeft: '35%', cardTop: '63%',
    dotLeft: '30%', dotTop: '50%',
    direction: 'top',
    icon: <Factory className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity to 180MW.',
    cardLeft: '18%', cardTop: '3%',
    dotLeft: '48%', dotTop: '17%',
    direction: 'bottom',
    icon: <TowerControl className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
    cardLeft: '64%', cardTop: '3%',
    dotLeft: '64%', dotTop: '17%',
    direction: 'bottom',
    icon: <GaugeCircle className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
    cardLeft: '55%', cardTop: '73%',
    dotLeft: '72%', dotTop: '63%',
    direction: 'left',
    icon: <Flame className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all four facilities.',
    cardLeft: '83%', cardTop: '68%',
    dotLeft: '84%', dotTop: '47%',
    direction: 'top',
    icon: <Cpu className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Advancing digital systems and smart grid integration across all power generation facilities.',
    cardLeft: '88%', cardTop: '13%',
    dotLeft: '95%', dotTop: '47%',
    direction: 'bottom',
    icon: <Leaf className="w-8 h-8 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
]

const CH = 950
const SCALE = 0.72

const SVG_PATH = `M 120 130 L 120 640 Q 120 730 210 730 L 270 730 Q 340 730 340 640 L 340 530 Q 340 450 430 450 L 520 450 Q 620 450 620 330 L 620 220 Q 620 140 700 140 L 900 140 Q 980 140 980 220 L 980 560 Q 980 640 1060 640 L 1130 640 Q 1220 640 1220 560 L 1220 340 Q 1220 250 1310 250 L 1400 250`

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
      <div className="absolute left-[40px] top-[-80px] w-[120px] h-[1200px] bg-orange-100/70 rotate-[10deg] pointer-events-none" />

      <svg
        viewBox="0 0 1600 950"
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
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLenRef.current}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-xl"
        style={{
          left: 60, top: 70, width: 110, height: 110,
          border: '7px solid #D97300',
          opacity: progress > 0.02 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{ color: '#D97300', fontWeight: 900, fontSize: 28, fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>FIPL</span>
      </div>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-xl"
        style={{
          left: 62, top: 290, width: 86, height: 86,
          border: '7px solid #D97300',
          opacity: progress > 0.06 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Power className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.5} />
      </div>

      {milestones.map((m, idx) => {
        const nodeShow = progress > (idx + 1.2) / 8
        return (
          <div
            key={`node-${m.year}`}
            className="absolute z-30 flex items-center justify-center rounded-full bg-white shadow-xl"
            style={{
              left: m.dotLeft, top: m.dotTop,
              width: 86, height: 86,
              border: '7px solid #D97300',
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
              className="w-[280px] rounded-lg overflow-hidden shadow-2xl"
              style={{ border: '1px solid #DB1B0C', fontFamily: 'Arial, sans-serif' }}
            >
              <div style={{ background: 'white', padding: '14px 20px' }}>
                <span style={{ color: '#DB1B0C', fontSize: 22, fontWeight: 600 }}>{m.year}</span>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #DB1B0C 0%, #c41508 100%)', padding: '20px' }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 20, marginBottom: 16, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ color: 'rgba(255,240,238,0.95)', fontSize: 14, lineHeight: 1.75 }}>{m.desc}</div>
              </div>
            </div>

            {m.direction === 'top' && (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 top-[-135px] h-[135px] w-[2px] bg-[#DB1B0C]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-[-140px] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'bottom' && (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-135px] h-[135px] w-[2px] bg-[#DB1B0C]" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-140px] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'left' && (
              <>
                <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[120px] h-[2px] bg-[#DB1B0C]" />
                <div className="absolute right-[-126px] top-[calc(50%-6px)] w-3 h-3 rounded-full bg-[#DB1B0C]" />
              </>
            )}
            {m.direction === 'right' && (
              <>
                <div className="absolute left-[-120px] top-1/2 -translate-y-1/2 w-[120px] h-[2px] bg-[#DB1B0C]" />
                <div className="absolute left-[-126px] top-[calc(50%-6px)] w-3 h-3 rounded-full bg-[#DB1B0C]" />
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

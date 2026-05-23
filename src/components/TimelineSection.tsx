'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { Power, Factory, TowerControl, Cpu, Leaf, Flame, GaugeCircle, Zap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

interface ConnectorSpec {
  line: { left: number; top: number; width: number; height: number }
  dot:  { left: number; top: number }
}

interface Milestone {
  year: string
  title: string
  desc: string
  cardLeft: number
  cardTop: number
  dotLeft: number
  dotTop: number
  connector: ConnectorSpec
  icon: ReactNode
}

const milestones: Milestone[] = [
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
    cardLeft: 10,   cardTop: 650,
    dotLeft: 76,    dotTop: 516,
    connector: {
      line: { left: 109, top: -46,  width: 2,  height: 46  },
      dot:  { left: 103, top: -52 },
    },
    icon: <Power className="w-11 h-11 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Commissioned the Omoku Power Plant with 150MW installed capacity, delivering reliable power to Rivers State.',
    cardLeft: 350,  cardTop: 660,
    dotLeft: 386,   dotTop: 426,
    connector: {
      line: { left: 79,  top: -146, width: 2,  height: 146 },
      dot:  { left: 73,  top: -152 },
    },
    icon: <Factory className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity to 180MW.',
    cardLeft: 290,  cardTop: 10,
    dotLeft: 656,   dotTop: 116,
    connector: {
      line: { left: 290, top: 149,  width: 76, height: 2   },
      dot:  { left: 360, top: 143 },
    },
    icon: <TowerControl className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
    cardLeft: 1000, cardTop: 10,
    dotLeft: 856,   dotTop: 116,
    connector: {
      line: { left: -56, top: 149,  width: 56, height: 2   },
      dot:  { left: -62, top: 143 },
    },
    icon: <GaugeCircle className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
    cardLeft: 680,  cardTop: 550,
    dotLeft: 1046,  dotTop: 606,
    connector: {
      line: { left: 290, top: 99,   width: 76, height: 2   },
      dot:  { left: 360, top: 93  },
    },
    icon: <Flame className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all four facilities.',
    cardLeft: 1280, cardTop: 450,
    dotLeft: 1156,  dotTop: 396,
    connector: {
      line: { left: -36, top: -10,  width: 36, height: 2   },
      dot:  { left: -42, top: -16 },
    },
    icon: <Cpu className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Advancing digital systems and smart grid integration across all power generation facilities.',
    cardLeft: 1280, cardTop: 220,
    dotLeft: 1346,  dotTop: 476,
    connector: {
      line: { left: 109, top: 200,  width: 2,  height: 56  },
      dot:  { left: 103, top: 250 },
    },
    icon: <Leaf className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
]

const CANVAS_W = 1600
const CANVAS_H = 980
const SIZE_FACTOR = 0.75

const SVG_PATH = `M 120 140 L 120 650 Q 120 730 200 730 L 260 730 Q 340 730 340 640 L 340 560 Q 340 470 430 470 L 520 470 Q 610 470 610 350 L 610 250 Q 610 160 700 160 L 900 160 Q 980 160 980 240 L 980 580 Q 980 650 1060 650 L 1120 650 Q 1200 650 1200 570 L 1200 320 Q 1200 250 1260 250 Q 1320 250 1320 320 L 1320 450 Q 1320 520 1390 520 L 1450 520`

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
    <div ref={containerRef} className="relative overflow-hidden" style={{ width: CANVAS_W, height: CANVAS_H }}>
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
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
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLenRef.current}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-xl"
        style={{
          left: 55, top: 70, width: 120, height: 120,
          border: '7px solid #D97300',
          opacity: progress > 0.02 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{ color: '#D97300', fontWeight: 900, fontSize: 30, fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>FIPL</span>
      </div>

      <div
        className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-xl"
        style={{
          left: 75, top: 305, width: 90, height: 90,
          border: '7px solid #D97300',
          opacity: progress > 0.06 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Power className="w-11 h-11 text-[#DB1B0C]" strokeWidth={2.6} />
      </div>

      {milestones.map((m, idx) => {
        const nodeShow = progress > (idx + 1.2) / 8
        return (
          <div
            key={`node-${m.year}`}
            className="absolute z-30 flex items-center justify-center rounded-full bg-white shadow-xl"
            style={{
              left: m.dotLeft, top: m.dotTop,
              width: 88, height: 88,
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
              className="w-[290px] rounded-lg overflow-hidden shadow-2xl"
              style={{ border: '1px solid #DB1B0C', fontFamily: 'Arial, sans-serif' }}
            >
              <div style={{ background: 'white', padding: '14px 20px' }}>
                <span style={{ color: '#DB1B0C', fontSize: 22, fontWeight: 600 }}>{m.year}</span>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #DB1B0C 0%, #c41508 100%)', padding: '20px' }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ color: 'rgba(255,240,238,0.95)', fontSize: 13, lineHeight: 1.7 }}>{m.desc}</div>
              </div>
            </div>

            <div
              className="absolute bg-[#DB1B0C]"
              style={m.connector.line}
            />
            <div
              className="absolute bg-[#DB1B0C] rounded-full"
              style={{ width: 12, height: 12, ...m.connector.dot }}
            />
          </div>
        )
      })}
    </div>
  )
}

export function TimelineSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(SIZE_FACTOR)
  const [offsetLeft, setOffsetLeft] = useState(0)

  useEffect(() => {
    const update = () => {
      if (outerRef.current) {
        const w = outerRef.current.clientWidth
        const s = (w / CANVAS_W) * SIZE_FACTOR
        setScale(s)
        setOffsetLeft(Math.round((w - CANVAS_W * s) / 2))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 bg-white">
      <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-[500px] h-[700px] pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 320" className="w-full h-full">
          <path d="M130 10 L50 160 H110 L30 310 L190 140 H120 Z" fill="#F47820" opacity="0.055" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
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
      </div>

      <div
        ref={outerRef}
        className="relative z-10 hidden lg:block w-full overflow-hidden"
        style={{ height: Math.round(CANVAS_H * scale) }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', marginLeft: offsetLeft, width: CANVAS_W, height: CANVAS_H }}>
          <ZigZagTimeline />
        </div>
      </div>

      <div className="relative z-10 lg:hidden max-w-[1280px] mx-auto px-6">
        <div
          className="absolute left-10 top-0 bottom-0 w-0.5"
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
    </section>
  )
}

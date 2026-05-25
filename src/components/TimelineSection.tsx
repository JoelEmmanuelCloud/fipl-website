'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'
import { Power, Factory, TowerControl, Cpu, Leaf, Flame, GaugeCircle } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

interface Seg {
  left: number
  top: number
  width: number
  height: number
}

interface ConnectorSpec {
  lines: Seg[]
  dot: { left: number; top: number }
  hideDot?: boolean
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
  hideNode?: boolean
}

const milestones: Milestone[] = [
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
    cardLeft: 75,
    cardTop: 760,
    dotLeft: 76,
    dotTop: 516,
    hideNode: true,
    connector: {
      lines: [
        { left: -56, top: -411, width: 56, height: 2 },
        { left: -56, top: -410, width: 2, height: 504 },
        { left: -56, top: 94, width: 57, height: 2 },
      ],
      dot: { left: -6, top: -416 },
      hideDot: true,
    },
    icon: <Power className="w-11 h-11 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Commissioned the Omoku Power Plant with 150MW installed capacity, delivering reliable power to Rivers State.',
    cardLeft: 400,
    cardTop: 760,
    dotLeft: 386,
    dotTop: 426,
    connector: {
      lines: [
        { left: 144, top: -135, width: 2, height: 135 },
        { left: 29, top: -136, width: 116, height: 2 },
        { left: 29, top: -291, width: 2, height: 156 },
      ],
      dot: { left: 24, top: -296 },
    },
    icon: <Factory className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity to 180MW.',
    cardLeft: 290,
    cardTop: 10,
    dotLeft: 656,
    dotTop: 116,
    connector: {
      lines: [
        { left: 290, top: 69, width: 121, height: 2 },
        { left: 409, top: 70, width: 2, height: 36 },
      ],
      dot: { left: 404, top: 100 },
      hideDot: true,
    },
    icon: <TowerControl className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
    cardLeft: 1000,
    cardTop: 10,
    dotLeft: 856,
    dotTop: 116,
    connector: {
      lines: [
        { left: -101, top: 69, width: 101, height: 2 },
        { left: -101, top: 70, width: 2, height: 36 },
      ],
      dot: { left: -106, top: 100 },
      hideDot: true,
    },
    icon: <GaugeCircle className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
    cardLeft: 630,
    cardTop: 430,
    dotLeft: 1046,
    dotTop: 606,
    connector: {
      lines: [
        { left: 460, top: 264, width: 2, height: 30 },
        { left: 145, top: 294, width: 315, height: 2 },
        { left: 145, top: 202, width: 2, height: 92 },
      ],
      dot: { left: 454, top: 258 },
      hideDot: true,
    },
    icon: <Flame className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all four facilities.',
    cardLeft: 1139,
    cardTop: 760,
    dotLeft: 1156,
    dotTop: 396,
    connector: {
      lines: [
        { left: 105, top: -320, width: 40, height: 2 },
        { left: 145, top: -320, width: 2, height: 320 },
      ],
      dot: { left: 100, top: -326 },
      hideDot: true,
    },
    icon: <Cpu className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Advancing digital systems and smart grid integration across all power generation facilities.',
    cardLeft: 1430,
    cardTop: 150,
    dotLeft: 1346,
    dotTop: 476,
    connector: {
      lines: [
        { left: -40, top: 94, width: 40, height: 2 },
        { left: -40, top: 94, width: 2, height: 232 },
      ],
      dot: { left: -45, top: 320 },
      hideDot: true,
    },
    icon: <Leaf className="w-10 h-10 text-[#DB1B0C]" strokeWidth={2.4} />,
  },
]

const CANVAS_W = 1760
const CANVAS_H = 1000
const SIZE_FACTOR = 0.75

function snakeColor(canvasX: number): string {
  const t = Math.min(1, Math.max(0, canvasX / CANVAS_W))
  const r = Math.round(219 - 2 * t)
  const g = Math.round(27 + 88 * t)
  const b = Math.round(12 - 12 * t)
  return `rgb(${r},${g},${b})`
}

const SVG_PATH = `M 120 140 L 120 650 Q 120 730 200 730 L 260 730 Q 340 730 340 640 L 340 560 Q 340 470 430 470 L 520 470 Q 610 470 610 350 L 610 250 Q 610 160 700 160 L 900 160 Q 980 160 980 240 L 980 580 Q 980 650 1060 650 L 1120 650 Q 1200 650 1200 570 L 1200 320 Q 1200 250 1260 250 Q 1320 250 1320 320 L 1320 450 Q 1320 520 1390 520 L 1450 520`

function ZigZagTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pathLenRef = useRef(3000)
  const [offset, setOffset] = useState(3000)
  const [progress, setProgress] = useState(0)
  const [pulsePos, setPulsePos] = useState<{ x: number; y: number } | null>(null)
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)
  const animated = useRef(false)
  const pulseRafRef = useRef<number | null>(null)

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
    const obs = new IntersectionObserver(
      ([entry]) => {
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
            if (pathRef.current) {
              const pt = pathRef.current.getPointAtLength(len * eased)
              setPulsePos({ x: pt.x, y: pt.y })
            }
            if (t < 1) {
              requestAnimationFrame(tick)
            } else {
              const loopStart = performance.now()
              const loopDur = 3800
              const loop = (n: number) => {
                const lt = ((n - loopStart) % loopDur) / loopDur
                if (pathRef.current) {
                  const pt = pathRef.current.getPointAtLength(len * lt)
                  setPulsePos({ x: pt.x, y: pt.y })
                }
                pulseRafRef.current = requestAnimationFrame(loop)
              }
              pulseRafRef.current = requestAnimationFrame(loop)
            }
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
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
          <filter id="pulseOuter" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="pulseGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
        {pulsePos && (
          <>
            <circle
              cx={pulsePos.x}
              cy={pulsePos.y}
              r={26}
              fill="white"
              opacity={0.22}
              filter="url(#pulseOuter)"
            />
            <circle
              cx={pulsePos.x}
              cy={pulsePos.y}
              r={12}
              fill="#FFD580"
              opacity={0.9}
              filter="url(#pulseGlow)"
            />
            <circle cx={pulsePos.x} cy={pulsePos.y} r={5} fill="white" opacity={1} />
          </>
        )}
      </svg>

      <div
        className="absolute z-20 rounded-full"
        style={{
          left: 38,
          top: 53,
          width: 154,
          height: 154,
          background: `linear-gradient(to right, ${snakeColor(115)} 35%, #D97300 65%)`,
          padding: 7,
          opacity: progress > 0.02 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <Image
            src="/images/sustainability/logoimage.png"
            alt="FIPL"
            width={115}
            height={53}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      <div
        className="absolute z-20 rounded-full"
        style={{
          left: 75,
          top: 305,
          width: 90,
          height: 90,
          background: `linear-gradient(to right, ${snakeColor(120)} 35%, #D97300 65%)`,
          padding: 7,
          opacity: progress > 0.06 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <Power className="w-11 h-11 text-[#DB1B0C]" strokeWidth={2.6} />
        </div>
      </div>

      {milestones.map((m, idx) => {
        if (m.hideNode) return null
        const nodeShow = progress > (idx + 1.2) / 8
        return (
          <div
            key={`node-${m.year}`}
            className="absolute z-30 rounded-full"
            style={{
              left: m.dotLeft,
              top: m.dotTop,
              width: 88,
              height: 88,
              background: `linear-gradient(to right, ${snakeColor(m.dotLeft + 44)} 35%, #D97300 65%)`,
              padding: 7,
              opacity: nodeShow ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              {m.icon}
            </div>
          </div>
        )
      })}

      {milestones.map((m, idx) => {
        const cardShow = progress > (idx + 0.8) / 8
        return (
          <div
            key={`conn-${m.year}`}
            className="absolute z-20"
            style={{
              left: m.cardLeft,
              top: m.cardTop,
              opacity: cardShow ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            {m.connector.lines.map((seg, i) => (
              <div key={i} className="absolute bg-[#DB1B0C]" style={seg} />
            ))}

            {m.connector.lines.slice(0, -1).map((seg, i) => {
              const next = m.connector.lines[i + 1]
              const sc = [
                { x: seg.left, y: seg.top },
                { x: seg.left + seg.width, y: seg.top },
                { x: seg.left, y: seg.top + seg.height },
                { x: seg.left + seg.width, y: seg.top + seg.height },
              ]
              const nc = [
                { x: next.left, y: next.top },
                { x: next.left + next.width, y: next.top },
                { x: next.left, y: next.top + next.height },
                { x: next.left + next.width, y: next.top + next.height },
              ]
              let jx = sc[0].x,
                jy = sc[0].y,
                best = Infinity
              for (const a of sc)
                for (const b of nc) {
                  const d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
                  if (d < best) {
                    best = d
                    jx = (a.x + b.x) / 2
                    jy = (a.y + b.y) / 2
                  }
                }
              return (
                <div
                  key={`j${i}`}
                  className="absolute rounded-full bg-[#DB1B0C]"
                  style={{
                    width: 14,
                    height: 14,
                    left: jx - 7,
                    top: jy - 7,
                    border: '2px solid white',
                  }}
                />
              )
            })}

            {!m.connector.hideDot && (
              <div
                className="absolute bg-[#DB1B0C] rounded-full"
                style={{ width: 12, height: 12, ...m.connector.dot }}
              />
            )}
          </div>
        )
      })}

      {milestones.map((m, idx) => {
        const cardShow = progress > (idx + 0.8) / 8
        return (
          <div
            key={`card-${m.year}`}
            className="absolute"
            style={{
              left: m.cardLeft,
              top: m.cardTop,
              opacity: cardShow ? 1 : 0,
              transform: `translateY(${cardShow ? 0 : 10}px) scale(${hoveredYear === m.year ? 1.05 : 1})`,
              transition: 'opacity 0.5s ease, transform 0.4s ease',
              zIndex: hoveredYear === m.year ? 40 : 20,
              transformOrigin: 'top center',
            }}
            onMouseEnter={() => setHoveredYear(m.year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <div
              className="w-[290px] rounded-lg overflow-hidden"
              style={{ border: '1px solid #DB1B0C', fontFamily: 'Arial, sans-serif' }}
            >
              <div style={{ background: 'white', padding: '14px 20px' }}>
                <span style={{ color: '#DB1B0C', fontSize: 22, fontWeight: 600 }}>{m.year}</span>
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #DB1B0C 0%, #c41508 100%)',
                  padding: hoveredYear === m.year ? '24px 20px' : '20px',
                  transition: 'padding 0.4s ease',
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {m.title}
                </div>
                <div
                  style={{
                    color: 'white',
                    fontSize: 13,
                    lineHeight: hoveredYear === m.year ? 2.0 : 1.7,
                    transition: 'line-height 0.4s ease',
                  }}
                >
                  {m.desc}
                </div>
              </div>
            </div>
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
              Our Journey{' '}
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="#DB1B0C"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" />
              </svg>
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              A Legacy of Power &amp; Progress
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              From our founding to today, FIPL has consistently evolved to meet Nigeria&apos;s
              growing energy needs while maintaining our commitment to excellence and innovation.
            </p>
          </div>
        </Reveal>
      </div>

      <div
        ref={outerRef}
        className="relative z-10 hidden lg:block w-full overflow-hidden"
        style={{ height: Math.round(CANVAS_H * scale) }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            marginLeft: offsetLeft,
            width: CANVAS_W,
            height: CANVAS_H,
          }}
        >
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
                style={{
                  border: '1.6px solid #DB1B0C',
                  overflow: 'hidden',
                  fontFamily: 'Arial, sans-serif',
                }}
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
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                    {m.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.6 }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

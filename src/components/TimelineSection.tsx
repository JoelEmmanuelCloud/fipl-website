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
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Received our first major award, marking a reputation for excellence in tailored business solutions.',
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity.',
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all facilities.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Launched comprehensive digital transformation initiatives across all FIPL facilities.',
  },
]

const SVG_W = 1400
const SVG_H = 930
const NODE_R = 22
const CARD_W = 224
const CARD_H = 200
const CARD_TOP_H = 48
const ROW1_Y = 290
const ROW2_Y = 670
const PATH_D = 'M 80,290 L 900,290 C 1100,290 1100,670 900,670 L 280,670'

const nodeData = [
  { x: 240, y: ROW1_Y, row: 1 },
  { x: 460, y: ROW1_Y, row: 1 },
  { x: 680, y: ROW1_Y, row: 1 },
  { x: 900, y: ROW1_Y, row: 1 },
  { x: 900, y: ROW2_Y, row: 2 },
  { x: 660, y: ROW2_Y, row: 2 },
  { x: 420, y: ROW2_Y, row: 2 },
]

function SnakeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / SVG_W)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', height: SVG_H * scale }}>
      <div style={{ width: SVG_W, height: SVG_H, transformOrigin: 'top left', transform: `scale(${scale})` }}>
        <svg width={SVG_W} height={SVG_H} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="snakePathGrad" gradientUnits="userSpaceOnUse" x1="80" y1="0" x2="1100" y2="0">
              <stop offset="0%" stopColor="#F47820" />
              <stop offset="100%" stopColor="#DB1B0C" />
            </linearGradient>
            <linearGradient id="fiplCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F47820" />
              <stop offset="100%" stopColor="#D97300" />
            </linearGradient>
          </defs>

          <path
            d={PATH_D}
            fill="none"
            stroke="url(#snakePathGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx={80} cy={ROW1_Y} r={52} fill="url(#fiplCircleGrad)" />
          <text
            x={80}
            y={ROW1_Y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize={15}
            letterSpacing={2}
          >
            FIPL
          </text>

          {milestones.map((m, i) => {
            const { x, y, row } = nodeData[i]
            const cardX = x - CARD_W / 2
            const cardY = row === 1 ? y - NODE_R - 28 - CARD_H : y + NODE_R + 28
            const connY1 = row === 1 ? cardY + CARD_H : y + NODE_R
            const connY2 = row === 1 ? y - NODE_R : cardY

            return (
              <g key={m.year}>
                <line
                  x1={x} y1={connY1}
                  x2={x} y2={connY2}
                  stroke="#DB1B0C"
                  strokeWidth="1.5"
                  strokeDasharray="5,4"
                />
                <foreignObject x={cardX} y={cardY} width={CARD_W} height={CARD_H}>
                  <div style={{
                    width: CARD_W,
                    height: CARD_H,
                    border: '1.6px solid #DB1B0C',
                    overflow: 'hidden',
                    fontFamily: 'Arial, sans-serif',
                    boxSizing: 'border-box',
                  }}>
                    <div style={{
                      height: CARD_TOP_H,
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 14,
                    }}>
                      <span style={{ color: '#DB1B0C', fontSize: 19, fontWeight: 500 }}>{m.year}</span>
                    </div>
                    <div style={{
                      height: CARD_H - CARD_TOP_H,
                      background: '#DB1B0C',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 14px',
                      textAlign: 'center',
                    }}>
                      <div style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
                        {m.title}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 11, lineHeight: 1.5 }}>
                        {m.desc}
                      </div>
                    </div>
                  </div>
                </foreignObject>
                <circle cx={x} cy={y} r={NODE_R} fill="white" stroke="#DB1B0C" strokeWidth="3" />
                <circle cx={x} cy={y} r={10} fill="#DB1B0C" />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function MilestoneCard({ item }: { item: typeof milestones[0] }) {
  return (
    <div className="border border-gray-200 p-5 bg-white hover:border-[#DB1B0C] hover:shadow-md transition-all">
      <div className="text-[#DB1B0C] text-2xl font-bold mb-1">{item.year}</div>
      <h3 className="font-bold text-[#0E121D] text-sm mb-2">{item.title}</h3>
      <p className="text-xs text-[#797979] leading-relaxed">{item.desc}</p>
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

        <div className="hidden md:block">
          <SnakeTimeline />
        </div>

        <div className="relative md:hidden">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F47820] to-[#DB1B0C]" />
          <div className="space-y-6">
            {milestones.map((item, i) => (
              <Reveal key={item.year} variant="right" delay={i * 0.06}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#DB1B0C] flex items-center justify-center mt-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#DB1B0C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <MilestoneCard item={item} />
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

'use client'

import React, { useEffect, useRef, useState } from 'react'

// Canvas size matches Figma proportions (1387×1091)
const W = 1400
const H = 1050

const NODE_R      = 26
const LOOP_R      = 32
const FIPL_R      = 50
const CARD_W      = 215
const CARD_HEAD_H = 46
const CARD_BODY_H = 148
const CONN_GAP    = 28

// ─── Snake path flow ──────────────────────────────────────────────────────────
//   FIPL (92,85) → DOWN left column → power-btn (92,520) →
//   curve RIGHT-DOWN to bottom → 2001 pin (400,690) →
//   S-curve UP-LEFT → 2005 pin (355,420) →
//   curve RIGHT to upper band → 2010 pin (750,335) →
//   U-turn right: leaf (1010,330) → monitor (1010,585) →
//   lower return band LEFT → 2020 pin (870,610) → 2015 pin (680,625) →
//   curve DOWN-LEFT → 1998 pin (200,820)
const pathD = [
  'M 92,85',
  // FIPL → power button (straight down left column)
  'C 92,250 92,400 92,520',
  // power button → swing right-down to bottom
  'C 92,620 130,680 230,710',
  'C 300,728 350,720 400,690',     // → 2001 pin
  // 2001 pin → S-curve UP-LEFT to 2005 pin
  'C 440,660 460,600 450,540',
  'C 440,480 400,450 355,420',     // → 2005 pin
  // 2005 pin → smooth curve UP-RIGHT to upper band
  'C 360,395 430,355 530,342',
  'C 620,330 690,330 750,335',     // → 2010 pin
  // 2010 pin → U-turn entrance (leaf)
  'C 820,338 930,330 1010,330',    // → leaf circle (U-turn top)
  // U-turn: leaf (1010,330) → monitor (1010,585)
  'C 1155,330 1155,585 1010,585',  // → monitor circle (U-turn bottom)
  // monitor → lower return band going LEFT
  'C 980,585 940,598 870,610',     // → 2020 pin
  // 2020 pin → 2015 pin
  'C 800,620 740,625 680,625',     // → 2015 pin
  // 2015 pin → curve down-left to 1998 pin
  'C 580,625 450,660 330,740',
  'C 270,760 230,785 200,800',      // → 1998 pin
].join(' ')

// Cards ABOVE the path (top of their connector line)
const topItems = [
  {
    nodeX: 355, nodeY: 420,
    cardCX: 265,
    year: '2005', title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity.',
  },
  {
    nodeX: 750, nodeY: 335,
    cardCX: 870,
    year: '2010', title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
  },
  {
    // connected to the right side of the U-turn (midpoint between leaf and monitor)
    nodeX: 1060, nodeY: 458,
    cardCX: 1240,
    year: '2024', title: 'Digital Transformation',
    desc: 'Launched comprehensive digital transformation initiatives across all FIPL facilities.',
  },
]

// Cards BELOW the path (bottom of their connector line)
const botItems = [
  {
    nodeX: 870, nodeY: 610,
    cardCX: 1080,
    year: '2020', title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all facilities.',
  },
  {
    nodeX: 680, nodeY: 625,
    cardCX: 680,
    year: '2015', title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
  },
  {
    nodeX: 400, nodeY: 690,
    cardCX: 400,
    year: '2001', title: 'Omoku Power Plant',
    desc: 'Received our first major award, marking a reputation for excellence in tailored business solutions.',
  },
  {
    nodeX: 200, nodeY: 800,
    cardCX: 140,
    year: '1998', title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
  },
]

type Item = typeof topItems[0]

function PinIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <path
        d={`M ${cx},${cy + 11}
           C ${cx - 9},${cy + 7} ${cx - 11},${cy - 2} ${cx - 11},${cy - 4}
           A 11,11 0 1,1 ${cx + 11},${cy - 4}
           C ${cx + 11},${cy - 2} ${cx + 9},${cy + 7} ${cx},${cy + 11} Z`}
        fill="none" stroke="url(#tlGrad)" strokeWidth="2" strokeLinejoin="round"
      />
      <circle cx={cx} cy={cy - 4} r={3.5} fill="none" stroke="url(#tlGrad)" strokeWidth="1.6" />
    </>
  )
}

// Connector: circle top → vertical up → horizontal to card bottom edge
function TopConnector({ item }: { item: Item }) {
  const { nodeX, nodeY, cardCX } = item
  const circleTop  = nodeY - NODE_R
  const cardBottom = nodeY - NODE_R - CONN_GAP
  const hasH       = Math.abs(cardCX - nodeX) > 6
  return (
    <g stroke="#DB1B0C" strokeWidth="1.5" fill="none">
      <line x1={nodeX} y1={circleTop}  x2={nodeX} y2={cardBottom} />
      {hasH && <line x1={nodeX} y1={cardBottom} x2={cardCX} y2={cardBottom} />}
    </g>
  )
}

// Connector: circle bottom → vertical down → horizontal to card top edge
function BotConnector({ item }: { item: Item }) {
  const { nodeX, nodeY, cardCX } = item
  const circleBot = nodeY + NODE_R
  const cardTop   = nodeY + NODE_R + CONN_GAP
  const hasH      = Math.abs(cardCX - nodeX) > 6
  return (
    <g stroke="#DB1B0C" strokeWidth="1.5" fill="none">
      <line x1={nodeX} y1={circleBot} x2={nodeX} y2={cardTop} />
      {hasH && <line x1={nodeX} y1={cardTop} x2={cardCX} y2={cardTop} />}
    </g>
  )
}

function TimelineCard({ item }: { item: Item }) {
  return (
    <div style={{ width: CARD_W, overflow: 'hidden', border: '1.5px solid #DB1B0C' }}>
      <div style={{
        background: '#ffffff', height: CARD_HEAD_H,
        padding: '0 14px', display: 'flex', alignItems: 'center',
      }}>
        <span style={{ color: '#DB1B0C', fontSize: 18, fontWeight: 600, lineHeight: 1 }}>
          {item.year}
        </span>
      </div>
      <div style={{
        background: '#DB1B0C', height: CARD_BODY_H,
        padding: '12px 14px 14px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <p style={{ margin: 0, color: '#ffffff', fontWeight: 700, fontSize: 13, lineHeight: 1.3, textAlign: 'center' }}>
          {item.title}
        </p>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.88)', fontWeight: 400, fontSize: 11, lineHeight: 1.6, textAlign: 'center' }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function TimelineSection() {
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const path = pathRef.current
    if (!path || !drawn) return
    const len = Math.ceil(path.getTotalLength())
    path.style.setProperty('--path-len', String(len))
    path.classList.add('timeline-path-draw')
  }, [drawn])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="text-center max-w-2xl mx-auto px-6 mb-10">
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

      {/* Horizontally scrollable — no overflow-hidden on parent, SVG clips to W×H */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '24px' }}>
        <div style={{ position: 'relative', width: W, height: H }}>

          {/* SVG: clips to declared W×H (no overflow:visible) */}
          <svg
            width={W}
            height={H}
            style={{ position: 'absolute', inset: 0 }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="tlGrad" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#F47820" />
                <stop offset="100%" stopColor="#DB1B0C" />
              </linearGradient>
            </defs>

            {/* Main snake path */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#tlGrad)"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Top milestone pins */}
            {topItems.map(item => (
              <g key={item.year}>
                <TopConnector item={item} />
                <circle cx={item.nodeX} cy={item.nodeY} r={NODE_R}
                  fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
                <PinIcon cx={item.nodeX} cy={item.nodeY} />
              </g>
            ))}

            {/* Bottom milestone pins */}
            {botItems.map(item => (
              <g key={item.year}>
                <BotConnector item={item} />
                <circle cx={item.nodeX} cy={item.nodeY} r={NODE_R}
                  fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
                <PinIcon cx={item.nodeX} cy={item.nodeY} />
              </g>
            ))}

            {/* FIPL start circle */}
            <circle cx={92} cy={85} r={FIPL_R}
              fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
            <text x={92} y={81} textAnchor="middle"
              fill="#F47820" fontSize="14" fontWeight="700"
              fontStyle="italic" fontFamily="Arial, sans-serif">FIPL</text>
            <line x1={79} y1={86} x2={105} y2={86}
              stroke="#F47820" strokeWidth="1.5" />

            {/* Leaf circle — top of right U-turn */}
            <circle cx={1010} cy={330} r={LOOP_R}
              fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
            <path
              d={`M 1010,${330 + 15}
                 C ${1010 - 18},${330 + 7} ${1010 - 18},${330 - 10} 1010,${330 - 15}
                 C ${1010 + 18},${330 - 10} ${1010 + 18},${330 + 7} 1010,${330 + 15} Z`}
              fill="none" stroke="url(#tlGrad)" strokeWidth="2" strokeLinejoin="round"
            />
            <line x1={1010} y1={330 - 15} x2={1010} y2={330 + 15}
              stroke="url(#tlGrad)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Monitor circle — bottom of right U-turn */}
            <circle cx={1010} cy={585} r={LOOP_R}
              fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
            <rect x={1010 - 15} y={585 - 11} width={30} height={19} rx={2}
              fill="none" stroke="url(#tlGrad)" strokeWidth="2" />
            <line x1={1010} y1={585 + 8} x2={1010} y2={585 + 15}
              stroke="url(#tlGrad)" strokeWidth="2" strokeLinecap="round" />
            <line x1={1010 - 8} y1={585 + 15} x2={1010 + 8} y2={585 + 15}
              stroke="url(#tlGrad)" strokeWidth="2" strokeLinecap="round" />

            {/* Power-button circle — left column */}
            <circle cx={92} cy={520} r={LOOP_R}
              fill="white" stroke="url(#tlGrad)" strokeWidth="2.5" />
            <line x1={92} y1={520 - 18} x2={92} y2={520 - 9}
              stroke="url(#tlGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M ${92 - 13},${520 - 16} A 15,15 0 1,1 ${92 + 13},${520 - 16}`}
              fill="none" stroke="url(#tlGrad)"
              strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Top cards — positioned above their connector endpoint */}
          {topItems.map(item => {
            const cardBottom = item.nodeY - NODE_R - CONN_GAP
            return (
              <div key={item.year} style={{
                position: 'absolute',
                left:   item.cardCX - CARD_W / 2,
                bottom: H - cardBottom,
                width:  CARD_W,
              }}>
                <TimelineCard item={item} />
              </div>
            )
          })}

          {/* Bottom cards — positioned below their connector endpoint */}
          {botItems.map(item => {
            const cardTop = item.nodeY + NODE_R + CONN_GAP
            return (
              <div key={item.year} style={{
                position: 'absolute',
                left: item.cardCX - CARD_W / 2,
                top:  cardTop,
                width: CARD_W,
              }}>
                <TimelineCard item={item} />
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}

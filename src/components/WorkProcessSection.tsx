'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

const steps = [
  {
    num: '01',
    title: 'Project Planning & Feasibility',
    desc: 'We begin with in-depth research, feasibility studies, and stakeholder consultations to ensure every project is technically sound and commercially viable.',
    image: IMAGES.plants.step1,
  },
  {
    num: '02',
    title: 'Engineering & Design',
    desc: 'Our team develops innovative and sustainable engineering solutions, leveraging global best practices while tailoring designs to local realities.',
    image: IMAGES.plants.step2,
  },
  {
    num: '03',
    title: 'Execution & Commissioning',
    desc: 'From procurement to construction and testing, we deliver projects with strict adherence to safety, timelines, and quality standards.',
    image: IMAGES.plants.step3,
  },
  {
    num: '04',
    title: 'Operation & Sustainability',
    desc: 'Once commissioned, we ensure smooth operations, continuous optimization, and sustainable practices to maximize efficiency and community impact.',
    image: IMAGES.plants.step4,
  },
]

const BADGE_REST = {
  background: '#D97300',
  transform: 'scale(1)',
  boxShadow: '0 0 0 0 rgba(219,27,12,0)',
}

const BADGE_HOVER = {
  background: '#DB1B0C',
  transform: 'scale(1.14)',
  boxShadow: '0 0 0 5px rgba(219,27,12,0.22), 0 10px 28px rgba(219,27,12,0.32)',
}

export default function WorkProcessSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[21px] lg:items-end">
      {steps.map((step, i) => {
        const isTop = i % 2 === 0
        const isHovered = hovered === i
        const isDimmed = hovered !== null && !isHovered
        const badge = isHovered ? BADGE_HOVER : BADGE_REST

        const cardStyle = {
          opacity: isDimmed ? 0.42 : 1,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.34,1.3,0.64,1)',
        }

        const imgStyle = {
          transform: isHovered ? 'scale(1.09)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.34,1.1,0.64,1)',
        }

        const overlayStyle = {
          position: 'absolute' as const,
          inset: 0,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none' as const,
        }

        const badgeStyle = {
          width: 76,
          height: 76,
          borderRadius: '50%',
          border: '10px solid var(--fipl-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s ease, transform 0.38s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s ease',
          ...badge,
        }

        const titleStyle = {
          color: isHovered ? '#DB1B0C' : 'var(--fipl-heading)',
          transition: 'color 0.3s ease',
        }

        return (
          <Reveal key={step.num} variant="up" delay={i * 0.15} duration={0.8}>
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex flex-col cursor-default select-none"
              style={cardStyle}
            >
              {isTop ? (
                <>
                  <div
                    className="relative overflow-hidden h-[260px] rounded-tl-[200px] rounded-tr-[200px]"
                    style={{
                      boxShadow: isHovered
                        ? '0 24px 48px rgba(0,0,0,0.16)'
                        : '0 0 0 rgba(0,0,0,0)',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    <Image src={step.image} alt={step.title} fill className="object-cover" style={imgStyle} />
                    <div
                      style={{
                        ...overlayStyle,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(219,27,12,0.2) 100%)',
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex justify-center -mt-[38px]">
                    <div style={badgeStyle}>
                      <span className="text-white font-bold text-xl leading-none">{step.num}</span>
                    </div>
                  </div>

                  <div className="pt-5 text-center px-2">
                    <h4 className="font-bold text-xl mb-3" style={titleStyle}>
                      {step.title}
                    </h4>
                    <p className="text-[var(--fipl-body)] leading-relaxed text-base">{step.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center px-2 pb-5">
                    <h4 className="font-bold text-xl mb-3" style={titleStyle}>
                      {step.title}
                    </h4>
                    <p className="text-[var(--fipl-body)] leading-relaxed text-base">{step.desc}</p>
                  </div>

                  <div className="relative z-10 flex justify-center">
                    <div style={badgeStyle}>
                      <span className="text-white font-bold text-xl leading-none">{step.num}</span>
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden h-[260px] rounded-bl-[200px] rounded-br-[200px] -mt-[38px]"
                    style={{
                      boxShadow: isHovered
                        ? '0 -24px 48px rgba(0,0,0,0.16)'
                        : '0 0 0 rgba(0,0,0,0)',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    <Image src={step.image} alt={step.title} fill className="object-cover" style={imgStyle} />
                    <div
                      style={{
                        ...overlayStyle,
                        background: 'linear-gradient(to top, transparent 50%, rgba(219,27,12,0.2) 100%)',
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

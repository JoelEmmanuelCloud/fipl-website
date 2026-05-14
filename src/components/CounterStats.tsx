'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  icon: React.ReactNode
  value: number
  suffix?: string
  label: string
  display?: string
}

function Counter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const duration = 1800
        const start = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(stat.value * ease))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [stat.value])

  return (
    <div ref={ref} className="text-center py-6 flex flex-col items-center">
      {/* Icon on top */}
      <div className="mb-3" style={{ width: 40, height: 40 }}>{stat.icon}</div>
      {/* Number */}
      <div className="text-4xl font-extrabold text-white leading-none mb-2">
        {stat.display ?? `${count}${stat.suffix ?? ''}`}
      </div>
      {/* Label */}
      <div className="text-sm text-white/80">{stat.label}</div>
    </div>
  )
}

export function CounterStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
      {stats.map((s, i) => (
        <div key={s.label} className="relative">
          {/* Faded vertical divider — hidden on first item and on mobile */}
          {i > 0 && (
            <div
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
              style={{
                width: '2px',
                height: '70%',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85), transparent)',
              }}
            />
          )}
          <Counter stat={s} />
        </div>
      ))}
    </div>
  )
}

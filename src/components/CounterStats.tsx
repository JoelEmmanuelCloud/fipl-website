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
    const obs = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [stat.value])

  return (
    <div
      ref={ref}
      className="flex-1 text-center py-6 px-6 flex flex-col items-center justify-center"
    >
      <div className="mb-3 flex items-center justify-center" style={{ width: 40, height: 40 }}>
        {stat.icon}
      </div>
      <div className="text-4xl font-extrabold text-white leading-none mb-2">
        {stat.display ?? `${count}${stat.suffix ?? ''}`}
      </div>
      <div className="text-base text-white/80 leading-relaxed max-w-[160px]">{stat.label}</div>
    </div>
  )
}

export function CounterStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-0 md:flex md:flex-row md:items-stretch">
      {stats.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-stretch">
          <Counter stat={s} />
          {i < stats.length - 1 && (
            <div
              className="hidden md:block w-px self-stretch flex-shrink-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.99) 50%, transparent 95%)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

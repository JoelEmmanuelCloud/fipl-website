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
    <div ref={ref} className="text-center p-7 bg-white/10 rounded-xl">
      <div className="text-3xl mb-2.5">{stat.icon}</div>
      <div className="text-4xl font-extrabold text-white leading-none">
        {stat.display ?? `${count}${stat.suffix ?? ''}`}
      </div>
      <div className="text-sm text-white/80 mt-2">{stat.label}</div>
    </div>
  )
}

export function CounterStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((s) => <Counter key={s.label} stat={s} />)}
    </div>
  )
}

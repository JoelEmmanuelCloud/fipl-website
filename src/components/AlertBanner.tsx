'use client'

import { useEffect, useState } from 'react'

interface Alert {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'critical'
}

const STYLES = {
  info: {
    bar: 'bg-[#1a4e8a] text-white',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  warning: {
    bar: 'bg-[#D97300] text-white',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  critical: {
    bar: 'bg-[#DB1B0C] text-white',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
}

export default function AlertBanner({ alerts }: { alerts: Alert[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('dismissed_alerts') ?? '[]')
      setDismissed(new Set(stored))
    } catch {}
  }, [])

  function dismiss(id: string) {
    setDismissed((prev) => {
      const next = new Set(prev).add(id)
      sessionStorage.setItem('dismissed_alerts', JSON.stringify(Array.from(next)))
      return next
    })
  }

  const visible = alerts.filter((a) => !dismissed.has(a.id))
  if (visible.length === 0) return null

  return (
    <div className="w-full">
      {visible.map((alert) => {
        const style = STYLES[alert.type]
        return (
          <div key={alert.id} className={`${style.bar} w-full`}>
            <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex items-center gap-3">
              {style.icon}
              <div className="flex-1 flex items-baseline gap-2 flex-wrap text-sm">
                <span className="font-semibold">{alert.title}</span>
                <span className="opacity-90 text-xs">{alert.message}</span>
              </div>
              <button
                onClick={() => dismiss(alert.id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-2"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

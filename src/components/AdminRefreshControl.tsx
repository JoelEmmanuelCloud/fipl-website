'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useEffect, useState, useRef, useCallback } from 'react'
import { RefreshCw, ChevronDown } from 'lucide-react'

const AUTO_INTERVALS = [
  { label: 'Off', value: 0 },
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '5m', value: 300 },
]

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  return `${Math.floor(minutes / 60)}h ago`
}

export default function AdminRefreshControl() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date())
  const [timeAgoLabel, setTimeAgoLabel] = useState('just now')
  const [autoInterval, setAutoInterval] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const refresh = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
    setLastRefreshed(new Date())
  }, [router])

  useEffect(() => {
    const tick = setInterval(() => setTimeAgoLabel(getTimeAgo(lastRefreshed)), 5000)
    setTimeAgoLabel(getTimeAgo(lastRefreshed))
    return () => clearInterval(tick)
  }, [lastRefreshed])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (autoInterval > 0) {
      timerRef.current = setInterval(refresh, autoInterval * 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoInterval, refresh])

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={refresh}
        disabled={isPending}
        title="Refresh data"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
      >
        <RefreshCw
          className={`w-3.5 h-3.5 shrink-0 ${isPending ? 'animate-spin' : ''}`}
          strokeWidth={2}
        />
        <span className="hidden sm:inline tabular-nums">
          {isPending ? 'Refreshing…' : timeAgoLabel}
        </span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          title="Auto-refresh settings"
          className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {autoInterval > 0 && (
            <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 mr-0.5">
              {AUTO_INTERVALS.find((i) => i.value === autoInterval)?.label}
            </span>
          )}
          <ChevronDown className="w-3 h-3" strokeWidth={2} />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-1 z-50 w-32">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                Auto-refresh
              </div>
              {AUTO_INTERVALS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setAutoInterval(value)
                    setShowMenu(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                    autoInterval === value
                      ? 'text-[#DB1B0C] bg-[#DB1B0C]/5'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

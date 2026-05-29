'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface NotificationData {
  contacts: {
    count: number
    recent: {
      id: string
      first_name: string
      last_name: string
      subject: string | null
      created_at: string
    }[]
  }
  subscribers: { count: number; recent: { id: string; email: string; subscribed_at: string }[] }
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function AdminNotificationBell() {
  const [data, setData] = useState<NotificationData | null>(null)
  const [open, setOpen] = useState(false)
  const [lastSeen, setLastSeen] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('admin_notif_seen')
    if (stored) setLastSeen(parseInt(stored, 10))
  }, [])

  async function fetchNotifications() {
    const res = await fetch('/api/admin/notifications')
    if (res.ok) setData(await res.json())
  }

  useEffect(() => {
    fetchNotifications()
    const id = setInterval(fetchNotifications, 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleOpen() {
    const now = Date.now()
    setLastSeen(now)
    localStorage.setItem('admin_notif_seen', String(now))
    setOpen((o) => !o)
  }

  const total = (data?.contacts.count ?? 0) + (data?.subscribers.count ?? 0)
  const newSince = data
    ? data.contacts.recent.filter((r) => new Date(r.created_at).getTime() > lastSeen).length +
      data.subscribers.recent.filter((r) => new Date(r.subscribed_at).getTime() > lastSeen).length
    : 0

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleOpen}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        title="Notifications"
      >
        <svg
          className="w-5 h-5 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {newSince > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DB1B0C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {newSince > 9 ? '9+' : newSince}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Last 7 days</span>
            <span className="text-xs text-gray-400">{total} total</span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {data?.contacts.recent.length === 0 && data?.subscribers.recent.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">No recent activity</div>
            ) : (
              <>
                {data?.contacts.recent.map((c) => (
                  <div key={c.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#DB1B0C]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#DB1B0C]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {c.first_name} {c.last_name}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {c.subject || 'General Enquiry'}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">
                        {timeAgo(c.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
                {data?.subscribers.recent.map((s) => (
                  <div key={s.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-green-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{s.email}</div>
                        <div className="text-xs text-gray-400">Newsletter subscriber</div>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">
                        {timeAgo(s.subscribed_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
            <Link
              href="/admin/submissions"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-[#DB1B0C] hover:underline"
            >
              View all submissions →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

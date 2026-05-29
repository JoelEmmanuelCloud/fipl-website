'use client'

import { useEffect, useState } from 'react'

type State = 'loading' | 'unsupported' | 'denied' | 'subscribed' | 'unsubscribed'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const output = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i)
  }
  return output
}

export default function PushSubscribeButton() {
  const [state, setState] = useState<State>('loading')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('unsupported')
      return
    }
    if (Notification.permission === 'denied') {
      setState('denied')
      return
    }
    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription()
      setState(sub ? 'subscribed' : 'unsubscribed')
    })
  }, [])

  async function subscribe() {
    setBusy(true)
    try {
      const reg = await navigator.serviceWorker.ready
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setState('denied')
        return
      }
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
          .buffer as ArrayBuffer,
      })
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
      setState('subscribed')
    } catch {
      setState('unsubscribed')
    } finally {
      setBusy(false)
    }
  }

  async function unsubscribe() {
    setBusy(true)
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        })
        await sub.unsubscribe()
      }
      setState('unsubscribed')
    } finally {
      setBusy(false)
    }
  }

  if (state === 'loading' || state === 'unsupported') return null

  if (state === 'denied') {
    return (
      <p className="text-xs text-white/50 mt-2">
        Notifications blocked — enable them in browser settings.
      </p>
    )
  }

  if (state === 'subscribed') {
    return (
      <button
        onClick={unsubscribe}
        disabled={busy}
        className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors mt-2 disabled:opacity-50"
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {busy ? 'Updating…' : 'Notifications on — turn off'}
      </button>
    )
  }

  return (
    <button
      onClick={subscribe}
      disabled={busy}
      className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors mt-2 disabled:opacity-50"
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
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
      {busy ? 'Enabling…' : 'Get notified of new articles'}
    </button>
  )
}

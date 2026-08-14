'use client'

import { COOKIE_PREFERENCES_OPEN_EVENT } from '@/lib/cookie-consent'

export default function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_OPEN_EVENT))}
      className={className}
    >
      Manage cookie preferences
    </button>
  )
}

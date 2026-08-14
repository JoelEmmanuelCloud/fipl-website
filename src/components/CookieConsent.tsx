'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  COOKIE_PREFERENCES_OPEN_EVENT,
  createConsentState,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentState,
} from '@/lib/cookie-consent'

const CATEGORIES: {
  key: 'analytics' | 'marketing'
  label: string
  description: string
}[] = [
  {
    key: 'analytics',
    label: 'Analytics Cookies',
    description:
      'Help us understand how visitors use the site so we can improve content and performance.',
  },
  {
    key: 'marketing',
    label: 'Marketing Cookies',
    description: 'Used to measure the effectiveness of outreach and campaigns across our channels.',
  },
]

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed ${
        checked ? 'bg-primary' : 'bg-[var(--fipl-border)]'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

export default function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [consent, setConsent] = useState<CookieConsentState | null>(null)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [draft, setDraft] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    setConsent(readCookieConsent())
    setReady(true)
  }, [])

  useEffect(() => {
    function handleOpen() {
      setDraft({
        analytics: readCookieConsent()?.analytics ?? false,
        marketing: readCookieConsent()?.marketing ?? false,
      })
      setPreferencesOpen(true)
    }
    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleOpen)
    return () => window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleOpen)
  }, [])

  useEffect(() => {
    if (preferencesOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [preferencesOpen])

  function persist(state: CookieConsentState) {
    writeCookieConsent(state)
    setConsent(state)
    setPreferencesOpen(false)
  }

  function acceptAll() {
    persist(createConsentState({ analytics: true, marketing: true }))
  }

  function rejectNonEssential() {
    persist(createConsentState({ analytics: false, marketing: false }))
  }

  function openPreferences() {
    setDraft({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
    })
    setPreferencesOpen(true)
  }

  function savePreferences() {
    persist(createConsentState(draft))
  }

  if (!ready) return null

  return (
    <>
      {!consent && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[80] animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          <div className="border-t border-[var(--fipl-border)] bg-[var(--fipl-bg)] shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--fipl-heading)] mb-1">
                  We value your privacy
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--fipl-body)]">
                  We use cookies to keep the site secure, remember your preferences, and understand
                  how it&apos;s used. You can accept all cookies, reject non-essential ones, or
                  manage your preferences. Read our{' '}
                  <Link href="/cookie-policy" className="underline hover:text-primary">
                    Cookie Policy
                  </Link>{' '}
                  to learn more.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--fipl-border)] text-[var(--fipl-heading)] hover:bg-[var(--fipl-surface)] transition-colors"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--fipl-border)] text-[var(--fipl-heading)] hover:bg-[var(--fipl-surface)] transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
            onClick={() => setPreferencesOpen(false)}
          />
          <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[var(--fipl-bg)] border border-[var(--fipl-border)] shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 fade-in duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-[var(--fipl-heading)]">Cookie Preferences</h2>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--fipl-body)] hover:bg-[var(--fipl-surface)] hover:text-[var(--fipl-heading)] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--fipl-body)] mb-5">
                Choose which categories of cookies you allow. Necessary cookies are always active
                because they&apos;re required for the site to function.
              </p>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-[var(--fipl-border)] bg-[var(--fipl-surface)]">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--fipl-heading)]">
                      Necessary Cookies
                    </p>
                    <p className="text-xs text-[var(--fipl-body)] mt-1 leading-relaxed">
                      Required for core functionality like navigation and security. Always active.
                    </p>
                  </div>
                  <Toggle checked disabled label="Necessary Cookies" />
                </div>

                {CATEGORIES.map((category) => (
                  <div
                    key={category.key}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl border border-[var(--fipl-border)]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--fipl-heading)]">
                        {category.label}
                      </p>
                      <p className="text-xs text-[var(--fipl-body)] mt-1 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <Toggle
                      checked={draft[category.key]}
                      label={category.label}
                      onChange={(value) => setDraft((prev) => ({ ...prev, [category.key]: value }))}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--fipl-border)] text-[var(--fipl-heading)] hover:bg-[var(--fipl-surface)] transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

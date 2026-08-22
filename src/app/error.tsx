'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-[var(--fipl-bg)]">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-[#DB1B0C]/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-7 h-7 text-[#DB1B0C]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v4M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-[var(--fipl-heading)] mb-3">
          We&apos;re having trouble loading this page
        </h1>
        <p className="text-sm text-[var(--fipl-body)] mb-8">
          Our systems are temporarily unavailable. Please try again in a moment.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-[#DB1B0C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-[var(--fipl-border-subtle)] text-[var(--fipl-heading)] font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[var(--fipl-surface)] transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

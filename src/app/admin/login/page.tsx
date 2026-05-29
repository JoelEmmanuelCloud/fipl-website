'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #DB1B0C 0%, #D97300 100%)' }}
        />
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="400" r="300" stroke="white" strokeWidth="1" />
            <circle cx="300" cy="400" r="220" stroke="white" strokeWidth="1" />
            <circle cx="300" cy="400" r="140" stroke="white" strokeWidth="1" />
            <line x1="0" y1="400" x2="600" y2="400" stroke="white" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="800" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Image
            src="/images/sustainability/logoimage.png"
            alt="FIPL"
            width={110}
            height={40}
            className="object-contain brightness-0 invert"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Content Management
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Manage news articles, media kits, job postings, site alerts and more from one place.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {['News', 'Media', 'Jobs', 'Alerts', 'Submissions'].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/15 border border-white/25"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} First Independent Power Limited
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8 lg:hidden">
            <Image
              src="/images/sustainability/logoimage.png"
              alt="FIPL"
              width={90}
              height={34}
              className="object-contain"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Admin sign in
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg px-3 py-2.5">
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #DB1B0C 0%, #c41508 100%)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeOpacity="0.25"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
            First Independent Power Limited &mdash; Admin Portal
          </p>
        </div>
      </div>
    </div>
  )
}

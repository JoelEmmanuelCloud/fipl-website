'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body className="antialiased">
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#ffffff',
            color: '#0e121d',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
              We're having trouble loading this page
            </h1>
            <p style={{ fontSize: '14px', color: '#797979', marginBottom: '28px' }}>
              Our systems are temporarily unavailable. Please try again in a moment.
            </p>
            <button
              onClick={reset}
              style={{
                background: '#DB1B0C',
                color: '#ffffff',
                fontWeight: 600,
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

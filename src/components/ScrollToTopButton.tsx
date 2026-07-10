'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-24 right-5 sm:right-8 w-11 h-11 rounded-full flex items-center justify-center z-40 bg-[var(--fipl-bg)] border border-[var(--fipl-border)] shadow-lg transition-transform hover:scale-110"
    >
      <ArrowUp className="w-5 h-5" style={{ color: '#DB1B0C' }} />
    </button>
  )
}

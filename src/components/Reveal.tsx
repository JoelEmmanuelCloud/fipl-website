'use client'

import { useEffect, useRef, useState, CSSProperties, ReactNode, ElementType } from 'react'

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'clip' | 'unblur'

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number       // seconds
  duration?: number    // seconds
  threshold?: number   // 0–1 viewport fraction
  className?: string
  style?: CSSProperties
  as?: ElementType
}

const ANIM: Record<RevealVariant, string> = {
  up:     'revealUp',
  down:   'revealDown',
  left:   'revealLeft',
  right:  'revealRight',
  scale:  'revealScale',
  fade:   'revealFade',
  clip:   'revealClip',
  unblur: 'revealUnblur',
}

const EASING: Record<RevealVariant, string> = {
  up:     'cubic-bezier(0.16,1,0.3,1)',
  down:   'cubic-bezier(0.16,1,0.3,1)',
  left:   'cubic-bezier(0.16,1,0.3,1)',
  right:  'cubic-bezier(0.16,1,0.3,1)',
  scale:  'cubic-bezier(0.34,1.4,0.64,1)',
  fade:   'ease',
  clip:   'cubic-bezier(0.22,1,0.36,1)',
  unblur: 'cubic-bezier(0.16,1,0.3,1)',
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.72,
  threshold = 0.1,
  className = '',
  style = {},
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const animStyle: CSSProperties = visible
    ? {
        animationName: ANIM[variant],
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        animationTimingFunction: EASING[variant],
      }
    : { opacity: 0 }

  return (
    <Tag ref={ref} className={className} style={{ ...style, ...animStyle }}>
      {children}
    </Tag>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'

const navLinks = [
  { href: '/about',          label: 'About Us' },
  { href: '/power-plants',   label: 'Power Plants & Operations' },
  { href: '/sustainability', label: 'Sustainability & CSR' },
  { href: '/news',           label: 'News & Media' },
  { href: '/careers',        label: 'Careers' },
  { href: '/contact',        label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll() // set correct state on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Transparent only on the homepage before scrolling
  const transparent = pathname === '/' && !scrolled

  return (
    <>
      {/* ─── Desktop / Tablet header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: transparent ? 'transparent' : '#ffffff',
          boxShadow: transparent
            ? 'none'
            : scrolled
              ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-4 h-[72px]">

          {/* Logo — inverted to white when nav is transparent over dark hero */}
          <Logo height={40} className="shrink-0" />

          {/* ── Desktop nav + Register With Us (all inside one ul for consistent spacing) ── */}
          <nav className="hidden lg:flex ml-auto">
            <ul className="flex items-center gap-0.5">
              {[...navLinks, { href: '/register', label: 'Register With Us' }].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-[11px] py-2 text-[13px] font-medium rounded transition-colors whitespace-nowrap ${
                      pathname === href
                        ? transparent
                          ? 'text-white font-semibold'
                          : 'text-primary font-semibold'
                        : transparent
                          ? 'text-white/85 hover:text-white'
                          : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Burger (mobile / tablet) ── */}
          <button
            className="lg:hidden ml-auto p-2 flex flex-col gap-[5px] shrink-0"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className={`block w-[22px] h-[2px] rounded transition-colors ${transparent ? 'bg-white' : 'bg-gray-700'}`} />
            <span className={`block w-[22px] h-[2px] rounded transition-colors ${transparent ? 'bg-white' : 'bg-gray-700'}`} />
            <span className={`block w-[22px] h-[2px] rounded transition-colors ${transparent ? 'bg-white' : 'bg-gray-700'}`} />
          </button>
        </div>
      </header>

      {/* ─── Mobile / Tablet full-screen menu overlay ─── */}
      <div
        className={`lg:hidden fixed inset-0 z-[200] flex flex-col px-6 py-5 overflow-y-auto transition-transform duration-[360ms] ease-[cubic-bezier(.4,0,.2,1)] ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(135deg, #E03027 0%, #F47820 100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close */}
        <button
          className="self-start text-white text-[32px] leading-none p-1 mb-10"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>

        {/* Links */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-5 py-[15px] text-[16px] font-medium rounded-xl transition-colors ${
                    pathname === href
                      ? 'bg-white font-bold'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                  style={pathname === href ? { color: '#E03027' } : {}}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Register CTA */}
        <div className="mt-6 pt-6 border-t border-white/25">
          <Link
            href="/register"
            className="flex justify-center items-center bg-white font-bold py-3.5 px-6 rounded-xl text-[15px]"
            style={{ color: '#E03027' }}
          >
            Register With Us ↗
          </Link>
        </div>
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

type Child = { href: string; label: string }
type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: Child[] }

const NAV: NavItem[] = [
  {
    label: 'Company',
    children: [
      { href: '/about', label: 'About Us' },
      { href: '/sustainability', label: 'Sustainability & CSR' },
    ],
  },
  { label: 'Power Plants', href: '/power-plants' },
  { label: 'News & Media', href: '/news' },
  {
    label: 'Work With Us',
    children: [
      { href: '/careers', label: 'Careers' },
      { href: '/register', label: 'Register With Us' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

const LINK_FONT: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '100%',
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 4l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const transparent = !scrolled

  const isItemActive = (item: NavItem) =>
    item.href ? pathname === item.href : (item.children?.some((c) => pathname === c.href) ?? false)

  const topLinkCls = (active: boolean) =>
    `flex items-center gap-1 px-3 py-2 rounded transition-colors whitespace-nowrap border-b-2 ${
      active
        ? transparent
          ? 'text-white border-white'
          : 'text-primary border-[#F47820]'
        : transparent
          ? 'text-white/85 hover:text-[#F47820] border-transparent'
          : 'text-gray-700 dark:text-gray-200 hover:text-[#F47820] border-transparent'
    }`

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: transparent ? 'transparent' : 'var(--fipl-nav-bg)',
          boxShadow: transparent ? 'none' : '0 4px 6px -1px rgb(0 0 0 / 0.08)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center h-[72px]">
          <Logo className="shrink-0" />

          <nav className="hidden lg:flex ml-auto items-center gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className={topLinkCls(isItemActive(item))}
                    style={LINK_FONT}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-0 w-full h-2" />

                  <div
                    className="absolute top-[calc(100%+8px)] left-0 min-w-[210px] opacity-0 invisible pointer-events-none
                               group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                               translate-y-2 group-hover:translate-y-0
                               transition-all duration-200 ease-out"
                  >
                    <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-gray-100 dark:border-[#334155] overflow-hidden py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-3 text-[13.5px] transition-colors ${
                            pathname === child.href
                              ? 'text-primary font-semibold bg-primary/5'
                              : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={topLinkCls(isItemActive(item))}
                  style={LINK_FONT}
                >
                  {item.label}
                </Link>
              ),
            )}
            <ThemeToggle className="ml-2" />
          </nav>

          <div className="lg:hidden ml-auto flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-3 flex flex-col gap-[5px] shrink-0 min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-[22px] h-[2px] rounded transition-colors ${
                    transparent ? 'bg-white' : 'bg-gray-700 dark:bg-gray-200'
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-[200] flex flex-col px-6 py-5 overflow-y-auto
                    transition-transform duration-[360ms] ease-[cubic-bezier(.4,0,.2,1)]
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'linear-gradient(135deg, #E03027 0%, #F47820 100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between mb-8">
          <Logo invert />
          <button
            className="text-white text-[32px] leading-none p-1"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-[15px] text-[16px] font-medium text-white/90 rounded-xl hover:bg-white/10 transition-colors"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileExpanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileExpanded === item.label && (
                    <ul className="ml-5 pl-4 border-l-2 border-white/30 flex flex-col gap-0.5 mb-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-3 text-[15px] rounded-xl transition-colors ${
                              pathname === child.href
                                ? 'bg-white font-bold'
                                : 'text-white/85 hover:bg-white/10'
                            }`}
                            style={pathname === child.href ? { color: '#E03027' } : {}}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className={`block px-5 py-[15px] text-[16px] font-medium rounded-xl transition-colors ${
                      pathname === item.href
                        ? 'bg-white font-bold'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                    style={pathname === item.href ? { color: '#E03027' } : {}}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

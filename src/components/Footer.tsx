import Link from 'next/link'
import { Logo } from '@/components/Logo'

const quickLinks = [
  { href: '/',                          label: 'Home' },
  { href: '/about',                     label: 'About Us' },
  { href: '/power-plants',              label: 'Our Plants' },
  { href: '/power-plants#how-we-work',  label: 'How We Work' },
  { href: '/careers',                   label: 'Careers' },
]

const plants = [
  { href: '/power-plants#afam',        label: 'Afam' },
  { href: '/power-plants#eleme',       label: 'Eleme' },
  { href: '/power-plants#omoku',       label: 'Omoku' },
  { href: '/power-plants#trans-amadi', label: 'Trans Amadi' },
]

const socialLinks = [
  { icon: 'f',  label: 'Facebook' },
  { icon: '𝕏', label: 'Twitter' },
  { icon: '●',  label: 'Instagram' },
  { icon: 'in', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer style={{ background: '#13132B' }} className="pt-14 pb-0">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand — full-width on mobile, 2-span on sm, 1-col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              FIPL is committed to delivering reliable power generation solutions while driving
              innovation and contributing to Nigeria&apos;s sustainable energy future.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-[34px] h-[34px] rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-sm transition-colors hover:bg-primary hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>Quick Links</h4>
            {/* 2-column grid on mobile, single column on larger screens */}
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 gap-x-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13.5px] transition-colors flex items-center gap-1.5 group"
                    style={{ color: '#888' }}
                  >
                    <span style={{ color: '#F47820', fontSize: '11px' }}>↗</span>
                    <span className="group-hover:text-accent transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Plants */}
          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>Our Plants</h4>
            {/* 2-column grid on mobile, single column on larger screens */}
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 gap-x-3">
              {plants.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13.5px] transition-colors flex items-center gap-1.5 group"
                    style={{ color: '#888' }}
                  >
                    <span style={{ color: '#F47820', fontSize: '11px' }}>↗</span>
                    <span className="group-hover:text-accent transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>Contact Us</h4>
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Address Location', value: '12 Circular Road, Presidential Estate, GRA, Port Harcourt' },
                { icon: '📞', label: 'Phone Number',     value: '+234 (0) 908 102 2226' },
                { icon: '✉',  label: 'Email address',    value: 'info@fipl-ng.com' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <div
                    className="w-[28px] h-[28px] shrink-0 rounded-md flex items-center justify-center text-xs text-white mt-0.5"
                    style={{ background: '#E03027' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wide mb-0.5" style={{ color: '#aaa' }}>
                      {label}
                    </span>
                    <span className="text-[13px]" style={{ color: '#888' }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-[13px]" style={{ color: '#555' }}>
        Copyright &copy; 2025{' '}
        <Link href="/" className="hover:underline" style={{ color: '#F47820' }}>FIPL</Link>.
        {' '}All Rights Reserved.
      </div>
    </footer>
  )
}

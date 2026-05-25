import Link from 'next/link'
import { Logo } from '@/components/Logo'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/power-plants', label: 'Our Plants' },
  { href: '/power-plants#how-we-work', label: 'How We Work' },
  { href: '/careers', label: 'Careers' },
]

const plants = [
  { href: '/power-plants#afam', label: 'Afam' },
  { href: '/power-plants#eleme', label: 'Eleme' },
  { href: '/power-plants#omoku', label: 'Omoku' },
  { href: '/power-plants#trans-amadi', label: 'Trans Amadi' },
]

const socialLinks = [
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ background: '#13132B' }} className="pt-14 pb-0">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
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
                  className="w-[34px] h-[34px] rounded-full bg-white/10 text-gray-400 flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-y-2.5">
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

          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>
              Our Plants
            </h4>
            <ul className="grid grid-cols-1 gap-y-2.5">
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

          <div>
            <h4 className="font-semibold mb-4 text-[15px]" style={{ color: '#fff' }}>
              Contact Us
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  ),
                  label: 'Address Location',
                  value: '12 Circular Road, Presidential Estate, GRA, Port Harcourt',
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
                    </svg>
                  ),
                  label: 'Phone Number',
                  value: '+234 (0) 908 102 2226',
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: 'Email address',
                  value: 'info@fipl-ng.com',
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <div
                    className="w-[28px] h-[28px] shrink-0 rounded-md flex items-center justify-center mt-0.5"
                    style={{ background: '#E03027' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wide mb-0.5"
                      style={{ color: '#aaa' }}
                    >
                      {label}
                    </span>
                    <span className="text-[13px]" style={{ color: '#888' }}>
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-[13px]" style={{ color: '#555' }}>
        Copyright &copy; 2025{' '}
        <Link href="/" className="hover:underline" style={{ color: '#F47820' }}>
          FIPL
        </Link>
        . All Rights Reserved.
      </div>
    </footer>
  )
}

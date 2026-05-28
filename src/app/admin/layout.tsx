'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import AdminNotificationBell from '@/components/AdminNotificationBell'
import { ToastProvider } from '@/components/AdminToast'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/news', label: 'News Articles' },
  { href: '/admin/media', label: 'Media Kits' },
  { href: '/admin/jobs', label: 'Jobs' },
  { href: '/admin/alerts', label: 'Site Alerts' },
  { href: '/admin/submissions', label: 'Contact Submissions' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-gray-50">
        <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col">
          <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-gray-900">FIPL Admin</span>
              <div className="text-xs text-gray-400 mt-0.5">Content Management</div>
            </div>
            <AdminNotificationBell />
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {NAV.map(({ href, label, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#DB1B0C]/10 text-[#DB1B0C]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="px-3 py-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </ToastProvider>
  )
}

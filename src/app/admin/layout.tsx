'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  ImageIcon,
  Briefcase,
  AlertTriangle,
  Mail,
  LogOut,
} from 'lucide-react'
import AdminNotificationBell from '@/components/AdminNotificationBell'
import { ToastProvider } from '@/components/AdminToast'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true, icon: LayoutDashboard },
  { href: '/admin/news', label: 'News Articles', icon: Newspaper },
  { href: '/admin/media', label: 'Media Kits', icon: ImageIcon },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/alerts', label: 'Site Alerts', icon: AlertTriangle },
  { href: '/admin/submissions', label: 'Submissions', icon: Mail },
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
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
        <aside className="w-56 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col">
          <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/sustainability/logoimage.png"
                alt="FIPL"
                width={52}
                height={20}
                className="object-contain dark:brightness-0 dark:invert dark:opacity-80"
              />
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
              <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Admin
              </span>
            </div>
            <AdminNotificationBell />
          </div>

          <nav className="flex-1 px-2 py-3 space-y-0.5">
            {NAV.map(({ href, label, exact, icon: Icon }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#DB1B0C]/8 text-[#DB1B0C]'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="px-2 py-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.8} />
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

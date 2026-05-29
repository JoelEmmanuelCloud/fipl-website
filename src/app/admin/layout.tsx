'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  ImageIcon,
  Briefcase,
  AlertTriangle,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import AdminNotificationBell from '@/components/AdminNotificationBell'
import { ToastProvider } from '@/components/AdminToast'
import { ThemeToggle } from '@/components/ThemeToggle'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true, icon: LayoutDashboard },
  { href: '/admin/news', label: 'News Articles', icon: Newspaper },
  { href: '/admin/media', label: 'Media Kits', icon: ImageIcon },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/alerts', label: 'Site Alerts', icon: AlertTriangle },
  { href: '/admin/submissions', label: 'Submissions', icon: Mail },
]

function getPageTitle(pathname: string): string {
  for (const { href, label, exact } of NAV) {
    if (exact ? pathname === href : pathname.startsWith(href)) return label
  }
  return 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
        <aside
          className={`shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-200 ease-in-out ${
            collapsed ? 'w-[60px]' : 'w-56'
          }`}
        >
          <div
            className={`h-14 border-b border-gray-100 dark:border-gray-800 flex items-center shrink-0 ${
              collapsed ? 'justify-center px-0' : 'justify-between px-4'
            }`}
          >
            {!collapsed && (
              <div className="flex items-center gap-2.5 min-w-0">
                <Image
                  src="/images/sustainability/logoimage.png"
                  alt="FIPL"
                  width={52}
                  height={20}
                  className="object-contain shrink-0 dark:brightness-0 dark:invert dark:opacity-80"
                />
                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 shrink-0" />
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider truncate">
                  Admin
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.2} />
              )}
            </button>
          </div>

          <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-hidden">
            {NAV.map(({ href, label, exact, icon: Icon }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`flex items-center gap-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  } ${
                    active
                      ? 'bg-[#DB1B0C]/10 text-[#DB1B0C]'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
                  {!collapsed && (
                    <span className="truncate">{label}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="px-2 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <button
              onClick={handleLogout}
              title={collapsed ? 'Sign Out' : undefined}
              className={`w-full flex items-center gap-2.5 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${
                collapsed ? 'justify-center px-0' : 'px-3'
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              {!collapsed && <span className="truncate">Sign Out</span>}
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {getPageTitle(pathname)}
            </span>
            <div className="flex items-center gap-1">
              <ThemeToggle className="text-gray-400 dark:text-gray-400" />
              <AdminNotificationBell />
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}

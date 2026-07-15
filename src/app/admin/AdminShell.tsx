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
  Quote,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  Leaf,
  Factory,
  ClipboardList,
  Handshake,
  Phone,
  Rss,
} from 'lucide-react'
import AdminNotificationBell from '@/components/AdminNotificationBell'
import AdminRefreshControl from '@/components/AdminRefreshControl'
import { ToastProvider } from '@/components/AdminToast'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { AdminRole } from '@/lib/admin-auth'

const NAV = [
  {
    href: '/admin',
    label: 'Dashboard',
    exact: true,
    icon: LayoutDashboard,
    roles: ['owner'] as AdminRole[],
  },
  {
    href: '/admin/pages/home',
    label: 'Home Page',
    icon: Home,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/about',
    label: 'About Page',
    icon: Info,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/sustainability',
    label: 'Sustainability Page',
    icon: Leaf,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/power-plants',
    label: 'Power Plants Page',
    icon: Factory,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/register',
    label: 'Register Page',
    icon: ClipboardList,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/careers',
    label: 'Careers Page',
    icon: Handshake,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/contact',
    label: 'Contact Page',
    icon: Phone,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/pages/news',
    label: 'News & Media Page',
    icon: Rss,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/news',
    label: 'News Articles',
    icon: Newspaper,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/media',
    label: 'Media Kits',
    icon: ImageIcon,
    roles: ['owner', 'content'] as AdminRole[],
  },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase, roles: ['owner', 'hr'] as AdminRole[] },
  {
    href: '/admin/alerts',
    label: 'Site Alerts',
    icon: AlertTriangle,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    icon: Quote,
    roles: ['owner', 'content'] as AdminRole[],
  },
  {
    href: '/admin/submissions',
    label: 'Submissions',
    icon: Mail,
    roles: ['owner', 'content'] as AdminRole[],
  },
]

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/admin/jobs/applications')) return 'Applications'
  for (const { href, label, exact } of NAV) {
    if (exact ? pathname === href : pathname.startsWith(href)) return label
  }
  return 'Admin'
}

interface Props {
  role: AdminRole | null
  children: React.ReactNode
}

export default function AdminShell({ role, children }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const visibleNav = NAV.filter((item) => role !== null && item.roles.includes(role))

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
                  className="object-contain shrink-0"
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
            {visibleNav.map(({ href, label, exact, icon: Icon }) => {
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
                  {!collapsed && <span className="truncate">{label}</span>}
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

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden page-bolt-bg">
          <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {getPageTitle(pathname)}
            </span>
            <div className="flex items-center gap-1">
              <AdminRefreshControl />
              <div className="w-px h-4 bg-gray-100 dark:bg-gray-800 mx-1" />
              <ThemeToggle className="text-gray-400 dark:text-gray-400" />
              <AdminNotificationBell />
              <div className="w-px h-4 bg-gray-100 dark:bg-gray-800 mx-1" />
              <button
                onClick={handleLogout}
                title="Sign Out"
                aria-label="Sign Out"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.8} />
              </button>
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

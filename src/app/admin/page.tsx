import { createServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Newspaper, ImageIcon, Briefcase, Mail, Plus, Bell } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getCounts() {
  const supabase = createServerClient()
  const [articles, jobs, media, submissions] = await Promise.all([
    supabase.from('news_articles').select('id', { count: 'exact', head: true }),
    supabase.from('jobs').select('id', { count: 'exact', head: true }),
    supabase.from('media_kits').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
  ])
  return {
    articles: articles.count ?? 0,
    jobs: jobs.count ?? 0,
    media: media.count ?? 0,
    submissions: submissions.count ?? 0,
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts()

  const stats = [
    {
      label: 'News Articles',
      value: counts.articles,
      href: '/admin/news',
      action: 'Manage',
      icon: Newspaper,
      iconColor: '#DB1B0C',
      iconBg: 'rgba(219,27,12,0.08)',
    },
    {
      label: 'Media Kits',
      value: counts.media,
      href: '/admin/media',
      action: 'Manage',
      icon: ImageIcon,
      iconColor: '#D97300',
      iconBg: 'rgba(217,115,0,0.08)',
    },
    {
      label: 'Open Jobs',
      value: counts.jobs,
      href: '/admin/jobs',
      action: 'Manage',
      icon: Briefcase,
      iconColor: '#2563eb',
      iconBg: 'rgba(37,99,235,0.08)',
    },
    {
      label: 'Submissions',
      value: counts.submissions,
      href: '/admin/submissions',
      action: 'View',
      icon: Mail,
      iconColor: '#16a34a',
      iconBg: 'rgba(22,163,74,0.08)',
    },
  ]

  const quickActions = [
    {
      href: '/admin/news/new',
      label: 'New Article',
      sub: 'Press release or news item',
      primary: true,
    },
    {
      href: '/admin/jobs/new',
      label: 'Post a Job',
      sub: 'Open role on careers page',
      primary: false,
      icon: Plus,
    },
    {
      href: '/admin/alerts',
      label: 'New Alert',
      sub: 'Publish a site-wide banner',
      primary: false,
      icon: Bell,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          FIPL website content overview
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, href, action, icon: Icon, iconColor, iconBg }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: iconBg }}
              >
                <Icon className="w-4 h-4" style={{ color: iconColor }} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-semibold text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
                {action} →
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums leading-none mb-1.5">
              {value}
            </div>
            <div className="text-xs font-medium text-gray-400 dark:text-gray-500">{label}</div>
          </Link>
        ))}
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map(({ href, label, sub, primary, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all ${
                primary
                  ? 'text-white hover:opacity-90'
                  : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm'
              }`}
              style={
                primary
                  ? {
                      background: 'linear-gradient(135deg, #DB1B0C 0%, #c41508 100%)',
                      border: 'none',
                    }
                  : undefined
              }
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  primary ? 'bg-white/15' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                {primary ? (
                  <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                ) : Icon ? (
                  <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={2} />
                ) : null}
              </div>
              <div>
                <div
                  className={`font-semibold text-sm ${primary ? 'text-white' : 'text-gray-800 dark:text-white'}`}
                >
                  {label}
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${primary ? 'text-white/60' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  {sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

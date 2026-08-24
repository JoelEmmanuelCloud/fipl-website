import { query } from '@/lib/db'
import Link from 'next/link'
import nextDynamic from 'next/dynamic'
import { Newspaper, ImageIcon, Briefcase, Mail, FileText, Plus, Bell } from 'lucide-react'
import DashboardActivityFeed from './DashboardActivityFeed'

export const dynamic = 'force-dynamic'

const DashboardAreaChart = nextDynamic(() => import('./DashboardAreaChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[190px] rounded-lg bg-gray-50 dark:bg-gray-800/40 animate-pulse" />
  ),
})

const DashboardDonutChart = nextDynamic(() => import('./DashboardDonutChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[170px] rounded-full mx-auto w-[170px] bg-gray-50 dark:bg-gray-800/40 animate-pulse" />
  ),
})

function getLast6Months() {
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleString('en', { month: 'short' }),
    })
  }
  return months
}

async function getDashboardData() {
  const months = getLast6Months()
  const fromDate = `${months[0].key}-01`

  const [
    articlesCount,
    jobsCount,
    mediaCount,
    submissionsCount,
    applicationsCount,
    articleDates,
    allApplications,
    recentSubmissions,
    recentApplications,
  ] = await Promise.all([
    query<{ count: number }>('select count(*) as count from news_articles'),
    query<{ count: number }>('select count(*) as count from jobs'),
    query<{ count: number }>('select count(*) as count from media_kits'),
    query<{ count: number }>('select count(*) as count from contact_submissions'),
    query<{ count: number }>(
      "select count(*) as count from job_applications where status = 'pending'",
    ),
    query<{ date_iso: string }>('select date_iso from news_articles where date_iso >= ?', [
      fromDate,
    ]),
    query<{ status: string }>('select status from job_applications'),
    query<{
      id: string
      first_name: string
      last_name: string
      subject: string | null
      created_at: string
    }>(
      'select id, first_name, last_name, subject, created_at from contact_submissions order by created_at desc limit 5',
    ),
    query<{
      id: string
      first_name: string
      last_name: string
      job_title: string
      status: string
      created_at: string
    }>(
      'select id, first_name, last_name, job_title, status, created_at from job_applications order by created_at desc limit 5',
    ),
  ])

  const countsByMonth: Record<string, number> = Object.fromEntries(months.map((m) => [m.key, 0]))
  for (const row of articleDates) {
    const key = row.date_iso.slice(0, 7)
    if (key in countsByMonth) countsByMonth[key]++
  }
  const chartData = months.map((m) => ({ month: m.label, articles: countsByMonth[m.key] }))

  const pipeline = { pending: 0, reviewed: 0, shortlisted: 0, rejected: 0 }
  for (const row of allApplications) {
    if (row.status in pipeline) pipeline[row.status as keyof typeof pipeline]++
  }
  const pipelineSegments = [
    { name: 'Pending', value: pipeline.pending, color: '#F47820' },
    { name: 'Reviewed', value: pipeline.reviewed, color: '#2563eb' },
    { name: 'Shortlisted', value: pipeline.shortlisted, color: '#16a34a' },
    { name: 'Rejected', value: pipeline.rejected, color: '#DB1B0C' },
  ]
  const pipelineTotal = Object.values(pipeline).reduce((a, b) => a + b, 0)

  const feedItems = [
    ...recentSubmissions.map((s) => ({
      id: `sub-${s.id}`,
      type: 'submission' as const,
      name: `${s.first_name} ${s.last_name}`,
      detail: s.subject ?? 'Contact inquiry',
      createdAt: s.created_at,
    })),
    ...recentApplications.map((a) => ({
      id: `app-${a.id}`,
      type: 'application' as const,
      name: `${a.first_name} ${a.last_name}`,
      detail: `applied for ${a.job_title}`,
      status: a.status,
      createdAt: a.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)

  return {
    counts: {
      articles: articlesCount[0]?.count ?? 0,
      jobs: jobsCount[0]?.count ?? 0,
      media: mediaCount[0]?.count ?? 0,
      submissions: submissionsCount[0]?.count ?? 0,
      applications: applicationsCount[0]?.count ?? 0,
    },
    chartData,
    pipelineSegments,
    pipelineTotal,
    feedItems,
  }
}

export default async function AdminDashboard() {
  const { counts, chartData, pipelineSegments, pipelineTotal, feedItems } = await getDashboardData()

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
    {
      label: 'Pending Applications',
      value: counts.applications,
      href: '/admin/jobs/applications',
      action: 'Review',
      icon: FileText,
      iconColor: '#7c3aed',
      iconBg: 'rgba(124,58,237,0.08)',
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

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Publishing Activity
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Articles published over the last 6 months
            </p>
          </div>
          <DashboardAreaChart data={chartData} />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            Application Pipeline
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-4">
            Current status breakdown
          </p>
          <DashboardDonutChart segments={pipelineSegments} total={pipelineTotal} />
          <div className="mt-4 space-y-2.5">
            {pipelineSegments.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800 dark:text-white tabular-nums">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Recent Activity</p>
          <span className="text-[11px] text-gray-400 dark:text-gray-600">
            Submissions &amp; applications
          </span>
        </div>
        <DashboardActivityFeed items={feedItems} />
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

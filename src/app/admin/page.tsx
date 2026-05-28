import { createServerClient } from '@/lib/supabase-server'
import Link from 'next/link'

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
    { label: 'News Articles', value: counts.articles, href: '/admin/news', action: 'Manage' },
    { label: 'Media Kits', value: counts.media, href: '/admin/media', action: 'Manage' },
    { label: 'Open Jobs', value: counts.jobs, href: '/admin/jobs', action: 'Manage' },
    { label: 'Contact Submissions', value: counts.submissions, href: '/admin/submissions', action: 'View' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, href, action }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-500 mb-4">{label}</div>
            <Link
              href={href}
              className="text-xs font-semibold text-[#DB1B0C] hover:underline"
            >
              {action} →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/news/new"
          className="flex items-center gap-3 bg-[#DB1B0C] text-white rounded-xl p-5 hover:bg-[#b81508] transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-lg font-bold">+</div>
          <div>
            <div className="font-semibold text-sm">New Article</div>
            <div className="text-xs text-white/70">Publish a press release or news item</div>
          </div>
        </Link>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#DB1B0C] transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-[#DB1B0C]/10 flex items-center justify-center text-lg font-bold text-[#DB1B0C]">+</div>
          <div>
            <div className="font-semibold text-sm text-gray-900">Post a Job</div>
            <div className="text-xs text-gray-500">Add a new open role to the careers page</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

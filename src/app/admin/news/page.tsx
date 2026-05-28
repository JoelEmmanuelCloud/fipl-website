import { createServerClient } from '@/lib/supabase-server'
import type { NewsArticleRow } from '@/lib/database.types'
import Link from 'next/link'
import NewsArticleActions from './NewsArticleActions'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('news_articles')
    .select('*')
    .order('date_iso', { ascending: false })

  const articles = (data ?? []) as NewsArticleRow[]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">News Articles</h1>
        <Link
          href="/admin/news/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
          No articles yet. Publish your first article.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 truncate max-w-xs">{a.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-[#DB1B0C]/10 text-[#DB1B0C] text-xs font-semibold px-2 py-0.5 rounded">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{a.date}</td>
                  <td className="px-4 py-3">
                    <NewsArticleActions id={a.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

import { createServerClient } from '@/lib/supabase-server'
import type { NewsArticleRow } from '@/lib/database.types'
import Link from 'next/link'
import NewsArticleActions from './NewsArticleActions'
import AdminPagination from '@/components/AdminPagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

export default async function AdminNewsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = createServerClient()
  const { data, count } = await supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('date_iso', { ascending: false })
    .range(from, to)

  const articles = (data ?? []) as NewsArticleRow[]
  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Articles</h1>
        <Link
          href="/admin/news/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          No articles yet. Publish your first article.
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                        {a.title}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {a.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-[#DB1B0C]/10 text-[#DB1B0C] text-xs font-semibold px-2 py-0.5 rounded">
                        {a.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{a.date}</td>
                    <td className="px-4 py-3">
                      <NewsArticleActions id={a.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            basePath="/admin/news"
          />
        </>
      )}
    </div>
  )
}

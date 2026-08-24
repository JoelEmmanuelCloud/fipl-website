import { query } from '@/lib/db'
import type { NewsArticleRow } from '@/lib/database.types'
import Link from 'next/link'
import { Suspense } from 'react'
import NewsArticleActions from './NewsArticleActions'
import AdminPagination from '@/components/AdminPagination'
import ArticleSearchInput from './ArticleSearchInput'
import { ADMIN_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = ADMIN_PAGE_SIZE
const CATEGORIES = ['Operations', 'Community', 'Corporate', 'Partnerships', 'Updates'] as const

const CATEGORY_COLOR: Record<string, string> = {
  Operations: 'bg-[#DB1B0C]/10 text-[#DB1B0C]',
  Community: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  Corporate: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
  Partnerships: 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  Updates: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
}

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; q?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const category = searchParams.category ?? ''
  const q = searchParams.q ?? ''
  const from = (page - 1) * PAGE_SIZE

  const conditions: string[] = []
  const params: unknown[] = []
  if (category) {
    conditions.push('category = ?')
    params.push(category)
  }
  if (q) {
    conditions.push('title like ?')
    params.push(`%${q}%`)
  }
  const where = conditions.length > 0 ? `where ${conditions.join(' and ')}` : ''

  const [countRows, articles] = await Promise.all([
    query<{ count: number }>(`select count(*) as count from news_articles ${where}`, params),
    query<NewsArticleRow>(
      `select * from news_articles ${where} order by date_iso desc limit ? offset ?`,
      [...params, PAGE_SIZE, from],
    ),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const filterParams = new URLSearchParams()
  if (category) filterParams.set('category', category)
  if (q) filterParams.set('q', q)
  const paginationBase = `/admin/news${filterParams.size ? `?${filterParams}` : ''}`

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">News Articles</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 tabular-nums">
            {totalCount} article{totalCount !== 1 ? 's' : ''}
            {category ? ` in ${category}` : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + New Article
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          <Link
            href={q ? `/admin/news?q=${q}` : '/admin/news'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !category
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={q ? `/admin/news?category=${cat}&q=${q}` : `/admin/news?category=${cat}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
        <Suspense fallback={null}>
          <ArticleSearchInput defaultValue={q} category={category} />
        </Suspense>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          {q || category
            ? 'No articles match your filters.'
            : 'No articles yet. Publish your first article.'}
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="w-12 px-4 py-3" />
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors last:border-0"
                  >
                    <td className="px-4 py-3">
                      {a.image_url ? (
                        <img
                          src={a.image_url}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                        {a.title}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-mono truncate max-w-xs">
                        {a.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
                          CATEGORY_COLOR[a.category] ??
                          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {a.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden md:table-cell whitespace-nowrap">
                      {a.date}
                    </td>
                    <td className="px-4 py-3">
                      <NewsArticleActions id={a.id} slug={a.slug} />
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
            basePath={paginationBase}
          />
        </>
      )}
    </div>
  )
}

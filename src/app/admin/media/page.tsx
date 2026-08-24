import { query } from '@/lib/db'
import type { MediaKitRow } from '@/lib/database.types'
import Link from 'next/link'
import { Suspense } from 'react'
import MediaGrid from './MediaGrid'
import AdminPagination from '@/components/AdminPagination'
import MediaSearchInput from './MediaSearchInput'
import { MEDIA_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = MEDIA_PAGE_SIZE
const CATEGORIES = ['Our Plants', 'People', 'Events', 'FIPL Foundation'] as const

export default async function AdminMediaPage({
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

  const [countRows, items] = await Promise.all([
    query<{ count: number }>(`select count(*) as count from media_kits ${where}`, params),
    query<MediaKitRow>(
      `select * from media_kits ${where} order by created_at desc limit ? offset ?`,
      [...params, PAGE_SIZE, from],
    ),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const filterParams = new URLSearchParams()
  if (category) filterParams.set('category', category)
  if (q) filterParams.set('q', q)
  const paginationBase = `/admin/media${filterParams.size ? `?${filterParams}` : ''}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Media Kits</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 tabular-nums">
            {totalCount} item{totalCount !== 1 ? 's' : ''}
            {category ? ` in ${category}` : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
        <Link
          href="/admin/media/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + Upload Media
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          <Link
            href={q ? `/admin/media?q=${q}` : '/admin/media'}
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
              href={
                q
                  ? `/admin/media?category=${encodeURIComponent(cat)}&q=${q}`
                  : `/admin/media?category=${encodeURIComponent(cat)}`
              }
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
          <MediaSearchInput defaultValue={q} category={category} />
        </Suspense>
      </div>

      <MediaGrid items={items} />

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        basePath={paginationBase}
      />
    </div>
  )
}

import { query } from '@/lib/db'
import type { TestimonialRow } from '@/lib/database.types'
import Link from 'next/link'
import AdminPagination from '@/components/AdminPagination'
import TestimonialActions from './TestimonialActions'
import { TESTIMONIALS_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = TESTIMONIALS_PAGE_SIZE

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const from = (page - 1) * PAGE_SIZE

  const [countRows, testimonials] = await Promise.all([
    query<{ count: number }>('select count(*) as count from testimonials'),
    query<TestimonialRow>('select * from testimonials order by created_at desc limit ? offset ?', [
      PAGE_SIZE,
      from,
    ]),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
            Active testimonials appear in the carousel on the About page.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="shrink-0 bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + New Testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          No testimonials yet. Add your first one.
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800 overflow-hidden">
            {testimonials.map((t) => (
              <div key={t.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        t.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {t.is_active ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed line-clamp-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-1.5">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">{t.role}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <TestimonialActions id={t.id} isActive={t.is_active} />
                </div>
              </div>
            ))}
          </div>
          <AdminPagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            basePath="/admin/testimonials"
          />
        </>
      )}
    </div>
  )
}

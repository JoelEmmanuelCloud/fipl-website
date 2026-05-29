import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page: number
  totalPages: number
  totalCount: number
  pageSize: number
  basePath: string
}

export default function AdminPagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  basePath,
}: Props) {
  if (totalPages <= 1) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('ellipsis-start')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('ellipsis-end')
    pages.push(totalPages)
  }

  const base =
    'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors'
  const activeCls = `${base} bg-[#DB1B0C] text-white`
  const inactiveCls = `${base} text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white`
  const disabledCls = `${base} text-gray-300 dark:text-gray-700 pointer-events-none`

  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
      <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
        {from}–{to} of {totalCount}
      </span>
      <div className="flex items-center gap-1">
        {page > 1 ? (
          <Link href={`${basePath}?page=${page - 1}`} className={inactiveCls}>
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        ) : (
          <span className={disabledCls}>
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
        )}

        {pages.map((p) =>
          p === 'ellipsis-start' || p === 'ellipsis-end' ? (
            <span
              key={p}
              className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600"
            >
              …
            </span>
          ) : (
            <Link
              key={p}
              href={`${basePath}?page=${p}`}
              className={p === page ? activeCls : inactiveCls}
            >
              {p}
            </Link>
          ),
        )}

        {page < totalPages ? (
          <Link href={`${basePath}?page=${page + 1}`} className={inactiveCls}>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        ) : (
          <span className={disabledCls}>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
        )}
      </div>
    </div>
  )
}

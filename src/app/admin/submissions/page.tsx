import { query } from '@/lib/db'
import type { ContactSubmissionRow } from '@/lib/database.types'
import { Suspense } from 'react'
import Link from 'next/link'
import AdminPagination from '@/components/AdminPagination'
import SubmissionCard from './SubmissionCard'
import SubmissionSearchInput from './SubmissionSearchInput'
import { ADMIN_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = ADMIN_PAGE_SIZE

const SUBJECTS = [
  'General Enquiry',
  'Vendor Registration',
  'Careers',
  'Eligible Customers',
  'Media & Press',
  'Partnership',
] as const

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; subject?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const q = searchParams.q ?? ''
  const subject = searchParams.subject ?? ''
  const from = (page - 1) * PAGE_SIZE

  const conditions: string[] = []
  const params: unknown[] = []
  if (subject) {
    conditions.push('subject = ?')
    params.push(subject)
  }
  if (q) {
    conditions.push('(first_name like ? or last_name like ? or email like ?)')
    params.push(`%${q}%`, `%${q}%`, `%${q}%`)
  }
  const where = conditions.length > 0 ? `where ${conditions.join(' and ')}` : ''

  const [countRows, submissions] = await Promise.all([
    query<{ count: number }>(`select count(*) as count from contact_submissions ${where}`, params),
    query<ContactSubmissionRow>(
      `select * from contact_submissions ${where} order by created_at desc limit ? offset ?`,
      [...params, PAGE_SIZE, from],
    ),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const filterParams = new URLSearchParams()
  if (subject) filterParams.set('subject', subject)
  if (q) filterParams.set('q', q)
  const paginationBase = `/admin/submissions${filterParams.size ? `?${filterParams}` : ''}`

  function tabHref(value: string) {
    const p = new URLSearchParams()
    if (value) p.set('subject', value)
    if (q) p.set('q', q)
    return `/admin/submissions${p.size ? `?${p}` : ''}`
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Submissions</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 tabular-nums">
            {totalCount} submission{totalCount !== 1 ? 's' : ''}
            {subject ? ` in ${subject}` : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
        <Suspense fallback={null}>
          <SubmissionSearchInput defaultValue={q} subject={subject} />
        </Suspense>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <Link
          href={tabHref('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !subject
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          All
        </Link>
        {SUBJECTS.map((s) => (
          <Link
            key={s}
            href={tabHref(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              subject === s
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          {q || subject ? 'No submissions match your filters.' : 'No submissions yet.'}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {submissions.map((s) => (
              <SubmissionCard key={s.id} s={s} />
            ))}
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

import { query } from '@/lib/db'
import type { JobRow } from '@/lib/database.types'
import Link from 'next/link'
import { Suspense } from 'react'
import JobActions from './JobActions'
import AdminPagination from '@/components/AdminPagination'
import JobSearchInput from './JobSearchInput'
import JobsTabNav from './JobsTabNav'
import { ADMIN_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = ADMIN_PAGE_SIZE

const TYPE_COLOR: Record<string, string> = {
  'Full Time': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  'Part Time': 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
  Contract: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
  Internship: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400',
}

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; q?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const status = searchParams.status ?? ''
  const q = searchParams.q ?? ''
  const from = (page - 1) * PAGE_SIZE

  const conditions: string[] = []
  const params: unknown[] = []
  if (status === 'active') {
    conditions.push('is_active = 1')
  } else if (status === 'closed') {
    conditions.push('is_active = 0')
  }
  if (q) {
    conditions.push('title like ?')
    params.push(`%${q}%`)
  }
  const where = conditions.length > 0 ? `where ${conditions.join(' and ')}` : ''

  const [countRows, jobs] = await Promise.all([
    query<{ count: number }>(`select count(*) as count from jobs ${where}`, params),
    query<JobRow>(`select * from jobs ${where} order by created_at desc limit ? offset ?`, [
      ...params,
      PAGE_SIZE,
      from,
    ]),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const filterParams = new URLSearchParams()
  if (status) filterParams.set('status', status)
  if (q) filterParams.set('q', q)
  const paginationBase = `/admin/jobs${filterParams.size ? `?${filterParams}` : ''}`

  return (
    <div className="space-y-5">
      <JobsTabNav />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Jobs</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 tabular-nums">
            {totalCount} job{totalCount !== 1 ? 's' : ''}
            {status ? ` · ${status}` : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + Post Job
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {(['', 'active', 'closed'] as const).map((s) => {
            const label = s === '' ? 'All' : s === 'active' ? 'Active' : 'Closed'
            const href = (() => {
              const p = new URLSearchParams()
              if (s) p.set('status', s)
              if (q) p.set('q', q)
              return `/admin/jobs${p.size ? `?${p}` : ''}`
            })()
            return (
              <Link
                key={label}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  status === s
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <Suspense fallback={null}>
          <JobSearchInput defaultValue={q} status={status} />
        </Suspense>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          {q || status ? 'No jobs match your filters.' : 'No jobs posted yet.'}
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Job
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden sm:table-cell">
                    Department
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr
                    key={j.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{j.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {j.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      {j.department}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
                          TYPE_COLOR[j.type] ??
                          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {j.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
                          j.is_active
                            ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {j.is_active ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <JobActions id={j.id} isActive={j.is_active} />
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

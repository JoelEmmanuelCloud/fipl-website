import { query } from '@/lib/db'
import Link from 'next/link'
import AdminPagination from '@/components/AdminPagination'
import AlertActions from './AlertActions'
import { ADMIN_PAGE_SIZE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = ADMIN_PAGE_SIZE

type AlertType = 'info' | 'warning' | 'critical'

interface AlertRow {
  id: string
  title: string
  message: string
  type: AlertType
  is_active: boolean
  created_at: string
}

const TYPE_STYLES: Record<AlertType, string> = {
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

const TYPE_TABS = [
  { label: 'All', value: '' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Critical', value: 'critical' },
] as const

export default async function AdminAlertsPage({
  searchParams,
}: {
  searchParams: { page?: string; type?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const type = searchParams.type ?? ''
  const from = (page - 1) * PAGE_SIZE

  const where = type ? 'where type = ?' : ''
  const params = type ? [type] : []

  const [countRows, alerts] = await Promise.all([
    query<{ count: number }>(`select count(*) as count from alerts ${where}`, params),
    query<AlertRow>(`select * from alerts ${where} order by created_at desc limit ? offset ?`, [
      ...params,
      PAGE_SIZE,
      from,
    ]),
  ])

  const totalCount = countRows[0]?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const paginationBase = `/admin/alerts${type ? `?type=${type}` : ''}`

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Site Alerts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
            Active alerts appear as a dismissible banner at the top of every public page.
          </p>
        </div>
        <Link
          href="/admin/alerts/new"
          className="shrink-0 bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + New Alert
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {TYPE_TABS.map(({ label, value }) => (
          <Link
            key={value}
            href={value ? `/admin/alerts?type=${value}` : '/admin/alerts'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              type === value
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          {type ? `No ${type} alerts.` : 'No alerts yet. Publish your first alert.'}
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800 overflow-hidden">
            {alerts.map((alert) => (
              <div key={alert.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${TYPE_STYLES[alert.type]}`}
                    >
                      {alert.type}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        alert.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {alert.is_active ? 'Live' : 'Off'}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">
                    {alert.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {alert.message}
                  </div>
                </div>
                <div className="shrink-0">
                  <AlertActions id={alert.id} isActive={alert.is_active} />
                </div>
              </div>
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

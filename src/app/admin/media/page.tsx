import { createServerClient } from '@/lib/supabase-server'
import type { MediaKitRow } from '@/lib/database.types'
import MediaUploader from './MediaUploader'
import MediaGrid from './MediaGrid'
import AdminPagination from '@/components/AdminPagination'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 12

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = createServerClient()
  const { data, count } = await supabase
    .from('media_kits')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  const items = (data ?? []) as MediaKitRow[]
  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Kits</h1>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Upload New Media
        </h2>
        <MediaUploader />
      </div>
      <MediaGrid items={items} />
      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        basePath="/admin/media"
      />
    </div>
  )
}

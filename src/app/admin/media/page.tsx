import { createServerClient } from '@/lib/supabase-server'
import type { MediaKitRow } from '@/lib/database.types'
import MediaUploader from './MediaUploader'
import MediaGrid from './MediaGrid'

export const dynamic = 'force-dynamic'

export default async function AdminMediaPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('media_kits')
    .select('*')
    .order('created_at', { ascending: false })

  const items = (data ?? []) as MediaKitRow[]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Kits</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Upload New Media</h2>
        <MediaUploader />
      </div>
      <MediaGrid items={items} />
    </div>
  )
}

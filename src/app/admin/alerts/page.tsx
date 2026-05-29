import { createServerClient } from '@/lib/supabase-server'
import AlertManager from './AlertManager'

export const dynamic = 'force-dynamic'

export default async function AdminAlertsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Alerts</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Active alerts appear as a dismissible banner at the top of every public page.
        </p>
      </div>
      <AlertManager initialAlerts={data ?? []} />
    </div>
  )
}

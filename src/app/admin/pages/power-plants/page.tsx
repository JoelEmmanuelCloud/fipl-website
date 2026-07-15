import { createServerClient } from '@/lib/supabase-server'
import { defaultPowerPlantsContent } from '@/lib/page-content-defaults'
import type { PageContentRow, PowerPlantsContent } from '@/lib/database.types'
import PowerPlantsContentForm from './PowerPlantsContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminPowerPlantsPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', 'power-plants')
    .maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<PowerPlantsContent> | undefined
  const content: PowerPlantsContent = {
    intro: stored?.intro ?? defaultPowerPlantsContent.intro,
    workProcess: stored?.workProcess ?? defaultPowerPlantsContent.workProcess,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Power Plants Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the intro text and work-process heading. The plant list itself is managed in code —
          contact your developer to add or change a plant.
        </p>
      </div>
      <PowerPlantsContentForm content={content} />
    </div>
  )
}

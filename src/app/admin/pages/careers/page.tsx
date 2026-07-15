import { createServerClient } from '@/lib/supabase-server'
import { defaultCareersContent } from '@/lib/page-content-defaults'
import type { CareersContent, PageContentRow } from '@/lib/database.types'
import CareersContentForm from './CareersContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminCareersPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', 'careers')
    .maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<CareersContent> | undefined
  const content: CareersContent = {
    whyJoin: stored?.whyJoin ?? defaultCareersContent.whyJoin,
    evpCards: stored?.evpCards ?? defaultCareersContent.evpCards,
    workingInFipl: stored?.workingInFipl ?? defaultCareersContent.workingInFipl,
    talentPool: stored?.talentPool ?? defaultCareersContent.talentPool,
    ctaCard: stored?.ctaCard ?? defaultCareersContent.ctaCard,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Careers Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the careers landing page content. Open roles themselves are managed under Jobs.
        </p>
      </div>
      <CareersContentForm content={content} />
    </div>
  )
}

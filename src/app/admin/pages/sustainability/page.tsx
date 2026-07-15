import { createServerClient } from '@/lib/supabase-server'
import { defaultSustainabilityContent } from '@/lib/page-content-defaults'
import type { PageContentRow, SustainabilityContent } from '@/lib/database.types'
import SustainabilityContentForm from './SustainabilityContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminSustainabilityPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', 'sustainability')
    .maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<SustainabilityContent> | undefined
  const content: SustainabilityContent = {
    weCare: stored?.weCare ?? defaultSustainabilityContent.weCare,
    focusAreas: stored?.focusAreas ?? defaultSustainabilityContent.focusAreas,
    sustainabilityBlock:
      stored?.sustainabilityBlock ?? defaultSustainabilityContent.sustainabilityBlock,
    healthSafety: stored?.healthSafety ?? defaultSustainabilityContent.healthSafety,
    governance: stored?.governance ?? defaultSustainabilityContent.governance,
    sdg: stored?.sdg ?? defaultSustainabilityContent.sdg,
    community: stored?.community ?? defaultSustainabilityContent.community,
    projects: stored?.projects ?? defaultSustainabilityContent.projects,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sustainability Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the sustainability &amp; CSR page content
        </p>
      </div>
      <SustainabilityContentForm content={content} />
    </div>
  )
}

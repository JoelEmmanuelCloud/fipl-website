import { queryOne } from '@/lib/db'
import { defaultSustainabilityContent } from '@/lib/page-content-defaults'
import type { SustainabilityContent } from '@/lib/database.types'
import SustainabilityContentForm from './SustainabilityContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminSustainabilityPagePage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'sustainability',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<SustainabilityContent>) : undefined
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

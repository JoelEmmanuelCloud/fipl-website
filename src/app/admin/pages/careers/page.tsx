import { queryOne } from '@/lib/db'
import { defaultCareersContent } from '@/lib/page-content-defaults'
import type { CareersContent } from '@/lib/database.types'
import CareersContentForm from './CareersContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminCareersPagePage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'careers',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<CareersContent>) : undefined
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

import { queryOne } from '@/lib/db'
import { defaultHomeContent } from '@/lib/page-content-defaults'
import type { HomeContent } from '@/lib/database.types'
import HomeContentForm from './HomeContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminHomePagePage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'home',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<HomeContent>) : undefined
  const content: HomeContent = {
    hero: stored?.hero ?? defaultHomeContent.hero,
    whoWeAre: stored?.whoWeAre ?? defaultHomeContent.whoWeAre,
    sustainabilityCta: stored?.sustainabilityCta ?? defaultHomeContent.sustainabilityCta,
    communityBanner: stored?.communityBanner ?? defaultHomeContent.communityBanner,
    careersSection: stored?.careersSection ?? defaultHomeContent.careersSection,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Home Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the hero slideshow, impact card, and the marketing sections shown on the home page
        </p>
      </div>
      <HomeContentForm content={content} />
    </div>
  )
}

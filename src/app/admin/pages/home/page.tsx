import { createServerClient } from '@/lib/supabase-server'
import { defaultHomeContent } from '@/lib/page-content-defaults'
import type { HomeContent, PageContentRow } from '@/lib/database.types'
import HomeContentForm from './HomeContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminHomePagePage() {
  const supabase = createServerClient()
  const { data } = await supabase.from('page_content').select('*').eq('page', 'home').maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<HomeContent> | undefined
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

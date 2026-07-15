import { createServerClient } from '@/lib/supabase-server'
import { defaultAboutContent } from '@/lib/page-content-defaults'
import type { AboutContent, PageContentRow } from '@/lib/database.types'
import AboutContentForm from './AboutContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminAboutPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase.from('page_content').select('*').eq('page', 'about').maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<AboutContent> | undefined
  const content: AboutContent = {
    purpose: stored?.purpose ?? defaultAboutContent.purpose,
    vision: stored?.vision ?? defaultAboutContent.vision,
    mission: stored?.mission ?? defaultAboutContent.mission,
    coreValues: stored?.coreValues ?? defaultAboutContent.coreValues,
    ceo: stored?.ceo ?? defaultAboutContent.ceo,
    integrity: stored?.integrity ?? defaultAboutContent.integrity,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">About Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the purpose statement, vision/mission, core values, CEO section, and integrity
          callout
        </p>
      </div>
      <AboutContentForm content={content} />
    </div>
  )
}

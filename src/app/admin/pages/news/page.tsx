import { createServerClient } from '@/lib/supabase-server'
import { defaultNewsContent } from '@/lib/page-content-defaults'
import type { NewsContent, PageContentRow } from '@/lib/database.types'
import NewsContentForm from './NewsContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPageContentPage() {
  const supabase = createServerClient()
  const { data } = await supabase.from('page_content').select('*').eq('page', 'news').maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<NewsContent> | undefined
  const content: NewsContent = {
    insights: stored?.insights ?? defaultNewsContent.insights,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">News &amp; Media Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the heading shown above the featured insights on the News &amp; Media page. The
          articles and media kits themselves are managed under News Articles and Media Kits.
        </p>
      </div>
      <NewsContentForm content={content} />
    </div>
  )
}

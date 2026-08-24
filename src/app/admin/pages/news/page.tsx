import { queryOne } from '@/lib/db'
import { defaultNewsContent } from '@/lib/page-content-defaults'
import type { NewsContent } from '@/lib/database.types'
import NewsContentForm from './NewsContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminNewsPageContentPage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'news',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<NewsContent>) : undefined
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

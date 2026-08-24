import { queryOne } from '@/lib/db'
import { defaultContactContent } from '@/lib/page-content-defaults'
import type { ContactContent } from '@/lib/database.types'
import ContactContentForm from './ContactContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminContactPagePage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'contact',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<ContactContent>) : undefined
  const content: ContactContent = {
    getInTouch: stored?.getInTouch ?? defaultContactContent.getInTouch,
    contactItems: stored?.contactItems ?? defaultContactContent.contactItems,
    newsletter: stored?.newsletter ?? defaultContactContent.newsletter,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Contact Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the intro text, contact details, and newsletter callout
        </p>
      </div>
      <ContactContentForm content={content} />
    </div>
  )
}

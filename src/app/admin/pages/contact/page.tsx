import { createServerClient } from '@/lib/supabase-server'
import { defaultContactContent } from '@/lib/page-content-defaults'
import type { ContactContent, PageContentRow } from '@/lib/database.types'
import ContactContentForm from './ContactContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminContactPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', 'contact')
    .maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<ContactContent> | undefined
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

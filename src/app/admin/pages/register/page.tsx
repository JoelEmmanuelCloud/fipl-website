import { createServerClient } from '@/lib/supabase-server'
import { defaultRegisterContent } from '@/lib/page-content-defaults'
import type { PageContentRow, RegisterContent } from '@/lib/database.types'
import RegisterContentForm from './RegisterContentForm'

export const dynamic = 'force-dynamic'

export default async function AdminRegisterPagePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', 'register')
    .maybeSingle()

  const row = data as PageContentRow | null
  const stored = row?.content as Partial<RegisterContent> | undefined
  const content: RegisterContent = {
    intro: stored?.intro ?? defaultRegisterContent.intro,
    duns: stored?.duns ?? defaultRegisterContent.duns,
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Register Page</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Edit the intro and DUNS Number sections. The requirements accordion and contact cards are
          managed in code.
        </p>
      </div>
      <RegisterContentForm content={content} />
    </div>
  )
}

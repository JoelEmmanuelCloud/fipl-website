import { queryOne } from '@/lib/db'
import { defaultRegisterContent } from '@/lib/page-content-defaults'
import type { RegisterContent } from '@/lib/database.types'
import RegisterContentForm from './RegisterContentForm'

export const dynamic = 'force-dynamic'

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export default async function AdminRegisterPagePage() {
  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    'register',
  ])

  const stored = row ? (JSON.parse(row.content) as Partial<RegisterContent>) : undefined
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

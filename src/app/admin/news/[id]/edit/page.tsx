import { createServerClient } from '@/lib/supabase-server'
import type { NewsArticleRow } from '@/lib/database.types'
import ArticleForm from '../../ArticleForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data } = await supabase.from('news_articles').select('*').eq('id', params.id).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Article</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <ArticleForm article={data as NewsArticleRow} />
      </div>
    </div>
  )
}

import { createServerClient } from '@/lib/supabase-server'
import type { JobRow } from '@/lib/database.types'
import JobForm from '../../JobForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data } = await supabase.from('jobs').select('*').eq('id', params.id).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Job</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <JobForm job={data as JobRow} />
      </div>
    </div>
  )
}

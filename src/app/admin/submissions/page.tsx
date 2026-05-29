import { createServerClient } from '@/lib/supabase-server'
import type { ContactSubmissionRow } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export default async function SubmissionsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const submissions = (data ?? []) as ContactSubmissionRow[]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Submissions</h1>
      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          No submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {s.first_name} {s.last_name}
                  </div>
                  <a href={`mailto:${s.email}`} className="text-xs text-[#DB1B0C] hover:underline">
                    {s.email}
                  </a>
                </div>
                <div className="text-right shrink-0">
                  {s.subject && (
                    <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded mb-1">
                      {s.subject}
                    </span>
                  )}
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(s.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {s.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

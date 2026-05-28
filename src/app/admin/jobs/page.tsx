import { createServerClient } from '@/lib/supabase-server'
import type { JobRow } from '@/lib/database.types'
import Link from 'next/link'
import JobActions from './JobActions'

export const dynamic = 'force-dynamic'

export default async function AdminJobsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  const jobs = (data ?? []) as JobRow[]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <Link
          href="/admin/jobs/new"
          className="bg-[#DB1B0C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#b81508] transition-colors"
        >
          + Post Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
          No jobs posted yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Department</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{j.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{j.type} · {j.location}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{j.department}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${j.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {j.is_active ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <JobActions id={j.id} isActive={j.is_active} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

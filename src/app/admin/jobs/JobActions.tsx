'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JobActions({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggleStatus() {
    setLoading(true)
    await fetch(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !isActive }),
    })
    router.refresh()
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Delete this job? This cannot be undone.')) return
    setLoading(true)
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <button
        onClick={toggleStatus}
        disabled={loading}
        className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isActive ? 'Close' : 'Reopen'}
      </button>
      <Link
        href={`/admin/jobs/${id}/edit`}
        className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}

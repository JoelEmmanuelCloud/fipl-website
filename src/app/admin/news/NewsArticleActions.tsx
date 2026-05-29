'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewsArticleActions({ id }: { id: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this article? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    router.refresh()
    setDeleting(false)
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/admin/news/${id}/edit`}
        className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
      >
        {deleting ? '…' : 'Delete'}
      </button>
    </div>
  )
}

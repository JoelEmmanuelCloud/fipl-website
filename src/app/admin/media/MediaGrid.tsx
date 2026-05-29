'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { MediaKitRow } from '@/lib/database.types'

export default function MediaGrid({ items }: { items: MediaKitRow[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Delete this media item?')) return
    setDeleting(id)
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    router.refresh()
    setDeleting(null)
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
        No media uploaded yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {item.thumbnail_url ? (
              <img
                src={item.thumbnail_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : item.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img src={item.file_url} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                PDF
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
              {item.title}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              {item.category}
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={deleting === item.id}
              className="mt-2 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors disabled:opacity-50"
            >
              {deleting === item.id ? '…' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

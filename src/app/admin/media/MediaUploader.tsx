'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['Our Plants', 'People', 'Events', 'FIPL Foundation'] as const

export default function MediaUploader() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function uploadFile(f: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', f)
    fd.append('bucket', 'media-kit-assets')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const { url } = await res.json()
    return url
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !title) return
    setUploading(true)
    setError('')
    try {
      const [file_url, thumbnail_url] = await Promise.all([
        uploadFile(file),
        thumbnail ? uploadFile(thumbnail) : Promise.resolve(null),
      ])
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, file_url, thumbnail_url }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setTitle('')
      setFile(null)
      setThumbnail(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
    setUploading(false)
  }

  const inputCls =
    'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10'
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className={labelCls}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>File (image or PDF)</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          className="text-sm text-gray-500 dark:text-gray-400"
        />
      </div>
      <div>
        <label className={labelCls}>Thumbnail (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
          className="text-sm text-gray-500 dark:text-gray-400"
        />
      </div>
      {error && <p className="col-span-2 text-sm text-red-500 dark:text-red-400">{error}</p>}
      <div className="col-span-2">
        <button
          type="submit"
          disabled={uploading}
          className="bg-[#DB1B0C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
    </form>
  )
}

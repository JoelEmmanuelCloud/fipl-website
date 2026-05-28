'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NewsArticleRow } from '@/lib/database.types'

const CATEGORIES = ['Operations', 'Community', 'Corporate', 'Partnerships', 'Updates'] as const

interface Props {
  article?: NewsArticleRow
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function ArticleForm({ article }: Props) {
  const router = useRouter()
  const isEdit = !!article

  const [form, setForm] = useState({
    slug: article?.slug ?? '',
    title: article?.title ?? '',
    excerpt: article?.excerpt ?? '',
    content: article?.content ?? '',
    date: article?.date ?? '',
    date_iso: article?.date_iso ?? '',
    category: article?.category ?? 'Operations',
    read_time: article?.read_time ?? '',
    image_url: article?.image_url ?? '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(article?.image_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'title' && !isEdit) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    let image_url = form.image_url

    if (imageFile) {
      setUploading(true)
      const fd = new FormData()
      fd.append('file', imageFile)
      fd.append('bucket', 'news-images')
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      setUploading(false)
      if (!uploadRes.ok) {
        setError('Image upload failed')
        setSaving(false)
        return
      }
      const { url } = await uploadRes.json()
      image_url = url
    }

    const payload = { ...form, image_url }
    const url = isEdit ? `/api/admin/news/${article!.id}` : '/api/admin/news'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/news')
      router.refresh()
    } else {
      const json = await res.json()
      setError(json.error || 'Failed to save')
    }
    setSaving(false)
  }

  const inputCls =
    'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10'
  const labelCls = 'block text-xs font-semibold text-gray-700 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} required className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Read Time</label>
          <input name="read_time" value={form.read_time} onChange={handleChange} placeholder="5 min read" required className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Display Date</label>
          <input name="date" value={form.date} onChange={handleChange} placeholder="January 12, 2024" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Date (ISO)</label>
          <input name="date_iso" type="date" value={form.date_iso} onChange={handleChange} required className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Excerpt</label>
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} required className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Content (HTML)</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={12} required className={`${inputCls} font-mono text-xs`} />
      </div>
      <div>
        <label className={labelCls}>Cover Image</label>
        {imagePreview && (
          <img src={imagePreview} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-600" />
        {!imageFile && (
          <div className="mt-2">
            <label className="text-xs text-gray-500 mb-1 block">Or paste image URL</label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://…"
              className={inputCls}
            />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#DB1B0C] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Article'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/news')}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

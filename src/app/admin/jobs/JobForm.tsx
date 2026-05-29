'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { JobRow } from '@/lib/database.types'

interface Props {
  job?: JobRow
}

export default function JobForm({ job }: Props) {
  const router = useRouter()
  const isEdit = !!job

  const [form, setForm] = useState({
    title: job?.title ?? '',
    department: job?.department ?? '',
    location: job?.location ?? 'Port Harcourt, Rivers State',
    type: job?.type ?? 'Full Time',
    description: job?.description ?? '',
    requirements: job?.requirements ?? '',
    posted_date: job?.posted_date ?? new Date().toISOString().split('T')[0],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isEdit ? `/api/admin/jobs/${job!.id}` : '/api/admin/jobs'
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/jobs')
      router.refresh()
    } else {
      const json = await res.json()
      setError(json.error || 'Failed to save')
    }
    setSaving(false)
  }

  const inputCls = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10'
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Job Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Department</label>
          <input name="department" value={form.department} onChange={handleChange} required className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Employment Type</label>
          <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
            {['Full Time', 'Part Time', 'Contract', 'Internship'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Posted Date</label>
        <input name="posted_date" type="date" value={form.posted_date} onChange={handleChange} required className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Job Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={5} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Requirements</label>
        <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={5} className={inputCls} />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#DB1B0C] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Post Job'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/jobs')}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NewsContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: NewsContent
}

export default function NewsContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<NewsContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/news', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('News & Media page updated')
      router.refresh()
    } else {
      const json = await res.json().catch(() => ({}))
      setError(json.error || 'Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <p className={sectionLabelCls}>Featured Insights</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.insights.eyebrow}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, insights: { ...prev.insights, eyebrow: v } }))
            }
          />
          <TextField
            label="Heading"
            value={form.insights.heading}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, insights: { ...prev.insights, heading: v } }))
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-[#DB1B0C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  )
}

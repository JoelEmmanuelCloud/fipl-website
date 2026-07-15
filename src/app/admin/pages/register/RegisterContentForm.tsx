'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { RegisterContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: RegisterContent
}

export default function RegisterContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<RegisterContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof RegisterContent>(key: K, patch: Partial<RegisterContent[K]>) {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/register', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Register page updated')
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
        <p className={sectionLabelCls}>Intro</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.intro.heading}
            onChange={(v) => set('intro', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.intro.body1}
            onChange={(v) => set('intro', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.intro.body2}
            onChange={(v) => set('intro', { body2: v })}
          />
          <TextField
            label="Button Label"
            value={form.intro.ctaLabel}
            onChange={(v) => set('intro', { ctaLabel: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>What is a DUNS Number?</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.duns.heading}
            onChange={(v) => set('duns', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.duns.body1}
            onChange={(v) => set('duns', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.duns.body2}
            onChange={(v) => set('duns', { body2: v })}
          />
          <TextField
            label="Button Label"
            value={form.duns.ctaLabel}
            onChange={(v) => set('duns', { ctaLabel: v })}
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

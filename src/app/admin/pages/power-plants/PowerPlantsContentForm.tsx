'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PowerPlantsContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: PowerPlantsContent
}

export default function PowerPlantsContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<PowerPlantsContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/power-plants', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Power Plants page updated')
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
            onChange={(v) => setForm((prev) => ({ ...prev, intro: { ...prev.intro, heading: v } }))}
          />
          <TextAreaField
            label="Body"
            value={form.intro.body}
            onChange={(v) => setForm((prev) => ({ ...prev, intro: { ...prev.intro, body: v } }))}
          />
          <TextField
            label="Button Label"
            value={form.intro.ctaLabel}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, intro: { ...prev.intro, ctaLabel: v } }))
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Work Process</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.workProcess.heading}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, workProcess: { ...prev.workProcess, heading: v } }))
            }
          />
          <TextAreaField
            label="Body"
            value={form.workProcess.body}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, workProcess: { ...prev.workProcess, body: v } }))
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

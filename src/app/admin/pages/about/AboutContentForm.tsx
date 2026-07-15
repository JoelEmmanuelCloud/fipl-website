'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AboutContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: AboutContent
}

export default function AboutContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<AboutContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updatePurpose(patch: Partial<AboutContent['purpose']>) {
    setForm((prev) => ({ ...prev, purpose: { ...prev.purpose, ...patch } }))
  }
  function updateCoreValue(index: number, patch: Partial<AboutContent['coreValues'][number]>) {
    setForm((prev) => ({
      ...prev,
      coreValues: prev.coreValues.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('About page updated')
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
        <p className={sectionLabelCls}>Our Purpose, Our Promise</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.purpose.eyebrow}
            onChange={(v) => updatePurpose({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={form.purpose.heading}
            onChange={(v) => updatePurpose({ heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.purpose.body1}
            onChange={(v) => updatePurpose({ body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.purpose.body2}
            onChange={(v) => updatePurpose({ body2: v })}
          />
          <TextAreaField
            label="Paragraph 3"
            value={form.purpose.body3}
            onChange={(v) => updatePurpose({ body3: v })}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Stat 1 Value"
              value={form.purpose.stat1Value}
              onChange={(v) => updatePurpose({ stat1Value: v })}
            />
            <TextField
              label="Stat 1 Label"
              value={form.purpose.stat1Label}
              onChange={(v) => updatePurpose({ stat1Label: v })}
            />
            <TextField
              label="Stat 2 Value"
              value={form.purpose.stat2Value}
              onChange={(v) => updatePurpose({ stat2Value: v })}
            />
            <TextField
              label="Stat 2 Label"
              value={form.purpose.stat2Label}
              onChange={(v) => updatePurpose({ stat2Label: v })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Vision &amp; Mission</p>
        <div className={cardCls}>
          <TextAreaField
            label="Our Vision"
            value={form.vision.body}
            onChange={(v) => setForm((prev) => ({ ...prev, vision: { body: v } }))}
          />
          <TextAreaField
            label="Our Mission"
            value={form.mission.body}
            onChange={(v) => setForm((prev) => ({ ...prev, mission: { body: v } }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Core Values</p>
        {form.coreValues.map((v, i) => (
          <div key={i} className={cardCls}>
            <TextField
              label="Title"
              value={v.title}
              onChange={(val) => updateCoreValue(i, { title: val })}
            />
            <TextAreaField
              label="Description"
              value={v.desc}
              onChange={(val) => updateCoreValue(i, { desc: val })}
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Meet The CEO</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.ceo.heading}
            onChange={(v) => setForm((prev) => ({ ...prev, ceo: { ...prev.ceo, heading: v } }))}
          />
          <TextField
            label="Subheading"
            value={form.ceo.subheading}
            onChange={(v) => setForm((prev) => ({ ...prev, ceo: { ...prev.ceo, subheading: v } }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Integrity &amp; Transparency Callout</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.integrity.heading}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, integrity: { ...prev.integrity, heading: v } }))
            }
          />
          <TextAreaField
            label="Body"
            value={form.integrity.body}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, integrity: { ...prev.integrity, body: v } }))
            }
          />
          <TextField
            label="Button Label"
            value={form.integrity.buttonLabel}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, integrity: { ...prev.integrity, buttonLabel: v } }))
            }
          />
          <TextField
            label="Button URL"
            value={form.integrity.buttonUrl}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, integrity: { ...prev.integrity, buttonUrl: v } }))
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

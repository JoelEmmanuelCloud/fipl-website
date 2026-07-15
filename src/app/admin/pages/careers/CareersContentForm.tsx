'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CareersContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, ImageField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: CareersContent
}

export default function CareersContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<CareersContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof CareersContent>(key: K, patch: Partial<CareersContent[K]>) {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  function updateEvpCard(index: number, patch: Partial<CareersContent['evpCards'][number]>) {
    setForm((prev) => ({
      ...prev,
      evpCards: prev.evpCards.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/careers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Careers page updated')
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
        <p className={sectionLabelCls}>Why Join FIPL</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.whyJoin.heading}
            onChange={(v) => set('whyJoin', { heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.whyJoin.body}
            onChange={(v) => set('whyJoin', { body: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Employee Value Proposition Cards</p>
        {form.evpCards.map((c, i) => (
          <div key={i} className={cardCls}>
            <TextField
              label="Title"
              value={c.title}
              onChange={(v) => updateEvpCard(i, { title: v })}
            />
            <TextAreaField
              label="Description"
              value={c.desc}
              onChange={(v) => updateEvpCard(i, { desc: v })}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Working in FIPL</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.workingInFipl.heading}
            onChange={(v) => set('workingInFipl', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.workingInFipl.body1}
            onChange={(v) => set('workingInFipl', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.workingInFipl.body2}
            onChange={(v) => set('workingInFipl', { body2: v })}
          />
          <ImageField
            label="Image"
            value={form.workingInFipl.image}
            onChange={(v) => set('workingInFipl', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Talent Pool Intro</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.talentPool.heading}
            onChange={(v) => set('talentPool', { heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.talentPool.body}
            onChange={(v) => set('talentPool', { body: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>&quot;Don&apos;t See Your Role?&quot; Card</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.ctaCard.heading}
            onChange={(v) => set('ctaCard', { heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.ctaCard.body}
            onChange={(v) => set('ctaCard', { body: v })}
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

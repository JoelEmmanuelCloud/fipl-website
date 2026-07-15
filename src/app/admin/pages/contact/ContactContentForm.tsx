'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ContactContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: ContactContent
}

export default function ContactContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<ContactContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updateContactItem(
    index: number,
    patch: Partial<ContactContent['contactItems'][number]>,
  ) {
    setForm((prev) => ({
      ...prev,
      contactItems: prev.contactItems.map((it, i) => (i === index ? { ...it, ...patch } : it)),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Contact page updated')
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
        <p className={sectionLabelCls}>Get in Touch Intro</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.getInTouch.heading}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, getInTouch: { ...prev.getInTouch, heading: v } }))
            }
          />
          <TextAreaField
            label="Body"
            value={form.getInTouch.body}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, getInTouch: { ...prev.getInTouch, body: v } }))
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Contact Details</p>
        {form.contactItems.map((item, i) => (
          <div key={i} className={cardCls}>
            <TextField
              label="Label"
              value={item.label}
              onChange={(v) => updateContactItem(i, { label: v })}
            />
            <TextAreaField
              label="Value"
              hint="Use a new line for multi-line values like business hours"
              value={item.value}
              onChange={(v) => updateContactItem(i, { value: v })}
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Newsletter Callout</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.newsletter.heading}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, newsletter: { ...prev.newsletter, heading: v } }))
            }
          />
          <TextAreaField
            label="Body"
            value={form.newsletter.body}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, newsletter: { ...prev.newsletter, body: v } }))
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

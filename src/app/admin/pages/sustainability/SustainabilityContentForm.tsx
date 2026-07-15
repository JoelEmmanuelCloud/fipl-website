'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SustainabilityContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import { TextField, TextAreaField, ImageField, cardCls, sectionLabelCls } from '../fields'

interface Props {
  content: SustainabilityContent
}

export default function SustainabilityContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<SustainabilityContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof SustainabilityContent>(
    key: K,
    patch: Partial<SustainabilityContent[K]>,
  ) {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  function updateFocusArea(
    index: number,
    patch: Partial<SustainabilityContent['focusAreas'][number]>,
  ) {
    setForm((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/sustainability', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Sustainability page updated')
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
        <p className={sectionLabelCls}>We Care</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.weCare.heading}
            onChange={(v) => set('weCare', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.weCare.body1}
            onChange={(v) => set('weCare', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.weCare.body2}
            onChange={(v) => set('weCare', { body2: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Focus Areas</p>
        {form.focusAreas.map((f, i) => (
          <div key={i} className={cardCls}>
            <TextField
              label="Title"
              value={f.title}
              onChange={(v) => updateFocusArea(i, { title: v })}
            />
            <TextAreaField
              label="Description"
              value={f.desc}
              onChange={(v) => updateFocusArea(i, { desc: v })}
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Sustainability</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.sustainabilityBlock.heading}
            onChange={(v) => set('sustainabilityBlock', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.sustainabilityBlock.body1}
            onChange={(v) => set('sustainabilityBlock', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.sustainabilityBlock.body2}
            onChange={(v) => set('sustainabilityBlock', { body2: v })}
          />
          <ImageField
            label="Image"
            value={form.sustainabilityBlock.image}
            onChange={(v) => set('sustainabilityBlock', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Health &amp; Safety First</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.healthSafety.heading}
            onChange={(v) => set('healthSafety', { heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.healthSafety.body}
            onChange={(v) => set('healthSafety', { body: v })}
          />
          <ImageField
            label="Image"
            value={form.healthSafety.image}
            onChange={(v) => set('healthSafety', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Corporate Governance</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.governance.heading}
            onChange={(v) => set('governance', { heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.governance.body}
            onChange={(v) => set('governance', { body: v })}
          />
          <ImageField
            label="Image"
            value={form.governance.image}
            onChange={(v) => set('governance', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Our SDG Goals</p>
        <div className={cardCls}>
          <TextField
            label="Heading"
            value={form.sdg.heading}
            onChange={(v) => set('sdg', { heading: v })}
          />
          <TextAreaField
            label="Paragraph 1"
            value={form.sdg.body1}
            onChange={(v) => set('sdg', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.sdg.body2}
            onChange={(v) => set('sdg', { body2: v })}
          />
          <ImageField
            label="Image"
            value={form.sdg.image}
            onChange={(v) => set('sdg', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Community Initiatives</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.community.eyebrow}
            onChange={(v) => set('community', { eyebrow: v })}
          />
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Heading
            </label>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 mb-1.5">
              Use a new line to control the second line
            </p>
            <textarea
              value={form.community.heading}
              onChange={(e) => set('community', { heading: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10"
            />
          </div>
          <TextAreaField
            label="Paragraph 1"
            value={form.community.body1}
            onChange={(v) => set('community', { body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.community.body2}
            onChange={(v) => set('community', { body2: v })}
          />
          <TextAreaField
            label="Paragraph 3"
            value={form.community.body3}
            onChange={(v) => set('community', { body3: v })}
          />
          <ImageField
            label="Image"
            value={form.community.image}
            onChange={(v) => set('community', { image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Host Community Projects</p>
        <div className={cardCls}>
          <TextField
            label="Section Heading"
            value={form.projects.heading}
            onChange={(v) => set('projects', { heading: v })}
          />
        </div>
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Project 1</p>
          <TextField
            label="Title"
            value={form.projects.project1.title}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project1: { ...prev.projects.project1, title: v } },
              }))
            }
          />
          <TextAreaField
            label="Description"
            value={form.projects.project1.desc}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project1: { ...prev.projects.project1, desc: v } },
              }))
            }
          />
          <ImageField
            label="Image"
            value={form.projects.project1.image}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project1: { ...prev.projects.project1, image: v } },
              }))
            }
          />
        </div>
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Project 2</p>
          <TextField
            label="Title"
            value={form.projects.project2.title}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project2: { ...prev.projects.project2, title: v } },
              }))
            }
          />
          <TextAreaField
            label="Description"
            value={form.projects.project2.desc}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project2: { ...prev.projects.project2, desc: v } },
              }))
            }
          />
          <ImageField
            label="Image"
            value={form.projects.project2.image}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                projects: { ...prev.projects, project2: { ...prev.projects.project2, image: v } },
              }))
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

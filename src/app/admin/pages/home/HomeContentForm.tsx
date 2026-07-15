'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { HomeContent, HeroSlideContent } from '@/lib/database.types'
import { useToast } from '@/components/AdminToast'
import {
  TextField,
  TextAreaField,
  ImageField,
  cardCls,
  sectionLabelCls,
  labelCls,
  hintCls,
  inputCls,
} from '../fields'

interface Props {
  content: HomeContent
}

export default function HomeContentForm({ content }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<HomeContent>(content)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updateSlide(index: number, patch: Partial<HeroSlideContent>) {
    setForm((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: prev.hero.slides.map((s, i) => (i === index ? { ...s, ...patch } : s)),
      },
    }))
  }

  function updateOverlay(patch: Partial<HomeContent['hero']['overlay']>) {
    setForm((prev) => ({
      ...prev,
      hero: { ...prev.hero, overlay: { ...prev.hero.overlay, ...patch } },
    }))
  }

  function updateWhoWeAre(patch: Partial<HomeContent['whoWeAre']>) {
    setForm((prev) => ({ ...prev, whoWeAre: { ...prev.whoWeAre, ...patch } }))
  }

  function updateSustainabilityCta(patch: Partial<HomeContent['sustainabilityCta']>) {
    setForm((prev) => ({ ...prev, sustainabilityCta: { ...prev.sustainabilityCta, ...patch } }))
  }

  function updateCommunityBanner(patch: Partial<HomeContent['communityBanner']>) {
    setForm((prev) => ({ ...prev, communityBanner: { ...prev.communityBanner, ...patch } }))
  }

  function updateCareersSection(patch: Partial<HomeContent['careersSection']>) {
    setForm((prev) => ({ ...prev, careersSection: { ...prev.careersSection, ...patch } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/pages/home', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: form }),
    })

    setSaving(false)
    if (res.ok) {
      toast('Home page updated')
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
        <p className={sectionLabelCls}>Slideshow</p>
        {form.hero.slides.map((slide, i) => (
          <div key={i} className={cardCls}>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Slide {i + 1}</p>

            <div>
              <label className={labelCls}>Media Type</label>
              <select
                value={slide.type}
                onChange={(e) =>
                  updateSlide(i, { type: e.target.value as HeroSlideContent['type'] })
                }
                className={inputCls}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {slide.type === 'image' ? (
              <ImageField
                label="Slide Image"
                hint="Full-bleed background image for this slide"
                value={slide.src}
                onChange={(url) => updateSlide(i, { src: url })}
              />
            ) : (
              <>
                <div>
                  <label className={labelCls}>Video URL</label>
                  <p className={hintCls + ' mb-1.5'}>
                    Path or URL to an .mp4 file — videos are pasted by URL, not uploaded here
                  </p>
                  <input
                    value={slide.src}
                    onChange={(e) => updateSlide(i, { src: e.target.value })}
                    placeholder="/videos/hero.mp4"
                    className={inputCls}
                  />
                </div>
                <ImageField
                  label="Poster Image"
                  hint="Shown while the video loads"
                  value={slide.poster}
                  onChange={(url) => updateSlide(i, { poster: url })}
                />
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Headline — Line 1</label>
                <input
                  value={slide.line1}
                  onChange={(e) => updateSlide(i, { line1: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Headline — Line 2</label>
                <input
                  value={slide.line2}
                  onChange={(e) => updateSlide(i, { line2: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Impact Card</p>
        <div className={cardCls}>
          <div>
            <label className={labelCls}>Title</label>
            <p className={hintCls + ' mb-1.5'}>
              Use a new line to control where the title wraps to a second line
            </p>
            <textarea
              value={form.hero.overlay.title}
              onChange={(e) => updateOverlay({ title: e.target.value })}
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </div>
          <TextAreaField
            label="Body"
            value={form.hero.overlay.body}
            onChange={(v) => updateOverlay({ body: v })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageField
              label="Left Background Image"
              hint="Shown on large screens, left of the impact card"
              value={form.hero.overlay.imageLeft}
              onChange={(url) => updateOverlay({ imageLeft: url })}
            />
            <ImageField
              label="Right Background Image"
              hint="Shown on large screens, right of the impact card"
              value={form.hero.overlay.imageRight}
              onChange={(url) => updateOverlay({ imageRight: url })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Who We Are</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.whoWeAre.eyebrow}
            onChange={(v) => updateWhoWeAre({ eyebrow: v })}
          />
          <div>
            <label className={labelCls}>Heading</label>
            <p className={hintCls + ' mb-1.5'}>Use a new line to control the second line</p>
            <textarea
              value={form.whoWeAre.heading}
              onChange={(e) => updateWhoWeAre({ heading: e.target.value })}
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </div>
          <TextAreaField
            label="Paragraph 1"
            value={form.whoWeAre.body1}
            onChange={(v) => updateWhoWeAre({ body1: v })}
          />
          <TextAreaField
            label="Paragraph 2"
            value={form.whoWeAre.body2}
            onChange={(v) => updateWhoWeAre({ body2: v })}
          />
          <TextAreaField
            label="Paragraph 3"
            value={form.whoWeAre.body3}
            onChange={(v) => updateWhoWeAre({ body3: v })}
          />
          <TextField
            label="Button Label"
            value={form.whoWeAre.ctaLabel}
            onChange={(v) => updateWhoWeAre({ ctaLabel: v })}
          />
          <ImageField
            label="Image"
            value={form.whoWeAre.image}
            onChange={(v) => updateWhoWeAre({ image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Sustainability &amp; CSR Banner</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.sustainabilityCta.eyebrow}
            onChange={(v) => updateSustainabilityCta({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={form.sustainabilityCta.heading}
            onChange={(v) => updateSustainabilityCta({ heading: v })}
          />
          <TextAreaField
            label="Body"
            value={form.sustainabilityCta.body}
            onChange={(v) => updateSustainabilityCta({ body: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Community Banner</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.communityBanner.eyebrow}
            onChange={(v) => updateCommunityBanner({ eyebrow: v })}
          />
          <div>
            <label className={labelCls}>Heading</label>
            <p className={hintCls + ' mb-1.5'}>Use a new line to control the second line</p>
            <textarea
              value={form.communityBanner.heading}
              onChange={(e) => updateCommunityBanner({ heading: e.target.value })}
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </div>
          <TextAreaField
            label="Body"
            value={form.communityBanner.body}
            onChange={(v) => updateCommunityBanner({ body: v })}
          />
          <TextField
            label="Button Label"
            value={form.communityBanner.ctaLabel}
            onChange={(v) => updateCommunityBanner({ ctaLabel: v })}
          />
          <ImageField
            label="Background Image"
            value={form.communityBanner.image}
            onChange={(v) => updateCommunityBanner({ image: v })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className={sectionLabelCls}>Careers Section</p>
        <div className={cardCls}>
          <TextField
            label="Eyebrow"
            value={form.careersSection.eyebrow}
            onChange={(v) => updateCareersSection({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={form.careersSection.heading}
            onChange={(v) => updateCareersSection({ heading: v })}
          />
          <TextAreaField
            label="Body — Paragraph 1"
            value={form.careersSection.body1}
            onChange={(v) => updateCareersSection({ body1: v })}
          />
          <TextAreaField
            label="Body — Paragraph 2"
            value={form.careersSection.body2}
            onChange={(v) => updateCareersSection({ body2: v })}
          />
          <TextField
            label="Button Label"
            value={form.careersSection.ctaLabel}
            onChange={(v) => updateCareersSection({ ctaLabel: v })}
          />
          <TextField
            label="Office Address"
            value={form.careersSection.officeAddress}
            onChange={(v) => updateCareersSection({ officeAddress: v })}
          />
          <ImageField
            label="Image"
            value={form.careersSection.image}
            onChange={(v) => updateCareersSection({ image: v })}
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

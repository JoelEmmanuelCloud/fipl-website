'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export const inputCls =
  'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10'
export const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'
export const hintCls = 'text-[11px] text-gray-400 dark:text-gray-500 mt-1'
export const cardCls =
  'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4'
export const sectionLabelCls =
  'text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest'

export function TextField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {hint && <p className={hintCls + ' mb-1.5'}>{hint}</p>}
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </div>
  )
}

export function TextAreaField({
  label,
  hint,
  value,
  onChange,
  rows = 3,
}: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {hint && <p className={hintCls + ' mb-1.5'}>{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputCls} resize-none`}
      />
    </div>
  )
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('bucket', 'page-content')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (!res.ok) {
      setError('Upload failed')
      return
    }
    const { url } = await res.json()
    onChange(url)
  }

  return (
    <div>
      <label className={labelCls}>{label}</label>
      {hint && <p className={hintCls + ' mb-1.5'}>{hint}</p>}
      {value ? (
        <div className="relative mb-2">
          <img src={value} alt="" className="w-full h-32 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-900/60 hover:bg-gray-900/80 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 mb-2 cursor-pointer border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
          <Upload className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {uploading ? 'Uploading…' : 'Click to upload'}
          </span>
        </label>
      )}
      {error && <p className="text-[11px] text-red-500 mb-1.5">{error}</p>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL"
        className={`${inputCls} text-xs`}
      />
    </div>
  )
}

export function FixedListField<T>({
  label,
  hint,
  items,
  onChange,
  renderItem,
  itemLabel,
}: {
  label: string
  hint?: string
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode
  itemLabel: (item: T, index: number) => string
}) {
  function updateItem(index: number, patch: Partial<T>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)))
  }

  return (
    <div className="space-y-4">
      <p className={sectionLabelCls}>{label}</p>
      {hint && <p className={hintCls}>{hint}</p>}
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {itemLabel(item, i)}
          </p>
          {renderItem(item, (patch) => updateItem(i, patch), i)}
        </div>
      ))}
    </div>
  )
}

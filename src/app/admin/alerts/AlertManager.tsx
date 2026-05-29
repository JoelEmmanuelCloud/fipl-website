'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/AdminToast'

type AlertType = 'info' | 'warning' | 'critical'

interface Alert {
  id: string
  title: string
  message: string
  type: AlertType
  is_active: boolean
  created_at: string
}

const TYPE_STYLES: Record<AlertType, string> = {
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

export default function AlertManager({ initialAlerts }: { initialAlerts: Alert[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [alerts, setAlerts] = useState(initialAlerts)
  const [form, setForm] = useState({ title: '', message: '', type: 'info' as AlertType })
  const [saving, setSaving] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const created = await res.json()
      setAlerts((prev) => [created, ...prev])
      setForm({ title: '', message: '', type: 'info' })
      toast('Alert published')
      router.refresh()
    } else {
      toast('Failed to publish alert', 'error')
    }
    setSaving(false)
  }

  async function toggleActive(alert: Alert) {
    const res = await fetch(`/api/admin/alerts/${alert.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !alert.is_active }),
    })
    if (res.ok) {
      const updated = await res.json()
      setAlerts((prev) => prev.map((a) => (a.id === alert.id ? updated : a)))
      toast(updated.is_active ? 'Alert activated' : 'Alert deactivated')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this alert permanently?')) return
    const res = await fetch(`/api/admin/alerts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAlerts((prev) => prev.filter((a) => a.id !== id))
      toast('Alert deleted')
    } else {
      toast('Failed to delete', 'error')
    }
  }

  const inputCls =
    'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#DB1B0C] focus:ring-2 focus:ring-[#DB1B0C]/10'
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5'

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Publish New Alert</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
                placeholder="e.g. Scheduled Maintenance"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as AlertType }))}
                className={inputCls}
              >
                <option value="info">Info (blue)</option>
                <option value="warning">Warning (orange)</option>
                <option value="critical">Critical (red)</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              required
              rows={2}
              placeholder="e.g. Afam plant will undergo routine maintenance on 15 June from 08:00–14:00."
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#DB1B0C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#b81508] transition-colors disabled:opacity-60"
          >
            {saving ? 'Publishing…' : 'Publish Alert'}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">All Alerts</span>
        </div>
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400 dark:text-gray-500">No alerts. Publish one above.</div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {alerts.map((alert) => (
              <div key={alert.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${TYPE_STYLES[alert.type]}`}>
                      {alert.type}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      alert.is_active
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                      {alert.is_active ? 'Live' : 'Off'}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{alert.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{alert.message}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(alert)}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {alert.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

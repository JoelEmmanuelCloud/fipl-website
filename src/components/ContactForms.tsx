'use client'

import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'done' : 'error')
    if (res.ok) {
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label
            className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div>
          <label
            className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5"
          htmlFor="email"
        >
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5"
          htmlFor="subject"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          <option value="">Select a subject…</option>
          {[
            'General Enquiry',
            'Vendor Registration',
            'Careers',
            'Eligible Customers',
            'Media & Press',
            'Partnership',
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label
          className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5"
          htmlFor="message"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Write your message here…"
          required
          className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm resize-vertical bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600 mb-3">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 ${
          status === 'done'
            ? 'bg-green-600 text-white'
            : 'bg-primary text-white hover:bg-primary-dark'
        }`}
      >
        {status === 'loading' ? 'Sending…' : status === 'done' ? '✓ Message Sent!' : 'Submit Enquiry ↗'}
      </button>
    </form>
  )
}

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus(res.ok ? 'done' : 'error')
    if (res.ok) {
      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address…"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/15 text-white placeholder:text-white/60 text-sm focus:outline-none focus:border-white/60"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`px-5 py-3 rounded-lg font-semibold text-sm shrink-0 transition-colors disabled:opacity-60 ${
          status === 'done' ? 'bg-green-500 text-white' : 'bg-white text-primary hover:bg-gray-100'
        }`}
      >
        {status === 'loading' ? '…' : status === 'done' ? '✓ Subscribed!' : 'Subscribe ↗'}
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'

export function ContactForm() {
  const [done, setDone] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
        setTimeout(() => setDone(false), 3000)
      }}
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5" htmlFor="first-name">
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            placeholder="John"
            required
            className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5" htmlFor="last-name">
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Doe"
            required
            className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5" htmlFor="email">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5" htmlFor="subject">
          Subject
        </label>
        <select
          id="subject"
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
        <label className="block text-xs font-semibold text-[var(--fipl-heading)] mb-1.5" htmlFor="message">
          Your Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Write your message here…"
          required
          className="w-full border border-[var(--fipl-border)] rounded-lg px-4 py-3 text-sm resize-vertical bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-colors ${done ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
      >
        {done ? '✓ Message Sent!' : 'Submit Enquiry ↗'}
      </button>
    </form>
  )
}

export function SubscribeForm() {
  const [done, setDone] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
        setTimeout(() => setDone(false), 3000)
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        type="email"
        placeholder="Enter your email address…"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/15 text-white placeholder:text-white/60 text-sm focus:outline-none focus:border-white/60"
      />
      <button
        type="submit"
        className={`px-5 py-3 rounded-lg font-semibold text-sm shrink-0 transition-colors ${done ? 'bg-green-500 text-white' : 'bg-white text-primary hover:bg-gray-100'}`}
      >
        {done ? '✓ Subscribed!' : 'Subscribe ↗'}
      </button>
    </form>
  )
}

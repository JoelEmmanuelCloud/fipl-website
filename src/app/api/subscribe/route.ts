import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { sendSubscriberNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  let subscribedAt: string
  try {
    await query(
      `insert into newsletter_subscribers (id, email) values (?, ?)
       on duplicate key update email = email`,
      [randomUUID(), email],
    )
    const row = await queryOne<{ subscribed_at: string }>(
      'select subscribed_at from newsletter_subscribers where email = ?',
      [email],
    )
    if (!row) throw new Error('Row not found after upsert')
    subscribedAt = row.subscribed_at
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  const isNew = Math.abs(Date.now() - new Date(subscribedAt).getTime()) < 5000
  if (isNew) {
    sendSubscriberNotification(email).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

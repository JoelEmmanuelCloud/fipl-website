import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date()
  since.setDate(since.getDate() - 7)

  const [contactCount, contactRecent, subscriberCount, subscriberRecent] = await Promise.all([
    queryOne<{ count: number }>(
      'select count(*) as count from contact_submissions where created_at >= ?',
      [since],
    ),
    query<{ id: string; first_name: string; last_name: string; subject: string | null; created_at: string }>(
      'select id, first_name, last_name, subject, created_at from contact_submissions where created_at >= ? order by created_at desc limit 5',
      [since],
    ),
    queryOne<{ count: number }>(
      'select count(*) as count from newsletter_subscribers where subscribed_at >= ?',
      [since],
    ),
    query<{ id: string; email: string; subscribed_at: string }>(
      'select id, email, subscribed_at from newsletter_subscribers where subscribed_at >= ? order by subscribed_at desc limit 5',
      [since],
    ),
  ])

  return NextResponse.json({
    contacts: {
      count: contactCount?.count ?? 0,
      recent: contactRecent,
    },
    subscribers: {
      count: subscriberCount?.count ?? 0,
      recent: subscriberRecent,
    },
  })
}

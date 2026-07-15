import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireRole } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date()
  since.setDate(since.getDate() - 7)
  const sinceISO = since.toISOString()

  const supabase = createServerClient()

  const [contactResult, subscriberResult] = await Promise.all([
    supabase
      .from('contact_submissions')
      .select('id, first_name, last_name, subject, created_at', { count: 'exact' })
      .gte('created_at', sinceISO)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('newsletter_subscribers')
      .select('id, email, subscribed_at', { count: 'exact' })
      .gte('subscribed_at', sinceISO)
      .order('subscribed_at', { ascending: false })
      .limit(5),
  ])

  return NextResponse.json({
    contacts: {
      count: contactResult.count ?? 0,
      recent: contactResult.data ?? [],
    },
    subscribers: {
      count: subscriberResult.count ?? 0,
      recent: subscriberResult.data ?? [],
    },
  })
}

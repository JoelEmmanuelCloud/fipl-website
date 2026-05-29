import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { sendSubscriberNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { error, data } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })
    .select('subscribed_at')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  const isNew = Math.abs(Date.now() - new Date(data.subscribed_at).getTime()) < 5000
  if (isNew) {
    sendSubscriberNotification(email).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

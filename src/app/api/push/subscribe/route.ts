import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { endpoint, keys } = body

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })
  }

  try {
    await query(
      `insert into push_subscriptions (id, endpoint, p256dh, auth) values (?, ?, ?, ?)
       on duplicate key update p256dh = values(p256dh), auth = values(auth)`,
      [randomUUID(), endpoint, keys.p256dh, keys.auth],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 },
    )
  }
  return NextResponse.json({ ok: true })
}

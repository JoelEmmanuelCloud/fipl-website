import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query } from '@/lib/db'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, subject, message } = body

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await query(
      `insert into contact_submissions (id, first_name, last_name, email, subject, message)
       values (?, ?, ?, ?, ?, ?)`,
      [randomUUID(), firstName, lastName, email, subject || null, message],
    )
  } catch {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }

  sendContactNotification({ firstName, lastName, email, subject: subject || null, message }).catch(
    () => {},
  )

  return NextResponse.json({ ok: true })
}

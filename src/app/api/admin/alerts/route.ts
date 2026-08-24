import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { AlertRow } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await query<AlertRow>('select * from alerts order by created_at desc')
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { title, message, type } = await req.json()
  if (!title || !message) {
    return NextResponse.json({ error: 'Title and message are required' }, { status: 400 })
  }

  const id = randomUUID()

  try {
    await query(`insert into alerts (id, title, message, type, is_active) values (?, ?, ?, ?, true)`, [
      id,
      title,
      message,
      type ?? 'info',
    ])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Insert failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<AlertRow>('select * from alerts where id = ?', [id])
  return NextResponse.json(data, { status: 201 })
}

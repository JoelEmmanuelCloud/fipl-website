import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { JobRow } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await query<JobRow>('select * from jobs order by created_at desc')
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { title, department, location, type, description, requirements, posted_date } = body

  if (!title || !department) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const id = randomUUID()

  try {
    await query(
      `insert into jobs
        (id, title, department, location, type, description, requirements, posted_date, is_active)
       values (?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [
        id,
        title,
        department,
        location || 'Port Harcourt, Rivers State',
        type || 'Full Time',
        description || null,
        requirements || null,
        posted_date || new Date().toISOString().split('T')[0],
      ],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Insert failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<JobRow>('select * from jobs where id = ?', [id])
  revalidatePath('/careers')
  return NextResponse.json(data, { status: 201 })
}

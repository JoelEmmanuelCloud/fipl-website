import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { AlertRow } from '@/lib/database.types'

const EDITABLE_FIELDS = ['title', 'message', 'type', 'is_active'] as const

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()

  const update: Record<string, unknown> = {}
  for (const field of EDITABLE_FIELDS) {
    if (field in body) update[field] = body[field]
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  const setClause = Object.keys(update)
    .map((field) => `${field} = ?`)
    .join(', ')

  try {
    await query(`update alerts set ${setClause} where id = ?`, [
      ...Object.values(update),
      params.id,
    ])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<AlertRow>('select * from alerts where id = ?', [params.id])
  if (!data) {
    return NextResponse.json({ error: 'Alert not found' }, { status: 404 })
  }
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await query('delete from alerts where id = ?', [params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 },
    )
  }
  return NextResponse.json({ ok: true })
}

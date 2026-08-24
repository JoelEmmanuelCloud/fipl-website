import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { TestimonialRow } from '@/lib/database.types'

const EDITABLE_FIELDS = ['quote', 'name', 'role', 'is_active'] as const

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
    await query(`update testimonials set ${setClause} where id = ?`, [
      ...Object.values(update),
      params.id,
    ])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<TestimonialRow>('select * from testimonials where id = ?', [
    params.id,
  ])
  if (!data) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
  }
  revalidatePath('/about')
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await query('delete from testimonials where id = ?', [params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 },
    )
  }
  revalidatePath('/about')
  return NextResponse.json({ ok: true })
}

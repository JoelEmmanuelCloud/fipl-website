import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { TestimonialRow } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await query<TestimonialRow>('select * from testimonials order by created_at desc')
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { quote, name, role, is_active } = body

  if (!quote || !name || !role) {
    return NextResponse.json({ error: 'Quote, name, and role are required' }, { status: 400 })
  }

  const id = randomUUID()

  try {
    await query(
      `insert into testimonials (id, quote, name, role, is_active) values (?, ?, ?, ?, ?)`,
      [id, quote, name, role, is_active ?? true],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Insert failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<TestimonialRow>('select * from testimonials where id = ?', [id])
  revalidatePath('/about')
  return NextResponse.json(data, { status: 201 })
}

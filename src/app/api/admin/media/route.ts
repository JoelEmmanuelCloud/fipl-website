import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { MediaKitRow } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await query<MediaKitRow>('select * from media_kits order by created_at desc')
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { title, category, file_url, thumbnail_url } = body

  if (!title || !category || !file_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const id = randomUUID()

  try {
    await query(
      `insert into media_kits (id, title, category, file_url, thumbnail_url) values (?, ?, ?, ?, ?)`,
      [id, title, category, file_url, thumbnail_url || null],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Insert failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<MediaKitRow>('select * from media_kits where id = ?', [id])
  revalidatePath('/news')
  return NextResponse.json(data, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { NewsArticleRow } from '@/lib/database.types'

const EDITABLE_FIELDS = [
  'slug',
  'title',
  'excerpt',
  'content',
  'date',
  'date_iso',
  'category',
  'read_time',
  'image_url',
] as const

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
    await query(`update news_articles set ${setClause} where id = ?`, [
      ...Object.values(update),
      params.id,
    ])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }

  const row = await queryOne<NewsArticleRow>('select * from news_articles where id = ?', [
    params.id,
  ])
  if (!row) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }
  revalidatePath('/news')
  revalidatePath('/news/[slug]', 'page')
  return NextResponse.json(row)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await query('delete from news_articles where id = ?', [params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 },
    )
  }
  revalidatePath('/news')
  revalidatePath('/news/[slug]', 'page')
  return NextResponse.json({ ok: true })
}

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { notifyAllSubscribers } from '@/lib/push-notify'
import { requireRole } from '@/lib/admin-auth'
import type { NewsArticleRow } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await query<NewsArticleRow>(
    'select * from news_articles order by date_iso desc',
  )
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { slug, title, excerpt, content, date, date_iso, category, read_time, image_url } = body

  if (!slug || !title || !excerpt || !content || !date || !date_iso || !category || !read_time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const id = randomUUID()

  try {
    await query(
      `insert into news_articles
        (id, slug, title, excerpt, content, date, date_iso, category, read_time, image_url)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, slug, title, excerpt, content, date, date_iso, category, read_time, image_url || ''],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Insert failed' },
      { status: 500 },
    )
  }

  const data = await queryOne<NewsArticleRow>('select * from news_articles where id = ?', [id])
  if (!data) {
    return NextResponse.json({ error: 'Article not found after insert' }, { status: 500 })
  }

  revalidatePath('/news')
  revalidatePath('/news/[slug]', 'page')

  notifyAllSubscribers({
    title: 'New from FIPL',
    body: data.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/news/${data.slug}`,
    tag: `article-${data.id}`,
  }).catch(() => {})

  return NextResponse.json(data, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'

const ALLOWED_PAGES: Record<string, string> = {
  home: '/',
  about: '/about',
  sustainability: '/sustainability',
  'power-plants': '/power-plants',
  register: '/register',
  careers: '/careers',
  contact: '/contact',
  news: '/news',
}

interface PageContentRawRow {
  page: string
  content: string
  updated_at: string
}

export async function GET(req: NextRequest, { params }: { params: { page: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!(params.page in ALLOWED_PAGES)) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }

  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    params.page,
  ])
  if (!row) return NextResponse.json(null)
  return NextResponse.json({ page: row.page, content: JSON.parse(row.content), updated_at: row.updated_at })
}

export async function PUT(req: NextRequest, { params }: { params: { page: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!(params.page in ALLOWED_PAGES)) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }

  const body = await req.json()
  if (!body.content || typeof body.content !== 'object') {
    return NextResponse.json({ error: 'Missing content' }, { status: 400 })
  }

  try {
    await query(
      `insert into page_content (page, content) values (?, ?)
       on duplicate key update content = values(content), updated_at = current_timestamp`,
      [params.page, JSON.stringify(body.content)],
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Save failed' },
      { status: 500 },
    )
  }

  const row = await queryOne<PageContentRawRow>('select * from page_content where page = ?', [
    params.page,
  ])
  if (!row) {
    return NextResponse.json({ error: 'Page content not found after save' }, { status: 500 })
  }

  revalidatePath(ALLOWED_PAGES[params.page])
  return NextResponse.json({ page: row.page, content: JSON.parse(row.content), updated_at: row.updated_at })
}

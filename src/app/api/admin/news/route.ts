import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { notifyAllSubscribers } from '@/lib/push-notify'

function isAuthorized(req: NextRequest): boolean {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('date_iso', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { slug, title, excerpt, content, date, date_iso, category, read_time, image_url } = body

  if (!slug || !title || !excerpt || !content || !date || !date_iso || !category || !read_time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('news_articles')
    .insert({
      slug,
      title,
      excerpt,
      content,
      date,
      date_iso,
      category,
      read_time,
      image_url: image_url || '',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  notifyAllSubscribers({
    title: 'New from FIPL',
    body: data.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/news/${data.slug}`,
    tag: `article-${data.id}`,
  }).catch(() => {})

  return NextResponse.json(data, { status: 201 })
}

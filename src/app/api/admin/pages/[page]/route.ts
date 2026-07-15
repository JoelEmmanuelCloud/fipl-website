import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase-server'
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

export async function GET(req: NextRequest, { params }: { params: { page: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!(params.page in ALLOWED_PAGES)) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('page', params.page)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
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

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('page_content')
    .upsert({ page: params.page, content: body.content, updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidatePath(ALLOWED_PAGES[params.page])
  return NextResponse.json(data)
}

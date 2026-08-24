import { NextRequest, NextResponse } from 'next/server'
import { saveUpload } from '@/lib/upload'
import { requireRole } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const bucket = (formData.get('bucket') as string) || 'news-images'

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const buffer = await file.arrayBuffer()

  try {
    const url = await saveUpload(bucket, filename, buffer)
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

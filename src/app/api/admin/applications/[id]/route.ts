import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'

const VALID_STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected']

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { status } = await req.json()

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    await query('update job_applications set status = ? where id = ?', [status, params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await query('delete from job_applications where id = ?', [params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 },
    )
  }
  return NextResponse.json({ ok: true })
}

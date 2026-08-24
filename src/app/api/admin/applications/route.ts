import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'
import type { JobApplicationRow } from '@/lib/database.types'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  if (!requireRole(req, ['owner', 'hr'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
  const status = searchParams.get('status') || null
  const offset = (page - 1) * PAGE_SIZE

  const whereClause = status ? 'where status = ?' : ''
  const whereParams = status ? [status] : []

  const [data, countRow] = await Promise.all([
    query<JobApplicationRow>(
      `select * from job_applications ${whereClause} order by created_at desc limit ? offset ?`,
      [...whereParams, PAGE_SIZE, offset],
    ),
    queryOne<{ count: number }>(
      `select count(*) as count from job_applications ${whereClause}`,
      whereParams,
    ),
  ])

  return NextResponse.json({ data, count: countRow?.count ?? 0 })
}

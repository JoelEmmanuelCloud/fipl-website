import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query } from '@/lib/db'
import { requireRole } from '@/lib/admin-auth'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireRole(req, ['owner', 'content'])) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await query('delete from media_kits where id = ?', [params.id])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 },
    )
  }
  revalidatePath('/news')
  return NextResponse.json({ ok: true })
}

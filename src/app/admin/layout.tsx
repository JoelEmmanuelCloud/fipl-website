import { cookies } from 'next/headers'
import { verifySession } from '@/lib/admin-auth'
import AdminShell from './AdminShell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const role = verifySession(
    cookieStore.get('admin_role')?.value,
    cookieStore.get('admin_token')?.value,
  )

  return <AdminShell role={role}>{children}</AdminShell>
}

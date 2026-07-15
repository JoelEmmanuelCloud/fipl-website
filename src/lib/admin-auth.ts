import type { NextRequest } from 'next/server'

export type AdminRole = 'owner' | 'content' | 'hr'

const ROLES: AdminRole[] = ['owner', 'content', 'hr']

function passwordFor(role: AdminRole): string | undefined {
  switch (role) {
    case 'owner':
      return process.env.ADMIN_PASSWORD_OWNER || process.env.ADMIN_PASSWORD
    case 'content':
      return process.env.ADMIN_PASSWORD_CONTENT
    case 'hr':
      return process.env.ADMIN_PASSWORD_HR
  }
}

function tokenFor(role: AdminRole): string | undefined {
  switch (role) {
    case 'owner':
      return process.env.ADMIN_TOKEN_OWNER || process.env.ADMIN_TOKEN
    case 'content':
      return process.env.ADMIN_TOKEN_CONTENT
    case 'hr':
      return process.env.ADMIN_TOKEN_HR
  }
}

export function roleForPassword(password: string): AdminRole | null {
  for (const role of ROLES) {
    const expected = passwordFor(role)
    if (expected && password === expected) return role
  }
  return null
}

export function tokenForRole(role: AdminRole): string | undefined {
  return tokenFor(role)
}

export function verifySession(
  role: string | undefined,
  token: string | undefined,
): AdminRole | null {
  if (!role || !token) return null
  if (!ROLES.includes(role as AdminRole)) return null
  const expected = tokenFor(role as AdminRole)
  if (!expected || token !== expected) return null
  return role as AdminRole
}

export function sessionFromRequest(req: NextRequest): AdminRole | null {
  return verifySession(req.cookies.get('admin_role')?.value, req.cookies.get('admin_token')?.value)
}

export function requireRole(req: NextRequest, allowed: AdminRole[]): AdminRole | null {
  const role = sessionFromRequest(req)
  if (!role || !allowed.includes(role)) return null
  return role
}

export function landingPathForRole(role: AdminRole): string {
  if (role === 'hr') return '/admin/jobs'
  if (role === 'content') return '/admin/news'
  return '/admin'
}

export function isPathAllowed(role: AdminRole, pathname: string): boolean {
  if (role === 'owner') return true
  if (pathname === '/admin') return false
  const isJobsPath = pathname.startsWith('/admin/jobs')
  if (isJobsPath) return role === 'hr'
  return role === 'content'
}

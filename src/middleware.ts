import { NextRequest, NextResponse } from 'next/server'
import { isPathAllowed, landingPathForRole, sessionFromRequest } from '@/lib/admin-auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const role = sessionFromRequest(req)
    if (!role) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    if (!isPathAllowed(role, pathname)) {
      return NextResponse.redirect(new URL(landingPathForRole(role), req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

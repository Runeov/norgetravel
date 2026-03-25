import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuthFromRequest, getSessionFromRequest } from '@/lib/admin/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const isAuth = await checkAuthFromRequest(request);

    if (!isAuth) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin-only routes
    if (pathname.startsWith('/admin/users')) {
      const session = await getSessionFromRequest(request);

      if (session?.role !== 'admin') {
        // Redirect to dashboard if not admin
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
  }

  // Protect API routes under /api/admin (except auth)
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const isAuth = await checkAuthFromRequest(request);

    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check admin-only API routes
    if (pathname.startsWith('/api/admin/users')) {
      const session = await getSessionFromRequest(request);

      if (session?.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};

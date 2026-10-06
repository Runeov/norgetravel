import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuthFromRequest, getSessionFromRequest } from '@/lib/admin/auth';

const locales = ['en', 'zh', 'ja'];
const defaultLocale = 'en';

// Most internal links are unprefixed (e.g. /destinations/lofoten), so keep the
// visitor in the language of the page they clicked from. Uses the Referer
// header rather than a cookie, so no preference is stored on the device.
function localeFromReferer(request: NextRequest): string | null {
  const referer = request.headers.get('referer');
  if (!referer) return null;
  try {
    const url = new URL(referer);
    if (url.host !== request.nextUrl.host) return null;
    const segment = url.pathname.split('/')[1];
    return locales.includes(segment) ? segment : null;
  } catch {
    return null;
  }
}

function getLocale(request: NextRequest): string {
  const fromReferer = localeFromReferer(request);
  if (fromReferer) return fromReferer;

  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  if (acceptLanguage.toLowerCase().includes('zh')) {
    return 'zh';
  }
  
  if (acceptLanguage.toLowerCase().includes('ja')) {
    return 'ja';
  }
  
  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const isAuth = await checkAuthFromRequest(request);
    if (!isAuth) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith('/admin/users')) {
      const session = await getSessionFromRequest(request);
      if (session?.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
  }

  // Protect API routes
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const isAuth = await checkAuthFromRequest(request);
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    if (pathname.startsWith('/api/admin/users')) {
      const session = await getSessionFromRequest(request);
      if (session?.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
      }
    }
  }

  // i18n logic
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico).*)',
  ],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証が必要なパス
const PROTECTED_PATHS = [
  '/dashboard',
  '/instances',
  '/settings',
]

// 未ログイン時にリダイレクトしないパス
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/docs',
  '/contact',
  '/api/auth/register',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // APIルートは個別に認証チェックを行う
  if (path.startsWith('/api/') && !PUBLIC_PATHS.includes(path)) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.next()
  }

  // 保護されたパスへのアクセスをチェック
  if (PROTECTED_PATHS.some(p => path.startsWith(p))) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('redirect', path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
// middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  console.log('🔍 Middleware triggered for:', pathname)

  // Define public routes that don't need authentication
  const publicPaths = [
    "/sign-in",
    "/sign-up"
  ]

  // Allow public paths and API routes
  if (publicPaths.includes(pathname) || pathname.startsWith("/api/")) {
    console.log('✅ Allowing public/API path:', pathname)
    return NextResponse.next()
  }

  // Get the token with explicit configuration
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // Add these explicit configurations
    cookieName: process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token' 
      : 'next-auth.session-token',
    secureCookie: process.env.NODE_ENV === 'production',
  })

  console.log('🔑 Token check for', pathname, ':', {
    hasToken: !!token,
    tokenEmail: token?.email,
    tokenExp: token?.exp,
    currentTime: Math.floor(Date.now() / 1000),
    cookies: request.cookies.getAll().map(c => c.name) // Debug: see all cookies
  })

  // Redirect to signin if no token and trying to access protected route
  if (!token) {
    console.log('🚫 No token found, redirecting to sign-in')
    const signInUrl = new URL("/sign-in", request.url)
    if (pathname !== "/sign-in") {
      signInUrl.searchParams.set("callbackUrl", request.url)
    }
    return Response.redirect(signInUrl)
  }

  console.log('✅ Token valid, allowing access to:', pathname)
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only match actual routes, not static assets
    '/',
    '/dashboard/:path*',
    '/profile/:path*', 
    '/video/:path*',
    '/search/:path*'
  ]
}

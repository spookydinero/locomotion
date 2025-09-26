import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl
  console.log('🛡️ Middleware processing:', pathname, 'Session:', !!session)

  // Protected dashboard routes
  const dashboardRoutes = [
    '/dashboard/owner',
    '/dashboard/manager', 
    '/dashboard/lift-worker',
    '/dashboard/front-desk'
  ]

  // Check if accessing a dashboard route
  const isDashboardRoute = dashboardRoutes.some(route => pathname.startsWith(route))
  console.log('🔍 Is dashboard route:', isDashboardRoute)

  if (isDashboardRoute) {
    // Redirect to login if not authenticated
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Get user profile to check role
    const { data: profile } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          id,
          name,
          permissions
        )
      `)
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      // User profile not found, redirect to login
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }

    // Role-based access control
    const userRole = profile.roles?.name || profile.role
    console.log('🔒 Middleware checking role:', userRole)
    const allowedRoutes: Record<string, string[]> = {
      owner: ['/dashboard/owner'],
      manager: ['/dashboard/manager'],
      technician: ['/dashboard/lift-worker'],
      front_desk: ['/dashboard/front-desk']
    }

    const userAllowedRoutes = allowedRoutes[userRole] || []
    const hasAccess = userAllowedRoutes.some(route => pathname.startsWith(route))
    
    console.log('🔐 Access check:', {
      userRole,
      userAllowedRoutes,
      requestedPath: pathname,
      hasAccess
    })

    if (!hasAccess) {
      // Redirect to appropriate dashboard for user's role
      const correctDashboard = userAllowedRoutes[0]
      console.log('❌ Access denied, redirecting to:', correctDashboard)
      
      if (correctDashboard) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = correctDashboard
        return NextResponse.redirect(redirectUrl)
      } else {
        // Unknown role, redirect to login
        console.log('❌ Unknown role, redirecting to login')
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
      }
    }
    
    console.log('✅ Access granted to:', pathname)
  }

  // Allow access to login page and other non-protected routes
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
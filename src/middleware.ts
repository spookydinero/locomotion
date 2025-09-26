import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create server client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          res.cookies.set(name, value, options)
        },
        remove(name: string, options: Record<string, unknown>) {
          res.cookies.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

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

    // Get user profile to check role (using service role to bypass RLS)
    console.log('🔍 Middleware fetching profile for user:', session.user.id)
    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile, error: profileError } = await serviceSupabase
      .from('users')
      .select(`
        *,
        roles!role_id (
          id,
          name,
          permissions
        )
      `)
      .eq('id', session.user.id)
      .single()

    console.log('🔍 Middleware profile fetch result:', {
      hasProfile: !!profile,
      profileError: profileError?.message,
      profileRoles: profile?.roles,
      profileRoleName: profile?.roles?.name,
      profileRole: profile?.role
    })

    if (!profile) {
      console.log('❌ No profile found, redirecting to login')
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
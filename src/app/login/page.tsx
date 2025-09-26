'use client'

import { useAuth } from '@/lib/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  // Debug logging
  console.log('🔍 LoginPage render:', { 
    loading, 
    hasUser: !!user, 
    userEmail: user?.email,
    hasProfile: !!profile,
    profileRole: profile?.roles?.name || profile?.roles,
    fullProfile: profile
  })

  useEffect(() => {
    console.log('🔄 LoginPage useEffect triggered:', {
      hasUser: !!user,
      hasProfile: !!profile,
      userEmail: user?.email,
      profileRoles: profile?.roles,
      profileRolesName: profile?.roles?.name,
      redirectTo
    })

    if (user && profile) {
      // If there's a redirectTo parameter, use it (middleware will validate access)
      if (redirectTo) {
        console.log('🔀 Redirecting to redirectTo:', redirectTo)
        router.push(redirectTo)
        return
      }

      // Otherwise, redirect to appropriate dashboard based on user role
      const roleName = profile.roles?.name || profile.roles
      console.log('🎯 Redirecting based on role:', roleName, 'from profile:', JSON.stringify(profile.roles))

      let redirectPath = '/dashboard/manager' // default

      switch (roleName) {
        case 'owner':
          console.log('🏠 Redirecting to owner dashboard')
          redirectPath = '/dashboard/owner'
          break
        case 'manager':
          console.log('👔 Redirecting to manager dashboard')
          redirectPath = '/dashboard/manager'
          break
        case 'technician':
          console.log('🔧 Redirecting to lift-worker dashboard')
          redirectPath = '/dashboard/lift-worker'
          break
        case 'front_desk':
          console.log('🖥️ Redirecting to front-desk dashboard')
          redirectPath = '/dashboard/front-desk'
          break
        default:
          console.warn('❓ Unknown role:', roleName, 'falling back to manager')
          redirectPath = '/dashboard/manager'
      }

      console.log('🚀 Attempting navigation to:', redirectPath)
      try {
        // Try router.push first
        router.push(redirectPath)
        console.log('✅ router.push called successfully')
      } catch (error) {
        console.error('❌ router.push failed:', error)
        // Fallback to window.location
        console.log('🔄 Falling back to window.location.href')
        window.location.href = redirectPath
      }
    } else {
      console.log('⏳ Waiting for user and profile to load...')
    }
  }, [user, profile, router, redirectTo])

  // Debug: Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        console.log('🔍 LoginPage session check:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          hasToken: !!session?.access_token
        })
      } catch (error) {
        console.error('❌ LoginPage session check error:', error)
      }
    }
    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
        <div className="text-sm text-gray-500 mt-2">
          Debug: loading={String(loading)}, user={user?.email || 'none'}, profile={profile?.roles?.name || 'none'}
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Redirecting to dashboard...</div>
    </div>
  )
}
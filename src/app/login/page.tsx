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
    if (!loading && user && profile) {
      // If there's a redirectTo parameter, use it (middleware will validate access)
      if (redirectTo) {
        router.push(redirectTo)
        return
      }

      // Otherwise, redirect to appropriate dashboard based on user role
      const roleName = profile.roles?.name || profile.roles
      console.log('🎯 Redirecting based on role:', roleName)

      switch (roleName) {
        case 'owner':
          router.push('/dashboard/owner')
          break
        case 'manager':
          router.push('/dashboard/manager')
          break
        case 'technician':
          router.push('/dashboard/lift-worker')
          break
        case 'front_desk':
          router.push('/dashboard/front-desk')
          break
        default:
          console.warn('Unknown role:', roleName)
          router.push('/dashboard/manager') // Default fallback
      }
    }
  }, [user, profile, loading, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
        <div className="text-sm text-gray-500 mt-2">
          Debug: loading={String(loading)}, user={user?.email || 'none'}, profile={profile?.roles || 'none'}
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
'use client'

import { useAuth } from '@/lib/auth'
import LoginForm from '@/components/LoginForm'
import ManagerDashboard from '@/components/ManagerDashboard'
import OwnerDashboard from '@/components/OwnerDashboard'

export default function LoginPage() {
  const { user, profile, loading } = useAuth()

  // Debug logging
  console.log('🔍 LoginPage render:', { 
    loading, 
    hasUser: !!user, 
    userEmail: user?.email,
    hasProfile: !!profile,
    profileRole: profile?.roles?.name 
  })

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

  // Route to different dashboards based on user role
  if (profile?.roles?.name === 'owner') {
    return <OwnerDashboard />
  }

  // Default to manager dashboard for all other roles
  return <ManagerDashboard />
}
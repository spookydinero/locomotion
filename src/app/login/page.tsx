'use client'

import { useAuth } from '@/lib/auth'
import LoginForm from '@/components/LoginForm'
import ManagerDashboard from '@/components/ManagerDashboard'
import OwnerDashboard from '@/components/OwnerDashboard'

export default function LoginPage() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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
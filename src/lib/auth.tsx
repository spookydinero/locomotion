'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase'
import { getCurrentUser } from './database'
import type { User, Role } from './types'

interface AuthContextType {
  user: User | null
  profile: (User & { roles: Role }) | null
  loading: boolean
  signOut: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasEntityAccess: (entityId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<(User & { roles: Role }) | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const result = await getCurrentUser()
      if (result.data) {
        setUser(result.data)
        setProfile(result.data)
      } else if (result.error) {
        console.error('Error loading user profile:', result.error)
      }
    } catch (error) {
      console.error('Failed to load user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!profile?.roles?.permissions) return false
    return profile.roles.permissions.includes(permission) || profile.roles.permissions.includes('all')
  }

  const hasEntityAccess = (entityId: string): boolean => {
    if (!profile?.entity_access) return false
    return profile.entity_access.includes(entityId)
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signOut,
    hasPermission,
    hasEntityAccess
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(&apos;useAuth must be used within an AuthProvider&apos;)
  }
  return context
}

// Higher-order component for protecting routes
export function withAuth<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  requiredPermissions?: string[],
  requiredEntityAccess?: string[]
) {
  return function AuthenticatedComponent(props: T) {
    const { user, profile, loading, hasPermission, hasEntityAccess } = useAuth()

    if (loading) {
      return <div>Loading...</div>
    }

    if (!user || !profile) {
      return <div>Please sign in to access this page.</div>
    }

    // Check permissions
    if (requiredPermissions) {
      const hasRequiredPermissions = requiredPermissions.every(perm => hasPermission(perm))
      if (!hasRequiredPermissions) {
        return <div>You don&apos;t have permission to access this page.</div>
      }
    }

    // Check entity access
    if (requiredEntityAccess) {
      const hasRequiredEntityAccess = requiredEntityAccess.every(entityId => hasEntityAccess(entityId))
      if (!hasRequiredEntityAccess) {
        return <div>You don&apos;t have access to the required entities.</div>
      }
    }

    return <Component {...props} />
  }
}

// Hook for checking specific permissions
export function usePermissions() {
  const { hasPermission, hasEntityAccess, profile } = useAuth()

  return {
    hasPermission,
    hasEntityAccess,
    isOwner: profile?.roles?.name === 'owner',
    isManager: profile?.roles?.name === 'manager',
    isTechnician: profile?.roles?.name === 'technician',
    isFrontDesk: profile?.roles?.name === 'front_desk',
    userEntities: profile?.entity_access || []
  }
}
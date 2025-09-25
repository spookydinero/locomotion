'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase'
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
  // Start with loading = false to immediately show login form
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<(User & { roles: Role }) | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    console.log('🚀 AuthProvider: useEffect starting...')
    
    // Simple auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth state change:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ User signed in')
          // For now, just set a basic user object
          setUser({ 
            id: session.user.id, 
            email: session.user.email || '',
            full_name: session.user.email || '',
            entity_id: 'default'
          } as User)
          setProfile({ 
            id: session.user.id, 
            email: session.user.email || '',
            full_name: session.user.email || '',
            entity_id: 'default',
            roles: { name: 'manager', permissions: [] } as Role
          } as User & { roles: Role })
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out')
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      console.log('🧹 AuthProvider cleanup')
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const hasPermission = (permission: string): boolean => {
    return true // Simplified for now
  }

  const hasEntityAccess = (entityId: string): boolean => {
    return true // Simplified for now
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut,
        hasPermission,
        hasEntityAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth()

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      )
    }

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Please log in to access this page.</div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { createClient } from './supabase'
import type { User, Role } from './types'
import type { Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  profile: (User & { roles: Role }) | null
  loading: boolean
  signOut: () => Promise<void>
  hasPermission: () => boolean
  hasEntityAccess: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 🔥 Persist auth state across Fast Refresh/reloads
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth_user')
      return saved ? JSON.parse(saved) : null
    }
    return null
  })
  const [profile, setProfile] = useState<(User & { roles: Role }) | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth_profile')
      return saved ? JSON.parse(saved) : null
    }
    return null
  })
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth_loading')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })
  const supabase = createClient()
  const hasCheckedInitial = useRef(false) // 🔥 Prevent duplicate initial checks on Fast Refresh
  const isFetchingProfile = useRef(false) // 🔥 Prevent concurrent profile fetches

  // 🔥 Persist state changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_profile', JSON.stringify(profile))
    }
  }, [profile])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_loading', JSON.stringify(loading))
    }
  }, [loading])

  useEffect(() => {
    console.log('🚀 AuthProvider: useEffect starting...')

    // 🔥 CRITICAL FIX #2: Check for existing session using getSession (from storage)
    const checkInitialSession = async () => {
      // 🔥 Prevent duplicate initial checks (e.g., from Fast Refresh)
      if (hasCheckedInitial.current) {
        console.log('ℹ️ Initial session already checked, skipping...')
        return
      }
      hasCheckedInitial.current = true

      try {
        console.log('🔍 Checking for existing session...')
        const { data: { session }, error } = await supabase.auth.getSession()

        console.log('🔍 Session check result:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          error: error?.message
        })

        if (error) {
          console.error('❌ Session check error:', error)
          setLoading(false) // Stop loading on error
          return
        }

        if (session?.user) {
          // 🔥 If we already have profile from localStorage, don't fetch again
          if (profile && user) {
            console.log('✅ Existing session and persisted profile found, skipping fetch')
            setLoading(false)
          } else {
            console.log('✅ Existing session found, fetching profile...')
            await fetchUserProfile(session)
          }
        } else {
          console.log('ℹ️ No existing session found, clearing persisted state')
          setUser(null)
          setProfile(null)
          setLoading(false) // Stop loading when no session
          // Clear persisted state
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_user')
            localStorage.removeItem('auth_profile')
            localStorage.removeItem('auth_loading')
          }
        }
      } catch (err) {
        console.error('💥 Initial session check error:', err)
        setLoading(false) // Stop loading on error
      }
    }

    // 🔥 CRITICAL FIX #3: Proper profile fetching with loading management
    const fetchUserProfile = async (session: Session) => {
      // 🔥 Prevent concurrent fetches
      if (isFetchingProfile.current) {
        console.log('ℹ️ Profile fetch already in progress, skipping...')
        return
      }
      isFetchingProfile.current = true

      try {
        console.log('🔄 Starting profile fetch, setting loading = true')
        setLoading(true) // Start loading when fetching profile

        // If no token in session, try to get it from the client
        let token: string | undefined = session?.access_token
        if (!token) {
          console.log('🔑 No token in session, getting from client...')
          const { data: { session: clientSession } } = await supabase.auth.getSession()
          token = clientSession?.access_token
          console.log('🔑 Token from client:', !!token)
        }

        if (!token) {
          console.log('❌ No token available, cannot fetch profile')
          setLoading(false)
          return
        }

        console.log('📡 Fetching user profile via API...', { hasToken: !!token })
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        console.log('📡 API response received:', response.status, response.statusText)

        if (!response.ok) {
          let errorData = {}
          try {
            errorData = await response.json()
          } catch {
            errorData = { 
              message: `HTTP ${response.status}: ${response.statusText}`,
              status: response.status,
              statusText: response.statusText
            }
          }
          console.error('❌ API error:', errorData)
          setLoading(false) // Stop loading on API error
          return
        }

        let responseData
        try {
          responseData = await response.json()
        } catch (parseError) {
          console.error('❌ Failed to parse API response:', parseError)
          setLoading(false)
          return
        }

        const { profile: userData } = responseData
        
        if (!userData || typeof userData !== 'object') {
          console.error('❌ Invalid user data returned from API:', userData)
          setLoading(false) // Stop loading when invalid data
          return
        }

        console.log('🎉 Profile fetched successfully:', userData.email, userData.roles?.name)
        
        // 🔥 CRITICAL: Ensure userData has proper structure to prevent React rendering errors
        // The API returns roles as an object from Supabase join, ensure it's properly structured
        const safeUserData = {
          ...userData,
          // Ensure roles is properly structured - API returns it as an object from join
          roles: userData.roles && typeof userData.roles === 'object' 
            ? {
                id: String(userData.roles.id || ''),
                name: String(userData.roles.name || 'unknown'),
                permissions: Array.isArray(userData.roles.permissions) ? userData.roles.permissions : [],
                created_at: String(userData.roles.created_at || '')
              }
            : { name: 'unknown', permissions: [], id: '', created_at: '' }
        }
        
        // Additional safety check - ensure all string fields are actually strings
        const finalUserData = {
          ...safeUserData,
          email: String(safeUserData.email || ''),
          full_name: String(safeUserData.full_name || ''),
          id: String(safeUserData.id || ''),
          roles: {
            ...safeUserData.roles,
            name: String(safeUserData.roles?.name || 'unknown'),
            permissions: Array.isArray(safeUserData.roles?.permissions) 
              ? safeUserData.roles.permissions 
              : []
          }
        }
        
        console.log('🔒 Safe user data prepared:', {
          email: finalUserData.email,
          roleName: finalUserData.roles.name,
          hasPermissions: Array.isArray(finalUserData.roles.permissions)
        })
        
        // Set user data and stop loading
        console.log('🔄 Setting user and profile in auth context:', {
          email: finalUserData.email,
          roleName: finalUserData.roles.name,
          fullRoles: finalUserData.roles
        })
        setUser(finalUserData as User)
        setProfile(finalUserData as User & { roles: Role })
        setLoading(false) // 🔥 CRITICAL: Stop loading after successful fetch

      } catch (err) {
        console.error('💥 Profile fetch error:', err)
        setLoading(false) // Stop loading on error
      } finally {
        isFetchingProfile.current = false // 🔥 Reset fetch flag
      }
    }

    // Check for existing session immediately
    checkInitialSession()
    
    // 🔥 CRITICAL FIX #4: Enhanced auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          console.log('🔔 Auth state change:', event, {
            hasSession: !!session,
            hasUser: !!session?.user,
            userEmail: session?.user?.email,
            hasToken: !!session?.access_token
          })

          if (event === 'SIGNED_IN' && session?.user) {
            // 🔥 Prevent duplicate profile fetches if we already have profile
            if (profile && user) {
              console.log('ℹ️ Profile already loaded, skipping SIGNED_IN fetch')
              return
            }
            console.log('✅ User signed in, fetching profile...')
            await fetchUserProfile(session)
          } else if (event === 'SIGNED_OUT') {
            console.log('👋 User signed out')
            setUser(null)
            setProfile(null)
            setLoading(false) // Stop loading on sign out
          } else if (event === 'TOKEN_REFRESHED' && session) {
            console.log('🔄 Token refreshed, updating profile...')
            await fetchUserProfile(session)
          } else {
            console.log('ℹ️ Other auth event:', event)
          }
        } catch (error) {
          console.error('💥 Auth state change error:', error)
          setLoading(false) // Stop loading on error
        }
      }
    )

    return () => {
      console.log('🧹 AuthProvider cleanup')
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOut = async () => {
    setLoading(true) // Show loading during sign out
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setLoading(false) // Stop loading after sign out
    // 🔥 Clear persisted auth state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_profile')
      localStorage.removeItem('auth_loading')
    }
  }

  const hasPermission = (): boolean => {
    return true // Simplified for now
  }

  const hasEntityAccess = (): boolean => {
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
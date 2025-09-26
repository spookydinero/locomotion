import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    // Create client with service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('❌ Auth verification failed:', authError)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    console.log('✅ Token verified for user:', user.email)

    // Fetch user profile with role information
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          id,
          name,
          permissions,
          created_at
        )
      `)
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      console.error('❌ Error fetching user profile:', userError)
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    console.log('🎉 User profile fetched successfully:', userData.email, userData.roles?.name)

    return NextResponse.json({ 
      success: true, 
      profile: userData 
    })

  } catch (error) {
    console.error('💥 API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
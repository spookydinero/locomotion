const { createClient } = require('@supabase/supabase-js')

// Test login functionality
async function testLogin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  console.log('🔐 Testing login with fyves@dev.com...')
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'fyves@dev.com',
      password: '123test'
    })
    
    if (error) {
      console.error('❌ Login failed:', error.message)
    } else {
      console.log('✅ Login successful!')
      console.log('User:', data.user?.email)
      console.log('Session:', !!data.session)
      
      // Test getting user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select(`
          *,
          roles (
            id,
            name,
            permissions
          )
        `)
        .eq('id', data.user.id)
        .single()
        
      if (profileError) {
        console.error('❌ Profile fetch failed:', profileError.message)
      } else {
        console.log('✅ Profile loaded!')
        console.log('Role:', profile?.roles?.name)
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testLogin()
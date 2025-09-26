require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const credentials = [
  { email: 'fyves@owner.com', password: 'password123', expectedRole: 'owner', expectedDashboard: '/dashboard/owner' },
  { email: 'fyves@dev.com', password: 'password123', expectedRole: 'manager', expectedDashboard: '/dashboard/manager' },
  { email: 'technician@test.com', password: 'password123', expectedRole: 'technician', expectedDashboard: '/dashboard/lift-worker' },
  { email: 'frontdesk@test.com', password: 'password123', expectedRole: 'front_desk', expectedDashboard: '/dashboard/front-desk' }
]

async function testCredential(credential) {
  console.log(`\n🧪 Testing credential: ${credential.email}`)
  console.log(`   Expected role: ${credential.expectedRole}`)
  console.log(`   Expected dashboard: ${credential.expectedDashboard}`)
  
  try {
    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credential.email,
      password: credential.password
    })

    if (authError) {
      console.log(`❌ Auth failed: ${authError.message}`)
      return false
    }

    console.log(`✅ Authentication successful`)

    // Test profile fetch
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
      .eq('id', authData.user.id)
      .single()

    if (userError || !userData) {
      console.log(`❌ Profile fetch failed: ${userError?.message}`)
      return false
    }

    console.log(`✅ Profile fetched successfully`)
    console.log(`   User: ${userData.email}`)
    console.log(`   Role: ${userData.roles?.name}`)
    console.log(`   Full name: ${userData.full_name}`)

    // Verify role matches expected
    if (userData.roles?.name === credential.expectedRole) {
      console.log(`✅ Role verification passed`)
    } else {
      console.log(`❌ Role mismatch - Expected: ${credential.expectedRole}, Got: ${userData.roles?.name}`)
      return false
    }

    // Sign out
    await supabase.auth.signOut()
    console.log(`✅ Sign out successful`)

    return true

  } catch (error) {
    console.log(`💥 Test failed with error: ${error.message}`)
    return false
  }
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive authentication tests...')
  console.log('=' .repeat(60))

  let passedTests = 0
  let totalTests = credentials.length

  for (const credential of credentials) {
    const result = await testCredential(credential)
    if (result) {
      passedTests++
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '=' .repeat(60))
  console.log(`🎯 Test Results: ${passedTests}/${totalTests} passed`)
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! Authentication system is working correctly.')
    console.log('\n📋 Verified credentials:')
    credentials.forEach(cred => {
      console.log(`   ✅ ${cred.email} → ${cred.expectedRole} → ${cred.expectedDashboard}`)
    })
  } else {
    console.log('❌ Some tests failed. Please check the logs above.')
  }
}

// Run the tests
runAllTests().catch(console.error)
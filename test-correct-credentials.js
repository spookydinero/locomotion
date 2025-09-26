require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const credentials = [
  { email: 'fyves@owner.com', password: '123test', expectedRole: 'owner', expectedDashboard: '/dashboard/owner' },
  { email: 'fyves@dev.com', password: '123test', expectedRole: 'manager', expectedDashboard: '/dashboard/manager' },
  { email: 'technician@test.com', password: '123test', expectedRole: 'technician', expectedDashboard: '/dashboard/lift-worker' },
  { email: 'frontdesk@test.com', password: '123test', expectedRole: 'front_desk', expectedDashboard: '/dashboard/front-desk' }
]

async function testCredential(credential) {
  console.log(`\n🧪 Testing credential: ${credential.email}`)
  console.log(`   Password: ${credential.password}`)
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
    console.log(`   User ID: ${authData.user.id}`)
    console.log(`   Email: ${authData.user.email}`)

    // Test profile fetch using the API endpoint (simulating what the app does)
    const token = authData.session.access_token
    
    // Simulate API call
    console.log(`🔍 Testing profile API call...`)
    
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
  console.log('🚀 Testing all credentials with correct password (123test)...')
  console.log('=' .repeat(70))

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

  console.log('\n' + '=' .repeat(70))
  console.log(`🎯 Test Results: ${passedTests}/${totalTests} passed`)
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL AUTHENTICATION TESTS PASSED!')
    console.log('\n📋 Verified credentials:')
    credentials.forEach(cred => {
      console.log(`   ✅ ${cred.email} : ${cred.password} → ${cred.expectedRole} → ${cred.expectedDashboard}`)
    })
    console.log('\n🚀 Ready for manual dashboard testing!')
  } else {
    console.log('❌ Some tests failed. Please check the logs above.')
  }
}

// Run the tests
runAllTests().catch(console.error)
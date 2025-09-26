require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const credentials = [
  { email: 'fyves@owner.com', expectedRole: 'owner', expectedDashboard: '/dashboard/owner' },
  { email: 'fyves@dev.com', expectedRole: 'manager', expectedDashboard: '/dashboard/manager' },
  { email: 'technician@test.com', expectedRole: 'technician', expectedDashboard: '/dashboard/lift-worker' },
  { email: 'frontdesk@test.com', expectedRole: 'front_desk', expectedDashboard: '/dashboard/front-desk' }
]

const commonPasswords = [
  'password123',
  'password',
  '123456',
  'test123',
  'admin123',
  'locomotion123',
  'fyves123',
  'test'
]

async function testCredentialWithPasswords(email, expectedRole) {
  console.log(`\n🧪 Testing ${email} (expected role: ${expectedRole})`)
  
  for (const password of commonPasswords) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (!authError && authData.user) {
        console.log(`✅ SUCCESS! ${email} with password: "${password}"`)
        
        // Sign out immediately
        await supabase.auth.signOut()
        return password
      }
    } catch (error) {
      // Continue to next password
    }
  }
  
  console.log(`❌ No working password found for ${email}`)
  return null
}

async function testAllCredentials() {
  console.log('🚀 Testing all credentials with common passwords...')
  console.log('=' .repeat(60))

  const workingCredentials = []

  for (const credential of credentials) {
    const workingPassword = await testCredentialWithPasswords(credential.email, credential.expectedRole)
    if (workingPassword) {
      workingCredentials.push({
        ...credential,
        password: workingPassword
      })
    }
    
    // Wait between tests
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n' + '=' .repeat(60))
  console.log('🎯 WORKING CREDENTIALS:')
  
  if (workingCredentials.length > 0) {
    workingCredentials.forEach(cred => {
      console.log(`✅ ${cred.email} : ${cred.password} → ${cred.expectedRole} → ${cred.expectedDashboard}`)
    })
  } else {
    console.log('❌ No working credentials found')
  }

  return workingCredentials
}

testAllCredentials().catch(console.error)
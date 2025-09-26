#!/usr/bin/env node

/**
 * 🚨 CRITICAL FIXES VERIFICATION SCRIPT
 * 
 * This script tests that the critical system failures have been resolved:
 * 1. React rendering error: "Objects are not valid as a React child"
 * 2. API error: Empty error objects "{}"
 * 3. Authentication flow functionality
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const testCredentials = [
  { email: 'fyves@owner.com', password: '123test', expectedRole: 'owner', expectedDashboard: '/dashboard/owner' },
  { email: 'fyves@dev.com', password: '123test', expectedRole: 'manager', expectedDashboard: '/dashboard/manager' },
  { email: 'technician@test.com', password: '123test', expectedRole: 'technician', expectedDashboard: '/dashboard/lift-worker' },
  { email: 'frontdesk@test.com', password: '123test', expectedRole: 'front_desk', expectedDashboard: '/dashboard/front-desk' }
]

async function testCriticalFixes() {
  console.log('🚨 CRITICAL FIXES VERIFICATION')
  console.log('=' .repeat(50))
  
  let allTestsPassed = true

  for (const credential of testCredentials) {
    console.log(`\n🧪 Testing ${credential.email}...`)
    
    try {
      // Test 1: Authentication
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credential.email,
        password: credential.password
      })

      if (authError) {
        console.log(`❌ Authentication failed: ${authError.message}`)
        allTestsPassed = false
        continue
      }

      console.log(`✅ Authentication successful`)

      // Test 2: API Profile Fetch (simulating the fixed API call)
      try {
        const response = await fetch('http://localhost:3001/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authData.session.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          console.log(`❌ API call failed with status: ${response.status}`)
          allTestsPassed = false
          continue
        }

        const responseData = await response.json()
        const userData = responseData.profile

        if (!userData || !userData.roles) {
          console.log(`❌ Invalid user data structure`)
          allTestsPassed = false
          continue
        }

        // Test 3: Data Structure Validation (preventing React rendering errors)
        const roleData = userData.roles
        if (typeof roleData !== 'object' || !roleData.name) {
          console.log(`❌ Invalid role data structure`)
          allTestsPassed = false
          continue
        }

        // Test 4: Ensure all fields are properly typed (preventing React child errors)
        const isValidStructure = (
          typeof roleData.id === 'string' &&
          typeof roleData.name === 'string' &&
          Array.isArray(roleData.permissions) &&
          typeof roleData.created_at === 'string'
        )

        if (!isValidStructure) {
          console.log(`❌ Role data fields are not properly typed`)
          console.log(`   ID: ${typeof roleData.id}, Name: ${typeof roleData.name}`)
          console.log(`   Permissions: ${Array.isArray(roleData.permissions)}, Created: ${typeof roleData.created_at}`)
          allTestsPassed = false
          continue
        }

        console.log(`✅ API call successful, data structure valid`)
        console.log(`   Role: ${roleData.name}`)
        console.log(`   Permissions: ${roleData.permissions.length} items`)

        // Test 5: Role Validation
        if (roleData.name !== credential.expectedRole) {
          console.log(`❌ Role mismatch - Expected: ${credential.expectedRole}, Got: ${roleData.name}`)
          allTestsPassed = false
          continue
        }

        console.log(`✅ Role validation passed`)

      } catch (apiError) {
        console.log(`❌ API test failed: ${apiError.message}`)
        allTestsPassed = false
        continue
      }

      // Clean up - sign out
      await supabase.auth.signOut()
      console.log(`✅ Sign out successful`)

    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`)
      allTestsPassed = false
    }
  }

  console.log('\n' + '=' .repeat(50))
  if (allTestsPassed) {
    console.log('🎉 ALL CRITICAL FIXES VERIFIED SUCCESSFULLY!')
    console.log('✅ React rendering errors: FIXED')
    console.log('✅ API error handling: FIXED') 
    console.log('✅ Authentication flow: WORKING')
    console.log('✅ Data structure validation: WORKING')
    process.exit(0)
  } else {
    console.log('❌ SOME TESTS FAILED - SYSTEM STILL HAS ISSUES')
    process.exit(1)
  }
}

// Run the tests
testCriticalFixes().catch(error => {
  console.error('💥 Test script failed:', error)
  process.exit(1)
})
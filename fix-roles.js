require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkAndFixRoles() {
  console.log('🔍 Checking roles in the database...')
  console.log('=' .repeat(60))

  try {
    // First, check all roles
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*')

    if (rolesError) {
      console.log(`❌ Error fetching roles: ${rolesError.message}`)
      return
    }

    console.log(`✅ Found ${roles.length} roles:`)
    roles.forEach((role, index) => {
      console.log(`${index + 1}. 🎭 ${role.name} (ID: ${role.id})`)
    })
    console.log('')

    // Find technician role
    const technicianRole = roles.find(role => role.name === 'technician')
    if (!technicianRole) {
      console.log('❌ Technician role not found!')
      return
    }

    // Update technician user to have the technician role
    const { data: updateResult, error: updateError } = await supabase
      .from('users')
      .update({ role_id: technicianRole.id })
      .eq('email', 'technician@test.com')

    if (updateError) {
      console.log(`❌ Error updating technician role: ${updateError.message}`)
    } else {
      console.log(`✅ Successfully assigned technician role to technician@test.com`)
    }

    // Verify the update
    const { data: updatedUser, error: verifyError } = await supabase
      .from('users')
      .select(`
        email,
        roles:role_id (name)
      `)
      .eq('email', 'technician@test.com')
      .single()

    if (verifyError) {
      console.log(`❌ Error verifying update: ${verifyError.message}`)
    } else {
      console.log(`✅ Verification: technician@test.com now has role: ${updatedUser.roles?.name}`)
    }

  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
  }
}

checkAndFixRoles().catch(console.error)
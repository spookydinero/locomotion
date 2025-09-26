require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkUsers() {
  console.log('🔍 Checking existing users in the database...')
  console.log('=' .repeat(60))

  try {
    // Fetch all users with their roles
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        created_at,
        roles:role_id (
          id,
          name,
          permissions
        )
      `)

    if (error) {
      console.log(`❌ Error fetching users: ${error.message}`)
      return
    }

    if (!users || users.length === 0) {
      console.log('❌ No users found in the database')
      return
    }

    console.log(`✅ Found ${users.length} users:`)
    console.log('')

    users.forEach((user, index) => {
      console.log(`${index + 1}. 👤 ${user.email}`)
      console.log(`   📧 Email: ${user.email}`)
      console.log(`   👤 Full Name: ${user.full_name || 'Not set'}`)
      console.log(`   🎭 Role: ${user.roles?.name || 'No role assigned'}`)
      console.log(`   🆔 User ID: ${user.id}`)
      console.log(`   📅 Created: ${new Date(user.created_at).toLocaleDateString()}`)
      console.log('')
    })

    // Also check auth users
    console.log('🔐 Checking Supabase Auth users...')
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.log(`❌ Error fetching auth users: ${authError.message}`)
    } else {
      console.log(`✅ Found ${authUsers.users.length} auth users:`)
      authUsers.users.forEach((authUser, index) => {
        console.log(`${index + 1}. 🔐 ${authUser.email} (ID: ${authUser.id})`)
      })
    }

  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
  }
}

checkUsers().catch(console.error)
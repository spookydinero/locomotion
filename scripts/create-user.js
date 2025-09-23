const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'fyves@dev.com',
      password: '123test',
      email_confirm: true
    })

    if (error) {
      console.error('Error creating user:', error.message)
    } else {
      console.log('User created successfully:', data.user.email)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

createUser()
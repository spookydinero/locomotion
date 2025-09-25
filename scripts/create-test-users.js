#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUsers() {
  console.log('🚀 Creating test users for Locomotion AI...\n');

  // Test user data
  const testUsers = [
    {
      email: 'fyves@owner.com',
      password: '123test',
      full_name: 'Fyves Owner',
      role: 'owner'
    },
    {
      email: 'fyves@dev.com',
      password: '123test',
      full_name: 'Fyves Manager',
      role: 'manager'
    }
  ];

  console.log('📋 MANUAL USER CREATION REQUIRED:');
  console.log('Since programmatic user creation can be unreliable, please create users manually:');
  console.log('');
  console.log('1. 🌐 Go to your Supabase Dashboard: https://supabase.com/dashboard');
  console.log('2. 📂 Navigate to Authentication > Users');
  console.log('3. ➕ Click "Add user" for each account:');
  console.log('');

  testUsers.forEach((user, index) => {
    console.log(`   ${index + 1}. ${user.email}`);
    console.log(`      Password: ${user.password}`);
    console.log(`      Full Name: ${user.full_name}`);
    console.log(`      Role: ${user.role}`);
    console.log('');
  });

  console.log('4. ✅ After creating users, run: npm run db:seed');
  console.log('5. 🔄 Then start the app: npm run dev');
  console.log('');
  console.log('📱 Test the different dashboards:');
  console.log('   Owner: fyves@owner.com / 123test → KPI Dashboard');
  console.log('   Manager: fyves@dev.com / 123test → Management Dashboard');
  console.log('');

  // Alternative: Try to create users programmatically (may not work)
  console.log('🔄 Attempting programmatic user creation...');

  for (const userData of testUsers) {
    try {
      console.log(`👤 Creating ${userData.email}...`);

      // Try regular signup first
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role
          }
        }
      });

      if (error) {
        console.log(`⚠️  Signup failed for ${userData.email}: ${error.message}`);
        console.log('   This is normal - please create manually in dashboard');
      } else {
        console.log(`✅ Created ${userData.email}`);
      }
    } catch (err) {
      console.log(`❌ Error creating ${userData.email}: ${err.message}`);
    }
  }

  console.log('\n🎯 Next steps:');
  console.log('1. Create users manually in Supabase dashboard (see instructions above)');
  console.log('2. Run: npm run db:seed');
  console.log('3. Start app: npm run dev');
  console.log('4. Login with the credentials above');
}

createTestUsers().catch(console.error);
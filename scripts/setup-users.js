#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// User accounts to create
const users = [
  {
    email: 'fyves@owner.com',
    password: '123test',
    full_name: 'Fyves Owner',
    role: 'owner',
    entity_access: 'all' // Will be converted to array of all entity IDs
  },
  {
    email: 'fyves@dev.com',
    password: '123test',
    full_name: 'Fyves Manager',
    role: 'manager',
    entity_access: ['LAT-ARL'] // Arlington location only
  }
];

async function createUser(userData) {
  try {
    console.log(`👤 Creating user: ${userData.email}`);

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Skip email confirmation for testing
      user_metadata: {
        full_name: userData.full_name
      }
    });

    if (authError) {
      console.error(`❌ Auth creation failed for ${userData.email}:`, authError.message);
      return false;
    }

    console.log(`✅ Auth user created: ${authData.user.id}`);

    // Get role ID
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', userData.role)
      .single();

    if (roleError) {
      console.error(`❌ Role lookup failed for ${userData.role}:`, roleError.message);
      return false;
    }

    // Determine entity access
    let entityAccess = [];
    if (userData.entity_access === 'all') {
      const { data: entities, error: entityError } = await supabase
        .from('entities')
        .select('id');

      if (entityError) {
        console.error('❌ Entity lookup failed:', entityError.message);
        return false;
      }

      entityAccess = entities.map(e => e.id);
    } else {
      // For specific entities, look them up by code
      for (const code of userData.entity_access) {
        const { data: entity, error: entityError } = await supabase
          .from('entities')
          .select('id')
          .eq('code', code)
          .single();

        if (entityError) {
          console.error(`❌ Entity lookup failed for ${code}:`, entityError.message);
          return false;
        }

        entityAccess.push(entity.id);
      }
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email,
        full_name: userData.full_name,
        role_id: roleData.id,
        entity_access: entityAccess,
        is_active: true
      });

    if (profileError) {
      console.error(`❌ Profile creation failed for ${userData.email}:`, profileError.message);
      return false;
    }

    console.log(`✅ User profile created for: ${userData.email}`);
    return true;

  } catch (error) {
    console.error(`💥 Unexpected error creating user ${userData.email}:`, error.message);
    return false;
  }
}

async function setupUsers() {
  console.log('🚀 Setting up Locomotion AI User Accounts...\n');

  let successCount = 0;
  let failureCount = 0;

  for (const userData of users) {
    const success = await createUser(userData);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    console.log(''); // Add spacing between users
  }

  console.log('📊 User Setup Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📈 Total: ${users.length}`);

  if (failureCount > 0) {
    console.log('\n⚠️  Some user creation failed. Check the errors above.');
    console.log('💡 You may need to delete partially created users and try again.');
    process.exit(1);
  } else {
    console.log('\n🎉 All users created successfully!');
    console.log('\n📋 Login Credentials:');
    users.forEach(user => {
      console.log(`   ${user.email} / ${user.password} (${user.role})`);
    });
    console.log('\n🔐 Use these credentials to test the different dashboard experiences.');
  }
}

// Run the user setup
setupUsers().catch(error => {
  console.error('\n💥 User setup failed:', error.message);
  process.exit(1);
});
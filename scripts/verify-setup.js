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

async function verifySetup() {
  console.log('🔍 Verifying Locomotion AI Setup...\n');

  let allGood = true;

  // Check database tables
  console.log('📊 Checking Database Tables:');
  const tables = [
    'entities', 'roles', 'users', 'customers', 'vehicles',
    'work_orders', 'parts', 'bays', 'purchase_orders'
  ];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`   ❌ ${table}: Error - ${error.message}`);
        allGood = false;
      } else {
        console.log(`   ✅ ${table}: ${count} records`);
      }
    } catch (err) {
      console.log(`   ❌ ${table}: Failed to check`);
      allGood = false;
    }
  }

  console.log('');

  // Check specific users
  console.log('👥 Checking User Accounts:');
  const testUsers = ['fyves@owner.com', 'fyves@dev.com'];

  for (const email of testUsers) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          email,
          roles:role_id (name),
          entity_access
        `)
        .eq('email', email)
        .single();

      if (error) {
        console.log(`   ❌ ${email}: Profile not found - ${error.message}`);
        allGood = false;
      } else {
        const role = data.roles?.name || 'unknown';
        const entities = Array.isArray(data.entity_access) ? data.entity_access.length : 0;
        console.log(`   ✅ ${email}: Role=${role}, Entities=${entities}`);
      }
    } catch (err) {
      console.log(`   ❌ ${email}: Check failed`);
      allGood = false;
    }
  }

  console.log('');

  // Check roles
  console.log('🔐 Checking Roles:');
  try {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('name, permissions');

    if (error) {
      console.log(`   ❌ Roles check failed: ${error.message}`);
      allGood = false;
    } else {
      roles.forEach(role => {
        console.log(`   ✅ ${role.name}: ${role.permissions?.length || 0} permissions`);
      });
    }
  } catch (err) {
    console.log('   ❌ Roles check failed');
    allGood = false;
  }

  console.log('');

  // Check entities
  console.log('🏢 Checking Business Entities:');
  try {
    const { data: entities, error } = await supabase
      .from('entities')
      .select('code, name, type');

    if (error) {
      console.log(`   ❌ Entities check failed: ${error.message}`);
      allGood = false;
    } else {
      entities.forEach(entity => {
        console.log(`   ✅ ${entity.code}: ${entity.name} (${entity.type})`);
      });
    }
  } catch (err) {
    console.log('   ❌ Entities check failed');
    allGood = false;
  }

  console.log('');

  // Summary
  if (allGood) {
    console.log('🎉 Setup verification PASSED!');
    console.log('');
    console.log('🚀 Ready to test authentication:');
    console.log('   Owner: fyves@owner.com / 123test → KPI Dashboard');
    console.log('   Manager: fyves@dev.com / 123test → Management Dashboard');
    console.log('');
    console.log('💡 Run: npm run dev');
  } else {
    console.log('❌ Setup verification FAILED!');
    console.log('');
    console.log('🔧 Fix the issues above, then re-run:');
    console.log('   npm run db:migrate');
    console.log('   npm run db:create-users');
    console.log('   npm run db:seed');
    console.log('');
    console.log('📖 See SETUP_AUTH_INSTRUCTIONS.md for detailed steps');
  }

  console.log('\n🔍 Re-run verification: npm run db:verify');
}

verifySetup().catch(console.error);
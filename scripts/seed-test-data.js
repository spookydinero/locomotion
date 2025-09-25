#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
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

async function executeSql(sql, description = '') {
  try {
    console.log(`🌱 Seeding: ${description || 'SQL statement'}`);

    // Split SQL into statements and execute them
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
        if (error) {
          console.error(`❌ Error in statement:`, error.message);
          return false;
        }
      }
    }

    console.log(`✅ Successfully seeded: ${description}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to execute seeding SQL:`, err.message);
    return false;
  }
}

async function seedTestData() {
  console.log('🌱 Starting Locomotion AI Test Data Seeding...\n');

  const seedFile = path.join(__dirname, '..', 'tests', 'fixtures', 'test-data.sql');

  if (!fs.existsSync(seedFile)) {
    console.error('❌ Test data file not found:', seedFile);
    process.exit(1);
  }

  try {
    const sql = fs.readFileSync(seedFile, 'utf8');

    // Split into logical sections for better reporting
    const sections = sql.split('-- Insert test ');
    console.log(`📄 Found ${sections.length - 1} data sections to seed`);

    let successCount = 0;
    let failureCount = 0;

    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      const sectionName = section.split('\n')[0].replace('--', '').trim();

      const sectionSql = '-- Insert test ' + section;
      const success = await executeSql(sectionSql, sectionName);

      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`   📈 Total: ${sections.length - 1}`);

    if (failureCount > 0) {
      console.log('\n⚠️  Some seeding failed. Check the errors above.');
      console.log('💡 You may need to run the seeding again or check your database permissions.');
      process.exit(1);
    } else {
      console.log('\n🎉 All test data seeded successfully!');
      console.log('🚀 Your test database is ready for testing!');
    }

  } catch (error) {
    console.error('\n💥 Seeding failed:', error.message);
    console.log('\n📋 Manual seeding instructions:');
    console.log('1. Go to your Supabase dashboard SQL editor');
    console.log('2. Copy the contents of tests/fixtures/test-data.sql');
    console.log('3. Execute the SQL manually');
    process.exit(1);
  }
}

// Verification function
async function verifySeeding() {
  console.log('\n🔍 Verifying seeded data...');

  try {
    const tables = [
      'entities', 'users', 'customers', 'vehicles',
      'work_orders', 'parts', 'bays', 'purchase_orders'
    ];

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`   ❌ ${table}: Error - ${error.message}`);
      } else {
        console.log(`   ✅ ${table}: ${count} records`);
      }
    }
  } catch (error) {
    console.log('   ❌ Verification failed:', error.message);
  }
}

// Run the seeding
seedTestData().then(() => {
  return verifySeeding();
}).catch(error => {
  console.error('\n💥 Seeding runner failed:', error.message);
  process.exit(1);
});
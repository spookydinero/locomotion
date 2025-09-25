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
    console.log(`🔄 Executing: ${description || 'SQL statement'}`);

    // For complex migrations, we need to execute them via the REST API
    // Since Supabase doesn't allow direct SQL execution from client, we'll use rpc
    const { data, error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
      // If rpc doesn't exist, try direct approach (won't work but shows the issue)
      console.error(`❌ Error executing SQL:`, error.message);
      return false;
    }

    console.log(`✅ Successfully executed: ${description}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to execute SQL:`, err.message);
    return false;
  }
}

async function runMigrations() {
  console.log('🚀 Starting Locomotion AI Database Migrations...\n');

  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  if (migrationFiles.length === 0) {
    console.log('❌ No migration files found in supabase/migrations/');
    process.exit(1);
  }

  console.log(`📁 Found ${migrationFiles.length} migration file(s):`);
  migrationFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');

  let successCount = 0;
  let failureCount = 0;

  for (const migrationFile of migrationFiles) {
    const migrationPath = path.join(migrationsDir, migrationFile);
    const migrationName = migrationFile.replace('.sql', '');

    console.log(`\n🔄 Running migration: ${migrationName}`);

    try {
      const sql = fs.readFileSync(migrationPath, 'utf8');

      // Split the SQL into individual statements (basic approach)
      const statements = sql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      console.log(`   📝 Contains ${statements.length} SQL statement(s)`);

      let statementSuccess = 0;
      let statementFailure = 0;

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i] + ';';
        const success = await executeSql(statement, `Statement ${i + 1}/${statements.length}`);

        if (success) {
          statementSuccess++;
        } else {
          statementFailure++;
        }
      }

      if (statementFailure === 0) {
        console.log(`✅ Migration ${migrationName} completed successfully`);
        successCount++;
      } else {
        console.log(`❌ Migration ${migrationName} failed (${statementFailure}/${statements.length} statements failed)`);
        failureCount++;
      }

    } catch (error) {
      console.error(`❌ Error reading migration file ${migrationFile}:`, error.message);
      failureCount++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📈 Total: ${migrationFiles.length}`);

  if (failureCount > 0) {
    console.log('\n⚠️  Some migrations failed. Please check the errors above.');
    console.log('💡 Manual steps:');
    console.log('   1. Go to your Supabase dashboard: https://supabase.com/dashboard');
    console.log('   2. Navigate to your project\'s SQL Editor');
    console.log('   3. Copy and paste the migration SQL from supabase/migrations/');
    console.log('   4. Execute the SQL statements manually');
    process.exit(1);
  } else {
    console.log('\n🎉 All migrations completed successfully!');
    console.log('🚀 Your Locomotion AI database is ready!');
  }
}

// Manual execution instructions
function showManualInstructions() {
  console.log('\n📋 MANUAL MIGRATION INSTRUCTIONS:');
  console.log('Since automated migration failed, please execute manually:');
  console.log('');
  console.log('1. 🌐 Go to your Supabase Dashboard:');
  console.log('   https://supabase.com/dashboard');
  console.log('');
  console.log('2. 📂 Navigate to your project\'s SQL Editor');
  console.log('');
  console.log('3. 📄 Copy the migration SQL from:');
  console.log('   supabase/migrations/001_initial_schema.sql');
  console.log('');
  console.log('4. ▶️  Execute the SQL in the SQL Editor');
  console.log('');
  console.log('5. ✅ Verify the tables were created successfully');
  console.log('');
  console.log('6. 🔄 Run this script again to verify:');
  console.log('   node scripts/run-migrations.js');
}

// Run the migrations
runMigrations().catch(error => {
  console.error('\n💥 Migration runner failed:', error.message);
  showManualInstructions();
  process.exit(1);
});
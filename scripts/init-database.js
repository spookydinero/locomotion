const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSql(sql) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    if (error) {
      console.error('Error executing SQL:', error);
      return false;
    }
    console.log('SQL executed successfully');
    return true;
  } catch (err) {
    console.error('Failed to execute SQL:', err);
    return false;
  }
}

async function initDatabase() {
  console.log('Initializing Locomotion AI database...');

  // Read the schema file
  const schemaPath = path.join(__dirname, '..', 'database_schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Split the schema into individual statements
  const statements = schema
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements to execute`);

  // Execute each statement
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`Executing statement ${i + 1}/${statements.length}...`);

    // For complex statements, we'll need to use direct SQL execution
    // Since Supabase doesn't have exec_sql by default, we'll try a different approach
    try {
      // Try to execute via REST API or find another way
      console.log('Note: This script needs to be run in Supabase SQL editor or with proper permissions');
      console.log('Please copy the SQL from database_schema.sql and execute it in your Supabase dashboard');
      break;
    } catch (err) {
      console.error(`Failed to execute statement ${i + 1}:`, err);
    }
  }

  console.log('Database initialization complete. Please verify in Supabase dashboard.');
}

initDatabase().catch(console.error);
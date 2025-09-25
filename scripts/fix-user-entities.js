const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixUserEntities() {
  console.log('🔧 Fixing user entity access...');

  try {
    // Get LAT-ARL entity ID
    const { data: entities, error: entitiesError } = await supabase
      .from('entities')
      .select('id, code')
      .eq('code', 'LAT-ARL')
      .single();

    if (entitiesError) {
      console.error('❌ Error getting LAT-ARL entity:', entitiesError.message);
      return;
    }

    console.log('✅ Found LAT-ARL entity:', entities.id);

    // Get all entities for owner
    const { data: allEntities, error: allEntitiesError } = await supabase
      .from('entities')
      .select('id');

    if (allEntitiesError) {
      console.error('❌ Error getting all entities:', allEntitiesError.message);
      return;
    }

    const allEntityIds = allEntities.map(e => e.id);
    console.log('✅ Found', allEntityIds.length, 'total entities');

    // Update fyves@dev.com (manager) with LAT-ARL access
    const { error: managerError } = await supabase
      .from('users')
      .update({ entity_access: [entities.id] })
      .eq('email', 'fyves@dev.com');

    if (managerError) {
      console.error('❌ Error updating manager entity access:', managerError.message);
    } else {
      console.log('✅ Updated fyves@dev.com with LAT-ARL access');
    }

    // Check if fyves@owner.com exists and update with all entity access
    const { data: ownerUser, error: ownerCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'fyves@owner.com')
      .single();

    if (ownerCheckError) {
      console.log('⚠️  fyves@owner.com not found in database - needs to be created manually in Supabase dashboard');
    } else {
      const { error: ownerError } = await supabase
        .from('users')
        .update({ entity_access: allEntityIds })
        .eq('email', 'fyves@owner.com');

      if (ownerError) {
        console.error('❌ Error updating owner entity access:', ownerError.message);
      } else {
        console.log('✅ Updated fyves@owner.com with all entity access');
      }
    }

    console.log('🎯 Entity access fix completed!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

fixUserEntities();
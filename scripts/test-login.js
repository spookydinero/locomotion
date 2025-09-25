#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);

async function testLogin() {
  console.log('🔐 Testing Manager Login...');
  
  try {
    // Test manager login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'fyves@dev.com',
      password: '123test'
    });

    if (error) {
      console.error('❌ Login failed:', error.message);
      return false;
    }

    console.log('✅ Login successful!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);

    // Test getting user profile using service role to bypass RLS
    const { data: profile, error: profileError } = await serviceSupabase
      .from('users')
      .select(`
        *,
        roles (
          name,
          permissions
        )
      `)
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('❌ Profile fetch failed:', profileError.message);
      return false;
    }

    console.log('✅ Profile loaded successfully!');
    console.log('Full Name:', profile.full_name);
    console.log('Role:', profile.roles.name);
    console.log('Permissions:', profile.roles.permissions);
    console.log('Entity Access:', profile.entity_access);

    // Sign out
    await supabase.auth.signOut();
    console.log('✅ Signed out successfully');

    return true;

  } catch (error) {
    console.error('💥 Unexpected error:', error.message);
    return false;
  }
}

testLogin().then(success => {
  if (success) {
    console.log('\n🎉 Manager login test PASSED!');
    console.log('You can now test the login in the browser:');
    console.log('- Email: fyves@dev.com');
    console.log('- Password: 123test');
  } else {
    console.log('\n❌ Manager login test FAILED!');
    process.exit(1);
  }
});
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  try {
    console.log('🔍 Testing authentication flow...');
    
    // Sign in with test credentials
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'fyves@dev.com',
      password: '123test'
    });
    
    if (authError) {
      console.error('❌ Auth error:', authError.message);
      return;
    }
    
    console.log('✅ Signed in successfully');
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      console.error('❌ No session token');
      return;
    }
    
    console.log('✅ Session token obtained');
    
    // Test /api/auth/profile endpoint
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API response:', JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.error('❌ API error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuth();
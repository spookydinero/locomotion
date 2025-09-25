-- Fix the infinite recursion in users table RLS policy
-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can access their entity users" ON users;

-- Create a simpler policy that allows users to access their own record
CREATE POLICY "Users can access their own record" ON users
    FOR ALL USING (id = auth.uid());

-- Create a separate policy for managers/owners to access other users in their entities
-- This will be handled at the application level for now to avoid recursion